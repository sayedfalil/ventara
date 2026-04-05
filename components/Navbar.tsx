"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/packages', label: 'Packages' },
    { href: '/#experiences', label: 'Locations' },
    { href: '/blog', label: 'Journal' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '1rem 5vw' : '2rem 5vw',
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: scrolled ? '#FFFFFF' : 'transparent',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* LOGO */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', zIndex: 101, textDecoration: 'none' }}>
          <Image 
            src="https://customer-assets.emergentagent.com/job_fc21389c-d1a9-4608-99c1-9c64f1157d22/artifacts/6ftpkbez_logo%20%281%29.png" 
            alt="Ventara Global" 
            width={240} 
            height={70} 
            style={{ 
              width: scrolled ? '180px' : '220px', 
              height: 'auto',
              maxHeight: '70px',
              objectFit: 'contain',
              transition: 'all 0.4s ease' 
            }} 
            priority 
            unoptimized 
          />
        </a>

        {/* CENTER GLASS PILL NAV */}
        <nav className="desktop-nav" style={{ 
          display: 'flex', 
          alignItems: 'center',
          background: scrolled ? 'rgba(0,0,0,0.03)' : 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '100px',
          padding: '0.5rem'
        }}>
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.875rem', 
                fontWeight: 500,
                padding: '0.5rem 1.25rem',
                borderRadius: '100px',
                color: scrolled ? '#333' : '#FFF', 
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.background = scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255, 255, 255, 0.2)';
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTION PILLS */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a 
            href="/#contact" 
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.875rem', 
              fontWeight: 500,
              padding: '0.75rem 1.5rem',
              borderRadius: '100px',
              border: scrolled ? '1px solid #E5E5E5' : '1px solid rgba(255,255,255,0.4)',
              color: scrolled ? '#111' : '#FFF', 
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = scrolled ? '#111' : '#FFF';
              e.currentTarget.style.color = scrolled ? '#FFF' : '#111';
            }} 
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = scrolled ? '#111' : '#FFF';
            }}
          >
            Already Booked?
          </a>
          <button 
            aria-label="Cart"
            style={{ 
              width: '45px', 
              height: '45px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '50%',
              border: scrolled ? '1px solid #E5E5E5' : '1px solid rgba(255,255,255,0.4)',
              background: 'transparent',
              color: scrolled ? '#111' : '#FFF',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = scrolled ? '#111' : '#FFF';
              e.currentTarget.style.color = scrolled ? '#FFF' : '#111';
            }} 
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = scrolled ? '#111' : '#FFF';
            }}
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', flexDirection: 'column', gap: '6px', padding: '8px', zIndex: 101, background: 'none', border: 'none', cursor: 'pointer' }} className="mobile-menu-btn" aria-label="Toggle menu">
          <span style={{ width: '28px', height: '2px', background: scrolled || menuOpen ? '#111' : '#FFF', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
          <span style={{ width: menuOpen ? '28px' : '18px', height: '2px', background: scrolled || menuOpen ? '#111' : '#FFF', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none', marginLeft: 'auto' }} />
        </button>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <motion.div initial={false} animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none' }} transition={{ duration: 0.4 }} style={{ position: 'fixed', inset: 0, background: '#FFFFFF', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' }}>
        {navLinks.map((link, i) => (
          <motion.a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }} transition={{ delay: i * 0.05 + 0.1 }} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: '#111', textDecoration: 'none' }}>
            {link.label}
          </motion.a>
        ))}
      </motion.div>

      <style jsx global>{`
        @media (max-width: 900px) { 
          .desktop-nav { display: none !important; } 
          .mobile-menu-btn { display: flex !important; } 
        }
      `}</style>
    </>
  );
}
