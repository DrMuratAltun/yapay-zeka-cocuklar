'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface SchoolStats {
  school: { id: string; name: string; status: string }
  stats: {
    students_used: number
    students_quota: number
    teachers_used: number
    teachers_quota: number
  }
  classes: {
    id: string
    name: string
    access_code: string
    credential_type: string
    student_count: number
  }[]
  users: {
    id: string
    user_id: string
    role: string
    created_at: string
    email: string
    full_name: string
    is_active: boolean
  }[]
}

export default function OkulAdminPage() {
  const [data, setData] = useState<SchoolStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newClass, setNewClass] = useState({ name: '', credential_type: 'pin' })
  const [creating, setCreating] = useState(false)
  const [classFormOpen, setClassFormOpen] = useState(false)
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [newTeacher, setNewTeacher] = useState({ email: '', password: '', full_name: '' })
  const [addingTeacher, setAddingTeacher] = useState(false)
  const [actionId, setActionId] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    const res = await fetch('/api/schools/stats')
    if (res.ok) {
      setData(await res.json())
    } else {
      setError('Veriler yuklenemedi.')
    }
    setLoading(false)
  }

  useEffect(() => { fetchStats() }, [])

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    const code = Math.random().toString(36).substring(2, 5).toUpperCase() + '-GYZ'
    const res = await fetch('/api/schools/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newClass, access_code: code }),
    })
    if (res.ok) {
      setNewClass({ name: '', credential_type: 'pin' })
      setClassFormOpen(false)
      fetchStats()
    } else {
      const err = await res.json()
      alert('Hata: ' + err.error)
    }
    setCreating(false)
  }

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    setAddingTeacher(true)
    const res = await fetch(`/api/schools/${data.school.id}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTeacher, role: 'teacher' }),
    })
    if (res.ok) {
      setNewTeacher({ email: '', password: '', full_name: '' })
      setTeacherFormOpen(false)
      fetchStats()
    } else {
      const err = await res.json()
      alert('Hata: ' + err.error)
    }
    setAddingTeacher(false)
  }

  const handleRemoveTeacher = async (userId: string) => {
    if (!data || !confirm('Bu ogretmeni okuldan kalici olarak kaldirmak istediginize emin misiniz?')) return
    setActionId(userId)
    const res = await fetch(`/api/schools/${data.school.id}/users`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    if (res.ok) {
      fetchStats()
    } else {
      const err = await res.json()
      alert('Hata: ' + err.error)
    }
    setActionId(null)
  }

  const handleToggleTeacher = async (userId: string, currentActive: boolean) => {
    if (!data) return
    setActionId(userId)
    const res = await fetch(`/api/schools/${data.school.id}/users`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, is_active: !currentActive }),
    })
    if (res.ok) {
      fetchStats()
    } else {
      const err = await res.json()
      alert('Hata: ' + err.error)
    }
    setActionId(null)
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
  if (error) return <div className="p-8 text-center text-red-600 font-medium">{error}</div>
  if (!data) return null

  const { school, stats, classes, users } = data
  const teachers = (users ?? []).filter((u) => u.role === 'teacher')
  const studentPct = Math.round((stats.students_used / (stats.students_quota || 1)) * 100)
  const teacherPct = Math.round((stats.teachers_used / (stats.teachers_quota || 1)) * 100)

  const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
    active: { label: 'Aktif', dot: 'bg-green-500', bg: 'bg-green-50 text-green-800 border-green-200' },
    trial: { label: 'Deneme', dot: 'bg-amber-500', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    suspended: { label: 'Askida', dot: 'bg-red-500', bg: 'bg-red-50 text-red-800 border-red-200' },
  }
  const st = statusConfig[school.status] ?? statusConfig.trial

  const credLabels: Record<string, string> = {
    pin: 'PIN (4 Hane)',
    emoji: 'Emoji Sembolu',
    word: 'Kelime',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{school.name}</h1>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${st.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
              {st.label}
            </span>
          </div>
          <p className="text-gray-600">Okul yonetim paneli — siniflar, ogretmenler ve ogrenci kotalari</p>
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

      {/* Kota Kartlari */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Ogrenci Kullanimi</span>
            <span className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.students_used}
            <span className="text-base font-normal text-gray-400"> / {stats.students_quota}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all ${studentPct > 90 ? 'bg-red-500' : studentPct > 70 ? 'bg-amber-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.min(studentPct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{stats.students_quota - stats.students_used} bos yer kaldi</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Ogretmen Kullanimi</span>
            <span className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.teachers_used}
            <span className="text-base font-normal text-gray-400"> / {stats.teachers_quota}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all ${teacherPct > 90 ? 'bg-red-500' : teacherPct > 70 ? 'bg-amber-500' : 'bg-purple-500'}`}
              style={{ width: `${Math.min(teacherPct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{stats.teachers_quota - stats.teachers_used} bos yer kaldi</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Toplam Sinif</span>
            <span className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{classes.length}</div>
          <p className="text-xs text-gray-500 mt-2">Aktif sinif sayisi</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">Toplam Ogrenci</span>
            <span className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {classes.reduce((s, c) => s + c.student_count, 0)}
          </div>
          <p className="text-xs text-gray-500 mt-2">Tum siniflardaki ogrenci</p>
        </div>
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
        </div>
      )}

      {/* Ogretmen Yonetimi */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Ogretmenler</h2>
          <button
            onClick={() => setTeacherFormOpen(!teacherFormOpen)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-800 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Ogretmen Ekle
          </button>
        </div>

        {teacherFormOpen && (
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
            <form onSubmit={handleAddTeacher} className="flex gap-3 items-end flex-wrap">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  value={newTeacher.full_name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, full_name: e.target.value })}
                  placeholder="Orn: Ayse Yilmaz"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex-1 min-w-[180px]">
                <label className="block text-xs font-semibold text-gray-700 mb-1">E-posta *</label>
                <input
                  required
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  placeholder="ogretmen@ornek.com"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="w-40">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Sifre *</label>
                <input
                  required
                  type="password"
                  value={newTeacher.password}
                  onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                  placeholder="Min 6 karakter"
                  minLength={6}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={addingTeacher}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition font-semibold text-sm"
              >
                {addingTeacher ? 'Ekleniyor...' : 'Ekle'}
              </button>
            </form>
          </div>
        )}

        {teachers.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-50 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold">Henuz ogretmen eklenmemis</p>
            <p className="text-gray-500 text-sm mt-1">&quot;Ogretmen Ekle&quot; butonuyla yeni ogretmen ekleyebilirsiniz.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ogretmen</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">E-posta</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Eklenme</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Islemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((u) => (
                  <tr key={u.id} className={`hover:bg-gray-50 transition ${u.is_active === false ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${u.is_active === false ? 'bg-gray-100 text-gray-400' : 'bg-purple-100 text-purple-700'}`}>
                          {(u.full_name || u.email || '?')[0].toUpperCase()}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">{u.full_name || u.email?.split('@')[0] || 'Isimsiz'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-gray-600">{u.email}</span>
                    </td>
                    <td className="px-6 py-3">
                      {u.is_active === false ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Pasif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Aktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(u.created_at).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {/* Pasif / Aktif Toggle */}
                        <button
                          onClick={() => handleToggleTeacher(u.user_id, u.is_active !== false)}
                          disabled={actionId === u.user_id}
                          title={u.is_active === false ? 'Aktif Yap' : 'Pasif Yap'}
                          className={`p-1.5 rounded-lg transition disabled:opacity-50 ${
                            u.is_active === false
                              ? 'text-green-600 hover:bg-green-50 hover:text-green-800'
                              : 'text-amber-600 hover:bg-amber-50 hover:text-amber-800'
                          }`}
                        >
                          {u.is_active === false ? (
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
                        {/* Kaldir */}
                        <button
                          onClick={() => handleRemoveTeacher(u.user_id)}
                          disabled={actionId === u.user_id}
                          title="Okuldan Kaldir"
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-800 transition disabled:opacity-50"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sinif Listesi */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Siniflar</h2>
          <span className="text-sm text-gray-500">{classes.length} sinif</span>
        </div>
        {classes.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold">Henuz sinif olusturulmamis</p>
            <p className="text-gray-500 text-sm mt-1">&quot;Yeni Sinif&quot; butonuyla baslayabilirsiniz.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sinif</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sinif Kodu</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Giris Tipi</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ogrenci</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Islem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{cls.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-sm font-mono font-semibold">
                        {cls.access_code}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {credLabels[cls.credential_type] ?? cls.credential_type}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        {cls.student_count}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/ogretmen/siniflar/${cls.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                      >
                        Yonet
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
