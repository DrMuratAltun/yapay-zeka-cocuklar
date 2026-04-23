'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { CsvUploadResult, CredentialType } from '@/types/saas'

interface StudentItem {
  id: string
  user_id: string
  nickname: string
  credential_plain: string
  created_at: string
}

interface StudentProgress {
  user_id: string
  nickname: string
  total_activities: number
  total_score: number
  last_activity_at: string | null
  distinct_bolumler: number
}

interface ProgressSummary {
  total_students: number
  active_students: number
  total_activities: number
  total_score: number
}

function yakinZaman(iso: string) {
  const t = new Date(iso).getTime()
  const simdi = Date.now()
  const fark = Math.floor((simdi - t) / 1000)
  if (fark < 60) return 'az önce'
  if (fark < 3600) return `${Math.floor(fark / 60)} dk önce`
  if (fark < 86400) return `${Math.floor(fark / 3600)} sa önce`
  if (fark < 604800) return `${Math.floor(fark / 86400)} gün önce`
  return new Date(iso).toLocaleDateString('tr-TR')
}

interface ClassInfo {
  id: string
  name: string
  access_code: string
  credential_type: CredentialType
  school_id: string
  teacher_id: string
}

export default function SinifDetay() {
  const params = useParams()
  const classId = params.classId as string

  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null)
  const [students, setStudents] = useState<StudentItem[]>([])
  const [progressMap, setProgressMap] = useState<Record<string, StudentProgress>>({})
  const [progressSummary, setProgressSummary] = useState<ProgressSummary | null>(null)
  const [loading, setLoading] = useState(true)

  // Toplu ekleme
  const [nicknameText, setNicknameText] = useState('')
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bulkResult, setBulkResult] = useState<CsvUploadResult | null>(null)
  const [bulkError, setBulkError] = useState('')

  // Tek ekleme
  const [singleNickname, setSingleNickname] = useState('')
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleMsg, setSingleMsg] = useState({ type: '', text: '' })

  // Aksiyon mesajları
  const [actionMsg, setActionMsg] = useState('')

  const fetchStudents = async () => {
    setLoading(true)
    const [studRes, progRes] = await Promise.all([
      fetch(`/api/classes/${classId}/students`),
      fetch(`/api/classes/${classId}/progress`),
    ])
    if (studRes.ok) {
      const data = await studRes.json()
      setClassInfo(data.classInfo)
      setStudents(data.students)
    }
    if (progRes.ok) {
      const pdata = await progRes.json()
      const map: Record<string, StudentProgress> = {}
      for (const p of (pdata.progress ?? []) as StudentProgress[]) {
        map[p.user_id] = p
      }
      setProgressMap(map)
      setProgressSummary(pdata.summary ?? null)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [classId])

  // Toplu ekleme
  const handleBulkUpload = async () => {
    setBulkLoading(true)
    setBulkResult(null)
    setBulkError('')

    const lines = nicknameText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    const csvContent = 'nickname\n' + lines.join('\n')
    const file = new Blob([csvContent], { type: 'text/csv' })

    const formData = new FormData()
    formData.append('file', file, 'ogrenciler.csv')
    formData.append('classId', classId)

    try {
      const res = await fetch('/api/schools/students/csv', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setBulkError(data.error ?? 'Beklenmeyen hata')
      } else {
        setBulkResult(data)
        setNicknameText('')
        fetchStudents()
      }
    } catch {
      setBulkError('Baglanti hatasi')
    }
    setBulkLoading(false)
  }

  // Tek ogrenci ekleme
  const handleSingleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSingleLoading(true)
    setSingleMsg({ type: '', text: '' })

    const res = await fetch(`/api/classes/${classId}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: singleNickname.trim() }),
    })
    const data = await res.json()

    if (res.ok) {
      setSingleMsg({
        type: 'success',
        text: `${data.nickname} eklendi. PIN: ${data.credential}`,
      })
      setSingleNickname('')
      fetchStudents()
    } else {
      setSingleMsg({ type: 'error', text: data.error })
    }
    setSingleLoading(false)
  }

  // Ogrenci sil
  const handleDelete = async (studentId: string, nickname: string) => {
    if (!confirm(`${nickname} adli ogrenciyi silmek istediginize emin misiniz?`))
      return

    const res = await fetch(`/api/classes/${classId}/students/${studentId}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      setActionMsg(`${nickname} silindi.`)
      fetchStudents()
    } else {
      setActionMsg('Hata olustu.')
    }
    setTimeout(() => setActionMsg(''), 3000)
  }

  // Credential sifirla
  const handleReset = async (studentId: string, nickname: string) => {
    if (!confirm(`${nickname} icin yeni PIN/sifre olusturulacak. Emin misiniz?`))
      return

    const res = await fetch(
      `/api/classes/${classId}/students/${studentId}/reset`,
      { method: 'POST' }
    )
    const data = await res.json()
    if (res.ok) {
      setActionMsg(`${data.nickname}: Yeni sifre → ${data.new_credential}`)
      fetchStudents()
    } else {
      setActionMsg('Hata olustu.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Yukleniyor...</p>
      </div>
    )
  }

  const credLabel =
    classInfo?.credential_type === 'pin'
      ? 'PIN'
      : classInfo?.credential_type === 'emoji'
      ? 'Emoji'
      : 'Kelime'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 sm:p-8">
        {/* Geri linki */}
        <div className="mb-3">
          <a href="/ogretmen" className="text-sm text-violet-600 hover:underline">
            ← Öğretmen Paneli
          </a>
        </div>

        {/* Sinif Bilgi Karti */}
        {classInfo && (
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl p-5 mb-4 text-white shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Sınıf
                </p>
                <h1 className="text-2xl font-extrabold mt-0.5">{classInfo.name}</h1>
                <div className="flex items-center gap-3 mt-2 text-sm flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                    🔑 Kod:{' '}
                    <code className="font-mono font-bold tracking-wide">
                      {classInfo.access_code}
                    </code>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                    {classInfo.credential_type === 'pin' ? '🔢' : classInfo.credential_type === 'emoji' ? '😊' : '💬'} {credLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* İstatistik kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Öğrenci</p>
            <p className="text-2xl font-extrabold text-violet-600 mt-1">{students.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Aktif Öğrenci</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">
              {progressSummary?.active_students ?? 0}
              <span className="text-sm text-slate-400 font-normal">/{students.length}</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Toplam Etkinlik</p>
            <p className="text-2xl font-extrabold text-sky-600 mt-1">
              {progressSummary?.total_activities ?? 0}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Toplam Puan</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {progressSummary?.total_score ?? 0}
            </p>
          </div>
        </div>

        {/* Aksiyon mesaji */}
        {actionMsg && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg mb-4 text-sm">
            {actionMsg}
          </div>
        )}

        {/* Iki sutunlu ekleme alani */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Tek ogrenci ekleme */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Ogrenci Ekle
            </h2>
            <form onSubmit={handleSingleAdd} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">
                  Takma ad
                </label>
                <input
                  required
                  type="text"
                  value={singleNickname}
                  onChange={(e) => setSingleNickname(e.target.value)}
                  placeholder="Orn: KaplanAli"
                  className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={singleLoading}
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50 transition font-medium whitespace-nowrap"
              >
                {singleLoading ? '...' : 'Ekle'}
              </button>
            </form>
            {singleMsg.text && (
              <p
                className={`mt-2 text-sm ${
                  singleMsg.type === 'error' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {singleMsg.text}
              </p>
            )}
          </div>

          {/* Toplu ekleme */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Toplu Ekle
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Her satira bir takma ad yazin. PIN otomatik olusturulur.
            </p>
            <textarea
              value={nicknameText}
              onChange={(e) => setNicknameText(e.target.value)}
              className="w-full h-24 border rounded-lg p-2.5 font-mono text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
              placeholder={'KaplanAli\nYildizAyse\nUzayMehmet'}
            />
            <button
              onClick={handleBulkUpload}
              disabled={bulkLoading || !nicknameText.trim()}
              className="mt-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition font-medium text-sm"
            >
              {bulkLoading ? 'Yukleniyor...' : 'Toplu Hesap Olustur'}
            </button>
            {bulkError && (
              <p className="mt-2 text-sm text-red-600">{bulkError}</p>
            )}
            {bulkResult && (
              <div className="mt-2 text-sm">
                {bulkResult.success.length > 0 && (
                  <p className="text-green-600">
                    {bulkResult.success.length} ogrenci eklendi.
                  </p>
                )}
                {bulkResult.errors.length > 0 && (
                  <div className="text-red-600">
                    {bulkResult.errors.map((e, i) => (
                      <p key={i}>
                        {e.nickname}: {e.reason}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Ogrenci Listesi */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Ogrenci Listesi ({students.length})
            </h2>
          </div>
          {students.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              Henuz ogrenci eklenmemis. Yukardaki formlari kullanarak ogrenci
              ekleyebilirsiniz.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b text-[10px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="p-3 font-bold">#</th>
                    <th className="p-3 font-bold">Takma Ad</th>
                    <th className="p-3 font-bold">{credLabel}</th>
                    <th className="p-3 font-bold">İlerleme</th>
                    <th className="p-3 font-bold text-center">Etkinlik</th>
                    <th className="p-3 font-bold text-center">Puan</th>
                    <th className="p-3 font-bold">Son Aktivite</th>
                    <th className="p-3 font-bold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => {
                    const p = progressMap[s.user_id]
                    const bolumYuzde = Math.min(100, Math.round(((p?.distinct_bolumler ?? 0) / 10) * 100))
                    const sonZaman = p?.last_activity_at
                      ? yakinZaman(p.last_activity_at)
                      : '—'
                    return (
                      <tr
                        key={s.id}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="p-3 text-gray-400">{i + 1}</td>
                        <td className="p-3 font-medium text-gray-800">
                          {s.nickname}
                        </td>
                        <td className="p-3">
                          <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
                            {s.credential_plain}
                          </code>
                        </td>
                        <td className="p-3 min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 flex-1 max-w-[80px] rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  bolumYuzde >= 70
                                    ? 'bg-emerald-500'
                                    : bolumYuzde >= 30
                                    ? 'bg-violet-500'
                                    : bolumYuzde > 0
                                    ? 'bg-amber-500'
                                    : 'bg-slate-300'
                                }`}
                                style={{ width: `${bolumYuzde}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                              {p?.distinct_bolumler ?? 0}/10
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-sky-600">
                          {p?.total_activities ?? 0}
                        </td>
                        <td className="p-3 text-center font-bold text-amber-600">
                          {p?.total_score ?? 0}
                        </td>
                        <td className="p-3 text-gray-500 text-xs">{sonZaman}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReset(s.id, s.nickname)}
                              className="rounded-md bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                            >
                              🔑 Şifre
                            </button>
                            <button
                              onClick={() => handleDelete(s.id, s.nickname)}
                              className="rounded-md bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                            >
                              🗑️ Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
