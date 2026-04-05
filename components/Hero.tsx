"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Edge-to-Edge Video Canvas */}
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Moving Ocean Waves Animated Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2600&auto=format&fit=crop)',
            backgroundPosition: 'center',
            backgroundSize: '120% auto',
            zIndex: 0,
            animation: 'slowWavePan 30s ease-in-out infinite alternate',
          }}
        />
        
        {/* Color Correction Overlay (Slight blue cyan tint to match the bright theme) */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0, 150, 180, 0.1), rgba(0, 50, 100, 0.3))', zIndex: 1 }} />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '0 5vw',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(4rem, 10vw, 8.5rem)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '1.5rem',
              textShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            Explore The World
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.35rem)',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '3rem',
              maxWidth: '700px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Discover breathtaking coastal destinations where the rhythm of the ocean meets pure luxury.
          </motion.p>
          
          {/* Simple CTA Button replacing the Search Bar */}
          <motion.a
            href="/packages"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="explore-btn"
            style={{
              background: '#00B4D8',
              color: '#FFF',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              padding: '1.25rem 3rem',
              borderRadius: '100px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(0, 180, 216, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Find Your Journey
          </motion.a>
        </div>
      </div>

      <style jsx>{`
        .explore-btn:hover {
          background: #0096C7 !important;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 150, 199, 0.5) !important;
        }
        @keyframes slowWavePan {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
