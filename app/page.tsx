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
      <Contact />
      <Footer />
    </main>
  );
}
