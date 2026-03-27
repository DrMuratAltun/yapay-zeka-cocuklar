'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface SchoolUser {
  id: string
  user_id: string
  role: string
  created_at: string
}

interface ClassItem {
  id: string
  name: string
  access_code: string
  credential_type: string
  teacher_id: string
  student_count: number
}

interface SchoolDetail {
  school: {
    id: string
    name: string
    status: string
    quota_students: number
    quota_teachers: number
  }
  users: SchoolUser[]
  classes: ClassItem[]
  stats: {
    students_used: number
    students_quota: number
    teachers_used: number
    teachers_quota: number
  }
}

type Tab = 'overview' | 'users' | 'classes'

export default function SchoolDetailPage() {
  const { schoolId } = useParams() as { schoolId: string }
  const router = useRouter()
  const [data, setData] = useState<SchoolDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('overview')

  // Kullanıcı ekleme formu
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'teacher' as string,
  })
  const [addingUser, setAddingUser] = useState(false)
  const [userMsg, setUserMsg] = useState({ type: '', text: '' })

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`/api/schools/${schoolId}`)
    if (res.ok) {
      setData(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [schoolId])

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddingUser(true)
    setUserMsg({ type: '', text: '' })

    const res = await fetch(`/api/schools/${schoolId}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userForm),
    })
    const result = await res.json()

    if (res.ok) {
      setUserMsg({
        type: 'success',
        text: `${userForm.email} basariyla eklendi.`,
      })
      setUserForm({ email: '', password: '', full_name: '', role: 'teacher' })
      fetchData()
    } else {
      setUserMsg({ type: 'error', text: result.error })
    }
    setAddingUser(false)
  }

  const handleRemoveUser = async (userId: string) => {
    if (!confirm('Bu kullaniciyi okuldan cikaracaksiniz. Emin misiniz?')) return

    const res = await fetch(`/api/schools/${schoolId}/users`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })

    if (res.ok) fetchData()
    else alert('Hata olustu.')
  }

  const handleStatusChange = async (status: string) => {
    await fetch(`/api/schools/${schoolId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Yukleniyor...</p>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Okul bulunamadi.</p>
      </div>
    )
  }

  const { school, users, classes, stats } = data
  const studentPct = Math.round(
    (stats.students_used / Math.max(stats.students_quota, 1)) * 100
  )
  const teacherPct = Math.round(
    (stats.teachers_used / Math.max(stats.teachers_quota, 1)) * 100
  )

  const statusMap: Record<string, { label: string; bg: string }> = {
    active: { label: 'Aktif', bg: 'bg-green-100 text-green-700' },
    trial: { label: 'Deneme', bg: 'bg-amber-100 text-amber-700' },
    suspended: { label: 'Askida', bg: 'bg-red-100 text-red-700' },
  }
  const st = statusMap[school.status] ?? statusMap.trial

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Genel Bakis' },
    { key: 'users', label: `Kullanicilar (${users.length})` },
    { key: 'classes', label: `Siniflar (${classes.length})` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 sm:p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/admin/okullar" className="hover:text-blue-600">
            Okullar
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{school.name}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${st.bg}`}>
              {st.label}
            </span>
          </div>
          <div className="flex gap-2">
            {school.status !== 'active' && (
              <button
                onClick={() => handleStatusChange('active')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
              >
                Aktif Yap
              </button>
            )}
            {school.status !== 'suspended' && (
              <button
                onClick={() => handleStatusChange('suspended')}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition"
              >
                Askiya Al
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${
                tab === t.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Genel Bakış */}
        {tab === 'overview' && (
          <div className="space-y-6">
            {/* Kota Kartları */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Ogrenci Kotasi
                  </h3>
                  <span className="text-2xl">👩‍🎓</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.students_used}{' '}
                  <span className="text-lg text-gray-400 font-normal">
                    / {stats.students_quota}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      studentPct > 90 ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(studentPct, 100)}%` }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl border p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Ogretmen Kotasi
                  </h3>
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.teachers_used}{' '}
                  <span className="text-lg text-gray-400 font-normal">
                    / {stats.teachers_quota}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      teacherPct > 90 ? 'bg-red-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${Math.min(teacherPct, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Özet Bilgiler */}
            <div className="bg-white rounded-xl border p-5 grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {classes.length}
                </div>
                <div className="text-sm text-gray-500 mt-1">Sinif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {users.filter((u) => u.role === 'teacher').length}
                </div>
                <div className="text-sm text-gray-500 mt-1">Ogretmen</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {users.filter((u) => u.role === 'school_admin').length}
                </div>
                <div className="text-sm text-gray-500 mt-1">Okul Yoneticisi</div>
              </div>
            </div>
          </div>
        )}

        {/* Kullanıcılar Tab */}
        {tab === 'users' && (
          <div className="space-y-6">
            {/* Kullanıcı Ekleme Formu */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Yonetici / Ogretmen Ekle
              </h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      E-posta
                    </label>
                    <input
                      required
                      type="email"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                      placeholder="ornek@okul.com"
                      className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Sifre
                    </label>
                    <input
                      required
                      type="text"
                      value={userForm.password}
                      onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                      }
                      placeholder="En az 6 karakter"
                      minLength={6}
                      className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={userForm.full_name}
                      onChange={(e) =>
                        setUserForm({ ...userForm, full_name: e.target.value })
                      }
                      placeholder="Orn: Ayse Yilmaz"
                      className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Rol
                    </label>
                    <select
                      value={userForm.role}
                      onChange={(e) =>
                        setUserForm({ ...userForm, role: e.target.value })
                      }
                      className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                      <option value="teacher">Ogretmen</option>
                      <option value="school_admin">Okul Yoneticisi</option>
                    </select>
                  </div>
                </div>
                {userMsg.text && (
                  <p
                    className={`text-sm ${
                      userMsg.type === 'error'
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {userMsg.text}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={addingUser}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
                >
                  {addingUser ? 'Ekleniyor...' : 'Kullanici Ekle'}
                </button>
              </form>
            </div>

            {/* Kullanıcı Listesi */}
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="p-5 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  Kayitli Kullanicilar
                </h3>
              </div>
              {users.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  Henuz kullanici eklenmemis. Yukardaki formu kullanarak
                  ogretmen veya yonetici ekleyebilirsiniz.
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4 font-medium text-gray-500">Rol</th>
                      <th className="p-4 font-medium text-gray-500">
                        Kullanici ID
                      </th>
                      <th className="p-4 font-medium text-gray-500">
                        Eklenme Tarihi
                      </th>
                      <th className="p-4 font-medium text-gray-500">Islem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              u.role === 'school_admin'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {u.role === 'school_admin'
                              ? 'Okul Yoneticisi'
                              : 'Ogretmen'}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs text-gray-500">
                          {u.user_id.substring(0, 8)}...
                        </td>
                        <td className="p-4 text-gray-500">
                          {new Date(u.created_at).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleRemoveUser(u.user_id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Cikar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Sınıflar Tab */}
        {tab === 'classes' && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Sinif Listesi
              </h3>
            </div>
            {classes.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                Henuz sinif olusturulmamis. Okul yoneticisi veya ogretmen sinif
                olusturabilir.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-medium text-gray-500">Sinif</th>
                    <th className="p-4 font-medium text-gray-500">Kod</th>
                    <th className="p-4 font-medium text-gray-500">
                      Giris Tipi
                    </th>
                    <th className="p-4 font-medium text-gray-500">Ogrenci</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => (
                    <tr
                      key={cls.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {cls.name}
                      </td>
                      <td className="p-4">
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">
                          {cls.access_code}
                        </code>
                      </td>
                      <td className="p-4">
                        {cls.credential_type === 'pin'
                          ? 'PIN'
                          : cls.credential_type === 'emoji'
                          ? 'Emoji'
                          : 'Kelime'}
                      </td>
                      <td className="p-4">{cls.student_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Geri butonu */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/admin/okullar')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Tum Okullara Don
          </button>
        </div>
      </div>
    </div>
  )
}
