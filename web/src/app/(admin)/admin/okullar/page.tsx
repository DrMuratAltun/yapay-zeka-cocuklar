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

  const statusMap = {
    active: { label: 'Aktif', bg: 'bg-green-100 text-green-700' },
    trial: { label: 'Deneme', bg: 'bg-amber-100 text-amber-700' },
    suspended: { label: 'Askıda', bg: 'bg-red-100 text-red-700' },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Okul Yonetimi</h1>
            <p className="text-gray-500 mt-1">
              {schools.length} okul kayitli
            </p>
          </div>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <span className="text-lg">+</span> Yeni Okul
          </button>
        </div>

        {/* Okul Ekleme Formu */}
        {formOpen && (
          <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Yeni Okul Tanimla
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Okul Adi
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Orn: ABC Koleji"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ogrenci Kotasi
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    value={formData.quota_students}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quota_students: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ogretmen Kotasi
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    value={formData.quota_teachers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quota_teachers: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
                >
                  {creating ? 'Olusturuluyor...' : 'Okul Olustur'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 px-4 py-2.5"
                >
                  Iptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Okul Kartları */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Yukleniyor...</div>
        ) : schools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <div className="text-5xl mb-4">🏫</div>
            <p className="text-gray-500 text-lg">
              Henuz okul eklenmemis.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              &quot;Yeni Okul&quot; butonuyla baslayabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => {
              const st = statusMap[school.status] ?? statusMap.trial
              return (
                <Link
                  key={school.id}
                  href={`/admin/okullar/${school.id}`}
                  className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition">
                      {school.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${st.bg}`}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Ogrenci kotasi</span>
                      <span className="font-medium text-gray-700">
                        {school.quota_students}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ogretmen kotasi</span>
                      <span className="font-medium text-gray-700">
                        {school.quota_teachers}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-blue-600 text-sm font-medium group-hover:underline">
                    Detay ve Yonetim →
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
