"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section id="philosophy" className="section bg-teal-gradient" style={{ padding: "12rem 0", position: "relative" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem", alignItems: "center" }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <p style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--teal-accent)", marginBottom: "3rem" }}>
            <span style={{ width: "30px", height: "1px", background: "var(--teal-accent)" }}></span>
            Our Philosophy
          </p>
          <h2 className="heading-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.2, color: "var(--white)" }}>
            We don't sell tours. <br />
            We design <span style={{ fontStyle: "italic", color: "var(--teal-accent)" }}>life-defining</span> encounters.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--muted)" }}>
            Vantara Global was born from a singular belief — that India's most profound experiences are not found in brochures. They exist in the mist of a Himalayan sunrise, the silence of a Kerala backwater dawn, and the warmth of a royal welcome in the desert.
          </p>
          <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.9, color: "var(--muted)" }}>
            We are architects of the extraordinary, curating every detail of your luxury journey with obsessive precision and deep local knowledge. 
          </p>
          
          <div style={{ display: "flex", gap: "4rem", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--white)", lineHeight: 1 }}>
                24<span style={{ color: "var(--teal-accent)", fontSize: "2rem" }}>/7</span>
              </div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginTop: "10px" }}>Dedicated Concierge</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--white)", lineHeight: 1 }}>
                100<span style={{ color: "var(--teal-accent)", fontSize: "2rem" }}>%</span>
              </div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginTop: "10px" }}>Bespoke Styling</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
