"use client";

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wallet, Users, Search } from 'lucide-react';

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
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Centered Rounded Image Canvas */}
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 2rem)',
          borderRadius: '2.5rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
      >
        {/* Bright Turquoise Beach Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=2600&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
        {/* Color Correction Overlay (Slight darkening for text readability) */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,100,150,0.2))', zIndex: 1 }} />

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
              marginBottom: '1rem',
              textShadow: '0 10px 30px rgba(0,0,0,0.15)'
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
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '3rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            What we offer is an unforgettable journey and experience.
          </motion.p>

          {/* Search Bar Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="search-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: '100px',
              padding: '0.6rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              width: '100%',
              maxWidth: '850px',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div className="search-section" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.5rem', borderRight: '1px solid #EEEEEE' }}>
              <Calendar size={20} color="#888" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: '#444', fontWeight: 500 }}>Date</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            <div className="search-section" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.5rem', borderRight: '1px solid #EEEEEE' }}>
              <Wallet size={20} color="#888" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: '#444', fontWeight: 500 }}>Budget</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            <div className="search-section" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.5rem' }}>
              <Users size={20} color="#888" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: '#444', fontWeight: 500 }}>Guest</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            <a
              href="/packages"
              className="search-btn"
              style={{
                background: '#00B4D8',
                color: '#FFF',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease'
              }}
            >
              Search
            </a>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .search-btn:hover {
          background: #0096C7 !important;
        }
        @media (max-width: 900px) {
          .search-pill {
            flex-direction: column;
            border-radius: 2rem !important;
            padding: 1.5rem !important;
          }
          .search-section {
            width: 100%;
            border-right: none !important;
            border-bottom: 1px solid #EEEEEE;
            padding: 1rem 0 !important;
          }
          .search-section:last-of-type {
            border-bottom: none;
          }
          .search-btn {
            width: 100%;
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
