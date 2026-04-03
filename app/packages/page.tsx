import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive Luxury Tour Packages – India | Ventara Global",
  description: "Explore handcrafted luxury tour packages to Kerala, Kashmir and Rajasthan. Fully bespoke. Built for discerning travellers worldwide.",
};

export const revalidate = 60;

export default async function PackagesPage() {
  const db = getDb();
  let packages: any[] = [];
  try {
    const res = await db.execute("SELECT * FROM packages ORDER BY is_featured DESC, id DESC LIMIT 20");
    packages = res.rows;
  } catch (e) {
    console.error("Failed to fetch packages:", e);
  }

  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      
      {/* Banner */}
      <section style={{ 
        position: "relative", 
        paddingTop: "12rem", 
        paddingBottom: "8rem",
        backgroundColor: "var(--teal-dark)",
        color: "#fff",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
          <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" alt="Packages Banner" fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--teal-deep), transparent)" }} />
        
        <div className="container relative z-10 text-center">
          <div>
            <h1 className="heading-serif" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginBottom: "1rem" }}>Holiday Packages</h1>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, opacity: 0.9 }}>Customized holiday packages for all</p>
          </div>
        </div>
      </section>

      {/* Services Context */}
      <section className="container" style={{ padding: "8rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <h2 className="heading-serif" style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
              Holiday Packages Service
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Explore the world with our personalized Holiday Packages, tailored for families, honeymooners, solo travelers, and adventure seekers. Our packages include flights, hotel stays, sightseeing tours, and meals, making your travel planning seamless and enjoyable.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              We create travel experiences that match your interests and budget—ensuring a stress-free holiday filled with unforgettable moments.
            </p>
          </div>
          
          <div style={{ background: "var(--bg-secondary)", padding: "3rem", borderRadius: "4px" }}>
            <h3 className="heading-serif" style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "var(--text-primary)" }}>Why Choose Our Service</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Customized tour packages with full itinerary",
                "Flights, hotels, local transportation, and meals included",
                "Sightseeing and activities tailored to your preferences",
                "Optional travel insurance and visa services",
                "Budget, luxury, and themed travel options"
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                  <span style={{ color: "var(--teal)", fontSize: "1.2rem" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "var(--bg-secondary)", padding: "8rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2 className="heading-serif" style={{ fontSize: "2.5rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Planning your perfect getaway has never been easier!</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>Follow these simple steps or rely on our world-class support to book your next adventure.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { title: "24/7 Support", desc: "Get 24/7 help with bookings, changes, or questions. We're always here to make travel easy." },
              { title: "Expert Assistance", desc: "Expert travel advisors help you at each step. Support for visas, bookings, and much more." },
              { title: "Travel Date Reminders", desc: "Stay on track with timely reminders. We manage your travel plans so you won't miss a thing." },
              { title: "Important Updates", desc: "Get real-time alerts on flights, travel rules, and safety. Stay informed for a smoother journey." },
              { title: "One-on-One Consultation", desc: "Chat with travel experts to plan your trip. Get custom advice that fits your needs and budget." },
              { title: "Connect with Travelers", desc: "Join our travel community to meet explorers. Share stories, tips, and build new friendships." }
            ].map((f, i) => (
              <div key={i} style={{ background: "#fff", padding: "2.5rem", borderRadius: "4px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid var(--border)" }}>
                <h4 className="heading-serif" style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "1rem" }}>{f.title}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="container" style={{ padding: "8rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h2 className="heading-serif" style={{ fontSize: "3rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Discover Our Packages</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Discover breathtaking destinations, explore vibrant cities, relax on stunning beaches, and create unforgettable travel memories.
          </p>
        </div>

        {packages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "8rem 2rem", background: "var(--bg-secondary)", borderRadius: "2px", border: "1px solid var(--border)" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(28,95,107,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "1.5rem" }}>✦</div>
            <h2 className="heading-serif" style={{ fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Coming Soon</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>We are currently crafting extraordinary luxury packages. Please enquire for a bespoke itinerary.</p>
            <a href="/#enquire" className="btn-primary" style={{ display: "inline-flex" }}>Enquire Now</a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
            {packages.map((pkg, i) => (
              <div key={pkg.id} style={{ background: "var(--bg-primary)", borderRadius: "2px", overflow: "hidden", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: "240px" }}>
                  <Image src={pkg.image_url} alt={pkg.title} fill style={{ objectFit: "cover" }} className="img-hover-scale" unoptimized />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)" }} />
                  <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}>
                    <span className="eyebrow" style={{ padding: "5px 14px", background: "rgba(255,255,255,0.92)", color: "var(--teal-deep)", borderRadius: "2px", fontSize: "0.55rem" }}>
                      {pkg.tag}
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", flexGrow: 1, textAlign: "center", alignItems: "center" }}>
                  <h3 className="heading-serif" style={{ fontSize: "1.6rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{pkg.title}</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "2rem" }}>{pkg.duration}</p>
                  
                  <Link href={`/packages/${pkg.id}`} style={{
                    marginTop: "auto",
                    padding: "12px 32px",
                    border: "1px solid var(--teal)",
                    color: "var(--teal-dark)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    transition: "all 0.3s",
                    textDecoration: "none"
                  }}
                  className="pkg-btn">
                    View More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
      <style>{`
        .pkg-btn:hover { background: var(--teal) !important; color: #fff !important; }
      `}</style>
    </main>
  );
}
