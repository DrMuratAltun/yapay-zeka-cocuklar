import Link from 'next/link';

export default function YapayZekaOkulumBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 shadow-lg text-white my-8">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
        <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z"/>
        </svg>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
            <span className="text-3xl">✨</span> Yapay Zeka Okulum ile Daha Fazlası!
          </h3>
          <p className="text-indigo-100 text-lg">
            Sınıf bazlı görevler, raporlar, canlı quizler ve sertifikalar ile GençYZ'nin tam potansiyelini kurumsal SaaS altyapımızla keşfedin. Öğretmenler ve Okullar için özel tasarlandı!
          </p>
        </div>
        
        <div className="shrink-0 flex flex-col items-center gap-2">
          <Link href="https://yapayzekaokulum.com" target="_blank" rel="noopener noreferrer">
            <button className="whitespace-nowrap rounded-xl bg-white px-8 py-3 text-lg font-bold text-indigo-600 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              Platformu İncele 
              <span className="text-xl">👉</span>
            </button>
          </Link>
          <span className="text-xs text-indigo-100 font-medium tracking-wide uppercase">Tüm okullara açık</span>
        </div>
      </div>
    </div>
  );
}
