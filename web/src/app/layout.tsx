import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Cinzel, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import RouteShell from "@/components/RouteShell";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-cinzel" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: {
    default: "GençYZ - Çocuklar İçin Yapay Zeka Eğitim Platformu",
    template: "%s | GençYZ",
  },
  description:
    "Ortaokul öğrencileri (6-8. sınıf) için uygulamalı yapay zeka eğitimi. 10 bölüm, 50+ interaktif etkinlik, oyunlar, quizler ve projeler. Yapay zeka nedir, makine öğrenimi, üretken YZ, etik ve kodlama — hepsini öğren!",
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
    "blok kodlama yapay zeka",
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
      "Ortaokul öğrencileri için uygulamalı yapay zeka eğitimi. 10 bölüm, 50+ etkinlik, interaktif oyunlar ve quizler.",
    url: "https://gencyz.com",
    siteName: "GençYZ",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GençYZ - Çocuklar İçin Yapay Zeka Eğitim Platformu",
    description:
      "Ortaokul öğrencileri için uygulamalı yapay zeka eğitimi. 10 bölüm, 50+ etkinlik, oyunlar ve projeler.",
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "GençYZ",
                alternateName: "Yapay Zeka Macerası",
                url: "https://gencyz.com",
                description:
                  "Ortaokul öğrencileri (6-8. sınıf) için uygulamalı yapay zeka eğitim platformu",
                inLanguage: "tr",
              },
              {
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name: "GençYZ",
                url: "https://gencyz.com",
                description:
                  "Ortaokul öğrencileri için uygulamalı yapay zeka eğitim platformu",
                sameAs: [
                  "https://yapayzekaokulum.com",
                  "https://akademikyz.com",
                  "https://yz-araclari.com",
                  "https://altunmurat.wordpress.com",
                  "https://github.com/DrMuratAltun",
                  "https://linkedin.com/in/drmurataltun",
                  "https://instagram.com/drmurataltun",
                  "https://researchgate.net/profile/Murat_Altun2",
                ],
                founder: {
                  "@type": "Person",
                  name: "Dr. Murat ALTUN",
                  url: "https://drmurataltun.github.io",
                  jobTitle: "Yapay Zeka Eğitmeni",
                  sameAs: [
                    "https://drmurataltun.github.io",
                    "https://altunmurat.wordpress.com",
                    "https://linkedin.com/in/drmurataltun",
                    "https://researchgate.net/profile/Murat_Altun2",
                  ],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Course",
                name: "Yapay Zeka Okuryazarlığı",
                description:
                  "10 bölüm, 50+ interaktif etkinlik ile ortaokul öğrencileri için yapay zeka eğitimi",
                url: "https://gencyz.com/bolumler",
                provider: {
                  "@type": "EducationalOrganization",
                  name: "GençYZ",
                  url: "https://gencyz.com",
                },
                educationalLevel: "6-8. Sınıf (Ortaokul)",
                inLanguage: "tr",
                numberOfCredits: 10,
                audience: {
                  "@type": "EducationalAudience",
                  educationalRole: "student",
                  audienceType: "Ortaokul Öğrencileri (11-14 yaş)",
                },
                teaches: [
                  "Yapay zeka nedir",
                  "Makine öğrenimi",
                  "Üretken yapay zeka",
                  "Blok tabanlı YZ kodlama",
                  "YZ etiği",
                  "Veri okuryazarlığı",
                ],
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: "online",
                  courseWorkload: "58 ders saati",
                },
              },
            ]),
          }}
        />
      </head>
      <body className={`${geist.className} ${cinzel.variable} ${nunito.variable} flex min-h-screen flex-col`}>
        <RouteShell
          footer={
            <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-lg font-extrabold">🤖 GençYZ</p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Dr. Murat ALTUN
                </p>
                <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                  Ortaokul öğrencileri için uygulamalı yapay zeka eğitim platformu.
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-bold">Hızlı Erişim</h4>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <Link href="/bolumler" className="block hover:text-sky-600 transition">Bölümler</Link>
                  <Link href="/ozellikler" className="block hover:text-sky-600 transition">Özellikler</Link>
                  <Link href="/ogretmen" className="block hover:text-sky-600 transition">Öğretmen</Link>
                  <Link href="/hakkinda" className="block hover:text-sky-600 transition">Hakkında</Link>
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-bold">Diğer Projelerimiz</h4>
                <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <a href="https://yapayzekaokulum.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">Yapay Zeka Okulum — Herkes için YZ eğitimi</a>
                  <a href="https://akademikyz.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">Akademik YZ — Araştırmacılar için YZ</a>
                  <a href="https://yz-araclari.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">YZ Araçları — Yapay zeka araç rehberi</a>
                  <a href="https://drmurataltun.github.io/deep-learning-bootcamp/" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">🧠 Derin Öğrenme Bootcamp — Keras ile 15 Hafta (İleri)</a>
                  <a href="https://drmurataltun.github.io/VB-YZ-90/" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">Veri Bilimi & YZ Uzmanlığı — 90 Saatlik Program</a>
                  <a href="https://drmurataltun.github.io" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">Dr. Murat ALTUN — Kişisel site</a>
                  <a href="https://altunmurat.wordpress.com" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">Dr. Murat ALTUN — Blog</a>
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                  &copy; 2025 Dr. Murat ALTUN. Tüm hakları saklıdır.
                </p>
              </div>
            </div>
          </div>
        </footer>
          }
        >
          {children}
        </RouteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
