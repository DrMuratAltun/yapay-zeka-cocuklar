'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function GirisPage() {
  return (
    <Suspense>
      <GirisForm />
    </Suspense>
  )
}

// Role göre default yönlendirme hedefi
function hedefForRole(role: string | null | undefined): string {
  switch (role) {
    case 'super_admin':
      return '/admin/okullar'
    case 'school_admin':
      return '/okul'
    case 'teacher':
      return '/ogretmen'
    case 'student':
      return '/ogrenci'
    default:
      return '/'
  }
}

function GirisForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [kontrolEdildi, setKontrolEdildi] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect')

  // Zaten giriş yapmış kullanıcıyı uygun panele at
  useEffect(() => {
    let iptal = false
    const sup = createClient()
    ;(async () => {
      const { data } = await sup.auth.getUser()
      if (iptal) return
      if (!data.user) {
        setKontrolEdildi(true)
        return
      }
      // Rolü al
      const { data: roleData } = await sup
        .from('school_users')
        .select('role')
        .eq('user_id', data.user.id)
        .limit(1)
        .maybeSingle()
      const role = roleData?.role
      router.replace(redirectTo || hedefForRole(role))
    })()
    return () => {
      iptal = true
    }
  }, [router, redirectTo])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (authError || !authData.user) {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
      return
    }

    // Rolüne göre yönlendir
    const { data: roleData } = await supabase
      .from('school_users')
      .select('role')
      .eq('user_id', authData.user.id)
      .limit(1)
      .maybeSingle()

    const hedef = redirectTo || hedefForRole(roleData?.role)
    router.push(hedef)
    router.refresh()
  }

  if (!kontrolEdildi) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-sm text-slate-500">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-extrabold">
            <span>🤖</span>
            <span>GençYZ</span>
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-6 text-white">
            <div className="text-4xl" aria-hidden="true">
              👩‍🏫
            </div>
            <h1 className="mt-2 text-xl font-extrabold">Öğretmen / Yönetici Girişi</h1>
            <p className="mt-0.5 text-xs text-white/80">
              E-posta ve şifrenle panele eriş
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                E-posta
              </label>
              <input
                type="email"
                placeholder="ornek@okul.edu.tr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-violet-400"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Şifre
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-violet-400"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-lg border-l-4 border-rose-400 bg-rose-50 p-2.5 text-xs text-rose-700">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3 text-sm font-bold text-white transition ${
                loading
                  ? 'cursor-not-allowed bg-slate-300'
                  : 'cursor-pointer bg-violet-600 hover:bg-violet-700'
              }`}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Öğrenci girişi altta */}
          <div className="border-t border-slate-100 bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-500">Öğrenci misin?</p>
            <Link
              href="/kolay-giris"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:underline"
            >
              🎒 Sınıf koduyla gir →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
