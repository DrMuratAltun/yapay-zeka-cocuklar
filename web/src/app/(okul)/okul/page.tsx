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
}

export default function OkulAdminPage() {
  const [data, setData] = useState<SchoolStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newClass, setNewClass] = useState({ name: '', credential_type: 'pin' })
  const [creating, setCreating] = useState(false)

  const fetchStats = async () => {
    setLoading(true)
    const res = await fetch('/api/schools/stats')
    if (res.ok) {
      setData(await res.json())
    } else {
      setError('Veriler yüklenemedi.')
    }
    setLoading(false)
  }

  useEffect(() => { fetchStats() }, [])

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    // Rastgele 6 karakterli sınıf kodu üret
    const code = Math.random().toString(36).substring(2, 5).toUpperCase() + '-GYZ'
    const res = await fetch('/api/schools/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newClass, access_code: code }),
    })
    if (res.ok) {
      setNewClass({ name: '', credential_type: 'pin' })
      fetchStats()
    } else {
      const err = await res.json()
      alert('Hata: ' + err.error)
    }
    setCreating(false)
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>
  if (!data) return null

  const { school, stats, classes } = data
  const studentPct = Math.round((stats.students_used / (stats.students_quota || 1)) * 100)
  const teacherPct = Math.round((stats.teachers_used / (stats.teachers_quota || 1)) * 100)

  return (
    <div className="p-8 max-w-5xl mx-auto text-black space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{school.name}</h1>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
            school.status === 'active' ? 'bg-green-100 text-green-800' :
            school.status === 'trial' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {school.status === 'active' ? 'Aktif' : school.status === 'trial' ? 'Deneme' : 'Askıda'}
          </span>
        </div>
      </div>

      {/* Kota Kartları */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Öğrenci Kotası</h3>
            <span className="text-2xl">👩‍🎓</span>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {stats.students_used} / {stats.students_quota}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${studentPct > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.min(studentPct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{stats.students_quota - stats.students_used} boş yer kaldı</p>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Öğretmen Kotası</h3>
            <span className="text-2xl">👩‍🏫</span>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {stats.teachers_used} / {stats.teachers_quota}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${teacherPct > 90 ? 'bg-red-500' : 'bg-purple-500'}`}
              style={{ width: `${Math.min(teacherPct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{stats.teachers_quota - stats.teachers_used} boş yer kaldı</p>
        </div>
      </div>

      {/* Sınıf Oluştur */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Yeni Sınıf Oluştur</h2>
        <form onSubmit={handleCreateClass} className="flex gap-3 items-end flex-wrap">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-medium mb-1">Sınıf Adı</label>
            <input
              required
              type="text"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              placeholder="Örn: 6-A"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="w-44">
            <label className="block text-sm font-medium mb-1">Giriş Tipi</label>
            <select
              value={newClass.credential_type}
              onChange={(e) => setNewClass({ ...newClass, credential_type: e.target.value })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              <option value="pin">PIN (4 haneli)</option>
              <option value="emoji">Emoji Sembolü</option>
              <option value="word">Kelime</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={creating}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition h-[42px]"
          >
            {creating ? 'Oluşturuluyor...' : 'Sınıf Oluştur'}
          </button>
        </form>
      </div>

      {/* Sınıf Listesi */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">Sınıflar ({classes.length})</h2>
        </div>
        {classes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Henüz sınıf oluşturulmamış.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Sınıf</th>
                <th className="p-4 font-semibold text-gray-600">Sınıf Kodu</th>
                <th className="p-4 font-semibold text-gray-600">Giriş Tipi</th>
                <th className="p-4 font-semibold text-gray-600">Öğrenci</th>
                <th className="p-4 font-semibold text-gray-600">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium">{cls.name}</td>
                  <td className="p-4">
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">
                      {cls.access_code}
                    </code>
                  </td>
                  <td className="p-4">
                    <span className="capitalize">
                      {cls.credential_type === 'pin' ? '🔢 PIN' :
                       cls.credential_type === 'emoji' ? '😊 Emoji' : '💬 Kelime'}
                    </span>
                  </td>
                  <td className="p-4">{cls.student_count} öğrenci</td>
                  <td className="p-4">
                    <Link
                      href={`/ogretmen/siniflar/${cls.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Yönet →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
