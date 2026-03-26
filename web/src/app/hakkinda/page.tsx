import Link from "next/link";
import Image from "next/image";

const sosyalMedya = [
  { ad: "GitHub", url: "https://github.com/DrMuratAltun", svg: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { ad: "LinkedIn", url: "https://linkedin.com/in/drmurataltun", svg: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { ad: "Instagram", url: "https://instagram.com/drmurataltun", svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { ad: "ResearchGate", url: "https://researchgate.net/profile/Murat_Altun2", svg: "M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 00-.112.437 8.365 8.365 0 00-.078.53 9 9 0 00-.046.663c-.013.244-.018.484-.018.72 0 .249.006.496.018.744.012.247.03.49.046.726.017.236.04.468.078.694.037.226.07.442.112.647.073.351.18.674.322.966.142.293.32.556.536.79a3.59 3.59 0 00.758.614c.29.182.62.322.987.418.152.04.31.071.474.094.164.022.33.033.496.033.218 0 .432-.017.642-.053.21-.035.418-.089.626-.162.207-.072.408-.163.602-.272.195-.11.377-.239.545-.387a2.7 2.7 0 00.442-.462c.127-.165.237-.34.328-.523.178-.357.275-.74.275-1.15 0-.478-.116-.896-.349-1.253-.232-.357-.557-.627-.974-.81a.71.71 0 01-.088-.043c.033-.022.073-.052.119-.088.186-.146.336-.322.452-.528.116-.207.174-.448.174-.724 0-.26-.06-.492-.178-.698a1.83 1.83 0 00-.461-.518 2.1 2.1 0 00-.649-.337 2.335 2.335 0 00-.747-.122 2.6 2.6 0 00-.79.122c-.263.08-.5.196-.71.346l.015.478c.166-.138.34-.243.52-.316a1.478 1.478 0 01.567-.11c.146 0 .282.024.408.072.126.047.236.115.33.202.093.087.166.194.218.32.053.126.079.27.079.429 0 .194-.04.365-.118.513-.079.148-.188.275-.326.382a1.61 1.61 0 01-.487.248 1.91 1.91 0 01-.59.088h-.344v.46h.368c.239 0 .46.03.665.093.205.062.385.153.54.272.156.12.279.27.37.453.09.183.136.396.136.64 0 .218-.04.414-.12.585a1.26 1.26 0 01-.321.43 1.43 1.43 0 01-.471.271 1.64 1.64 0 01-.565.094c-.344 0-.64-.08-.89-.24a3.713 3.713 0 01-.64-.587l-.366.344c.236.28.517.508.842.685.326.177.698.265 1.118.265.3 0 .58-.05.84-.148.26-.099.488-.238.682-.415.194-.178.347-.39.457-.637.11-.247.164-.519.164-.816zM4.856 13.11c-.212-.076-.388-.178-.528-.306a1.34 1.34 0 01-.327-.462A1.408 1.408 0 013.89 11.9c0-.24.043-.453.128-.64.085-.186.2-.346.344-.48a1.54 1.54 0 01.504-.31c.192-.073.397-.11.614-.11.224 0 .43.037.618.11.188.073.35.177.487.31.136.134.243.294.32.48.077.187.115.4.115.64 0 .164-.038.326-.115.485a1.34 1.34 0 01-.327.462c-.14.128-.315.23-.528.306-.212.076-.447.114-.706.114-.258 0-.493-.038-.706-.114zm.706-3.216c-.36 0-.693.056-1 .167a2.45 2.45 0 00-.803.473 2.2 2.2 0 00-.536.734 2.17 2.17 0 00-.195.926c0 .344.065.658.195.94.13.282.31.527.536.734.227.206.497.367.804.483.306.115.64.173 1 .173.358 0 .692-.058 1-.173.306-.116.576-.277.803-.483.226-.207.406-.452.536-.734.13-.282.195-.596.195-.94 0-.336-.065-.648-.195-.926a2.2 2.2 0 00-.536-.734 2.45 2.45 0 00-.804-.473c-.307-.11-.64-.167-1-.167z" },
  { ad: "E-posta", url: "mailto:emurataltun@gmail.com", svg: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
  { ad: "Web Sitesi", url: "https://drmurataltun.github.io/", svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
];

export default function Hakkinda() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-violet-400/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-400/10 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold">Proje Hakkında</h1>
          <p className="mx-auto max-w-xl text-lg text-indigo-100">
            Yapay Zeka Macerası, ortaokul öğrencileri için hazırlanan
            açık kaynaklı, uygulamalı bir yapay zeka eğitim projesidir.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 space-y-12">
        {/* Yazar Profil Kartı */}
        <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          {/* Kapak */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
          {/* Profil */}
          <div className="px-8 pb-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-end">
              <div className="-mt-16 shrink-0 overflow-hidden rounded-2xl border-4 border-[var(--color-bg-secondary)] shadow-lg">
                <Image
                  src="/images/dr-murat-altun-avatar.jpg"
                  alt="Dr. Murat ALTUN"
                  width={140}
                  height={140}
                  className="h-[140px] w-[140px] object-cover"
                  priority
                />
              </div>
              <div className="flex-1 text-center md:text-left md:pb-2">
                <h2 className="text-2xl font-extrabold">Dr. Murat ALTUN</h2>
                <p className="text-[var(--color-text-secondary)]">
                  Yapay Zeka Eğitmeni &middot; Veri Bilimci &middot; Yazar
                </p>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-[var(--color-text-secondary)]">
              Bilişim Teknolojileri öğretmeni, yapay zeka eğitmeni ve 6 kitap yazarı.
              Eğitim Yönetimi alanında doktora derecesine sahip olup, veri madenciliği ile
              öğrenci performans tahmini üzerine çalışmıştır. Yapay zeka, makine öğrenimi ve
              veri bilimi alanlarında BTK Akademi, Deneyap ve çeşitli platformlarda
              binlerce öğrenci ve eğitimciye eğitim vermiştir. TÜBİTAK proje yürütücüsü
              ve danışmanıdır.
            </p>

            {/* Sosyal Medya İkonları */}
            <div className="mt-6 flex flex-wrap gap-3">
              {sosyalMedya.map((s) => (
                <a
                  key={s.ad}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium transition hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  title={s.ad}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text-secondary)] transition group-hover:text-indigo-600">
                    <path d={s.svg} />
                  </svg>
                  <span className="hidden sm:inline">{s.ad}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Proje */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Bu Proje Hakkında</h2>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            <strong className="text-[var(--color-text)]">Yapay Zeka Macerası</strong>,
            6-8. sınıf öğrencilerinin yapay zekayı anlamalarını, deneyimlemelerini ve
            sorumlu bir şekilde kullanmalarını amaçlayan kapsamlı bir eğitim projesidir.
            MIT RAISE, Day of AI, AI4K12 gibi dünya çapındaki YZ okuryazarlığı
            araştırmalarından ilham alınarak, MEB müfredatına uygun tasarlanmıştır.
          </p>
        </section>

        {/* Açık Kaynak */}
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white">
          <h2 className="mb-4 text-2xl font-extrabold">Açık Kaynak Proje</h2>
          <p className="mb-6 text-indigo-100">
            Bu proje <strong>CC BY-NC-SA 4.0</strong> lisansı ile lisanslanmıştır.
            Eğitim amaçlı, ticari olmayan kullanımlarda serbestçe kullanılabilir.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar" target="_blank" rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-2.5 font-bold text-indigo-700 transition hover:bg-indigo-50">
              GitHub&apos;da İncele
            </a>
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr" target="_blank" rel="noopener noreferrer"
              className="rounded-lg border-2 border-white/30 px-6 py-2.5 font-bold transition hover:bg-white/10">
              Lisans Detayları
            </a>
          </div>
        </section>

        {/* İletişim */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">İletişim</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href="mailto:emurataltun@gmail.com"
              className="card-hover flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
              <span className="text-2xl">📧</span>
              <div>
                <h4 className="text-sm font-bold">E-posta</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">emurataltun@gmail.com</p>
              </div>
            </a>
            <a href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar/issues" target="_blank" rel="noopener noreferrer"
              className="card-hover flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
              <span className="text-2xl">🐛</span>
              <div>
                <h4 className="text-sm font-bold">Hata Bildir / Öneri Ver</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">GitHub Issues</p>
              </div>
            </a>
          </div>
        </section>

        <div className="pt-6">
          <Link href="/" className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">
            &larr; Ana Sayfaya Dön
          </Link>
        </div>
      </main>
    </div>
  );
}
