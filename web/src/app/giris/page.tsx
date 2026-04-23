'use client'

import { Suspense, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function GirisPage() {
  return (
    <Suspense>
      <GirisForm />
    </Suspense>
  )
}

function GirisForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const explicitRedirect = searchParams.get('redirect')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Explicit redirect varsa onu kullan
    if (explicitRedirect) {
      router.push(explicitRedirect)
      return
    }

    // Yoksa role gore yonlendir (API uzerinden — RLS bypass)
    const roleRes = await fetch('/api/auth/role')
    const { role } = await roleRes.json()

    if (role === 'super_admin') {
      router.push('/admin/okullar')
    } else if (role === 'school_admin') {
      router.push('/okul')
    } else if (role === 'teacher') {
      router.push('/ogretmen/siniflar')
    } else {
      router.push('/ogrenci')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-2">👩‍🏫</div>
          <h1 className="text-2xl font-bold text-gray-800">Öğretmen / Yönetici Girişi</h1>
          <p className="text-gray-500 text-sm mt-1">E-posta ve şifrenizle giriş yapın</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
