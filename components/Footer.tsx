"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AtSign, Link2, Mail } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ position: 'relative', padding: '4rem 5vw 2rem', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ gridColumn: 'span 4' }} className="footer-brand">
            <Image src="https://customer-assets.emergentagent.com/job_fc21389c-d1a9-4608-99c1-9c64f1157d22/artifacts/6ftpkbez_logo%20%281%29.png" alt="Ventara Global" width={220} height={60} style={{ width: '220px', height: 'auto', maxHeight: '60px', objectFit: 'contain', marginBottom: '1.5rem' }} unoptimized />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245, 240, 232, 0.6)', maxWidth: '300px' }}>Architects of extraordinary journeys across India. Crafting bespoke travel experiences since 2020.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} style={{ gridColumn: 'span 2' }} className="footer-nav">
            <h4 className="label-mono" style={{ marginBottom: '1.5rem', fontSize: '0.65rem' }}>Navigate</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[ {l: 'Home', h: '/'}, {l: 'Packages', h: '/packages'}, {l: 'Journal', h: '/blog'}, {l: 'Contact', h: '/#contact'} ].map((item) => (
                <a key={item.l} href={item.h} style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'rgba(245, 240, 232, 0.6)', transition: 'color 0.3s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--secondary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245, 240, 232, 0.6)')}>
                  {item.l}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ gridColumn: 'span 3' }} className="footer-contact">
            <h4 className="label-mono" style={{ marginBottom: '1.5rem', fontSize: '0.65rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'rgba(245, 240, 232, 0.6)', lineHeight: 1.7 }}>Calicut, Kerala<br />India 673001</p>
              <a href="mailto:info@ventaraglobal.com" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'var(--secondary)' }}>info@ventaraglobal.com</a>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'rgba(245, 240, 232, 0.6)' }}>+91 8921 2480 55</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} style={{ gridColumn: 'span 3' }} className="footer-social">
            <h4 className="label-mono" style={{ marginBottom: '1.5rem', fontSize: '0.65rem' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {[ { Icon: AtSign, label: 'Instagram', href: '#' }, { Icon: Link2, label: 'LinkedIn', href: '#' }, { Icon: Mail, label: 'Email', href: 'mailto:info@ventaraglobal.com' } ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(245, 240, 232, 0.6)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--secondary)'; e.currentTarget.style.color = 'var(--secondary)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = 'rgba(245, 240, 232, 0.6)'; }}>
                  <Icon size={18} />
                </a>
              ))}
              <WhatsAppButton 
                variant="icon" 
                size={40} 
                message="Hi Ventara Global, I have a quick question." 
                locationTracker="footer" 
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  color: 'rgba(245, 240, 232, 0.6)', 
                  transition: 'all 0.3s ease',
                  borderRadius: '0' 
                }} 
                className="footer-wa"
              />
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--muted)' }}>© {currentYear} VENTARA GLOBAL. ALL RIGHTS RESERVED.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--muted)' }}>CRAFTED WITH PRECISION</p>
        </div>
      </div>
      <style jsx global>{`
        .footer-wa:hover {
          border-color: var(--secondary) !important;
          color: var(--secondary) !important;
        }
        @media (max-width: 900px) { .footer-brand { grid-column: span 12 !important; } .footer-nav { grid-column: span 6 !important; } .footer-contact { grid-column: span 6 !important; } .footer-social { grid-column: span 12 !important; } }
      `}</style>
    </footer>
  );
}
