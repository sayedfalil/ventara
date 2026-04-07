"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import WhatsAppButton from './WhatsAppButton';

const destinations = [
  { id: 1, name: 'Goa', type: 'Coastal Paradise', year: '2024', image: 'https://images.unsplash.com/photo-1736347505109-f02e0e5a0200?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxHb2ElMjBiZWFjaCUyMGx1eHVyeSUyMHJlc29ydCUyMHN1bnNldHxlbnwwfHx8fDE3NzUzNzYwMDN8MA&ixlib=rb-4.1.0&q=85', description: 'Sun-kissed beaches and Portuguese heritage' },
  { id: 2, name: 'Kerala', type: 'Backwater Luxury', year: '2024', image: 'https://images.unsplash.com/photo-1643614331150-37823121afce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0JTIwc3VucmlzZXxlbnwwfHx8fDE3NzUzNzYwMDR8MA&ixlib=rb-4.1.0&q=85', description: 'Serene houseboats through emerald waters' },
  { id: 3, name: 'Rajasthan', type: 'Royal Heritage', year: '2024', image: 'https://images.pexels.com/photos/570031/pexels-photo-570031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', description: 'Majestic palaces and golden deserts' },
  { id: 4, name: 'Kashmir', type: 'Alpine Paradise', year: '2024', image: 'https://static.prod-images.emergentagent.com/jobs/fc21389c-d1a9-4608-99c1-9c64f1157d22/images/9b2a0731cf213f3ce4b9ee8f58742c6f6d2b50a0c6b7a5bd9d1efda44a25edb0.png', description: 'Heaven on earth with pristine lakes' },
  { id: 5, name: 'Himalayas', type: 'Mountain Retreat', year: '2024', image: 'https://static.prod-images.emergentagent.com/jobs/fc21389c-d1a9-4608-99c1-9c64f1157d22/images/6508f1e1699027bee8668a46813c63e09f2166cb646719e1ee489ae85d394cb0.png', description: 'Luxury glamping at the roof of the world' },
  { id: 6, name: 'Andaman', type: 'Island Escape', year: '2024', image: 'https://static.prod-images.emergentagent.com/jobs/fc21389c-d1a9-4608-99c1-9c64f1157d22/images/ad434669f497e49f0c3a560d4fba8a75d79a0e02ff409a35cfe8c65e59831ec6.png', description: 'Crystal waters and untouched beaches' },
];

export default function Journeys() {
  const [isVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="journeys" style={{ position: 'relative', background: '#0A0A0A', padding: 'clamp(6rem, 15vw, 12rem) 5vw' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(4rem, 8vw, 8rem)', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', letterSpacing: '0.2em', color: 'rgba(94, 234, 255, 0.7)', marginBottom: '1.5rem' }}>02/06</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F5F0E8', marginBottom: '1.5rem' }}>
            SELECTED<br /><span style={{ fontStyle: 'italic', color: '#5EEAFF' }}>JOURNEYS</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', fontWeight: 300, lineHeight: 1.9, color: 'rgba(245, 240, 232, 0.7)', maxWidth: '600px' }}>
            Discover India's most extraordinary destinations, each offering a unique blend of luxury, culture, and natural beauty.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {destinations.map((dest, index) => (
            <article key={dest.id} className="journey-card" style={{ position: 'relative', height: '500px', overflow: 'hidden', cursor: 'pointer', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s` }}>
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'rgba(255, 255, 255, 0.6)', zIndex: 10 }}>0{index + 1}</div>
              <Image src={dest.image} alt={dest.name} fill style={{ objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }} unoptimized />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.3) 50%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0D7C8F', marginBottom: '0.75rem' }}>Type: {dest.type}</p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: '#F5F0E8', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{dest.name}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(245, 240, 232, 0.6)', lineHeight: 1.6, marginBottom: '1rem' }}>{dest.description}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: '#888888', margin: 0 }}>{dest.year}</p>
                </div>
                <WhatsAppButton 
                  variant="icon"
                  message={`Hi Ventara Global, I'm interested in your ${dest.name} package. Could you share more details and pricing?`}
                  locationTracker="journeys_card"
                  style={{ color: '#5EEAFF', borderColor: 'rgba(94, 234, 255, 0.3)', marginBottom: '0.5rem' }}
                  className="journeys-wa-btn"
                />
              </div>
              <div className="card-border" style={{ position: 'absolute', inset: 0, border: '1px solid transparent', transition: 'border-color 0.4s ease', pointerEvents: 'none' }} />
            </article>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .journey-card:hover img { transform: scale(1.05); }
        .journey-card:hover .card-border { border-color: rgba(94, 234, 255, 0.3); }
        .journeys-wa-btn:hover { background: rgba(94, 234, 255, 0.1) !important; border-color: #5EEAFF !important; }
      `}</style>
    </section>
  );
}
