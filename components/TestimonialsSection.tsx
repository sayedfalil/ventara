"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type Testimonial = {
  id: number;
  client_name: string;
  client_role: string;
  client_company: string;
  body: string;
  rating: number;
  image_url: string;
  package_name: string;
};

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  // Auto-advance
  useEffect(() => {
    if (items.length <= 1) return;
    intervalRef.current = setInterval(() => setActive(a => (a + 1) % items.length), 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [items.length]);

  const go = (idx: number) => {
    setActive(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setActive(a => (a + 1) % items.length), 5500);
  };

  if (items.length === 0) return null;

  const t = items[active];

  return (
    <section style={{ background: "var(--bg-secondary)", padding: "clamp(5rem, 12vw, 9rem) 0", overflow: "hidden" }}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p className="eyebrow" style={{ color: "var(--teal)", marginBottom: "1rem" }}>Client Stories</p>
          <h2 className="heading-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-primary)", lineHeight: 1.15 }}>
            Journeys That <span style={{ fontStyle: "italic", color: "var(--teal-dark)" }}>Transformed Lives.</span>
          </h2>
        </motion.div>

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          {/* Card */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              boxShadow: "0 8px 40px rgba(13,59,77,0.07)",
              position: "relative",
            }}
          >
            {/* Quote mark */}
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "5rem", color: "var(--teal-accent)", opacity: 0.25, lineHeight: 0.7, marginBottom: "1.5rem", userSelect: "none" }}>"</div>

            {/* Stars */}
            <div style={{ marginBottom: "1.5rem", color: "#f0ad00", fontSize: "1rem", letterSpacing: 3 }}>
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>

            {/* Body */}
            <p style={{
              fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
              color: "var(--text-primary)", lineHeight: 1.75, fontWeight: 400,
              fontStyle: "italic", marginBottom: "2.5rem",
            }}>
              {t.body}
            </p>

            {/* Client info */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              {t.image_url ? (
                <img src={t.image_url} alt={t.client_name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border)", flexShrink: 0 }} />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--teal-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontFamily: "var(--font-serif)", fontSize: "1.25rem" }}>{t.client_name.charAt(0)}</span>
                </div>
              )}
              <div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>{t.client_name}</div>
                {(t.client_role || t.client_company) && (
                  <div style={{ fontSize: "0.78rem", color: "var(--text-light)", marginTop: "0.2rem" }}>
                    {[t.client_role, t.client_company].filter(Boolean).join(" · ")}
                  </div>
                )}
                {t.package_name && (
                  <div style={{ marginTop: "0.3rem" }}>
                    <span style={{ padding: "2px 10px", background: "rgba(20,106,119,0.08)", color: "var(--teal-dark)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }}>
                      {t.package_name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Dots navigation */}
          {items.length > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "2rem" }}>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  style={{
                    width: i === active ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === active ? "var(--teal)" : "var(--border)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.35s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}

          {/* Prev/Next arrows */}
          {items.length > 1 && (
            <>
              {[
                { dir: -1, label: "←", side: "left" },
                { dir: 1,  label: "→", side: "right" },
              ].map(({ dir, label, side }) => (
                <button
                  key={side}
                  onClick={() => go((active + dir + items.length) % items.length)}
                  style={{
                    position: "absolute" as const,
                    top: "50%",
                    [side]: "-3.5rem",
                    transform: "translateY(-50%)",
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.color = "var(--teal)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                >
                  {label}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
