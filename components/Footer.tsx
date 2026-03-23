"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" style={{ background: "var(--bg-primary)", padding: "clamp(5rem, 15vw, 10rem) 4vw 4rem", position: "relative" }}>
      
      <div className="container-narrow" style={{ textAlign: "center", marginBottom: "8rem" }}>
        <p className="eyebrow" style={{ marginBottom: "2rem" }}>Your Private Invitation</p>
        <h2 className="heading-serif" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", color: "var(--text-primary)", lineHeight: 1, marginBottom: "3rem" }}>
          Begin your <span style={{ fontStyle: "italic", color: "var(--teal-dark)" }}>Legend.</span>
        </h2>
        <a href="mailto:concierge@ventaraglobal.com" className="btn-primary">
          Contact Concierge
        </a>
      </div>

      <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(3rem, 6vw, 5rem)", paddingBottom: "4rem", borderBottom: "1px solid var(--border)" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/logo.png" alt="Ventara Logo" style={{ width: "clamp(180px, 60vw, 280px)", height: "auto", objectFit: "contain", objectPosition: "left" }} className="flying-logo" />
          </div>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "340px", fontWeight: 300 }}>
            Architects of India's most extraordinary private luxury journeys. Designed for the discerning traveler.
          </p>
        </div>

        <div>
          <h4 className="eyebrow" style={{ color: "var(--text-primary)", marginBottom: "2.5rem" }}>Inquiries</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 300 }}>
            <p style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <span className="eyebrow" style={{ color: "var(--teal-dark)" }}>E</span> concierge@ventaraglobal.com
            </p>
            <p style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <span className="eyebrow" style={{ color: "var(--teal-dark)" }}>T</span> +91 98765 43210
            </p>
          </div>
        </div>

        <div>
          <h4 className="eyebrow" style={{ color: "var(--text-primary)", marginBottom: "2.5rem" }}>Company</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 300 }}>
            <a href="#curation" style={{ transition: "color 0.4s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--teal-dark)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>The Standard</a>
            <a href="#destinations" style={{ transition: "color 0.4s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--teal-dark)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Journeys</a>
            <a href="#" style={{ transition: "color 0.4s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--teal-dark)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Press & Media</a>
          </div>
        </div>

      </div>

      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "3rem", flexWrap: "wrap", gap: "2rem", color: "var(--text-light)", fontSize: "0.9rem", fontWeight: 300 }}>
        <p>&copy; {new Date().getFullYear()} Ventara Global. Exclusively Curated.</p>
        <div style={{ display: "flex", gap: "3rem" }}>
          <a href="#" style={{ transition: "color 0.4s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>Terms</a>
          <a href="#" style={{ transition: "color 0.4s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-light)"}>Privacy</a>
        </div>
      </div>
    </footer>
  );
}
