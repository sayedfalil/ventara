"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Destinations from "@/components/Destinations";
import Curation from "@/components/Curation";
import Packages from "@/components/Packages";
import EnquirySection from "@/components/EnquirySection";
import JournalSection from "@/components/JournalSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
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
      <Navbar scrollY={scrollY} />
      <Hero />
      <Philosophy />
      <Curation />
      <Destinations />
      <Packages />
      <JournalSection />
      <TestimonialsSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
