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
    const res = await fetch(`/api/classes/${classId}/students`)
    if (res.ok) {
      const data = await res.json()
      setClassInfo(data.classInfo)
      setStudents(data.students)
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
        {/* Sinif Bilgi Karti */}
        {classInfo && (
          <div className="bg-white rounded-xl border p-5 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {classInfo.name}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>
                    Sinif Kodu:{' '}
                    <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-medium">
                      {classInfo.access_code}
                    </code>
                  </span>
                  <span>Giris Tipi: {credLabel}</span>
                  <span>{students.length} ogrenci</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-medium text-gray-500">#</th>
                    <th className="p-4 font-medium text-gray-500">Takma Ad</th>
                    <th className="p-4 font-medium text-gray-500">{credLabel}</th>
                    <th className="p-4 font-medium text-gray-500">Eklenme</th>
                    <th className="p-4 font-medium text-gray-500">Islemler</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr
                      key={s.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-400">{i + 1}</td>
                      <td className="p-4 font-medium text-gray-800">
                        {s.nickname}
                      </td>
                      <td className="p-4">
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">
                          {s.credential_plain}
                        </code>
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(s.created_at).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleReset(s.id, s.nickname)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Sifre Sifirla
                          </button>
                          <button
                            onClick={() => handleDelete(s.id, s.nickname)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Sil
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
      </div>
    </div>
  )
}
