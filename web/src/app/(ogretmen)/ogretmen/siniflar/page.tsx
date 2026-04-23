'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface TeacherClass {
  id: string
  name: string
  access_code: string
  credential_type: string
  student_count: number
  school_name: string
  module_count?: number
  avg_score?: number | null
}

export default function OgretmenSiniflarPage() {
  const [classes, setClasses] = useState<TeacherClass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [classFormOpen, setClassFormOpen] = useState(false)
  const [newClass, setNewClass] = useState({ name: '', credential_type: 'pin' })
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  const fetchClasses = async () => {
    setLoading(true)
    const res = await fetch('/api/schools/stats')
    if (res.ok) {
      const data = await res.json()
      const cls = (data.classes ?? []).map((c: any) => ({
        ...c,
        school_name: data.school?.name ?? '',
      }))
      // Her sınıf için modül sayısı ve ortalama puanı çek
      const enriched = await Promise.all(
        cls.map(async (c: TeacherClass) => {
          try {
            const mRes = await fetch(`/api/classes/${c.id}/progress`)
            if (mRes.ok) {
              const mData = await mRes.json()
              const allScores = (mData.students ?? []).flatMap(
                (s: any) =>
                  s.modules
                    .filter((m: any) => m.score !== null)
                    .map((m: any) => m.score)
              )
              return {
                ...c,
                module_count: (mData.modules ?? []).length,
                avg_score:
                  allScores.length > 0
                    ? Math.round(
                        allScores.reduce((a: number, b: number) => a + b, 0) /
                          allScores.length
                      )
                    : null,
              }
            }
          } catch {}
          return { ...c, module_count: 0, avg_score: null }
        })
      )
      setClasses(enriched)
    } else {
      const errData = await res.json().catch(() => ({}))
      if (errData.error === 'no_school') {
        setError('no_school')
      } else {
        setError('Sinif bilgileri yuklenemedi.')
      }
    }
    setLoading(false)
  }

  useEffect(() => { fetchClasses() }, [])

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setCreateError('')
    try {
      const code = Math.random().toString(36).substring(2, 5).toUpperCase() + '-GYZ'
      const res = await fetch('/api/schools/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newClass, access_code: code }),
      })
      if (res.ok) {
        setNewClass({ name: '', credential_type: 'pin' })
        setClassFormOpen(false)
        setCreateError('')
        fetchClasses()
      } else {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
        setCreateError(err.error ?? `HTTP ${res.status}`)
      }
    } catch (ex: any) {
      setCreateError('Ag hatasi: ' + (ex.message ?? 'Bilinmeyen hata'))
    }
    setCreating(false)
  }

  const credLabels: Record<string, { label: string; icon: string }> = {
    pin: { label: 'PIN', icon: '🔢' },
    emoji: { label: 'Emoji', icon: '😊' },
    word: { label: 'Kelime', icon: '💬' },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Yukleniyor...
        </div>
      </div>
    )
  }

  if (error === 'no_school') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Henuz bir okula atanmamissiniz</h2>
        <p className="text-gray-600 mb-6">
          Sinif olusturmak icin bir okul yoneticisinin sizi okula eklemesi gerekiyor.
          Lutfen okul yoneticinize basvurun.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 text-left space-y-2">
          <p className="font-semibold text-gray-800">Yonetici ne yapmali?</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Okul Paneline giris yapmali</li>
            <li>Kullanicilar bolumunden sizi ogretmen olarak eklemeli</li>
            <li>Bu islem sonrasi bu sayfa otomatik calisacaktir</li>
          </ol>
        </div>
      </div>
    )
  }

  if (error) return <div className="p-8 text-center text-red-600 font-medium">{error}</div>

  const totalStudents = classes.reduce((s, c) => s + c.student_count, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Siniflarim</h1>
          <p className="text-gray-600 mt-1">Siniflarinizi yonetin, ogrenci ekleyin ve giris bilgilerini goruntuleyin.</p>
        </div>
        <button
          onClick={() => setClassFormOpen(!classFormOpen)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni Sinif
        </button>
      </div>

      {/* Sinif Olusturma Formu */}
      {classFormOpen && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Yeni Sinif Olustur</h2>
            <button onClick={() => setClassFormOpen(false)} className="text-gray-400 hover:text-gray-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleCreateClass} className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sinif Adi</label>
              <input
                required
                type="text"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                placeholder="Orn: 6-A"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-48">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Giris Tipi</label>
              <select
                value={newClass.credential_type}
                onChange={(e) => setNewClass({ ...newClass, credential_type: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="pin">PIN (4 haneli)</option>
                <option value="emoji">Emoji Sembolu</option>
                <option value="word">Kelime</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-semibold"
            >
              {creating ? 'Olusturuluyor...' : 'Sinif Olustur'}
            </button>
          </form>
          {createError && (
            <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              <span className="font-semibold">Hata: </span>{createError}
            </div>
          )}
        </div>
      )}

      {/* Ozet Kartlari */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Sinif Sayisi</span>
            <span className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{classes.length}</div>
          <p className="text-xs text-gray-500 mt-2">Aktif siniflariniz</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Toplam Ogrenci</span>
            <span className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalStudents}</div>
          <p className="text-xs text-gray-500 mt-2">Tum siniflardaki ogrenci</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Hizli Erisim</span>
            <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
          </div>
          <p className="text-sm text-gray-600">Ogrenci giris bilgileri icin sinifa tiklayin.</p>
          <p className="text-xs text-gray-500 mt-2">PIN ve sifreleri goruntuleyebilirsiniz.</p>
        </div>
      </div>

      {/* Sinif Kartlari */}
      {classes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-semibold">Henuz sinif atanmamis</p>
          <p className="text-gray-500 text-sm mt-1">Okul yoneticinizden sinif atanmasini bekleyin.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => {
            const cred = credLabels[cls.credential_type] ?? credLabels.pin
            return (
              <Link
                key={cls.id}
                href={`/ogretmen/siniflar/${cls.id}`}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {cls.name}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">
                        {cls.name}
                      </h3>
                      {cls.school_name && (
                        <p className="text-xs text-gray-500">{cls.school_name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sinif Kodu</span>
                    <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-mono font-semibold text-xs">
                      {cls.access_code}
                    </code>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Giris Tipi</span>
                    <span className="text-gray-900 font-medium">
                      {cred.icon} {cred.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Ogrenci</span>
                    <span className="font-semibold text-gray-900">{cls.student_count}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Modul</span>
                    <span className="font-semibold text-gray-900">
                      {cls.module_count ?? 0} atanmis
                    </span>
                  </div>
                  {cls.avg_score !== null && cls.avg_score !== undefined && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Ort. Puan</span>
                      <span className={`font-semibold ${cls.avg_score >= 60 ? 'text-green-600' : 'text-amber-600'}`}>
                        {cls.avg_score}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                  <span className="text-sm font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Sinifi Yonet
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
