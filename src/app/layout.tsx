import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Florian Zimmer Theater — Tickets & Erlebnisse",
  description:
    "Deutschlands Magietheater in Neu-Ulm. Live-Magie, Magic Dinner, VIP-Loge und unvergessliche Abende. Jetzt Tickets sichern.",
  keywords: "Magietheater, Zauberer, Tickets, Neu-Ulm, Magic Dinner, VIP Loge, Florian Zimmer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
