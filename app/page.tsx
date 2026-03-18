"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Curation from "@/components/Curation";
import Packages from "@/components/Packages";
import EnquirySection from "@/components/EnquirySection";
import JournalSection from "@/components/JournalSection";
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
      <Navbar scrollY={scrollY} />
      <Hero />
      <Curation />
      <Destinations />
      <Packages />
      <JournalSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
