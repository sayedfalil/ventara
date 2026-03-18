import type { Metadata } from "next";
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
      <body>
        {children}
      </body>
    </html>
  );
}
