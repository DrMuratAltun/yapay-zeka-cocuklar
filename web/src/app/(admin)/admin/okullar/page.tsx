'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { School } from '@/types/saas'

export default function SuperAdminOkullar() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    quota_students: 110,
    quota_teachers: 5,
  })
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const fetchSchools = async () => {
    setLoading(true)
    const res = await fetch('/api/schools')
    if (res.ok) setSchools(await res.json())
    setLoading(false)
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError('')
    const res = await fetch('/api/schools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      setFormData({ name: '', quota_students: 110, quota_teachers: 5 })
      setFormOpen(false)
      fetchSchools()
    } else {
      const err = await res.json()
      setError(err.error)
    }
    setCreating(false)
  }

  const handleToggleSchool = async (schoolId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended'
    setTogglingId(schoolId)
    const res = await fetch(`/api/schools/${schoolId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      fetchSchools()
    } else {
      const err = await res.json()
      alert('Hata: ' + err.error)
    }
    setTogglingId(null)
  }

  const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
    active: { label: 'Aktif', dot: 'bg-green-500', bg: 'bg-green-50 text-green-800 border-green-200' },
    trial: { label: 'Deneme', dot: 'bg-amber-500', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    suspended: { label: 'Askida', dot: 'bg-red-500', bg: 'bg-red-50 text-red-800 border-red-200' },
  }

  // Platform istatistikleri
  const totalStudentQuota = schools.reduce((s, sc) => s + sc.quota_students, 0)
  const totalTeacherQuota = schools.reduce((s, sc) => s + sc.quota_teachers, 0)
  const activeCount = schools.filter(s => s.status === 'active').length
  const trialCount = schools.filter(s => s.status === 'trial').length
  const suspendedCount = schools.filter(s => s.status === 'suspended').length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Platform Yonetimi</h1>
          <p className="text-gray-600 mt-1">
            Tum okullari, kotalari ve kullanicilari buradan yonetin.
          </p>
        </div>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni Okul Ekle
        </button>
      </div>

      {/* Platform Ozet Kartlari */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Toplam Okul</span>
            <span className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{schools.length}</div>
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {activeCount} aktif
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {trialCount} deneme
            </span>
            {suspendedCount > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {suspendedCount} askida
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Ogrenci Kotasi</span>
            <span className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalStudentQuota}</div>
          <p className="text-xs text-gray-500 mt-2">Toplam ogrenci kapasitesi</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Ogretmen Kotasi</span>
            <span className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalTeacherQuota}</div>
          <p className="text-xs text-gray-500 mt-2">Toplam ogretmen kapasitesi</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Platform Durumu</span>
            <span className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-green-600">Aktif</div>
          <p className="text-xs text-gray-500 mt-2">Sistem calisiyor</p>
        </div>
      </div>

      {/* Okul Ekleme Formu */}
      {formOpen && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Yeni Okul Tanimla</h2>
            <button
              onClick={() => setFormOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Okul Adi
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Orn: ABC Koleji"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Ogrenci Kotasi
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  value={formData.quota_students}
                  onChange={(e) => setFormData({ ...formData, quota_students: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Ogretmen Kotasi
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  value={formData.quota_teachers}
                  onChange={(e) => setFormData({ ...formData, quota_teachers: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={creating}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-semibold"
              >
                {creating ? 'Olusturuluyor...' : 'Okul Olustur'}
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="text-gray-600 hover:text-gray-800 px-4 py-2.5 font-medium"
              >
                Iptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Okul Kartlari */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Yukleniyor...
          </div>
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-semibold">Henuz okul eklenmemis</p>
          <p className="text-gray-500 text-sm mt-1">
            &quot;Yeni Okul Ekle&quot; butonuyla baslayabilirsiniz.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Okullar</h2>
            <span className="text-sm text-gray-500">{schools.length} okul</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => {
              const st = statusConfig[school.status] ?? statusConfig.trial
              return (
                <Link
                  key={school.id}
                  href={`/admin/okullar/${school.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {school.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">
                        {school.name}
                      </h3>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${st.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {st.label}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Ogrenci kotasi</span>
                      <span className="font-semibold text-gray-900">{school.quota_students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Ogretmen kotasi</span>
                      <span className="font-semibold text-gray-900">{school.quota_teachers}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(school.created_at).toLocaleDateString('tr-TR')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleSchool(school.id, school.status) }}
                        disabled={togglingId === school.id}
                        title={school.status === 'suspended' ? 'Okulu Aktif Yap' : 'Okulu Pasif Yap'}
                        className={`p-1.5 rounded-lg transition disabled:opacity-50 ${
                          school.status === 'suspended'
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-amber-600 hover:bg-amber-50'
                        }`}
                      >
                        {school.status === 'suspended' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                          </svg>
                        )}
                      </button>
                      <span className="text-sm font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        Detay
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
