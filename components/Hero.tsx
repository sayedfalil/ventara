"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      
      {/* Video Background */}
      <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", y, opacity, zIndex: 0, backgroundColor: "#E6F0F4", overflow: "hidden" }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        >
          <source src="/coverr-hiking-through-the-mountains-1755-1080p.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.95) 100%)", zIndex: 1, pointerEvents: "none" }} />
      </motion.div>

      <div className="container" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-end", paddingBottom: "10vh" }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "1200px" }}
        >
          <p className="eyebrow" style={{ color: "var(--teal-dark)", marginBottom: "2rem" }}>
            The Architecture of Luxury
          </p>

          <h1 className="heading-serif" style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)", lineHeight: 0.95, color: "var(--text-primary)", marginBottom: "3rem" }}>
            Beyond the <br /> <span style={{ fontStyle: "italic", fontWeight: 300, paddingLeft: "10vw", color: "var(--teal-dark)" }}>Extraordinary.</span>
          </h1>

          <div style={{ display: "flex", gap: "5rem", alignItems: "flex-end", flexWrap: "wrap" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.6, color: "var(--text-secondary)", maxWidth: "450px" }}>
              Private, meticulously curated journeys through India's most breathtaking masterpieces. Discover an elegance reserved for the few.
            </p>
            
            <a href="#destinations" className="btn-primary">
              Begin Journey
            </a>
          </div>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ position: "absolute", bottom: "40px", right: "4vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
      >
        <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, var(--teal-dark))" }} />
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-secondary)", writingMode: "vertical-rl" }}>SCROLL</span>
      </motion.div>
    </section>
  );
}
