import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yapay Zeka Macerası - Çocuklar İçin Yapay Zeka",
  description:
    "Ortaokul öğrencileri (6-8. sınıf) için uygulamalı, eğlenceli yapay zeka eğitim platformu. 10 bölüm, 50+ etkinlik, tamamen ücretsiz!",
  keywords: [
    "yapay zeka",
    "çocuklar için yapay zeka",
    "AI eğitimi",
    "ortaokul",
    "MEB",
    "kodlama",
    "PictoBlox",
    "Teachable Machine",
  ],
  metadataBase: new URL("https://gencyz.com"),
  openGraph: {
    title: "Yapay Zeka Macerası - Çocuklar İçin Yapay Zeka",
    description:
      "Ortaokul öğrencileri (6-8. sınıf) için uygulamalı, eğlenceli yapay zeka eğitim platformu. 10 bölüm, 50+ etkinlik, tamamen ücretsiz!",
    url: "https://gencyz.com",
    siteName: "Yapay Zeka Macerası",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yapay Zeka Macerası - Çocuklar İçin Yapay Zeka",
    description:
      "Ortaokul öğrencileri (6-8. sınıf) için uygulamalı, eğlenceli yapay zeka eğitim platformu. 10 bölüm, 50+ etkinlik, tamamen ücretsiz!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={geist.className}>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
