"use client";

import { useState, useEffect, useRef } from 'react';

const testimonials = [
  { id: 1, quote: "Ventara didn't just plan our trip — they crafted a narrative. Every moment felt intentional, every surprise perfectly timed. This is what luxury travel should be.", name: 'Priya Mehta', destination: 'Kashmir Valley', role: 'Entrepreneur' },
  { id: 2, quote: "We've traveled extensively, but nothing compares to the level of personalization Ventara provides. They understood our family's needs before we even articulated them.", name: 'Rajesh & Sunita Sharma', destination: 'Rajasthan Heritage Tour', role: 'Corporate Executives' },
  { id: 3, quote: "The attention to detail was extraordinary. From the private houseboat in Kerala to the sunrise yoga sessions, every element was curated to perfection.", name: 'Ananya Krishnan', destination: 'Kerala Backwaters', role: 'Fashion Designer' },
];

export default function Stories() {
  const [current, setCurrent] = useState(0);
  const [isVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} id="stories" style={{ position: 'relative', padding: 'clamp(6rem, 15vw, 12rem) 5vw', background: '#0A0A0A', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-heading)', fontSize: 'clamp(20rem, 40vw, 50rem)', fontWeight: 300, color: 'rgba(255, 255, 255, 0.02)', lineHeight: 0.8, pointerEvents: 'none', userSelect: 'none' }}>"</div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 8rem)', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', letterSpacing: '0.2em', color: 'rgba(94, 234, 255, 0.7)', marginBottom: '2rem' }}>05/06</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.95 }}>CLIENT<br /><span style={{ fontStyle: 'italic', color: '#5EEAFF' }}>STORIES</span></h2>
        </div>
        <div style={{ position: 'relative', minHeight: '350px' }}>
          <div key={current} style={{ textAlign: 'center', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <blockquote style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: '#F5F0E8', marginBottom: '3rem', maxWidth: '900px', margin: '0 auto 3rem' }}>"{testimonials[current].quote}"</blockquote>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 400, color: '#F5F0E8', marginBottom: '0.25rem' }}>{testimonials[current].name}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', color: '#0D7C8F', textTransform: 'uppercase' }}>{testimonials[current].destination}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: '#888888', marginTop: '0.5rem' }}>{testimonials[current].role}</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => setCurrent(index)} style={{ width: index === current ? '40px' : '10px', height: '10px', borderRadius: '5px', background: index === current ? '#5EEAFF' : 'rgba(255, 255, 255, 0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease' }} aria-label={`Go to testimonial ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
