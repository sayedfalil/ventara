import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kashmir Luxury Tour Packages from Kerala | Ventara Global',
  description: 'Experience unparalleled exclusivity with our Kashmir luxury tour packages from Kerala. Stay in private houseboats, soar over the Himalayas, and indulge in tailored itineraries. Let Ventara Global craft your legacy.',
};

export default function KashmirFromKerala() {
  const jsonLdTouristTrip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Kashmir Luxury Tour Packages from Kerala",
    "description": "Bespoke luxury journey spanning Srinagar, Gulmarg, and Pahalgam. Designed exclusively for elite travelers from Kerala.",
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
        "name": "What is included in the Kashmir luxury tour packages from Kerala?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our packages include premium direct flights, private chauffeured luxury SUVs, exclusive 5-star or heritage accommodations, curated dining, and a dedicated 24/7 concierge."
        }
      },
      {
        "@type": "Question",
        "name": "How long is the ideal luxury trip to Kashmir from Kerala?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A duration of 6 nights and 7 days is ideal to comfortably experience Srinagar, a private houseboat, the snowscapes of Gulmarg, and the pristine valleys of Pahalgam at a relaxed pace."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide private houseboats on Dal Lake?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Ventara Global arranges exclusive stays on the finest, luxury-grade private houseboats on Dal and Nigeen Lakes, complete with a private chef and butler service."
        }
      },
      {
        "@type": "Question",
        "name": "Is the itinerary customizable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Every detail of our Kashmir luxury tour packages from Kerala is tailored to your distinct preferences, from helicopter transfers to private dining on glaciers."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best time to visit Kashmir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spring (March to May) brings vibrant tulips, while Winter (December to February) is perfect for snow activities in Gulmarg. We organize travel year-round depending on what you wish to experience."
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
        "name": "Kashmir Luxury Tour Packages from Kerala",
        "item": "https://www.ventaraglobal.com/kashmir-luxury-tour-packages-from-kerala"
      }
    ]
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTouristTrip) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      
      <Navbar scrollY={100} />

      {/* Hero Section */}
      <section style={{ height: '50vh', backgroundColor: 'var(--teal-deep)', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: '3rem' }}>
        <div className="container relative z-10">
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text-primary)', marginBottom: '1rem', maxWidth: '900px' }}>
            Kashmir Luxury Tour Packages – From Kerala to the Himalayas
          </h1>
        </div>
      </section>

      <section className="container" style={{ padding: '6rem 0', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Overview */}
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Transition from the emerald backwaters to the snow-crowned majesty of the Himalayas. Our elite <strong>Kashmir luxury tour packages from Kerala</strong> are meticulously designed for the discerning traveler who demands nothing less than absolute perfection. Leave the logistics to us as you step into a world of understated luxury, where every transition is seamless and every moment is profoundly beautiful.
          </p>
          <p>
            Whether you desire a private helicopter arrival over the Pir Panjal range, an intimate dinner aboard a heritage houseboat, or secluded retreats in Gulmarg, Ventara Global orchestrates it all. By choosing our Kashmir luxury tour packages from Kerala, you are not merely booking a holiday; you are commissioning a masterpiece. 
            For inspiration on scheduling, read our in-depth guide on the <a href="/blog/best-time-to-visit-kashmir-from-kerala" style={{ color: 'var(--teal)' }}>Best Time to Visit Kashmir from Kerala</a>.
          </p>
        </div>

        {/* Why Ventara Global */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Why Ventara Global</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            True luxury is effortless. At Ventara Global, we do not deal in off-the-shelf itineraries. We are architects of extraordinary journeys. We bypass the crowds, securing access to Kashmir's hidden gems. You will be assigned a dedicated lifestyle concierge, available 24/7. From private tarmac transfers in Cochin or Trivandrum to sipping Kahwa in a private meadow in Pahalgam, our standard is unrivaled.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            If you are curious about combining experiences, compare these dramatic landscapes in our latest piece, <a href="/blog/kerala-vs-kashmir-which-to-visit-first" style={{ color: 'var(--teal)' }}>Kerala vs. Kashmir</a>.
          </p>
        </div>

        {/* Itinerary */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Sample Itinerary Overview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { day: 'Day 1', title: 'Arrival in Srinagar & Private Shikara', desc: 'Arrive in Srinagar. Be welcomed by your chauffeur driving a luxury SUV. Check into a presidential suite on Nigeen Lake. Enjoy a twilight Shikara ride.' },
              { day: 'Day 2', title: 'Gardens of Royalty', desc: 'A privately guided tour of the Mughal Gardens, avoiding peak hours. Conclude with a Wazwan dinner curated by a master chef.' },
              { day: 'Day 3', title: 'The Ascent to Gulmarg', desc: 'A scenic drive to Gulmarg. Check into a high-altitude luxury resort. Opt for a private ski lesson or a serene Gondola ride to Apharwat.' },
              { day: 'Day 4', title: 'A Day in the Clouds', desc: 'At leisure. Spa therapies infused with Himalayan herbs, or a private snowmobile expedition.' },
              { day: 'Day 5', title: 'Pahalgam Serenity', desc: 'Journey to the Valley of Shepherds. Walk along the Lidder River, followed by a bespoke high-tea setup amidst the pine forests.' },
              { day: 'Day 6', title: 'Return with Legacy', desc: 'Private transfer to Srinagar International Airport for your flight back to Kerala.' }
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
              <li>Premium or First-class direct flight coordination</li>
              <li>Hand-picked 5-star & heritage accommodations</li>
              <li>Private luxury Chauffeured transport</li>
              <li>Exclusive culinary experiences</li>
              <li>24/7 dedicated Ventara Global Concierge</li>
            </ul>
          </div>
          <div>
            <h3 className="heading-serif" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Exclusions</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1rem' }}>
              <li>Personal shopping and gratuities</li>
              <li>Spa treatments outside the itinerary</li>
              <li>Optional helicopter charters (available on request)</li>
            </ul>
          </div>
        </div>

        {/* Best Time to Visit */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Best Time to Visit</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Kashmir is a destination of four dramatic seasons. For guests flying in from tropical Kerala, the snowy winters (December - February) offer an enchanting alpine contrast. If you prefer mild, breathtaking floral landscapes, the Spring tulip season (April) and Summer (May - June) are pristine. 
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
            Ready to ascend? Reach out to our travel architects and craft a journey beyond the ordinary.
          </p>
          <a href="/#enquire" className="btn-primary" style={{ display: 'inline-block' }}>Request a Private Consultation</a>
        </div>

      </section>

      <Footer />
    </main>
  );
}
