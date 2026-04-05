"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';

const experiences = [
  { id: 1, title: 'Private Yacht Cruises', description: 'Sail through pristine waters with personal crew and chef.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=85&w=800&auto=format&fit=crop', size: 'large' },
  { id: 2, title: 'Heritage Palace Stays', description: 'Live like royalty in converted maharaja residences.', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=85&w=800&auto=format&fit=crop', size: 'small' },
  { id: 3, title: 'Culinary Journeys', description: 'Private dining experiences with celebrated local chefs.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=800&auto=format&fit=crop', size: 'small' },
  { id: 4, title: 'Wellness Retreats', description: 'Ancient Ayurvedic treatments in serene sanctuaries.', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=800&auto=format&fit=crop', size: 'medium' },
];

export default function Experiences() {
  const [isVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const gridStyles: { [key: string]: React.CSSProperties } = { large: { gridColumn: 'span 7', gridRow: 'span 2' }, medium: { gridColumn: 'span 5', gridRow: 'span 2' }, small: { gridColumn: 'span 5', gridRow: 'span 1' } };

  return (
    <section ref={sectionRef} id="experiences" style={{ position: 'relative', padding: 'clamp(6rem, 15vw, 12rem) 5vw', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', marginBottom: 'clamp(4rem, 8vw, 8rem)' }}>
          <div style={{ gridColumn: 'span 6', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} className="exp-header">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', letterSpacing: '0.2em', color: 'rgba(94, 234, 255, 0.7)', marginBottom: '2rem' }}>04/06</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.95 }}>BESPOKE<br /><span style={{ fontStyle: 'italic', color: '#5EEAFF' }}>EXPERIENCES</span></h2>
          </div>
          <div style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'flex-end', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }} className="exp-text">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', fontWeight: 300, lineHeight: 1.9, color: 'rgba(245, 240, 232, 0.7)', maxWidth: '500px' }}>From private dining under the stars to exclusive access to heritage sites, we create moments that transcend the ordinary.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'minmax(250px, auto)', gap: '1.5rem' }}>
          {experiences.map((exp, index) => (
            <article key={exp.id} className="exp-card" style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', ...gridStyles[exp.size], opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s` }}>
              <Image src={exp.image} alt={exp.title} fill style={{ objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }} unoptimized />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.3) 50%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0D7C8F', marginBottom: '0.75rem' }}>Experience 0{index + 1}</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: exp.size === 'large' ? 'clamp(1.75rem, 3vw, 2.5rem)' : 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 300, color: '#F5F0E8', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{exp.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'rgba(245, 240, 232, 0.6)', lineHeight: 1.6 }}>{exp.description}</p>
              </div>
              <div className="exp-card-border" style={{ position: 'absolute', inset: 0, border: '1px solid transparent', transition: 'border-color 0.4s ease', pointerEvents: 'none' }} />
            </article>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .exp-card:hover img { transform: scale(1.05); } .exp-card:hover .exp-card-border { border-color: rgba(94, 234, 255, 0.3); }
        @media (max-width: 900px) { .exp-header, .exp-text { grid-column: span 12 !important; } .exp-card { grid-column: span 12 !important; grid-row: span 1 !important; min-height: 300px; } }
      `}</style>
    </section>
  );
}
