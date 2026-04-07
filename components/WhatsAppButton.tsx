"use client";

import { useEffect, useState } from "react";
import { generateWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import { motion } from "framer-motion";

type WhatsAppVariant = "floating" | "inline" | "icon" | "cta";

interface WhatsAppButtonProps {
  message: string;
  variant?: WhatsAppVariant;
  size?: number | string;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  locationTracker?: string;
}

const WhatsAppIcon = ({ size = 24, filled = true }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? "0" : "2"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885" />
  </svg>
);

export default function WhatsAppButton({
  message,
  variant = "floating",
  size,
  style = {},
  className = "",
  label,
  locationTracker = "Unknown",
}: WhatsAppButtonProps) {
  const [href, setHref] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    setIsClient(true);
    setHref(generateWhatsAppLink(message));

    if (variant === "floating") {
      const interval = setInterval(() => {
        setPulseScale(1.1);
        setTimeout(() => setPulseScale(1), 300);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [message, variant]);

  // Don't render until client to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  const handleClick = () => {
    trackWhatsAppClick(locationTracker);
  };

  if (variant === "floating") {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: pulseScale, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="wa-floating-btn"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: size || "60px",
          height: size || "60px",
          minWidth: "44px",
          minHeight: "44px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(23, 150, 180, 0.4)",
          zIndex: 9999,
          ...style,
        }}
      >
        <WhatsAppIcon size={32} />
        
        <div className="wa-tooltip">Chat with us on WhatsApp</div>

        <style jsx>{`
          .wa-floating-btn {
            position: relative;
          }
          .wa-floating-btn:hover {
            box-shadow: 0 6px 20px rgba(23, 150, 180, 0.6) !important;
          }
          .wa-tooltip {
            position: absolute;
            right: calc(100% + 15px);
            top: 50%;
            transform: translateY(-50%);
            background: #000;
            color: #fff;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 13px;
            font-family: var(--font-sans);
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            pointer-events: none;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .wa-tooltip::after {
            content: "";
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent #000;
          }
          .wa-floating-btn:hover .wa-tooltip {
            opacity: 1;
            visibility: visible;
            right: calc(100% + 10px);
          }
          @media (max-width: 768px) {
            .wa-floating-btn {
              width: 52px !important;
              height: 52px !important;
              bottom: 1.5rem !important;
              right: 1.5rem !important;
            }
            .wa-tooltip {
              display: none;
            }
          }
        `}</style>
      </motion.a>
    );
  }

  if (variant === "cta") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`wa-cta-btn ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "16px 32px",
          background: "transparent",
          border: "1px solid var(--teal)",
          color: "var(--teal-dark)",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "all 0.3s",
          ...style,
        }}
      >
        <WhatsAppIcon size={18} />
        {label || "Inquire on WhatsApp"}
        <style jsx>{`
          .wa-cta-btn:hover {
            background: var(--teal) !important;
            color: #fff !important;
          }
        `}</style>
      </a>
    );
  }

  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`wa-icon-btn ${className}`}
        aria-label="Quick chat on WhatsApp"
        title="Quick chat on WhatsApp"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size || "45px",
          height: size || "45px",
          minWidth: "44px",
          minHeight: "44px",
          ...style,
        }}
      >
        <WhatsAppIcon size={Number(size) ? Number(size) * 0.5 : 18} />
      </a>
    );
  }

  // Inline subtle link
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        color: "var(--teal)",
        textDecoration: "none",
        fontSize: size || "0.9375rem",
        transition: "opacity 0.3s",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <WhatsAppIcon size={16} filled={false} />
      {label || "Chat with us instantly on WhatsApp"}
    </a>
  );
}
