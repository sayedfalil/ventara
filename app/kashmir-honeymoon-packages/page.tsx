import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Luxury Kashmir Honeymoon Packages | Ventara Global',
  description: 'Private, unhurried Kashmir honeymoon packages: houseboat evenings on Dal Lake, Gulmarg snow and Pahalgam valleys, designed around the two of you.',
  alternates: { canonical: '/kashmir-honeymoon-packages' },
  openGraph: {
    title: 'Luxury Kashmir Honeymoon Packages | Ventara Global',
    description: 'Private, unhurried Kashmir honeymoon packages designed around the two of you.',
    url: 'https://www.ventaraglobal.com/kashmir-honeymoon-packages',
    type: 'website',
  },
};

const itinerary = [
  { day: 'Day 1', title: 'Arrival in Srinagar and a shikara at sunset', desc: 'You are met at the airport and taken privately to your stay. As the light softens, a shikara ride on Dal Lake sets the tone for the week.' },
  { day: 'Day 2', title: 'Mughal gardens and a houseboat evening', desc: 'A relaxed visit to the Mughal gardens, timed for quieter hours, followed by an evening on a houseboat with a traditional Kashmiri dinner.' },
  { day: 'Day 3', title: 'Drive to Gulmarg', desc: 'A scenic drive into the Pir Panjal mountains and a check-in at your Gulmarg stay, with time to settle in and enjoy the views.' },
  { day: 'Day 4', title: 'A day above the clouds', desc: 'The Gulmarg Gondola toward Apharwat, snow or meadow walks depending on the season, and an unhurried afternoon.' },
  { day: 'Day 5', title: 'On to Pahalgam', desc: 'Travel to Pahalgam, the Valley of Shepherds, and spend the evening beside the Lidder River.' },
  { day: 'Day 6', title: 'Pahalgam valleys at your own pace', desc: 'Visit Betaab Valley or Aru Valley, then keep the afternoon free for rest. A special dinner can be arranged for the last night.' },
  { day: 'Day 7', title: 'Departure', desc: 'A private transfer to Srinagar airport for your flight home.' },
];

const places = [
  { title: 'Dal Lake, Srinagar', desc: 'The heart of a Kashmir honeymoon: shikara rides, floating gardens and houseboats at sunrise and sunset.' },
  { title: 'Nigeen Lake', desc: 'A quieter, more private lake, ringed by willow and poplar trees, ideal for a houseboat stay.' },
  { title: 'Mughal Gardens (Nishat and Shalimar)', desc: 'Terraced gardens with fountains and chinar trees, best visited early in the morning.' },
  { title: 'Gulmarg', desc: 'Open meadows and snow slopes, with the Gulmarg Gondola rising toward Apharwat and views of the Pir Panjal range.' },
  { title: 'Pahalgam', desc: 'The Valley of Shepherds, set beside the Lidder River and surrounded by pine forest. The calmest stop on the route.' },
  { title: 'Betaab Valley', desc: 'An open valley of meadows and clear streams near Pahalgam, popular for photographs.' },
  { title: 'Aru Valley', desc: 'A peaceful alpine valley near Pahalgam with open grassland and mountain views.' },
  { title: 'Sonamarg (optional day trip)', desc: 'The "meadow of gold", a high-altitude valley with glacier views, visited as a day trip from Srinagar.' },
  { title: 'Srinagar Tulip Garden (spring only)', desc: 'A striking sight when the tulips bloom, usually around late March to April. Opening dates depend on the bloom.' },
];

const experiences = [
  { title: 'Shikara at golden hour', desc: 'A private ride on Dal Lake when the water is calm and the light is soft.' },
  { title: 'A houseboat evening', desc: 'A night on Dal or Nigeen Lake, with dinner served on board.' },
  { title: 'Traditional Wazwan dinner', desc: 'The classic multi-course Kashmiri feast, served in an unhurried setting.' },
  { title: 'Mughal garden walks', desc: 'A relaxed visit timed for quieter hours, when the light is best.' },
  { title: 'Gulmarg Gondola', desc: 'Sweeping views of the Pir Panjal range from above the snowline.' },
  { title: 'Snow activities (winter)', desc: 'Snow walks and play in Gulmarg during the winter months.' },
  { title: 'Pahalgam riverside walks', desc: 'Slow walks beside the Lidder River and through pine forest, with nowhere to be.' },
  { title: 'Kahwa in a mountain meadow', desc: 'A cup of traditional Kashmiri tea with a view, arranged during your Pahalgam stay.' },
  { title: 'A spa afternoon', desc: 'Time to unwind with a spa treatment on a rest day.' },
  { title: 'A private candlelit dinner', desc: 'A special dinner arranged in advance for an evening of your choice.' },
];

const seasons = [
  { name: 'Spring (March to May)', desc: 'Mild weather and the tulip season in Srinagar, with gardens at their best.' },
  { name: 'Summer (June to August)', desc: 'Pleasant temperatures, green meadows and the easiest travel conditions.' },
  { name: 'Autumn (October to November)', desc: 'Golden chinar leaves and crisp, clear days.' },
  { name: 'Winter (December to February)', desc: 'Snow in Gulmarg and a cosy, romantic feel. Pack warm layers.' },
];

const faqs = [
  { q: 'How many days are ideal for a Kashmir honeymoon?', a: 'Six nights and seven days is ideal for a relaxed trip: two nights each in Srinagar, Gulmarg and Pahalgam. Five days is possible if you are short on leave, but with less time to rest between places.' },
  { q: 'What is included in your Kashmir honeymoon packages?', a: 'Each plan is built around you, but typically includes hand-picked five-star or heritage stays, private chauffeured transport, a houseboat evening, selected dining experiences and a dedicated 24/7 concierge. Flights are coordinated for you. Exact inclusions are confirmed in your proposal.' },
  { q: 'Can the itinerary be customised?', a: 'Yes. You can add nights in a place you love, include Sonamarg, change the pace or request private dining. Every plan is designed around the couple.' },
  { q: 'When is the best time to go?', a: 'It depends on the mood you want. Spring and autumn suit gardens and colour, summer suits meadows, and winter suits snow. Our guide to the best time to visit Kashmir covers each month.' },
  { q: 'Can you arrange the trip from Kerala?', a: 'Yes. Ventara Global is based in Kerala and plans routes and flight timings from Kochi, Kozhikode and Thiruvananthapuram, usually with one connection.' },
];

export default function KashmirHoneymoonPackages() {
  const jsonLdTouristTrip = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Luxury Kashmir Honeymoon Package',
    description: 'A private seven-day Kashmir honeymoon covering Srinagar, Gulmarg and Pahalgam, designed around the couple.',
    touristType: 'Honeymooners',
    provider: { '@type': 'TravelAgency', name: 'Ventara Global', url: 'https://www.ventaraglobal.com' },
  };

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ventaraglobal.com/' },
      { '@type': 'ListItem', position: 2, name: 'Kashmir Honeymoon Packages', item: 'https://www.ventaraglobal.com/kashmir-honeymoon-packages' },
    ],
  };

  const h2Style = { fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' } as const;
  const bodyStyle = { color: 'var(--text-secondary)', lineHeight: 1.8 } as const;

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTouristTrip) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <Navbar />

      {/* Hero Section */}
      <section style={{ minHeight: '50vh', backgroundColor: 'var(--teal-deep)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '8rem 0 3rem' }}>
        <div className="container relative z-10">
          <h1 className="heading-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', marginBottom: '1rem', maxWidth: '900px' }}>
            Luxury Kashmir Honeymoon Packages
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', maxWidth: '640px', lineHeight: 1.7 }}>
            Private, unhurried journeys through Srinagar, Gulmarg and Pahalgam, designed around the two of you.
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '5rem 0', display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem', maxWidth: '860px', margin: '0 auto' }}>

        {/* Overview */}
        <div style={{ fontSize: '1.1rem', ...bodyStyle, fontWeight: 300 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            A honeymoon in Kashmir blends mirror-still lakes, wooden houseboats, snow-covered meadows and quiet pine forests. Our <strong>Kashmir honeymoon packages</strong> are built to keep the pace slow and the logistics invisible, so your time goes to each other instead of to planning.
          </p>
          <p>
            Every journey is private and tailored. Choose the length, the season and the experiences that matter to you, and we design the rest. New to the destination? Read our <a href="/blog/kashmir-honeymoon-packages-luxury-guide" style={{ color: 'var(--teal)' }}>complete Kashmir honeymoon guide</a> or see the <a href="/blog/kashmir-honeymoon-places-for-couples" style={{ color: 'var(--teal)' }}>most romantic places in Kashmir</a>.
          </p>
        </div>

        {/* Why Ventara */}
        <div>
          <h2 className="heading-serif" style={h2Style}>Why couples choose Ventara Global</h2>
          <ul style={{ ...bodyStyle, paddingLeft: '1.2rem', display: 'grid', gap: '0.75rem' }}>
            <li><strong>Private by design.</strong> Dedicated chauffeured transport and a plan built around you, not a shared group tour.</li>
            <li><strong>Hand-picked stays.</strong> Five-star and heritage properties and a houseboat chosen for comfort and setting.</li>
            <li><strong>One point of contact.</strong> A dedicated 24/7 concierge, so changes in weather or plans are handled for you.</li>
            <li><strong>Kerala-based planning.</strong> Routes and flight timings arranged from Kochi, Kozhikode or Thiruvananthapuram.</li>
          </ul>
        </div>

        {/* Places */}
        <div>
          <h2 className="heading-serif" style={h2Style}>Places you will visit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {places.map((p, i) => (
              <div key={p.title} style={{ borderLeft: '2px solid var(--teal)', paddingLeft: '1rem' }}>
                <h3 className="heading-serif" style={{ color: 'var(--text-primary)', fontSize: '1.15rem' }}>
                  <span style={{ color: 'var(--teal)' }}>{i + 1}.</span> {p.title}
                </h3>
                <p style={{ ...bodyStyle, fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.4rem' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div>
          <h2 className="heading-serif" style={{ ...h2Style, marginBottom: '2rem' }}>Sample 7-day Kashmir honeymoon itinerary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {itinerary.map((item) => (
              <div key={item.day} style={{ borderLeft: '2px solid var(--teal)', paddingLeft: '1.5rem' }}>
                <h3 className="heading-serif" style={{ color: 'var(--text-primary)', fontSize: '1.3rem' }}>
                  <span style={{ color: 'var(--teal)' }}>{item.day}:</span> {item.title}
                </h3>
                <p style={{ ...bodyStyle, marginTop: '0.5rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...bodyStyle, marginTop: '1.5rem', fontSize: '0.95rem' }}>
            This is a sample. We adjust the route, the number of nights and the pace to suit you, for example adding Sonamarg or an extra night in Gulmarg.
          </p>
        </div>

        {/* Experiences */}
        <div>
          <h2 className="heading-serif" style={h2Style}>Experiences on your honeymoon</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {experiences.map((e) => (
              <div key={e.title} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '4px' }}>
                <h3 className="heading-serif" style={{ color: 'var(--text-primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{e.title}</h3>
                <p style={{ ...bodyStyle, fontSize: '0.95rem', lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions / exclusions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '4px' }}>
          <div>
            <h3 className="heading-serif" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>What is typically included</h3>
            <ul style={{ ...bodyStyle, paddingLeft: '1rem' }}>
              <li>Hand-picked five-star or heritage stays</li>
              <li>A houseboat evening on Dal or Nigeen Lake</li>
              <li>Private chauffeured transport</li>
              <li>Selected dining experiences</li>
              <li>Flight coordination from Kerala</li>
              <li>A dedicated 24/7 concierge</li>
            </ul>
          </div>
          <div>
            <h3 className="heading-serif" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>What is usually extra</h3>
            <ul style={{ ...bodyStyle, paddingLeft: '1rem' }}>
              <li>Personal shopping and gratuities</li>
              <li>Spa treatments outside the itinerary</li>
              <li>Optional helicopter charters (on request)</li>
            </ul>
          </div>
        </div>

        {/* Best time */}
        <div>
          <h2 className="heading-serif" style={h2Style}>Best time for a Kashmir honeymoon</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {seasons.map((s) => (
              <div key={s.name} style={{ borderLeft: '2px solid var(--teal)', paddingLeft: '1rem' }}>
                <h3 className="heading-serif" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{s.name}</h3>
                <p style={{ ...bodyStyle, fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.4rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...bodyStyle, marginTop: '1.5rem' }}>
            For a month-by-month view, read our guide to the <a href="/blog/best-time-to-visit-kashmir-from-kerala" style={{ color: 'var(--teal)' }}>best time to visit Kashmir</a>.
          </p>
        </div>

        {/* From Kerala */}
        <div>
          <h2 className="heading-serif" style={h2Style}>Travelling from Kerala?</h2>
          <p style={bodyStyle}>
            We plan routes and flight timings from Kochi, Kozhikode and Thiruvananthapuram. Read our guide to a <a href="/blog/kashmir-honeymoon-package-from-kerala" style={{ color: 'var(--teal)' }}>Kashmir honeymoon package from Kerala</a> for the route, ideal trip length and packing tips.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="heading-serif" style={h2Style}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{f.q}</h3>
                <p style={{ ...bodyStyle, fontSize: '0.95rem', lineHeight: 1.6 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'var(--teal-dark)', padding: '3.5rem 1.5rem', borderRadius: '4px' }}>
          <h2 className="heading-serif" style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>Plan your Kashmir honeymoon</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Tell us your dates and what matters most, and we will design a private plan around you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#contact" className="btn-primary" style={{ display: 'inline-block' }}>Request a proposal</a>
            <WhatsAppButton
              variant="cta"
              message="Hi Ventara Global, I'm interested in a Kashmir honeymoon package. My preferred dates are [please edit]. Could you share a proposal?"
              locationTracker="kashmir_honeymoon_landing"
            />
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
