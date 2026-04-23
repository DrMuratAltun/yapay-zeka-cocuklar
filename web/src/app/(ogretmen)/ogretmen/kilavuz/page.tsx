import Link from 'next/link'
import { kilavuzVerileri } from '@/data/ogretmen-kilavuz-data'

export default function KilavuzListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Bolum Kilavuzlari
        </h1>
        <p className="text-gray-600 mt-1">
          Her bolum icin detayli ogretmen rehberi: cevap anahtarlari, etkinlik
          tuyolari, tartisma sorulari ve daha fazlasi.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {kilavuzVerileri.map((k) => (
          <Link
            key={k.bolumNo}
            href={`/ogretmen/kilavuz/${k.bolumNo}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className={`h-2 bg-gradient-to-r ${k.renk}`} />
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${k.renk} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                >
                  {k.bolumNo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {k.baslik}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {k.sinifSeviyesi}
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      {k.dersSaati} ders saati
                    </span>
                  </div>
                </div>
                <span className="text-2xl">{k.icon}</span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded">
                  {k.quizCevapAnahtari.length} soru cevap
                </span>
                <span className="bg-violet-50 text-violet-700 px-2 py-0.5 rounded">
                  {k.etkinlikRehberi.length} etkinlik
                </span>
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                  {k.tartismaSorulari.length} tartisma
                </span>
                <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded">
                  {k.yanilgilar.length} yanilgi
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
