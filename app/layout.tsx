import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ventaraglobal.com"),
  title: "Vantara Global | Bespoke Luxury India Tour Packages & Experiences",
  description: "Ventara Global engineers ultra-luxury, bespoke private journeys across Kashmir, Kerala, Rajasthan & more. Unmatched 24/7 concierge, 5-star stays & curated local experiences.",
  keywords: ["luxury travel India", "bespoke tour packages", "Kashmir luxury tour", "Kerala honeymoon packages", "Rajasthan heritage tour", "premium India travel agency", "Ventara Global"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.ventaraglobal.com",
  },
  openGraph: {
    title: "Ventara Global | Bespoke Luxury India Tour Packages",
    description: "Ventara Global crafts private luxury journeys across Kerala, Kashmir & Rajasthan. Bespoke itineraries, 24/7 concierge. Enquire today.",
    url: "https://www.ventaraglobal.com",
    siteName: "Ventara Global",
    images: [{
      url: "https://www.ventaraglobal.com/logo.png",
      width: 1200,
      height: 630,
      alt: "Ventara Global - Luxury Travel Agency India",
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ventara Global | Luxury India Tour Packages",
    description: "Ventara Global crafts private luxury journeys across Kerala, Kashmir & Rajasthan.",
    images: ["https://www.ventaraglobal.com/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EBKRK5N95G" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-EBKRK5N95G');
          `}
        </Script>
        {/* LocalBusiness & Organization Schema inserted globally */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "TravelAgency"],
            "name": "Ventara Global",
            "url": "https://www.ventaraglobal.com",
            "logo": "https://www.ventaraglobal.com/logo.png",
            "image": "https://www.ventaraglobal.com/logo.png",
            "description": "Premium travel agency in India specializing in bespoke luxury tours to Kashmir, Kerala, Rajasthan, and beyond.",
            "telephone": "+91-8921-2480-55",
            "email": "info@ventaraglobal.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ventara Global Office",
              "addressLocality": "Calicut",
              "addressRegion": "Kerala",
              "postalCode": "673001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "11.2588",
              "longitude": "75.7804"
            },
            "priceRange": "$$$$",
            "sameAs": [
              "https://www.instagram.com/ventaraglobal/"
            ]
          })
        }} />
      </head>
      <body>
        {children}
        <WhatsAppButton 
          variant="floating" 
          message="Hi Ventara Global, I'm interested in exploring your luxury travel experiences. Could you help me plan my journey?" 
          locationTracker="global_floating" 
        />
      </body>
    </html>
  );
}
