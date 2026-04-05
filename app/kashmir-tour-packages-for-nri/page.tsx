import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kashmir Tour Packages for NRI USA | Ventara Global',
  description: 'Ventara Global offers bespoke Kashmir tour packages for NRI USA travelers. Relive your homeland’s heritage through ultra-luxury itineraries, seamless secure logistics, and world-class 24/7 concierge support.',
};

export default function KashmirForNRI() {
  const jsonLdTouristTrip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Kashmir Tour Packages for NRI USA",
    "description": "Exclusive and ultra-luxurious Kashmir itineraries optimized for Non-Resident Indians flying from the United States with high service expectations.",
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
        "name": "How does Ventara cater to the expectations of NRI travelers from the USA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Understanding the high standards of our US-based clients, we secure only the most elite 5-star properties, offer private luxury transport, and assign a dedicated 24/7 concierge to ensure zero friction throughout the trip."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to book Kashmir tour packages for NRI USA travelers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Safety is paramount. We orchestrate private, vetted chauffeured travel. We only engage with high-security, ultra-luxury resorts, ensuring your privacy and comfort at all times."
        }
      },
      {
        "@type": "Question",
        "name": "Can you coordinate international flight arrivals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our concierge team syncs perfectly with your long-haul arrivals into Delhi or Mumbai, arranging seamless connecting flights and private lounge access before heading to Srinagar."
        }
      },
      {
        "@type": "Question",
        "name": "What type of food can we expect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "From authentic slow-cooked Wazwan to international continental delicacies, our private chefs and resort partners tailor every meal to your exact dietary and cultural preferences."
        }
      },
      {
        "@type": "Question",
        "name": "How far in advance should we book from the USA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Due to the exclusivity of the properties we use, we recommend securing your itinerary at least 3 to 6 months prior, particularly if traveling during peak Summer or snowy Winter."
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
        "name": "Kashmir Tour Packages for NRI USA",
        "item": "https://www.ventaraglobal.com/kashmir-tour-packages-for-nri"
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
            Kashmir Luxury Tour Packages – From the USA
          </h1>
        </div>
      </section>

      <section className="container" style={{ padding: '6rem 0', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Overview */}
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Bridging the physical distance with immaculate opulence. For the diaspora yearning for a pristine homecoming, our <strong>Kashmir tour packages for NRI USA</strong> clientele are meticulously engineered to exceed the highest international hospitality standards. Returning to India should invoke joy and relaxation, completely devoid of logistical strain. 
          </p>
          <p>
            With these specialized Kashmir tour packages for NRI USA travelers, every element of your homecoming is curated before you even board your flight from New York, San Francisco, or Chicago. You will retreat into the sublime serenity of the Himalayas, enveloped in world-class 5-star service. For details on scheduling your trip across the Pacific, consider reading our essay on the <a href="/blog/best-time-to-visit-kashmir-from-kerala" style={{ color: 'var(--teal)' }}>Best Time to Visit Kashmir from Kerala</a>—which equally applies to global travelers—or explore another facet of India via our <a href="/kerala-luxury-backwater-packages" style={{ color: 'var(--teal)' }}>Kerala luxury backwater packages</a>.
          </p>
        </div>

        {/* Why Ventara Global */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Why Ventara Global</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            We understand the specific apprehensions of traveling to Kashmir from abroad. Ventara Global solves this through relentless attention to security, privacy, and unparalleled convenience. Your journey is supported by an international-grade lifestyle concierge, bridging time zones seamlessly. We guarantee elite accommodations, private VIP airport assistance, and the absolute highest echelon of private ground transportation. We are not just a travel agency; we are your private ambassadors to luxury India.
          </p>
        </div>

        {/* Itinerary */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Sample Itinerary Overview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { day: 'Day 1', title: 'The Srinagar Welcome', desc: 'Arrive via your connecting flight into Srinagar. Expedited VIP baggage handling. Immediate transfer to the finest heritage suite on Dal Lake.' },
              { day: 'Day 2', title: 'Culinary & Cultural Immersion', desc: 'Explore the legacy of Kashmir. Private viewings of Pashmina weaving by master artisans, followed by a royal feast on your private vessel.' },
              { day: 'Day 3', title: 'Ascension to Gulmarg', desc: 'Secure, private chauffeured SUV transfer to the high-alpine luxury resorts of Gulmarg. Experience world-class hospitality at 8,000 feet.' },
              { day: 'Day 4', title: 'Himalayan Leisure', desc: 'Breathe the crisp mountain air. Indulge in private spa sessions, or take a private ride on the Gulmarg Gondola with a dedicated guide.' },
              { day: 'Day 5', title: 'The Golden Meadows of Sonmarg', desc: 'A day trip to Sonmarg. Walk amidst untouched glacial streams. A lavish outdoor picnic orchestrated by your concierge.' },
              { day: 'Day 6', title: 'Flawless Departure', desc: 'Return seamlessly to the airport. VIP terminal access as you head back towards your international connection.' }
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
              <li>VIP Meet & Greet at Srinagar Airport</li>
              <li>Hand-vetted, international-grade 5-star properties</li>
              <li>Fully private, secure luxury transportation</li>
              <li>Bespoke culinary curation by executive chefs</li>
              <li>24/7 dedicated Ventara Global Concierge</li>
            </ul>
          </div>
          <div>
            <h3 className="heading-serif" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Exclusions</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1rem' }}>
              <li>Long-haul flights from the USA</li>
              <li>Incidental hotel expenses like laundry or vintage wines</li>
              <li>Visa and medical coordination fees</li>
            </ul>
          </div>
        </div>

        {/* Best Time to Visit */}
        <div>
          <h2 className="heading-serif" style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Best Time to Visit</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            For families aligning with US school holidays, Summer (June to August) offers a stunning, emerald-green sanctuary away from the intense heat of the Indian plains. Alternatively, the Winter holidays (December) provide an exquisite alpine skiing atmosphere in Gulmarg that rivals the Rockies or the Alps.
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
            Ready for a pristine homecoming? Reach out to our travel architects and secure your private Himalayan retreat.
          </p>
          <a href="/#enquire" className="btn-primary" style={{ display: 'inline-block' }}>Request a Private Consultation</a>
        </div>

      </section>

      <Footer />
    </main>
  );
}
