import Link from 'next/link'
import { notFound } from 'next/navigation'
import { kilavuzVerileri } from '@/data/ogretmen-kilavuz-data'
import { PrintButton } from './print-button'

const tipRenk: Record<string, string> = {
  unplugged: 'bg-orange-100 text-orange-700',
  bilgisayar: 'bg-blue-100 text-blue-700',
  simulasyon: 'bg-violet-100 text-violet-700',
  yaratici: 'bg-pink-100 text-pink-700',
  proje: 'bg-teal-100 text-teal-700',
}

const tipLabel: Record<string, string> = {
  unplugged: 'Unplugged',
  bilgisayar: 'Bilgisayar',
  simulasyon: 'Simulasyon',
  yaratici: 'Yaratici',
  proje: 'Proje',
}

export default async function KilavuzDetayPage({
  params,
}: {
  params: Promise<{ bolumNo: string }>
}) {
  const { bolumNo } = await params
  const no = parseInt(bolumNo, 10)
  const kilavuz = kilavuzVerileri.find((k) => k.bolumNo === no)
  if (!kilavuz) return notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 print:px-0 print:py-0">
      {/* Ust Bar */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/ogretmen/kilavuz"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Tum Kilavuzlar
        </Link>
        <PrintButton />
      </div>

      {/* Bilgi Karti */}
      <div className={`bg-gradient-to-r ${kilavuz.renk} rounded-xl p-6 text-white mb-8 print:bg-gray-100 print:text-black print:rounded-none`}>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl">{kilavuz.icon}</span>
          <div>
            <p className="text-white/80 text-sm print:text-gray-600">Bolum {kilavuz.bolumNo}</p>
            <h1 className="text-2xl sm:text-3xl font-bold">{kilavuz.baslik}</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm print:bg-gray-200 print:text-black">
            {kilavuz.sinifSeviyesi}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm print:bg-gray-200 print:text-black">
            {kilavuz.dersSaati} ders saati
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-2 text-white/90 print:text-gray-700">Kazanimlar</h3>
          <ul className="space-y-1">
            {kilavuz.kazanimlar.map((k, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/90 print:text-black">
                <span className="mt-0.5">✓</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 1. Ders Plani */}
      <Section title="Ders Islenis Plani" icon="📋" id="ders-plani">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 print:bg-gray-50">
          <p className="text-sm font-semibold text-blue-800 mb-1">Isinma Aktivitesi</p>
          <p className="text-sm text-blue-700">{kilavuz.dersPlani.isinma}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-semibold w-24">Sure</th>
                <th className="text-left p-3 border font-semibold">Icerik</th>
              </tr>
            </thead>
            <tbody>
              {kilavuz.dersPlani.zamanDagilimi.map((z, i) => (
                <tr key={i} className={i % 2 === 1 ? 'bg-gray-50/50' : ''}>
                  <td className="p-3 border font-medium text-gray-700">{z.sure}</td>
                  <td className="p-3 border text-gray-600">{z.icerik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4 print:bg-gray-50">
          <p className="text-sm font-semibold text-amber-800 mb-1">Kapanis Aktivitesi</p>
          <p className="text-sm text-amber-700">{kilavuz.dersPlani.kapanis}</p>
        </div>
      </Section>

      {/* 2. Quiz Cevap Anahtari */}
      <Section title="Quiz Cevap Anahtari" icon="✅" id="cevap-anahtari">
        <div className="space-y-4">
          {kilavuz.quizCevapAnahtari.map((q) => (
            <div key={q.soruNo} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                    {q.soruNo}
                  </span>
                  <p className="text-sm font-medium text-gray-800">{q.soru}</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-700 shrink-0">
                    {q.dogruCevap}
                  </span>
                  <span className="text-sm font-semibold text-green-700">{q.dogruSecenek}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800">
                  <span className="font-semibold">Aciklama: </span>
                  {q.aciklama}
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-800">
                  <span className="font-semibold">Ogretmen Notu: </span>
                  {q.ogretmenNotu}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Etkinlik Rehberi */}
      <Section title="Etkinlik Yurutme Rehberi" icon="🎯" id="etkinlikler">
        <div className="space-y-6">
          {kilavuz.etkinlikRehberi.map((e, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="bg-white p-4 border-b flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-bold text-gray-900">{e.ad}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipRenk[e.tip] ?? 'bg-gray-100 text-gray-700'}`}>
                    {tipLabel[e.tip] ?? e.tip}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {e.sure}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {e.gruplama}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {/* Hazirlik */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Hazirlik</p>
                  <ul className="space-y-1">
                    {e.hazirlik.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Adimlar */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Adimlar</p>
                  <ol className="space-y-1">
                    {e.adimlar.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {j + 1}
                        </span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Olasi Sorunlar */}
                {e.olasiSorunlar.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-red-700 mb-1">Olasi Sorunlar</p>
                    <ul className="space-y-1">
                      {e.olasiSorunlar.map((s, j) => (
                        <li key={j} className="text-sm text-red-600 flex items-start gap-2">
                          <span className="mt-0.5">⚠️</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ileri Seviye */}
                <div className="bg-violet-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-violet-700 mb-1">Ileri Seviye Varyasyonu</p>
                  <p className="text-sm text-violet-600">{e.ileriSeviye}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Tartisma Sorulari */}
      <Section title="Tartisma Sorulari" icon="💬" id="tartisma">
        <div className="space-y-4">
          {kilavuz.tartismaSorulari.map((t, i) => (
            <div key={i} className="border rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {t.soru}
              </p>
              <div className="ml-8 space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Yonlendirme Ipuclari</p>
                {t.ipuclari.map((ip, j) => (
                  <p key={j} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-indigo-400">→</span>
                    {ip}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Yaygin Yanilgilar */}
      <Section title="Yaygin Yanilgilar" icon="❌" id="yanilgilar">
        <div className="space-y-4">
          {kilavuz.yanilgilar.map((y, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="grid sm:grid-cols-2">
                <div className="bg-red-50 p-4 border-b sm:border-b-0 sm:border-r">
                  <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Yanilgi</p>
                  <p className="text-sm text-red-700 font-medium">{y.yanilgi}</p>
                </div>
                <div className="bg-green-50 p-4">
                  <p className="text-xs font-semibold text-green-500 uppercase tracking-wide mb-1">Gercek</p>
                  <p className="text-sm text-green-700 font-medium">{y.gercek}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nasil Duzeltilir?</p>
                <p className="text-sm text-gray-700">{y.nasilDuzeltilir}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Farklilastrma */}
      <Section title="Farklilastirma Onerileri" icon="🎨" id="farklilastirma">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-emerald-50/50">
            <p className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
              <span className="text-lg">🚀</span> Ileri Duzey Ogrenciler
            </p>
            <ul className="space-y-2">
              {kilavuz.farklilastirma.ileriDuzey.map((d, i) => (
                <li key={i} className="text-sm text-emerald-700 flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-lg p-4 bg-blue-50/50">
            <p className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <span className="text-lg">🤝</span> Destege Ihtiyac Duyan Ogrenciler
            </p>
            <ul className="space-y-2">
              {kilavuz.farklilastirma.destekGerekli.map((d, i) => (
                <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. Ek Kaynaklar */}
      <Section title="Ek Kaynaklar" icon="📚" id="kaynaklar">
        <div className="space-y-3">
          {kilavuz.ekKaynaklar.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-lg p-4 hover:shadow-sm hover:border-blue-300 transition group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600 transition">
                    {r.baslik}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{r.aciklama}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0 mt-1">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Sayfa Sonu Navigasyon */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t print:hidden">
        {no > 1 ? (
          <Link
            href={`/ogretmen/kilavuz/${no - 1}`}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Bolum {no - 1}
          </Link>
        ) : <span />}
        <Link
          href="/ogretmen/kilavuz"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Tum Kilavuzlar
        </Link>
        {no < 10 ? (
          <Link
            href={`/ogretmen/kilavuz/${no + 1}`}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            Bolum {no + 1}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ) : <span />}
      </div>
    </div>
  )
}

/* Bolum basliklari icin yardimci bileseni */
function Section({
  title,
  icon,
  id,
  children,
}: {
  title: string
  icon: string
  id: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-8 print:break-inside-avoid">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
        <span className="text-xl">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}
