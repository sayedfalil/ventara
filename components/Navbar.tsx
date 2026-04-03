"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar({ scrollY }: { scrollY: number }) {
  const isScrolled = scrollY > 50;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on scroll
  useEffect(() => {
    if (isMenuOpen && scrollY > 100) setIsMenuOpen(false);
  }, [scrollY, isMenuOpen]);

  const navLinks = [
    { href: "/#destinations", label: "Destinations" },
    { href: "/#experiences", label: "Experiences" },
    { href: "/#curation", label: "Curation" },
    { href: "/#packages", label: "Packages" },
    { href: "/blog", label: "Journal" },
  ];

  const textColor = isScrolled ? "var(--text-primary)" : "#FFFFFF";

  return (
    <>
      <motion.nav
        className={isScrolled ? "nav-scrolled" : ""}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isScrolled ? "1rem 4vw" : "2.2rem 4vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          background: isScrolled ? "var(--bg-primary)" : "transparent",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", zIndex: 101, textDecoration: "none" }}>
          {/* V mark — inline SVG so colour adapts to hero / scrolled state */}
          <Image
            src="/logo.png"
            alt="Ventara Global Logo"
            width={250}
            height={70}
            style={{ 
              width: isScrolled ? "clamp(120px, 35vw, 180px)" : "clamp(150px, 45vw, 250px)", 
              height: "auto", 
              transition: "width 0.4s, filter 0.4s", 
              objectFit: "contain", 
              transformOrigin: "center left",
              filter: !isScrolled ? "brightness(0) invert(1)" : "none" 
            }}
            className="flying-logo"
            priority
          />
        </a>

        {/* Desktop nav links */}
        <nav
          style={{
            display: "flex",
            gap: "3rem",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: textColor,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transition: "color 0.3s", color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a
            href="/#enquire"
            className="btn-primary enquire-btn"
            style={{
              padding: "10px 26px",
              fontSize: "0.65rem",
              background: isScrolled ? "var(--teal-deep)" : "rgba(255,255,255,0.15)",
              border: isScrolled ? "none" : "1px solid rgba(255,255,255,0.3)",
              backdropFilter: isScrolled ? "none" : "blur(10px)",
              color: "#fff",
              display: "none",
            }}
          >
            Enquire
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "36px",
              alignItems: "flex-end",
              zIndex: 101,
              padding: "4px",
            }}
            aria-label="Menu"
          >
            <div
              style={{
                width: "100%",
                height: "1.5px",
                background: isMenuOpen ? "#fff" : textColor,
                transition: "all 0.35s",
                transform: isMenuOpen ? "rotate(45deg) translateY(4.5px)" : "none",
              }}
            />
            <div
              style={{
                width: isMenuOpen ? "100%" : "68%",
                height: "1.5px",
                background: isMenuOpen ? "#fff" : textColor,
                transition: "all 0.35s",
                transform: isMenuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile / Fullscreen menu */}
      <motion.div
        initial={false}
        animate={{ opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? "all" : "none" }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--teal-deep)",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
        }}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
            transition={{ delay: i * 0.07 + 0.1 }}
            className="heading-serif"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "#fff",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="/#enquire"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ delay: 0.4 }}
          className="btn-outline"
          style={{ marginTop: "1rem", borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
        >
          Enquire Now
        </motion.a>
      </motion.div>

      <style>{`
        @media (min-width: 900px) {
          .enquire-btn { display: inline-flex !important; }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
