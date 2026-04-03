import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ventaraglobal.com"),
  title: "Luxury India Tour Packages – Kerala & Kashmir | Ventara Global",
  description: "Ventara Global crafts private luxury journeys across Kerala, Kashmir & Rajasthan. Bespoke itineraries, 24/7 concierge. Enquire today.",
  robots: "index, follow",
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
