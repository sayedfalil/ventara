import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const db = getDb();
  let pkg: any = null;
  try {
    const res = await db.execute({ sql: "SELECT title, description, image_url FROM packages WHERE id = ?", args: [Number(id)] });
    if (res.rows.length) pkg = res.rows[0];
  } catch (e) {}

  if (!pkg) return { title: "Package Not Found | Ventara Global" };

  const canonical = `https://www.ventaraglobal.com/packages/${pkg.id}`;

  return {
    title: `${pkg.title} | Ventara Global`,
    description: pkg.description,
    alternates: { canonical },
    openGraph: {
      title: `${pkg.title} | Ventara Global`,
      description: pkg.description,
      url: canonical,
      images: [pkg.image_url],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.title,
      description: pkg.description,
      images: [pkg.image_url]
    }
  };
}

export async function generateStaticParams() {
  const db = getDb();
  let ids: any[] = [];
  try {
    const res = await db.execute("SELECT id FROM packages");
    ids = res.rows;
  } catch (e) {
    console.error("Failed to generate static params:", e);
  }
  return ids.map((row) => ({ id: String(row.id) }));
}

export const dynamicParams = true;
export const revalidate = 3600;

export default async function PackageDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  let pkg: any = null;
  try {
    const res = await db.execute({ sql: "SELECT * FROM packages WHERE id = ?", args: [Number(id)] });
    if (res.rows.length) pkg = res.rows[0];
  } catch (e) {
    console.error("Failed to fetch package:", e);
  }

  if (!pkg) return notFound();

  let itineraryArr: any[] = [];
  let whatsIncludedArr: string[] = [];
  let thingsToCarryArr: string[] = [];

  try { itineraryArr = JSON.parse(pkg.itinerary || "[]"); } catch {}
  try { whatsIncludedArr = JSON.parse(pkg.whats_included || "[]"); } catch {}
  try { thingsToCarryArr = JSON.parse(pkg.things_to_carry || "[]"); } catch {}

  const safeImageUrl = pkg.image_url
    ? (pkg.image_url.startsWith("http") || pkg.image_url.startsWith("/") ? pkg.image_url : `/${pkg.image_url}`)
    : "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop";

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": pkg.title,
        "description": pkg.description,
        "image": safeImageUrl,
        "offers": { "@type": "Offer", "price": (pkg.price || "0").replace(/[^0-9.]/g, ""), "priceCurrency": "INR" },
        "brand": { "@type": "Brand", "name": "Ventara Global" }
      }) }} />
      <div style={{ position: "absolute", zIndex: 50, width: "100%" }}>
        <Navbar />
      </div>

      {/* Banner */}
      <section className="pkg-hero">
        {/* Force next/image to behave flawlessly even with raw uploads */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image 
            src={safeImageUrl} 
            alt={pkg.title} 
            fill 
            style={{ objectFit: "cover", opacity: 0.85 }} 
            unoptimized 
            priority 
          />
        </div>
        
        {/* Luxury dark overlay lock - guarantees white text visibility and merges gracefully */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: "linear-gradient(to top, rgba(14, 38, 44, 0.95) 0%, rgba(14, 38, 44, 0.4) 60%, rgba(0,0,0,0.2) 100%)" 
        }} />
        
        <div className="container relative z-10 pkg-hero-content">
          <div style={{ maxWidth: "800px" }}>
            <span className="eyebrow" style={{ color: "var(--teal-dark)", background: "rgba(255,255,255,0.95)", padding: "6px 14px", borderRadius: "2px", fontWeight: 600, letterSpacing: "0.15em" }}>
              {pkg.tag || "LUXURY PACKAGE"}
            </span>
            <h1 className="heading-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginTop: "1.5rem", marginBottom: "1.2rem", color: "#ffffff", textShadow: "0 2px 10px rgba(0,0,0,0.3)", lineHeight: 1.15 }}>
              {pkg.title}
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
              {pkg.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container pkg-grid">
        
        {/* Left Content */}
        <div>
          
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

        </div>

        {/* Right Sidebar */}
        <div>
          <div className="pkg-sidebar">
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

              <a href="/#enquire" className="btn-primary" style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                Book This Package
              </a>
            </div>

            <div style={{ background: "var(--teal-dark)", color: "#fff", padding: "2.5rem", borderRadius: "4px" }}>
              <h3 className="heading-serif" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Need Help? <br/>Call Us</h3>
              <p style={{ opacity: 0.9, marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Our travel experts are ready to personalize this package for you.
              </p>
              <p style={{ fontSize: "1.4rem", fontWeight: 400, letterSpacing: "1px", marginBottom: "1.5rem" }}>
                +91 8921 2480 55
              </p>
              <a href="mailto:Info@ventaraglobal.com" style={{ color: "var(--teal)", textDecoration: "underline", fontSize: "0.9rem" }}>
                Info@ventaraglobal.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .pkg-hero {
          position: relative;
          height: 70vh;
          min-height: 550px;
          background-color: var(--teal-deep);
          overflow: hidden;
        }
        .pkg-hero-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          height: 100%;
          padding-bottom: 5rem;
          padding-top: 140px;
        }
        .pkg-grid {
          padding: 6rem 0;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
        }
        .pkg-sidebar {
          position: sticky;
          top: 8rem;
        }
        @media (max-width: 992px) {
          .pkg-hero { height: auto; min-height: 95vh; }
          .pkg-hero-content { 
            align-items: center; 
            text-align: center; 
            padding-top: 260px; /* Safely clear huge extended Navbar logo */
            padding-bottom: 4rem; 
          }
          .pkg-grid { grid-template-columns: 1fr; gap: 3rem; padding: 4rem 0; }
          .pkg-sidebar { position: static; }
        }
      `}</style>
    </main>
  );
}
