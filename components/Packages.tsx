"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

type Package = {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  tag: string;
  highlights: string;
  is_featured: number;
};

const PLACEHOLDERS = [
  {
    id: "ph1",
    tag: "Kerala",
    title: "Backwaters Luxury Voyage",
    duration: "7–10 Days",
    price: "From $5,900",
    gradient: "linear-gradient(145deg, #0d3d47 0%, #1c5f6b 55%, #1a7a8a 100%)",
  },
  {
    id: "ph2",
    tag: "Rajasthan",
    title: "Royal Desert Expedition",
    duration: "10–14 Days",
    price: "From $8,500",
    gradient: "linear-gradient(145deg, #0b3340 0%, #155262 55%, #1b6d7d 100%)",
  },
  {
    id: "ph3",
    tag: "Himalayas",
    title: "Alpine Serenity Retreat",
    duration: "12–15 Days",
    price: "From $12,000",
    gradient: "linear-gradient(145deg, #0c3845 0%, #175d6e 55%, #1c7888 100%)",
  },
];

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        setPackages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="packages"
      style={{ background: "var(--bg-secondary)", padding: "10rem 0", position: "relative" }}
    >
      {/* Section header */}
      <div
        className="container-narrow"
        style={{ textAlign: "center", marginBottom: "8rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow" style={{ marginBottom: "2rem" }}>
            Curated Journeys
          </p>
          <h2
            className="heading-serif"
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              marginBottom: "2rem",
            }}
          >
            Exclusive <br />
            <span style={{ fontStyle: "italic", color: "var(--teal-dark)" }}>
              Packages.
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Each journey is meticulously curated to deliver an unparalleled
            luxury experience across India's most iconic destinations.
          </p>
        </motion.div>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center", paddingBottom: "4rem" }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: "2px solid var(--teal)",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "pkg-spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes pkg-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Placeholder cards — shown when no packages exist */}
      {!loading && packages.length === 0 && (
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {PLACEHOLDERS.map((ph, i) => (
            <motion.div
              key={ph.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{
                background: ph.gradient,
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
                minHeight: "540px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "3rem",
                cursor: "default",
              }}
            >
              {/* Watermark V shape */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.06,
                  pointerEvents: "none",
                }}
              >
                <img src="/logo.png" alt="Watermark" style={{ width: "85%", height: "85%", objectFit: "contain" }} />
              </div>

              {/* Shimmer overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Coming Soon badge */}
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  right: "2rem",
                  padding: "6px 18px",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                  borderRadius: "2px",
                }}
              >
                Coming Soon
              </div>

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <span
                  className="eyebrow"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "1.5rem",
                    display: "block",
                  }}
                >
                  {ph.tag}
                </span>
                <h3
                  className="heading-serif"
                  style={{
                    fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                    color: "#fff",
                    marginBottom: "2rem",
                    lineHeight: 1.2,
                  }}
                >
                  {ph.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "2.5rem",
                    marginBottom: "2rem",
                    borderTop: "1px solid rgba(255,255,255,0.18)",
                    paddingTop: "1.5rem",
                  }}
                >
                  <div>
                    <span
                      className="eyebrow"
                      style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.55rem" }}
                    >
                      Duration
                    </span>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.95)",
                        marginTop: "0.5rem",
                        fontWeight: 300,
                        fontSize: "0.95rem",
                      }}
                    >
                      {ph.duration}
                    </p>
                  </div>
                  <div>
                    <span
                      className="eyebrow"
                      style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.55rem" }}
                    >
                      Starting From
                    </span>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.95)",
                        marginTop: "0.5rem",
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.05rem",
                      }}
                    >
                      {ph.price}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: "2.5rem",
                  }}
                >
                  An extraordinary journey is being curated especially for the
                  discerning traveler. Reserve your place today.
                </p>
                <a
                  href="/#contact"
                  className="btn-outline"
                  style={{
                    borderColor: "rgba(255,255,255,0.35)",
                    color: "#fff",
                    display: "inline-flex",
                  }}
                >
                  Express Interest
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Real package cards */}
      {!loading && packages.length > 0 && (
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {packages.map((pkg, i) => {
            let highlights: string[] = [];
            try {
              highlights = JSON.parse(pkg.highlights);
            } catch {
              highlights = [];
            }

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="img-container"
                style={{
                  background: "var(--bg-primary)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <Link href={`/packages/${pkg.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Image */}
                <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                  <Image
                    src={pkg.image_url}
                    alt={pkg.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="img-hover-scale"
                    unoptimized
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)",
                    }}
                  />
                  <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
                    <span
                      className="eyebrow"
                      style={{
                        padding: "5px 14px",
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--teal-deep)",
                        borderRadius: "2px",
                        fontSize: "0.55rem",
                      }}
                    >
                      {pkg.tag}
                    </span>
                  </div>
                  {pkg.is_featured === 1 && (
                    <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
                      <span
                        className="eyebrow"
                        style={{
                          padding: "5px 14px",
                          background: "var(--teal)",
                          color: "#fff",
                          borderRadius: "2px",
                          fontSize: "0.55rem",
                        }}
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div
                  style={{
                    padding: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <h3
                    className="heading-serif"
                    style={{
                      fontSize: "clamp(1.5rem, 2vw, 2rem)",
                      color: "var(--text-primary)",
                      marginBottom: "1.2rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {pkg.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: "2.5rem",
                      marginBottom: "1.5rem",
                      paddingBottom: "1.5rem",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <span
                        className="eyebrow"
                        style={{ fontSize: "0.55rem", color: "var(--text-light)" }}
                      >
                        Duration
                      </span>
                      <p
                        style={{
                          color: "var(--text-primary)",
                          marginTop: "0.4rem",
                          fontSize: "0.95rem",
                        }}
                      >
                        {pkg.duration}
                      </p>
                    </div>
                    <div>
                      <span
                        className="eyebrow"
                        style={{ fontSize: "0.55rem", color: "var(--text-light)" }}
                      >
                        Starting From
                      </span>
                      <p
                        style={{
                          color: "var(--teal-dark)",
                          marginTop: "0.4rem",
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.05rem",
                        }}
                      >
                        {pkg.price}
                      </p>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: "var(--text-secondary)",
                      marginBottom: "2rem",
                      flexGrow: 1,
                    }}
                  >
                    {pkg.description}
                  </p>

                  {highlights.length > 0 && (
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}
                    >
                      {highlights.slice(0, 4).map((h, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: "4px 12px",
                            background: "rgba(28,95,107,0.07)",
                            color: "var(--teal-dark)",
                            fontSize: "0.68rem",
                            letterSpacing: "0.06em",
                            borderRadius: "2px",
                            fontWeight: 500,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{ textAlign: "center", justifyContent: "center", marginTop: "auto" }}
                  >
                    <span className="btn-primary" style={{ display: "inline-flex" }}>View Details</span>
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginTop: "6rem" }}>
        <Link
          href="/packages"
          className="btn-outline"
          style={{ borderColor: "var(--teal-dark)", color: "var(--teal-dark)" }}
        >
          View All Packages
        </Link>
      </div>
    </section>
  );
}
