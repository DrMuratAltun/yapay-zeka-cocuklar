'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import type { CsvUploadResult } from '@/types/saas'

export default function SinifDetay() {
  const params = useParams()
  const classId = params.classId as string

  const [nicknameText, setNicknameText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CsvUploadResult | null>(null)
  const [apiError, setApiError] = useState('')

  const handleUpload = async () => {
    setLoading(true)
    setResult(null)
    setApiError('')

    // Nicknames'i CSV dosyasına çevir
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
        setApiError(data.error ?? 'Beklenmeyen hata')
      } else {
        setResult(data)
      }
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Bağlantı hatası')
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Sınıf Öğrencileri Yönetimi</h1>

      <div className="bg-white p-6 rounded-lg shadow border mb-8">
        <h2 className="text-xl font-semibold mb-2">Toplu Öğrenci Ekle</h2>
        <p className="text-sm text-gray-600 mb-4">
          Her satıra bir öğrenci takma adı yaz. PIN otomatik üretilir.
        </p>

        <textarea
          value={nicknameText}
          onChange={(e) => setNicknameText(e.target.value)}
          className="w-full h-40 border rounded p-3 mb-4 font-mono text-sm"
          placeholder={'KaplanAli\nYıldızAyşe\nUzayMehmet'}
        />

        <button
          onClick={handleUpload}
          disabled={loading || !nicknameText.trim()}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? 'Yükleniyor...' : 'Hesap Oluştur'}
        </button>

        {apiError && (
          <div className="mt-4 p-4 rounded border bg-red-50 border-red-200 text-red-800">
            <strong>Hata:</strong> {apiError}
          </div>
        )}

        {result && (
          <div className="mt-4 space-y-3">
            {result.success.length > 0 && (
              <div className="p-4 rounded border bg-green-50 border-green-200 text-green-800">
                <p className="font-bold mb-2">✅ {result.success.length} öğrenci eklendi</p>
                <p className="text-sm text-gray-600">
                  PIN&apos;leri görmek için sınıf listesini açın ve &quot;Giriş Kartlarını Yazdır&quot;ı kullanın.
                </p>
              </div>
            )}
            {result.errors.length > 0 && (
              <div className="p-4 rounded border bg-red-50 border-red-200 text-red-800">
                <p className="font-bold mb-2">⚠️ {result.errors.length} satırda hata:</p>
                <ul className="text-sm space-y-1">
                  {result.errors.map((e, i) => (
                    <li key={i}>
                      Satır {e.row} — <strong>{e.nickname}</strong>: {e.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
