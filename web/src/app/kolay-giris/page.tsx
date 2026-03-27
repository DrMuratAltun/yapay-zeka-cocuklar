'use client'

import { useState } from 'react'
import { getStudentsByClassCode, loginStudent } from './actions'
import { EMOJI_LIST, type KolayGirisStudent } from '@/types/saas'

type Step = 'code' | 'nickname' | 'credential'

export default function KolayGirisPage() {
  const [step, setStep] = useState<Step>('code')
  const [accessCode, setAccessCode] = useState('')
  const [students, setStudents] = useState<KolayGirisStudent[]>([])
  const [credentialType, setCredentialType] = useState('pin')
  const [selectedNickname, setSelectedNickname] = useState('')
  const [pin, setPin] = useState('')
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await getStudentsByClassCode(accessCode)
    if (!result) {
      setError('Sınıf kodu bulunamadı. Öğretmeninden tekrar sor.')
      setLoading(false)
      return
    }
    setStudents(result.students)
    setCredentialType(result.credentialType)
    setStep('nickname')
    setLoading(false)
  }

  function handleNicknameSelect(nickname: string) {
    setSelectedNickname(nickname)
    setPin('')
    setSelectedEmojis([])
    setError('')
    setStep('credential')
  }

  function handleEmojiToggle(emojiId: string) {
    setSelectedEmojis((prev) => {
      if (prev.includes(emojiId)) return prev.filter((e) => e !== emojiId)
      if (prev.length >= 3) return prev
      return [...prev, emojiId]
    })
  }

  async function handleCredentialSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    let credential = ''
    if (credentialType === 'emoji') {
      if (selectedEmojis.length !== 3) {
        setError('3 sembol seçmelisin.')
        setLoading(false)
        return
      }
      credential = selectedEmojis.join('-')
    } else {
      credential = pin
    }

    const result = await loginStudent(accessCode, selectedNickname, credential)
    if (result?.error) {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-3">🏫</div>
              <h1 className="text-2xl font-bold text-gray-800">GençYZ&apos;e Hoş Geldin!</h1>
              <p className="text-gray-500 mt-1">Öğretmeninin verdiği sınıf kodunu gir</p>
            </div>
            <input
              type="text"
              placeholder="Örn: 6A-GYZ"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-center text-xl font-mono tracking-widest focus:border-blue-400 focus:outline-none"
              required
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading || accessCode.length < 3}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors"
            >
              {loading ? 'Aranıyor...' : 'Devam Et →'}
            </button>
          </form>
        )}

        {step === 'nickname' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl mb-3">👤</div>
              <h2 className="text-2xl font-bold text-gray-800">Sınıf: {accessCode}</h2>
              <p className="text-gray-500 mt-1">Adını seç</p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {students.map((s) => (
                <button
                  key={s.user_id}
                  onClick={() => handleNicknameSelect(s.nickname)}
                  className="bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-3 text-left font-medium text-gray-700 transition-colors"
                >
                  {s.nickname}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setStep('code'); setError('') }}
              className="w-full text-gray-400 text-sm hover:text-gray-600"
            >
              ← Geri dön
            </button>
          </div>
        )}

        {step === 'credential' && (
          <form onSubmit={handleCredentialSubmit} className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-3">
                {credentialType === 'emoji' ? '😊' : credentialType === 'pin' ? '🔢' : '💬'}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Merhaba, {selectedNickname}!</h2>
              <p className="text-gray-500 mt-1">
                {credentialType === 'pin' && 'PIN numaranı gir'}
                {credentialType === 'emoji' && '3 sembolünü sırayla seç'}
                {credentialType === 'word' && 'Kelimeni gir'}
              </p>
            </div>

            {(credentialType === 'pin' || credentialType === 'word') && (
              <input
                type={credentialType === 'pin' ? 'tel' : 'text'}
                placeholder={credentialType === 'pin' ? '• • • •' : 'Kelimeni yaz...'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={credentialType === 'pin' ? 4 : 20}
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-center text-2xl tracking-widest focus:border-blue-400 focus:outline-none"
                required
              />
            )}

            {credentialType === 'emoji' && (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {EMOJI_LIST.map(({ id, emoji }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleEmojiToggle(id)}
                      className={`text-3xl p-2 rounded-xl border-2 transition-all flex flex-col items-center ${
                        selectedEmojis.includes(id)
                          ? 'border-blue-400 bg-blue-50 scale-110'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>{emoji}</span>
                      {selectedEmojis.includes(id) && (
                        <span className="text-xs text-blue-500 font-bold">
                          {selectedEmojis.indexOf(id) + 1}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500">
                  Seçilen: {selectedEmojis.length}/3
                </p>
              </div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors"
            >
              {loading ? 'Kontrol ediliyor...' : 'Giriş Yap! 🚀'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('nickname'); setError(''); setPin(''); setSelectedEmojis([]) }}
              className="w-full text-gray-400 text-sm hover:text-gray-600"
            >
              ← Geri dön
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
