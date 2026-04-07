"use client";

import { useState, useRef } from 'react';
import WhatsAppButton from './WhatsAppButton';

const destinations = ['Kashmir', 'Kerala', 'Rajasthan', 'Goa', 'Himalayas', 'Andaman', 'Other'];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', destination: '', dates: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', destination: '', dates: '' }); }, 4000);
  };

  return (
    <section ref={sectionRef} id="contact" style={{ position: 'relative', padding: 'clamp(6rem, 15vw, 12rem) 5vw', background: '#0A0A0A', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '60vh', background: 'radial-gradient(ellipse at center bottom, rgba(13, 124, 143, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start', position: 'relative' }}>
        <div style={{ gridColumn: 'span 6', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} className="contact-text">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', letterSpacing: '0.2em', color: 'rgba(94, 234, 255, 0.7)', marginBottom: '2rem' }}>06/06</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.9, marginBottom: '2rem' }}>START<br /><span style={{ fontStyle: 'italic', color: '#5EEAFF' }}>YOUR<br />JOURNEY</span></h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', fontWeight: 300, lineHeight: 1.9, color: 'rgba(245, 240, 232, 0.7)', maxWidth: '400px' }}>Share your vision with us. Our travel architects will craft an experience that exceeds your imagination.</p>
        </div>
        <div style={{ gridColumn: 'span 6', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }} className="contact-form">
          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', padding: '3rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ width: '100px', height: '100px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#5EEAFF', animation: 'pulse 2s ease-in-out infinite' }}>✦</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 300, color: '#F5F0E8', marginBottom: '1rem', textAlign: 'center' }}>Journey Initiated</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(245, 240, 232, 0.6)', textAlign: 'center' }}>We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0D7C8F', marginBottom: '0.75rem' }}>Your Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="Enter your full name" className="form-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0D7C8F', marginBottom: '0.75rem' }}>Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="your@email.com" className="form-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0D7C8F', marginBottom: '0.75rem' }}>Preferred Destination</label>
                <select value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} required className="form-input" style={{ cursor: 'pointer' }}>
                  <option value="" style={{ background: '#0A0A0A' }}>Select destination</option>
                  {destinations.map((dest) => <option key={dest} value={dest} style={{ background: '#0A0A0A' }}>{dest}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0D7C8F', marginBottom: '0.75rem' }}>Travel Dates</label>
                <input type="text" value={formData.dates} onChange={(e) => setFormData({ ...formData, dates: e.target.value })} placeholder="e.g., March 2025 or Flexible" className="form-input" />
              </div>
              <button type="submit" className="submit-btn">Begin Your Journey</button>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <WhatsAppButton 
                  variant="inline" 
                  message="Hi Ventara Global, I'd like to discuss planning a custom luxury journey. Could we connect?" 
                  locationTracker="contact_form" 
                  style={{ color: 'rgba(245, 240, 232, 0.6)', fontSize: '0.875rem' }} 
                  className="contact-wa-link" 
                  label="Or chat with us instantly on WhatsApp" 
                />
              </div>
            </form>
          )}
        </div>
      </div>
      <style jsx global>{`
        .form-input { width: 100%; padding: 1rem 0; background: transparent; border: none; border-bottom: 1px solid rgba(255, 255, 255, 0.2); color: #F5F0E8; font-family: var(--font-body); font-size: 1rem; font-weight: 300; outline: none; transition: border-color 0.3s ease; border-radius: 0; }
        .form-input:focus { border-color: #5EEAFF; } .form-input::placeholder { color: rgba(255, 255, 255, 0.3); }
        .submit-btn { display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 1.25rem 2rem; margin-top: 1rem; border: 1px solid rgba(13, 124, 143, 0.5); background: transparent; color: #F5F0E8; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; }
        .submit-btn:hover { background: #0D7C8F; border-color: #0D7C8F; color: #0A0A0A; }
        .contact-wa-link:hover { color: var(--teal) !important; opacity: 1 !important; }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }
        @media (max-width: 900px) { .contact-text, .contact-form { grid-column: span 12 !important; } }
      `}</style>
    </section>
  );
}
