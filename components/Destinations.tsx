"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const dests = [
  {
    id: 1,
    title: "The Emerald Tropics",
    desc: "Chartered houseboat voyages through the serene backwaters of Kerala.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1200&auto=format&fit=crop",
    tag: "Kerala",
    span: 2, // Span full width for the first image
  },
  {
    id: 2,
    title: "Palaces of Sand & Gold",
    desc: "An exploration of ancient desert forts and ultra-luxurious royal residences.",
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=85&w=1000&auto=format&fit=crop",
    tag: "Rajasthan",
    span: 1,
  },
  {
    id: 3,
    title: "Alpine Majesty",
    desc: "Private retreats amidst the breathtaking, snow-capped Himalayas.",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?q=85&w=1000&auto=format&fit=crop",
    tag: "The Himalayas",
    span: 1,
  }
];

export default function Destinations() {
  return (
    <section id="destinations" className="section" style={{ background: "var(--bg-tertiary)", padding: "10rem 0", position: "relative" }}>
      <div className="container-narrow" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "8rem" }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow" style={{ marginBottom: "2rem" }}>Unrivaled Landscapes</p>
          <h2 className="heading-serif" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "2rem" }}>
            The India <br /> <span style={{ fontStyle: "italic", color: "var(--teal-dark)" }}>Collection.</span>
          </h2>
          <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Embark on a curated voyage through the subcontinent’s most iconic and elusive luxury sanctuaries.
          </p>
        </motion.div>
      </div>

      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {dests.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              position: "relative", 
              height: "75vh", 
              gridColumn: d.span === 2 ? "span 2" : "span 1",
              overflow: "hidden", 
              cursor: "pointer" 
            }}
            className="img-container"
          >
            <Image 
              src={d.img} 
              alt={d.title} 
              fill 
              style={{ objectFit: "cover" }} 
              className="img-hover-scale"
              unoptimized={true}
            />
            {/* Subtle dark overlay behind text to enforce reading contrast */}
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)", pointerEvents: "none" }} />
            
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "4vw", display: "flex", flexDirection: "column", color: "#FFFFFF" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "2rem", marginBottom: "2rem" }}>
                <div>
                  <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem", display: "block" }}>{d.tag}</span>
                  <h3 className="heading-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}>{d.title}</h3>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Explore 
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" style={{ width: 14, height: 14 }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              
              <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,0.8)", maxWidth: "500px" }}>
                {d.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", marginTop: "6rem" }}>
        <a href="/#contact" className="btn-outline" style={{ borderColor: "var(--teal-dark)", color: "var(--teal-dark)" }}>
          View Full Collection
        </a>
      </div>
    </section>
  );
}
