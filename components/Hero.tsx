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
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/fc21389c-d1a9-4608-99c1-9c64f1157d22/images/cc2a69e45db730c347d874505e025bc042bd0d054794228c4ae5d38e13c2c3ee.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.8) 70%)',
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
          className="wing-logo"
          style={{
            width: '30vw',
            maxWidth: '300px',
            opacity: 0.15,
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
          className={`hero-content ${isClient ? 'visible' : ''}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            letterSpacing: '0.2em',
            color: 'rgba(94, 234, 255, 0.7)',
            marginBottom: '2rem',
            transitionDelay: '0.3s',
          }}
        >
          01/06
        </p>

        <h1
          className={`hero-content ${isClient ? 'visible' : ''}`}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
            lineHeight: 0.9,
            marginBottom: '2rem',
            transitionDelay: '0.5s',
          }}
        >
          ELEVATE<br />
          <span style={{ fontStyle: 'italic', color: '#5EEAFF' }}>
            YOUR JOURNEY
          </span>
        </h1>

        <p
          className={`hero-content ${isClient ? 'visible' : ''}`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontWeight: 300,
            color: 'rgba(245, 240, 232, 0.7)',
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
          className={`hero-content hero-cta ${isClient ? 'visible' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 2rem',
            border: '1px solid rgba(13, 124, 143, 0.5)',
            background: 'transparent',
            color: '#F5F0E8',
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
        .hero-cta:hover {
          background: #0D7C8F !important;
          border-color: #0D7C8F !important;
          color: #0A0A0A !important;
        }
        .wing-logo {
          animation: float 8s ease-in-out infinite;
        }
        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, #5EEAFF);
          animation: scrollBounce 1.5s ease-in-out infinite;
        }
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
