"use client";

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-testid="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
      }}
    >
      {/* Background Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Panning Clouds */}
        <div
          className="animated-bg"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/fc21389c-d1a9-4608-99c1-9c64f1157d22/images/cc2a69e45db730c347d874505e025bc042bd0d054794228c4ae5d38e13c2c3ee.png)',
            backgroundPosition: '0% center', // Initial state
          }}
        />
        {/* Color Cycle Overlay */}
        <div
          className="day-night-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 3D Wing-V Logo SVG */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="wing-logo animated-logo"
          style={{
            width: '30vw',
            maxWidth: '300px',
          }}
        >
          <path d="M100 180 L40 20 L60 20 L100 140 Z" fill="#0D7C8F" opacity="0.9" />
          <path d="M100 180 L160 20 L140 20 L100 140 Z" fill="#0D7C8F" opacity="0.9" />
          <circle cx="100" cy="150" r="8" fill="#5EEAFF" className="sparkle">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 5vw',
          maxWidth: '1400px',
        }}
      >
        <p
          className={`hero-content animated-text-cyan ${isClient ? 'visible' : ''}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            letterSpacing: '0.2em',
            marginBottom: '2rem',
            transitionDelay: '0.3s',
          }}
        >
          01/06
        </p>

        <h1
          className={`hero-content animated-text ${isClient ? 'visible' : ''}`}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom: '2rem',
            transitionDelay: '0.5s',
          }}
        >
          ELEVATE<br />
          <span className="animated-text-cyan" style={{ fontStyle: 'italic' }}>
            YOUR JOURNEY
          </span>
        </h1>

        <p
          className={`hero-content animated-text-muted ${isClient ? 'visible' : ''}`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.8,
            transitionDelay: '0.7s',
          }}
        >
          Curated luxury experiences across India's most breathtaking destinations.
          Not packaged — designed exclusively for you.
        </p>

        <a
          href="/packages"
          className={`hero-content hero-cta animated-button ${isClient ? 'visible' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 2rem',
            border: '1px solid',
            background: 'transparent',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transitionDelay: '0.9s',
          }}
        >
          Explore Packages
        </a>
      </div>

      <div
        className={`hero-content ${isClient ? 'visible' : ''}`}
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 10,
          transitionDelay: '1.2s',
        }}
      >
        <div className="scroll-line" />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#888888',
          }}
        >
          Scroll
        </span>
      </div>

      <style jsx>{`
        .hero-content {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* 
         * Background panning & brightness 
         * Duration: 120s (very slow and comfortable)
         * Iteration: 1 (forwards, no loop)
         */
        .animated-bg {
          background-size: 150% auto !important;
          animation: panClouds 120s ease-out forwards, 
                     fullDayBrightness 120s ease-in-out forwards;
        }

        /* Color Overlay (Night -> Morning -> Day -> Evening -> Night) */
        .day-night-overlay {
          animation: fullDayOverlay 120s ease-in-out forwards;
        }

        /* Text transitions synchronized to a single 120s day cycle */
        .animated-text {
          animation: fullDayText 120s ease-in-out forwards;
        }
        .animated-text-cyan {
          animation: fullDayCyan 120s ease-in-out forwards;
        }
        .animated-text-muted {
          animation: fullDayMutedText 120s ease-in-out forwards;
        }
        .animated-button {
          animation: fullDayButton 120s ease-in-out forwards;
        }
        .animated-logo {
          animation: fullDayLogo 120s ease-in-out forwards, float 8s ease-in-out infinite;
        }

        /* Hover interactions */
        .hero-cta:hover {
          background: #0D7C8F !important;
          border-color: #0D7C8F !important;
          color: #F5F0E8 !important;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, #5EEAFF);
          animation: scrollBounce 1.5s ease-in-out infinite;
        }

        /* 
         * ====== KEYFRAMES (Full 120s Day Cycle) ====== 
         */

        /* Panning the clouds continuously to the end */
        @keyframes panClouds {
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
        
        /* Brightness filtering on the base background */
        @keyframes fullDayBrightness {
          0% { filter: brightness(0.5) sepia(0); } /* Deep Night */
          20% { filter: brightness(0.9) sepia(0.2) saturate(1.4); } /* Sunrise */
          50% { filter: brightness(1.2) sepia(0) saturate(1.1); } /* Midday */
          80% { filter: brightness(0.8) sepia(0.3) saturate(1.5) hue-rotate(-10deg); } /* Sunset */
          100% { filter: brightness(0.5) sepia(0); } /* Deep Night */
        }

        /* Overlay color washes through the full day spectrum */
        @keyframes fullDayOverlay {
          0% { background-color: rgba(10, 10, 10, 0.85); } /* Night */
          20% { background-color: rgba(255, 110, 80, 0.45); } /* Morning Reddish-Orange */
          50% { background-color: rgba(135, 206, 235, 0.4); } /* Sky Blue Daylight */
          80% { background-color: rgba(200, 70, 40, 0.45); } /* Evening Crimson/Orange */
          100% { background-color: rgba(10, 10, 10, 0.85); } /* Night */
        }

        /* Synchronized text color matching the background readability */
        @keyframes fullDayText {
          0% { color: #F5F0E8; text-shadow: 0 0 10px rgba(255,255,255,0.1); }
          20% { color: #1A1A1A; text-shadow: 0 0 15px rgba(255,255,255,0.7); }
          50% { color: #050505; text-shadow: 0 0 40px rgba(255,255,255,0.9); }
          80% { color: #1A1A1A; text-shadow: 0 0 15px rgba(255,255,255,0.7); }
          100% { color: #F5F0E8; text-shadow: 0 0 10px rgba(255,255,255,0.1); }
        }

        @keyframes fullDayCyan {
          0% { color: rgba(94, 234, 255, 0.9); }
          20% { color: #0A5A68; }
          50% { color: #0D7C8F; }
          80% { color: #0A5A68; }
          100% { color: rgba(94, 234, 255, 0.9); }
        }

        @keyframes fullDayMutedText {
          0% { color: rgba(245, 240, 232, 0.7); font-weight: 300; }
          20% { color: rgba(20, 20, 20, 0.9); font-weight: 500; }
          50% { color: rgba(10, 10, 10, 0.9); font-weight: 600; }
          80% { color: rgba(20, 20, 20, 0.9); font-weight: 500; }
          100% { color: rgba(245, 240, 232, 0.7); font-weight: 300; }
        }

        @keyframes fullDayButton {
          0% { color: #F5F0E8; border-color: rgba(94, 234, 255, 0.5); font-weight: 300; }
          20% { color: #1A1A1A; border-color: #0D7C8F; font-weight: 500; }
          50% { color: #0A0A0A; border-color: #0D7C8F; font-weight: 600; }
          80% { color: #1A1A1A; border-color: #0D7C8F; font-weight: 500; }
          100% { color: #F5F0E8; border-color: rgba(94, 234, 255, 0.5); font-weight: 300; }
        }

        @keyframes fullDayLogo {
          0% { opacity: 0.15; filter: none; }
          20% { opacity: 0.3; filter: brightness(0.2); }
          50% { opacity: 0.4; filter: brightness(0.1) contrast(1.5); }
          80% { opacity: 0.3; filter: brightness(0.2); }
          100% { opacity: 0.15; filter: none; }
        }

        /* Logo physical float */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </section>
  );
}
