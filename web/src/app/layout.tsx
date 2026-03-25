import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yapay Zeka Macerasi - Cocuklar Icin Yapay Zeka",
  description:
    "Ortaokul ogrencileri (6-8. sinif) icin uygulamali, eglenceli ve MEB uyumlu yapay zeka egitim platformu.",
  keywords: [
    "yapay zeka",
    "cocuklar icin yapay zeka",
    "AI egitimi",
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
      <body className={geist.className}>{children}</body>
    </html>
  );
}
