import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Indiahikes — Himalayan treks, graded by altitude",
    template: "%s · Indiahikes",
  },
  description:
    "Pick a Himalayan trek by the altitude you are ready for. Fifteen routes across Uttarakhand, Himachal, Kashmir, Sikkim and Bengal, with open departure dates and live slot counts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
