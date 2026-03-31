"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Package = {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  tag: string;
  highlights: string;
  itinerary: string;
  whats_included: string;
  things_to_carry: string;
};

export default function PackageDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [scrollY, setScrollY] = useState(0);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch(`/api/packages/${resolvedParams.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setPkg(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  if (error) return notFound();

  let itineraryArr: any[] = [];
  let whatsIncludedArr: string[] = [];
  let thingsToCarryArr: string[] = [];

  if (pkg) {
    try { itineraryArr = JSON.parse(pkg.itinerary || "[]"); } catch {}
    try { whatsIncludedArr = JSON.parse(pkg.whats_included || "[]"); } catch {}
    try { thingsToCarryArr = JSON.parse(pkg.things_to_carry || "[]"); } catch {}
  }

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navbar scrollY={scrollY} />

      {loading || !pkg ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <div style={{ width: 40, height: 40, border: "2px solid var(--teal)", borderTopColor: "transparent", borderRadius: "50%", animation: "pkg-spin 0.8s linear infinite" }} />
          <style>{`@keyframes pkg-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <>
          {/* Banner */}
          <section style={{ 
            position: "relative", 
            height: "60vh",
            minHeight: "500px",
            backgroundColor: "var(--teal-dark)",
            color: "#fff",
            overflow: "hidden"
          }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <Image src={pkg.image_url} alt={pkg.title} fill style={{ objectFit: "cover" }} unoptimized />
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-primary), transparent 80%, rgba(0,0,0,0.5))" }} />
            
            <div className="container relative z-10" style={{ display: "flex", height: "100%", alignItems: "flex-end", paddingBottom: "4rem" }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="eyebrow" style={{ color: "var(--teal)", background: "rgba(255,255,255,0.9)", padding: "4px 12px", borderRadius: "2px" }}>
                  {pkg.tag}
                </span>
                <h1 className="heading-serif" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", marginTop: "1rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
                  {pkg.title}
                </h1>
                <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "var(--text-secondary)", maxWidth: "800px", lineHeight: 1.6 }}>
                  {pkg.description}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Main Content */}
          <section className="container" style={{ padding: "6rem 0", display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem" }}>
            
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              
              {/* Itinerary */}
              {itineraryArr && itineraryArr.length > 0 && (
                <div style={{ marginBottom: "4rem" }}>
                  <h2 className="heading-serif" style={{ fontSize: "2.2rem", color: "var(--text-primary)", marginBottom: "2rem" }}>Itinerary</h2>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {itineraryArr.map((item, idx) => (
                      <div key={idx} style={{ paddingLeft: "1.5rem", borderLeft: "2px solid var(--teal)", position: "relative" }}>
                        <div style={{ position: "absolute", left: "-8px", top: "10px", width: "14px", height: "14px", borderRadius: "50%", background: "var(--bg-primary)", border: "2px solid var(--teal)" }} />
                        <h4 className="heading-serif" style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                          <span style={{ color: "var(--teal)" }}>{item.day || `Day ${idx + 1}`} :</span> {item.title}
                        </h4>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              {whatsIncludedArr && whatsIncludedArr.length > 0 && (
                <div style={{ marginBottom: "4rem" }}>
                  <h2 className="heading-serif" style={{ fontSize: "2.2rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>What's Included</h2>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {whatsIncludedArr.map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                        <span style={{ color: "var(--teal)", marginTop: "2px" }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Things to Carry */}
              {thingsToCarryArr && thingsToCarryArr.length > 0 && (
                <div style={{ marginBottom: "4rem" }}>
                  <h2 className="heading-serif" style={{ fontSize: "2.2rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Things to Carry Before You Travel</h2>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {thingsToCarryArr.map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                        <span style={{ color: "var(--teal-dark)", marginTop: "2px" }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3 Easy Steps */}
              <div style={{ background: "var(--bg-secondary)", padding: "3rem", borderRadius: "4px", border: "1px solid var(--border)" }}>
                 <h2 className="heading-serif" style={{ fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Book Your Dream Trip in Just 3 Easy Steps!</h2>
                 <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Planning your perfect getaway has never been easier! Follow these simple steps.</p>
                 
                 <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                   <div>
                     <h4 className="heading-serif" style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>1. Choose Your Destination</h4>
                     <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Explore our curated list of destinations and select the perfect getaway.</p>
                   </div>
                   <div>
                     <h4 className="heading-serif" style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>2. Customize Your Package</h4>
                     <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Create a tailored travel experience with flights, hotels, and activities.</p>
                   </div>
                   <div>
                     <h4 className="heading-serif" style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>3. Confirm & Travel</h4>
                     <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Complete your booking process and get ready for an unforgettable journey.</p>
                   </div>
                 </div>
              </div>

            </motion.div>

            {/* Right Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ position: "sticky", top: "8rem" }}>
                <div style={{ background: "var(--bg-secondary)", padding: "2.5rem", borderRadius: "4px", border: "1px solid var(--border)", marginBottom: "2rem" }}>
                  <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "0.5rem" }}>Package Price</p>
                  <div style={{ fontSize: "1.8rem", color: "var(--teal-dark)", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" }}>{pkg.price}</div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <div style={{ padding: "10px", background: "rgba(28,95,107,0.08)", borderRadius: "50%", color: "var(--teal)" }}>
                      ⏱
                    </div>
                    <div>
                      <div className="eyebrow" style={{ fontSize: "0.6rem", color: "var(--text-light)" }}>Duration</div>
                      <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{pkg.duration}</div>
                    </div>
                  </div>

                  <a href="#contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Book This Package
                  </a>
                </div>

                <div style={{ background: "var(--teal-dark)", color: "#fff", padding: "2.5rem", borderRadius: "4px" }}>
                  <h3 className="heading-serif" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Need Help? <br/>Call Us</h3>
                  <p style={{ opacity: 0.9, marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Our travel experts are ready to personalize this package for you.
                  </p>
                  <p style={{ fontSize: "1.4rem", fontWeight: 400, letterSpacing: "1px", marginBottom: "1.5rem" }}>
                    +91 9995 074 441
                  </p>
                  <a href="mailto:info@travelasia247.com" style={{ color: "var(--teal)", textDecoration: "underline", fontSize: "0.9rem" }}>
                    info@travelasia247.com
                  </a>
                </div>
              </div>
            </motion.div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}
