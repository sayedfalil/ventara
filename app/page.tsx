"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Journeys from "@/components/Journeys";
import Approach from "@/components/Approach";
import Experiences from "@/components/Experiences";
import Stories from "@/components/Stories";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose lenis instance globally for GSAP ScrollTrigger
    (window as any).lenis = lenisRef.current;

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <main style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Ventara Global",
            "image": "https://www.ventaraglobal.com/logo.png",
            "@id": "https://www.ventaraglobal.com",
            "url": "https://www.ventaraglobal.com",
            "telephone": "+91 8921 2480 55",
            "priceRange": "$$$$",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            }
          })
        }}
      />
      <Navbar />
      <Hero />
      <Journeys />
      <Approach />
      <Experiences />
      <Stories />
      {/* SEO Optimized Context & Destinative Hub */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="heading-serif" style={{ fontSize: "2.5rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>
              The Pinnacle of Bespoke India Travel
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
              Ventara Global is India's leading boutique travel agency, specializing in ultra-luxury, custom-tailored itineraries across majestic landscapes. From opulent palace stays during a <strong>Rajasthan heritage tour</strong> to drifting along emerald waters on a <strong>luxury houseboat in Kerala</strong>, we curate moments of exquisite exclusivity.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
            <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "2px", border: "1px solid var(--border)" }}>
              <h3 className="heading-serif" style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Kashmir & The Himalayas</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Experience the "Heaven on Earth" with our <strong>luxury Kashmir tour packages</strong>. Private shikara rides on Dal Lake, 5-star ski resorts in Gulmarg, and exclusive Himalayan glamping.
              </p>
              <a href="/packages" style={{ fontSize: "0.8rem", color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Explore Mountains →</a>
            </div>
            
            <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "2px", border: "1px solid var(--border)" }}>
              <h3 className="heading-serif" style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Kerala Backwaters</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Discover our signature <strong>bespoke Kerala honeymoon</strong> packages. Private luxury houseboats, Ayurvedic wellness retreats in Munnar, and elite coastal experiences.
              </p>
              <a href="/packages" style={{ fontSize: "0.8rem", color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Explore Backwaters →</a>
            </div>

            <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "2px", border: "1px solid var(--border)" }}>
              <h3 className="heading-serif" style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Royal Rajasthan</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Step into grandeur with a <strong>private Rajasthan palace tour</strong>. Stay in royal heritage hotels in Jaipur and Udaipur, with private tiger safaris in Ranthambore.
              </p>
              <a href="/packages" style={{ fontSize: "0.8rem", color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Explore Palaces →</a>
            </div>
          </div>

          <div style={{ padding: "4rem", background: "#fff", borderRadius: "2px", border: "1px solid var(--border)" }}>
            <h2 className="heading-serif" style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "2rem", textAlign: "center" }}>Frequently Asked Questions</h2>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What destinations does Ventara Global specialize in?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We specialize in ultra-luxury, bespoke itineraries across India, with primary focuses on Kerala, Kashmir, Rajasthan, Goa, the Himalayas, and the Andaman Islands."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are your luxury India tour packages customizable?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Every journey is a singular creation. We do not use templates; each itinerary is hand-crafted exclusively for your preferences."
                  }
                }
              ]
            }) }} />
            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>What destinations does Ventara Global specialize in?</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>We specialize in ultra-luxury, bespoke itineraries across India, with primary focuses on Kerala, Kashmir, Rajasthan, Goa, the Himalayas, and the Andaman Islands.</p>
            </div>
            <div>
              <h4 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>Are your luxury India tour packages customizable?</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Absolutely. Every journey is a singular creation. We do not use templates; each itinerary is hand-crafted exclusively for your preferences, ensuring a private, 5-star experience.</p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
