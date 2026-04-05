"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    { href: '/', label: 'Home', number: '01' },
    { href: '/packages', label: 'Packages', number: '02' },
    { href: '/blog', label: 'Journal', number: '03' },
    { href: '/#experiences', label: 'Experiences', number: '04' },
    { href: '/#contact', label: 'Contact', number: '05' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? '1rem 5vw' : '2rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <a href="/" style={{ display: 'flex', alignItems: 'center', zIndex: 101 }}>
          <Image src="https://customer-assets.emergentagent.com/job_fc21389c-d1a9-4608-99c1-9c64f1157d22/artifacts/6ftpkbez_logo%20%281%29.png" alt="Ventara Global" width={180} height={50} style={{ width: scrolled ? '140px' : '180px', height: 'auto', transition: 'width 0.4s ease' }} priority unoptimized />
        </a>

        <nav className="desktop-nav" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream)', opacity: 0.7, transition: 'opacity 0.3s ease' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}>
              <span style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}>{link.number}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', flexDirection: 'column', gap: '6px', padding: '8px', zIndex: 101 }} className="mobile-menu-btn" aria-label="Toggle menu">
          <span style={{ width: '28px', height: '1px', background: menuOpen ? 'var(--secondary)' : 'var(--cream)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }} />
          <span style={{ width: menuOpen ? '28px' : '18px', height: '1px', background: menuOpen ? 'var(--secondary)' : 'var(--cream)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none', marginLeft: 'auto' }} />
        </button>
      </motion.nav>

      <motion.div initial={false} animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none' }} transition={{ duration: 0.4 }} style={{ position: 'fixed', inset: 0, background: 'var(--background)', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' }}>
        {navLinks.map((link, i) => (
          <motion.a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }} transition={{ delay: i * 0.05 + 0.1 }} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--cream)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--secondary)', marginRight: '1rem' }}>{link.number}</span>{link.label}
          </motion.a>
        ))}
      </motion.div>

      <style jsx global>{`
        @media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
      `}</style>
    </>
  );
}
