import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GençYZ - Çocuklar İçin Yapay Zeka Eğitim Platformu",
    template: "%s | GençYZ",
  },
  description:
    "Ortaokul öğrencileri (6-8. sınıf) için ücretsiz yapay zeka eğitimi. 10 bölüm, 50+ interaktif etkinlik, oyunlar, quizler ve uygulamalı projeler. Yapay zeka nedir, makine öğrenimi, üretken YZ, etik ve kodlama — hepsini öğren!",
  keywords: [
    "yapay zeka eğitimi",
    "çocuklar için yapay zeka",
    "yapay zeka nedir",
    "makine öğrenimi",
    "AI eğitimi",
    "üretken yapay zeka",
    "ChatGPT eğitimi",
    "ortaokul yapay zeka",
    "kodlama eğitimi",
    "MEB bilişim teknolojileri",
    "Teachable Machine",
    "PictoBlox",
    "Scratch yapay zeka",
    "yapay zeka etik",
    "deepfake nedir",
    "blok tabanlı kodlama",
    "STEM eğitimi",
    "gencyz",
  ],
  metadataBase: new URL("https://gencyz.com"),
  alternates: {
    canonical: "https://gencyz.com",
  },
  openGraph: {
    title: "GençYZ - Çocuklar İçin Yapay Zeka Eğitim Platformu",
    description:
      "Ortaokul öğrencileri için ücretsiz, uygulamalı yapay zeka eğitimi. 10 bölüm, 50+ etkinlik, interaktif oyunlar ve quizler.",
    url: "https://gencyz.com",
    siteName: "GençYZ",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GençYZ - Çocuklar İçin Yapay Zeka Eğitim Platformu",
    description:
      "Ortaokul öğrencileri için ücretsiz yapay zeka eğitimi. 10 bölüm, 50+ etkinlik, oyunlar ve projeler.",
    creator: "@drmurataltun",
  },
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
  authors: [{ name: "Dr. Murat ALTUN", url: "https://drmurataltun.github.io" }],
  creator: "Dr. Murat ALTUN",
  publisher: "GençYZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GençYZ",
              alternateName: "Yapay Zeka Macerası",
              url: "https://gencyz.com",
              description:
                "Ortaokul öğrencileri (6-8. sınıf) için ücretsiz yapay zeka eğitim platformu",
              inLanguage: "tr",
              author: {
                "@type": "Person",
                name: "Dr. Murat ALTUN",
                url: "https://drmurataltun.github.io",
                jobTitle: "Yapay Zeka Eğitimci",
              },
              publisher: {
                "@type": "Organization",
                name: "GençYZ",
                url: "https://gencyz.com",
              },
              educationalLevel: "6-8. Sınıf (Ortaokul)",
              audience: {
                "@type": "EducationalAudience",
                educationalRole: "student",
                audienceType: "Ortaokul Öğrencileri (11-14 yaş)",
              },
              isAccessibleForFree: true,
              license: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
              hasCourse: {
                "@type": "Course",
                name: "Yapay Zeka Okuryazarlığı",
                description:
                  "10 bölüm, 50+ interaktif etkinlik ile yapay zeka eğitimi",
                provider: {
                  "@type": "Person",
                  name: "Dr. Murat ALTUN",
                },
                numberOfCredits: 10,
                educationalLevel: "Ortaokul",
                inLanguage: "tr",
                teaches: [
                  "Yapay zeka nedir",
                  "Makine öğrenimi",
                  "Üretken yapay zeka",
                  "Blok tabanlı YZ kodlama",
                  "YZ etiği",
                  "Veri okuryazarlığı",
                ],
              },
            }),
          }}
        />
      </head>
      <body className={geist.className}>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
