import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kerala Luxury Backwater Packages | Ventara Global',
  description: 'Embark on an exclusive journey with our Kerala luxury backwater packages. Experience private houseboats, boutique wellness resorts, and unparalleled luxury with Ventara Global.',
};

export default function KeralaLuxuryBackwater() {
  const jsonLdTouristTrip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Kerala Luxury Backwater Packages",
    "description": "Premium backwater and coastal journey through Kerala, designed for ultra-luxury travelers featuring private houseboats and 5-star wellness retreats.",
    "provider": {
      "@type": "TravelAgency",
      "name": "Ventara Global"
    }
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What exactly do these Kerala luxury backwater packages include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "They include stays on highly exclusive private houseboats (Kettuvallams), private chauffeured transfers, curated culinary experiences, and premium Ayurvedic wellness sessions."
        }
      },
      {
        "@type": "Question",
        "name": "How long is the ideal backwater luxury tour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend at least 5 nights and 6 days to fully immerse yourself in Kochi's heritage, Kumarakom's backwaters, and Marari's private beaches without rushing."
        }
      },
      {
        "@type": "Question",
        "name": "Are the houseboats fully private and air-conditioned?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our selected vessels are fully private, premium air-conditioned suites floating on the water, staffed by a dedicated captain, private chef, and personal butler."
        }
      },
      {
        "@type": "Question",
        "name": "Can I combine this with a mountain retreat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certainly. Many of our elite clients pair the backwaters with the tea estates of Munnar, or choose entirely different altitudes via our Kashmir tour packages."
        }
      },
      {
        "@type": "Question",
        "name": "Is the menu customizable to dietary preferences?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your private chef will prepare bespoke meals ranging from authentic Kerala Syrian Christian cuisine to international gourmet dishes, precisely to your dietary requirements."
        }
      }
    ]
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ventaraglobal.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kerala Luxury Backwater Packages",
        "item": "https://www.ventaraglobal.com/kerala-luxury-backwater-packages"
      }
    ]
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTouristTrip) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      
      <Navbar />

      {/* Hero Section */}
      <section style={{ height: '50vh', backgroundColor: 'var(--teal-deep)', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: '3rem' }}>
        <div className="container relative z-10">
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text-primary)', marginBottom: '1rem', maxWidth: '900px' }}>
            Kerala Luxury Tour Packages – God's Own Country
          </h1>
        </div>
      </section>

      <section className="container" style={{ padding: '6rem 0', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Overview */}
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Drift into profound tranquility. The lush landscapes of Southern India demand to be experienced through our definitive <strong>Kerala luxury backwater packages</strong>. Designed for those who seek uncompromising exclusivity, this journey replaces crowded tourist trails with private access to serene palm-fringed canals, elite wellness sanctuaries, and heritage luxury.
          </p>
          <p>
            When you select our Kerala luxury backwater packages, you are not simply securing accommodation; you are guaranteeing an environment of total absolute privacy. Sail aboard handcrafted wooden vessels equipped with modern luxuries and your own private chef. Should you seek to contrast these tropical climates with the snow-capped north, explore our <a href="/kashmir-luxury-tour-packages-from-kerala" style={{ color: 'var(--teal)' }}>Kashmir luxury tour packages from Kerala</a> or read our analytical guide on <a href="/blog/kerala-vs-kashmir-which-to-visit-first" style={{ color: 'var(--teal)' }}>Kerala vs. Kashmir</a> to decide your next elite getaway.
          </p>
        </div>

        {/* Why Ventara Global */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Why Ventara Global</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Ventara Global is synonymous with flawless execution. In a region celebrated but often busy, we carve out secluded corridors of peace exclusively for our clients. We partner strictly with boutique, high-end properties that meet our stringent standards for opulence and discretion. You will travel in premium German automobiles, guided by local experts whose knowledge transcends standard guidebooks, offering a culturally immersive yet deeply private experience.
          </p>
        </div>

        {/* Itinerary */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Sample Itinerary Overview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { day: 'Day 1', title: 'Arrival in Kochi', desc: 'Private tarmac greeting at Kochi International Airport. Transfer to a restored heritage luxury hotel in Fort Kochi. Sunset cruise on a private yacht.' },
              { day: 'Day 2', title: 'The Heritage of Spice', desc: 'A bespoke walking tour of Fort Kochi with a local historian. Evening private classical Kathakali performance, followed by fine dining.' },
              { day: 'Day 3', title: 'The Royal Backwaters', desc: 'Transfer to Kumarakom. Board your exclusive, ultra-luxury private houseboat. Cruise the immense Lake Vembanad as your chef prepares a multi-course dinner.' },
              { day: 'Day 4', title: 'Awakening on the Water', desc: 'Wake up to the sounds of nature. Disembark at a premium resort nestled deep in the backwater canals. Engage in an authentic Ayurvedic spa treatment.' },
              { day: 'Day 5', title: 'Marari Coastal Retreat', desc: 'Short drive to Mararikulam. Unwind at a secluded pool villa overlooking the Arabian Sea.' },
              { day: 'Day 6', title: 'Departure', desc: 'Leisurely breakfast before your private chauffeur navigates you back to Kochi for your onward flight.' }
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: '2px solid var(--teal)', paddingLeft: '1.5rem' }}>
                <h3 className="heading-serif" style={{ color: 'var(--text-primary)', fontSize: '1.3rem' }}><span style={{ color: 'var(--teal)' }}>{item.day}:</span> {item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '4px' }}>
          <div>
            <h3 className="heading-serif" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Inclusions</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1rem' }}>
              <li>Premium or First-class airport assistance</li>
              <li>Stays at globally acclaimed 5-star properties</li>
              <li>Exclusive 1-bedroom luxury houseboat charter</li>
              <li>Signature wellness & spa treatments included</li>
              <li>24/7 dedicated Ventara Global Concierge</li>
            </ul>
          </div>
          <div>
            <h3 className="heading-serif" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Exclusions</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1rem' }}>
              <li>International or domestic flight tickets</li>
              <li>Alcoholic beverages and vintage wines</li>
              <li>Gratuities and personal expenditures</li>
            </ul>
          </div>
        </div>

        {/* Best Time to Visit */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Best Time to Visit</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            The prime window to experience the backwaters is between October and March. During this period, the climate is remarkably temperate, with low humidity and tranquil waters, creating the perfect canvas for your private cruise and coastal relaxation. 
          </p>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jsonLdFAQ.mainEntity.map((q, idx) => (
              <div key={idx} style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem' }}>{q.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem', background: 'var(--teal-dark)', padding: '4rem 2rem', borderRadius: '4px' }}>
          <h2 className="heading-serif" style={{ color: '#fff', fontSize: '2.2rem', marginBottom: '1rem' }}>Begin Your Legacy</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Ready to sail into tranquility? Reach out to our travel architects and craft a journey beyond the ordinary.
          </p>
          <a href="/#enquire" className="btn-primary" style={{ display: 'inline-block' }}>Request a Private Consultation</a>
        </div>

      </section>

      <Footer />
    </main>
  );
}
