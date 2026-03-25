import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yapay Zeka Macerası - Çocuklar İçin Yapay Zeka",
  description:
    "Ortaokul öğrencileri (6-8. sınıf) için uygulamalı, eğlenceli ve MEB uyumlu yapay zeka eğitim platformu.",
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
      </body>
    </html>
  );
}
