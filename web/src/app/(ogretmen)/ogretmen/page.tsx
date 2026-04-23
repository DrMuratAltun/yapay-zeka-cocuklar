'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DashboardClass {
  id: string
  name: string
  access_code: string
  student_count: number
}

interface SchoolInfo {
  name: string
  quota_students: number
  quota_teachers: number
  status: string
}

interface DashboardStats {
  totalClasses: number
  totalStudents: number
  modulesAssigned: number
  quizzesPassed: number
  avgScore: number
  studentsUsed: number
  studentsQuota: number
  teachersUsed: number
  teachersQuota: number
}

export default function OgretmenDashboard() {
  const [classes, setClasses] = useState<DashboardClass[]>([])
  const [school, setSchool] = useState<SchoolInfo | null>(null)
  const [userRole, setUserRole] = useState<string>('')
  const [stats, setStats] = useState<DashboardStats>({
    totalClasses: 0,
    totalStudents: 0,
    modulesAssigned: 0,
    quizzesPassed: 0,
    avgScore: 0,
    studentsUsed: 0,
    studentsQuota: 0,
    teachersUsed: 0,
    teachersQuota: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/schools/stats')
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          if (errData.error === 'no_school') setSchool(null)
          return
        }
        const data = await res.json()
        const cls = data.classes ?? []
        setClasses(cls)
        setSchool(data.school ?? null)

        // Rol bilgisi icin school_users'dan gelir (stats endpoint)
        const sData = data.stats ?? {}

        const totalStudents = cls.reduce(
          (s: number, c: DashboardClass) => s + c.student_count,
          0
        )

        let totalModules = 0
        let totalPassed = 0
        let totalScore = 0
        let scoreCount = 0

        await Promise.all(
          cls.map(async (c: DashboardClass) => {
            const mRes = await fetch(`/api/classes/${c.id}/modules`)
            if (mRes.ok) {
              const mData = await mRes.json()
              totalModules += (mData.modules ?? []).length
              const results = mData.quizResults ?? []
              results.forEach((r: { passed: boolean; score: number }) => {
                if (r.passed) totalPassed++
                totalScore += r.score
                scoreCount++
              })
            }
          })
        )

        setStats({
          totalClasses: cls.length,
          totalStudents,
          modulesAssigned: totalModules,
          quizzesPassed: totalPassed,
          avgScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
          studentsUsed: sData.students_used ?? 0,
          studentsQuota: sData.students_quota ?? 0,
          teachersUsed: sData.teachers_used ?? 0,
          teachersQuota: sData.teachers_quota ?? 0,
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Yukleniyor...
        </div>
      </div>
    )
  }

  const statCards = [
    { label: 'Siniflar', value: stats.totalClasses, sub: 'Aktif sinif', icon: '🏫', color: 'bg-blue-100 text-blue-600' },
    { label: 'Ogrenciler', value: stats.totalStudents, sub: 'Toplam ogrenci', icon: '👨‍🎓', color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Moduller', value: stats.modulesAssigned, sub: 'Atanmis modul', icon: '📚', color: 'bg-violet-100 text-violet-600' },
    { label: 'Ort. Puan', value: stats.avgScore > 0 ? `${stats.avgScore}%` : '-', sub: 'Quiz ortalamasi', icon: '⭐', color: 'bg-amber-100 text-amber-600' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Okul Bilgi Karti + Hosgeldin */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0">
          <CardContent className="pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Ogretmen Paneli</p>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {school?.name ?? 'Yukleniyor...'}
                </h1>
                <p className="text-blue-100 mt-1 text-sm">
                  Siniflarinizi yonetin, modul atayin ve ogrenci ilerlemesini takip edin.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{stats.studentsUsed}</p>
                  <p className="text-xs text-blue-200">/ {stats.studentsQuota} ogrenci</p>
                </div>
                <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{stats.teachersUsed}</p>
                  <p className="text-xs text-blue-200">/ {stats.teachersQuota} ogretmen</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Istatistik Kartlari */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${s.color}`}>
                  {s.icon}
                </span>
              </div>
              <div className="text-3xl font-bold text-foreground">{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hizli Erisim */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { href: '/ogretmen/siniflar', icon: '📋', title: 'Siniflarim', desc: 'Siniflari yonetin, ogrenci ekleyin, modul atayin.', iconBg: 'bg-blue-600', hoverBorder: 'hover:border-blue-300', hoverText: 'group-hover:text-blue-600' },
          { href: '/ogretmen/kilavuz', icon: '📝', title: 'Bolum Kilavuzlari', desc: 'Cevap anahtarlari, etkinlik rehberleri, tartisma sorulari.', iconBg: 'bg-amber-600', hoverBorder: 'hover:border-amber-300', hoverText: 'group-hover:text-amber-600' },
          { href: '/ogretmen/kaynaklar', icon: '📖', title: 'Kaynaklar ve Ders Planlari', desc: 'Ders planlari, rubrikler, yillik plan ve faydali linkler.', iconBg: 'bg-emerald-600', hoverBorder: 'hover:border-emerald-300', hoverText: 'group-hover:text-emerald-600' },
          { href: '/okul', icon: '🏫', title: 'Okul Paneli', desc: 'Okulunuzun genel istatistiklerini gorunteuleyin.', iconBg: 'bg-violet-600', hoverBorder: 'hover:border-violet-300', hoverText: 'group-hover:text-violet-600' },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className={`h-full hover:shadow-md ${item.hoverBorder} transition-all group cursor-pointer`}>
              <CardContent className="pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center text-white text-lg`}>
                    {item.icon}
                  </div>
                  <h3 className={`font-bold text-foreground ${item.hoverText} transition`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Son Siniflar */}
      {classes.length > 0 && (
        <Card>
          <CardHeader className="flex-row items-center justify-between border-b">
            <CardTitle className="text-lg font-bold">Son Siniflar</CardTitle>
            <Button variant="link" size="sm" render={<Link href="/ogretmen/siniflar" />}>
              Tumunu Gor →
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {classes.slice(0, 5).map((cls) => (
                <Link
                  key={cls.id}
                  href={`/ogretmen/siniflar/${cls.id}`}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                      {cls.name.substring(0, 3)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Kod: <Badge variant="secondary" className="font-mono text-[10px]">{cls.access_code}</Badge> · {cls.student_count} ogrenci
                      </p>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
