'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Papa from 'papaparse'
import type { CsvUploadResult, CredentialType, ModuleOrder } from '@/types/saas'

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
  const router = useRouter()
  const classId = params.classId as string

  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null)
  const [students, setStudents] = useState<StudentItem[]>([])
  const [loading, setLoading] = useState(true)

  // Toplu ekleme (CSV)
  const [nicknameText, setNicknameText] = useState('')
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bulkResult, setBulkResult] = useState<CsvUploadResult | null>(null)
  const [bulkError, setBulkError] = useState('')
  const [csvPreview, setCsvPreview] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Tek ekleme
  const [singleNickname, setSingleNickname] = useState('')
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleMsg, setSingleMsg] = useState({ type: '', text: '' })

  // Aksiyon mesajları
  const [actionMsg, setActionMsg] = useState('')

  // Modül atama state
  const [moduleOrder, setModuleOrder] = useState<ModuleOrder>('sequential')
  const [assignedModules, setAssignedModules] = useState<
    { bolumNo: number; sortOrder: number; minQuizScore: number }[]
  >([])
  const [moduleSaving, setModuleSaving] = useState(false)
  const [moduleMsg, setModuleMsg] = useState('')
  const [moduleLoaded, setModuleLoaded] = useState(false)

  // Sınıf düzenleme/silme
  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [deleting, setDeleting] = useState(false)

  // Quiz ilerleme tablosu
  const [progressData, setProgressData] = useState<{
    modules: { bolum_no: number }[]
    students: {
      nickname: string
      modules: { bolumNo: number; score: number | null; passed: boolean }[]
      passedCount: number
      avgScore: number | null
    }[]
  } | null>(null)
  const [progressLoading, setProgressLoading] = useState(false)

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

  const fetchModules = useCallback(async () => {
    const res = await fetch(`/api/classes/${classId}/modules`)
    if (res.ok) {
      const data = await res.json()
      setModuleOrder(data.moduleOrder ?? 'sequential')
      setAssignedModules(
        (data.modules ?? []).map((m: { bolum_no: number; sort_order: number; min_quiz_score: number }) => ({
          bolumNo: m.bolum_no,
          sortOrder: m.sort_order,
          minQuizScore: m.min_quiz_score,
        }))
      )
      setModuleLoaded(true)
    }
  }, [classId])

  const fetchProgress = useCallback(async () => {
    setProgressLoading(true)
    const res = await fetch(`/api/classes/${classId}/progress`)
    if (res.ok) {
      setProgressData(await res.json())
    }
    setProgressLoading(false)
  }, [classId])

  useEffect(() => {
    fetchStudents()
    fetchModules()
    fetchProgress()
  }, [classId, fetchModules, fetchProgress])

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

  // Modül toggle
  const bolumBasliklari: Record<number, string> = {
    1: 'Yapay Zeka Nedir?',
    2: 'Veriler ve Yapay Zeka',
    3: 'Makine Öğrenmesi',
    4: 'Yapay Zekanın Dili',
    5: 'Görüntü Tanıma',
    6: 'Yaratıcı Yapay Zeka',
    7: 'Akıllı Asistanlar',
    8: 'Etik ve Sorumluluk',
    9: 'Günlük Hayatta YZ',
    10: 'Geleceği Tasarla',
  }

  const toggleModule = (bolumNo: number) => {
    setAssignedModules((prev) => {
      const exists = prev.find((m) => m.bolumNo === bolumNo)
      if (exists) {
        return prev.filter((m) => m.bolumNo !== bolumNo)
      }
      return [
        ...prev,
        { bolumNo, sortOrder: prev.length, minQuizScore: 60 },
      ]
    })
  }

  const updateMinScore = (bolumNo: number, score: number) => {
    setAssignedModules((prev) =>
      prev.map((m) =>
        m.bolumNo === bolumNo ? { ...m, minQuizScore: score } : m
      )
    )
  }

  const handleSaveModules = async () => {
    setModuleSaving(true)
    setModuleMsg('')

    // sortOrder'ları yeniden hesapla
    const sorted = [...assignedModules].sort((a, b) => a.bolumNo - b.bolumNo)
    const modulesWithOrder = sorted.map((m, i) => ({
      ...m,
      sortOrder: i,
    }))

    const res = await fetch(`/api/classes/${classId}/modules`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        moduleOrder,
        modules: modulesWithOrder,
      }),
    })

    if (res.ok) {
      setModuleMsg('Modül ataması kaydedildi!')
      setAssignedModules(modulesWithOrder)
    } else {
      const data = await res.json()
      setModuleMsg(`Hata: ${data.error}`)
    }
    setModuleSaving(false)
    setTimeout(() => setModuleMsg(''), 3000)
  }

  // Sınıf adını güncelle
  const handleRenameClass = async () => {
    if (!newName.trim()) return
    const res = await fetch(`/api/classes/${classId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    })
    if (res.ok) {
      setClassInfo((prev) => prev ? { ...prev, name: newName.trim() } : prev)
      setEditingName(false)
      setActionMsg('Sinif adi guncellendi.')
      setTimeout(() => setActionMsg(''), 3000)
    }
  }

  // Sınıfı sil
  const handleDeleteClass = async () => {
    if (!confirm('Bu sinifi ve tum ogrencileri silmek istediginize emin misiniz? Bu islem geri alinamaz!'))
      return
    setDeleting(true)
    const res = await fetch(`/api/classes/${classId}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/ogretmen/siniflar')
    } else {
      const data = await res.json()
      setActionMsg(`Hata: ${data.error}`)
      setDeleting(false)
    }
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

  // CSV dosya parse
  const handleCsvFile = (file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      setBulkError('Sadece .csv veya .txt dosyasi yukleyebilirsiniz.')
      return
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const nicknames: string[] = []
        for (const row of results.data as Record<string, string>[]) {
          // "nickname", "takma_ad", "ad", "isim", "name" sütunlarını dene
          const nick =
            row['nickname'] ||
            row['takma_ad'] ||
            row['ad'] ||
            row['isim'] ||
            row['name'] ||
            row['Nickname'] ||
            row['Ad'] ||
            row['İsim'] ||
            Object.values(row)[0] // fallback: ilk sütun
          if (nick?.trim()) nicknames.push(nick.trim())
        }
        if (nicknames.length === 0) {
          setBulkError('CSV dosyasinda ogrenci bulunamadi. "nickname" sutunu olmali.')
          return
        }
        setCsvPreview(nicknames)
        setNicknameText(nicknames.join('\n'))
        setBulkError('')
        setBulkResult(null)
      },
      error: () => {
        setBulkError('CSV dosyasi okunamadi.')
      },
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleCsvFile(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleCsvFile(file)
    e.target.value = ''
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
              <div className="flex-1">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-2xl font-bold text-gray-900 border rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameClass()
                        if (e.key === 'Escape') setEditingName(false)
                      }}
                    />
                    <button
                      onClick={handleRenameClass}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Kaydet"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </button>
                    <button
                      onClick={() => setEditingName(false)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Iptal"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {classInfo.name}
                    </h1>
                    <button
                      onClick={() => {
                        setNewName(classInfo.name)
                        setEditingName(true)
                      }}
                      className="text-gray-400 hover:text-blue-600 p-1"
                      title="Adi duzenle"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                  </div>
                )}
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
              <button
                onClick={handleDeleteClass}
                disabled={deleting}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition disabled:opacity-50"
                title="Sinifi sil"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Aksiyon mesaji */}
        {actionMsg && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg mb-4 text-sm">
            {actionMsg}
          </div>
        )}

        {/* Modül Atama Bölümü */}
        {moduleLoaded && (
          <div className="bg-white rounded-xl border p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Modül Ataması
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Sıralama:</label>
                <select
                  value={moduleOrder}
                  onChange={(e) => setModuleOrder(e.target.value as ModuleOrder)}
                  className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                >
                  <option value="sequential">Sıralı (kilit sistemi)</option>
                  <option value="random">Serbest</option>
                </select>
              </div>
            </div>

            {moduleOrder === 'sequential' && (
              <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-2 mb-3">
                Sıralı modda öğrenci bir sonraki bölüme geçebilmek için mevcut bölümün quizini geçmek zorundadır.
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((bolumNo) => {
                const isAssigned = assignedModules.some(
                  (m) => m.bolumNo === bolumNo
                )
                const mod = assignedModules.find(
                  (m) => m.bolumNo === bolumNo
                )
                return (
                  <div
                    key={bolumNo}
                    className={`flex items-center gap-3 rounded-lg border p-3 transition ${
                      isAssigned
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isAssigned}
                      onChange={() => toggleModule(bolumNo)}
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        Bölüm {bolumNo}: {bolumBasliklari[bolumNo]}
                      </p>
                    </div>
                    {isAssigned && (
                      <div className="flex items-center gap-1 shrink-0">
                        <label className="text-xs text-gray-500">Min:</label>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={mod?.minQuizScore ?? 60}
                          onChange={(e) =>
                            updateMinScore(bolumNo, Number(e.target.value))
                          }
                          className="w-14 border rounded px-1.5 py-0.5 text-xs text-center focus:ring-2 focus:ring-blue-300 focus:outline-none"
                        />
                        <span className="text-xs text-gray-400">%</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleSaveModules}
                disabled={moduleSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium text-sm"
              >
                {moduleSaving ? 'Kaydediliyor...' : 'Modülleri Kaydet'}
              </button>
              <span className="text-sm text-gray-500">
                {assignedModules.length} modül seçili
              </span>
              {moduleMsg && (
                <span
                  className={`text-sm ${
                    moduleMsg.startsWith('Hata') ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {moduleMsg}
                </span>
              )}
            </div>
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

          {/* Toplu ekleme — CSV veya metin */}
          <div className="bg-white rounded-xl border p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Toplu Ekle (CSV / Metin)
            </h2>

            {/* Drag & Drop / Dosya Sec */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition mb-3 ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
              <svg className="mx-auto mb-1 text-gray-400" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-sm text-gray-600">
                CSV dosyasi surukleyin veya <span className="text-blue-600 font-medium">secin</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">nickname sutunu olan .csv veya .txt</p>
            </div>

            {/* CSV Onizleme */}
            {csvPreview.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-2">
                <p className="text-xs font-medium text-green-700 mb-1">
                  {csvPreview.length} ogrenci bulundu:
                </p>
                <p className="text-xs text-green-600 truncate">
                  {csvPreview.slice(0, 5).join(', ')}
                  {csvPreview.length > 5 && ` ve ${csvPreview.length - 5} daha...`}
                </p>
              </div>
            )}

            <p className="text-xs text-gray-500 mb-1.5">
              veya her satira bir takma ad yazin:
            </p>
            <textarea
              value={nicknameText}
              onChange={(e) => {
                setNicknameText(e.target.value)
                setCsvPreview([])
              }}
              className="w-full h-20 border rounded-lg p-2.5 font-mono text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
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
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Ogrenci Listesi ({students.length})
            </h2>
            {students.length > 0 && (
              <button
                onClick={() => {
                  const a = document.createElement('a')
                  a.href = `/api/reports/student?classId=${classId}`
                  a.download = 'rapor.docx'
                  a.click()
                }}
                className="inline-flex items-center gap-1.5 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition text-sm font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Veli Raporu (Tum Sinif)
              </button>
            )}
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
                            onClick={() => {
                              const a = document.createElement('a')
                              a.href = `/api/reports/student?classId=${classId}&studentId=${s.user_id}`
                              a.download = `rapor-${s.nickname}.docx`
                              a.click()
                            }}
                            className="text-violet-600 hover:text-violet-800 text-sm"
                            title="Veli raporu indir"
                          >
                            Rapor
                          </button>
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

        {/* Quiz İlerleme Tablosu */}
        {progressData && progressData.modules.length > 0 && progressData.students.length > 0 && (
          <div className="bg-white rounded-xl border overflow-hidden mt-8">
            <div className="p-5 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Quiz Ilerleme Tablosu
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Ogrencilerin modul bazli quiz sonuclari
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-500 sticky left-0 bg-gray-50 z-10">
                      Ogrenci
                    </th>
                    {progressData.modules.map((m) => (
                      <th
                        key={m.bolum_no}
                        className="p-3 text-center font-medium text-gray-500 min-w-[70px]"
                      >
                        B{m.bolum_no}
                      </th>
                    ))}
                    <th className="p-3 text-center font-medium text-gray-500 min-w-[60px]">
                      Ort.
                    </th>
                    <th className="p-3 text-center font-medium text-gray-500 min-w-[60px]">
                      Gecen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.students.map((s) => (
                    <tr key={s.nickname} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800 sticky left-0 bg-white z-10">
                        {s.nickname}
                      </td>
                      {s.modules.map((m) => (
                        <td key={m.bolumNo} className="p-3 text-center">
                          {m.score === null ? (
                            <span className="text-gray-300">—</span>
                          ) : m.passed ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-xs">
                              {m.score}
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold text-xs">
                              {m.score}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="p-3 text-center font-medium text-gray-700">
                        {s.avgScore !== null ? `${s.avgScore}%` : '—'}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`font-bold ${s.passedCount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                          {s.passedCount}/{progressData.modules.length}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {progressLoading && (
          <div className="text-center py-8 text-gray-400 text-sm">
            Ilerleme verileri yukleniyor...
          </div>
        )}
      </div>
    </div>
  )
}
