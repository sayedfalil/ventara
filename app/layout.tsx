import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantara Global | Premium Travel to India & Kerala",
  description: "Experience the ultra-luxury and hidden masterpieces of India and Kerala with Vantara Global.",
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
