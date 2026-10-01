import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HeyHikers — Best Guided Himalayan Treks in India",
    template: "%s · HeyHikers",
  },
  description:
    "Dehradun-based HeyHikers runs safe, guided Himalayan treks with certified leaders, small groups, caring on-trail support and 24×7 service. Kedarkantha, Hampta Pass, Valley of Flowers, Kashmir Great Lakes and 47+ routes across Uttarakhand, Himachal, J&K and Ladakh, from ₹7,499.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${serif.variable} ${hand.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
