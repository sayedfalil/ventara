"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Curation() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="curation" ref={ref} className="section" style={{ background: "var(--bg-primary)", padding: "12rem 0" }}>
      <style>{`
        .curation-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .curation-images {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .curation-content {
          padding-left: 4rem;
        }
        .curation-stats {
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 3rem; 
          border-top: 1px solid var(--border); 
          padding-top: 3rem;
        }
        @media (max-width: 900px) {
          .curation-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .curation-images {
            display: none;
          }
          .curation-content {
            padding-left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .curation-line-container {
            justify-content: center;
          }
          .curation-stats {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
      <div className="container curation-grid">
        <div className="curation-images">
          
          <motion.div style={{ position: "absolute", width: "65%", height: "70%", top: "5%", left: 0, y: imgY1, zIndex: 2 }} className="img-container">
            <Image 
              src="https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1200&auto=format&fit=crop" // Taj Mahal detailed architecture
              alt="Intricate Indian Architecture"
              fill
              className="img-hover-scale"
              style={{ objectFit: "cover" }}
              unoptimized={true}
            />
          </motion.div>

          <motion.div style={{ position: "absolute", width: "55%", height: "60%", bottom: "5%", right: 0, y: imgY2, zIndex: 1 }} className="img-container">
            <Image 
              src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=85&w=1000&auto=format&fit=crop" // Kerala Backwaters luxury
              alt="Serene Kerala Backwaters"
              fill
              className="img-hover-scale"
              style={{ objectFit: "cover" }}
              unoptimized={true}
            />
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="curation-content"
        >
          <div className="curation-line-container" style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "3rem" }}>
            <div style={{ width: "60px", height: "1px", background: "var(--teal-dark)" }} />
            <span className="eyebrow">The Vantara Standard</span>
          </div>

          <h2 className="heading-serif" style={{ fontSize: "clamp(3rem, 5vw, 4.8rem)", lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "3rem" }}>
            Mastering the art of <br /> <span style={{ fontStyle: "italic", color: "var(--teal-dark)" }}>incomparable</span> escapes.
          </h2>

          <p style={{ fontSize: "1.2rem", fontWeight: 300, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "550px" }}>
            We approach travel as an art form. By intertwining the opulent heritage of India with ultra-modern luxury, Vantara Global designs itineraries that transcend imagination.
          </p>

          <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--text-light)", marginBottom: "4rem", maxWidth: "500px" }}>
            Whether it's a private candlelit dinner overlooking a 400-year-old fort, or a chartered houseboat slicing through the emerald lagoons of Kerala—every moment is flawlessly orchestrated.
          </p>

          <div className="curation-stats">
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--text-primary)", lineHeight: 1, marginBottom: "0.5rem" }}>
                100<span style={{ color: "var(--teal-dark)", fontSize: "1.5rem", fontStyle: "italic" }}>%</span>
              </div>
              <div className="eyebrow" style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>Bespoke Curation</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--text-primary)", lineHeight: 1, marginBottom: "0.5rem" }}>
                24<span style={{ color: "var(--teal-dark)", fontSize: "1.5rem", fontStyle: "italic" }}>/7</span>
              </div>
              <div className="eyebrow" style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>Private Concierge</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
