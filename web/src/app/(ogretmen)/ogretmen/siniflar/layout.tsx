'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function OgretmenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/giris')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/okul"
              className="font-bold text-gray-900 text-lg"
            >
              GencYZ Ogretmen
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/okul"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Okul Paneli
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Siteye Don
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Cikis Yap
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
