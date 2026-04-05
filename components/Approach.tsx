"use client";

import { useRef, useState } from 'react';

const pillars = [
  { id: 1, title: 'Luxury', description: 'Five-star accommodations, private transfers, and personalized concierge service at every step.', icon: '✦' },
  { id: 2, title: 'Adventure', description: 'Curated expeditions that push boundaries while maintaining absolute comfort and safety.', icon: '▲' },
  { id: 3, title: 'Cultural', description: 'Authentic immersions guided by local experts, revealing hidden stories and traditions.', icon: '◯' },
];

export default function Approach() {
  const [isVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="approach" style={{ position: 'relative', padding: 'clamp(6rem, 15vw, 12rem) 5vw', background: '#0A0A0A', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', right: '-20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(13, 124, 143, 0.1) 0%, transparent 70%)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'start' }}>
        <div style={{ gridColumn: 'span 5' }} className="approach-text">
          <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', letterSpacing: '0.2em', color: 'rgba(94, 234, 255, 0.7)', marginBottom: '2rem' }}>03/06</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.95, marginBottom: '3rem' }}>
              CURATED.<br /><span style={{ fontStyle: 'italic', color: '#5EEAFF' }}>NOT PACKAGED.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', fontWeight: 300, lineHeight: 1.9, color: 'rgba(245, 240, 232, 0.7)', marginBottom: '3rem', maxWidth: '500px' }}>
              Every journey we craft is a singular creation. We don't believe in templates or off-the-shelf itineraries. Your story is unique — your travel should be too.
            </p>
            <a href="#contact" className="approach-cta" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 2rem', border: '1px solid rgba(13, 124, 143, 0.5)', background: 'transparent', color: '#F5F0E8', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s ease' }}>
              Start Planning
            </a>
          </div>
        </div>
        <div style={{ gridColumn: 'span 7' }} className="approach-pillars">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {pillars.map((pillar, index) => (
              <div key={pillar.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'center', padding: '2rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(40px)', transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.15}s` }}>
                <div style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#5EEAFF', border: '1px solid rgba(94, 234, 255, 0.3)', background: 'rgba(94, 234, 255, 0.05)' }}>{pillar.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#5EEAFF' }}>0{index + 1}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 400, color: '#F5F0E8', letterSpacing: '-0.02em' }}>{pillar.title}</h3>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245, 240, 232, 0.6)' }}>{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .approach-cta:hover { background: #0D7C8F !important; border-color: #0D7C8F !important; color: #0A0A0A !important; }
        @media (max-width: 900px) { .approach-text { grid-column: span 12 !important; } .approach-pillars { grid-column: span 12 !important; } }
      `}</style>
    </section>
  );
}
