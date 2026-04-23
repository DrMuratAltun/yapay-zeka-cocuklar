import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// GET /api/leaderboard — öğrencinin sınıf liderlik tablosu
export async function GET() {
  const supabase = await createClient()
  const adminClient = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Öğrencinin sınıfını bul
  const { data: studentData } = await supabase
    .from('class_students')
    .select('class_id, nickname')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!studentData) {
    return NextResponse.json({ leaderboard: [], myRank: 0 })
  }

  // Sınıftaki tüm öğrencileri çek
  const { data: classStudents } = await adminClient
    .from('class_students')
    .select('user_id, nickname')
    .eq('class_id', studentData.class_id)

  if (!classStudents || classStudents.length === 0) {
    return NextResponse.json({ leaderboard: [], myRank: 0 })
  }

  // Her öğrencinin quiz sonuçlarını çek
  const { data: allResults } = await adminClient
    .from('student_quiz_results')
    .select('student_id, score, passed')
    .eq('class_id', studentData.class_id)

  const results = allResults ?? []

  // Liderlik hesaplama
  const leaderboard = classStudents.map((s) => {
    const studentResults = results.filter((r) => r.student_id === s.user_id)
    const passedCount = studentResults.filter((r) => r.passed).length
    const totalScore = studentResults.reduce((sum, r) => sum + r.score, 0)
    const avgScore =
      studentResults.length > 0
        ? Math.round(totalScore / studentResults.length)
        : 0

    // Rozetler (basit hesaplama)
    let badgeCount = 0
    if (studentResults.length > 0) badgeCount++        // first_step
    if (passedCount >= 3) badgeCount++                  // explorer
    if (passedCount >= 5) badgeCount++                  // expert
    if (passedCount >= 7) badgeCount++                  // coder
    if (passedCount >= 9) badgeCount++                  // ethics_hero
    if (passedCount >= 10) badgeCount++                 // graduate
    if (avgScore >= 80 && studentResults.length > 0) badgeCount++ // high_scorer
    if (studentResults.some((r) => r.score === 100)) badgeCount++ // perfectionist

    return {
      nickname: s.nickname,
      passedCount,
      avgScore,
      totalScore,
      badgeCount,
      isMe: s.user_id === user.id,
    }
  })

  // Sıralama: geçilen modül sayısı DESC, ortalama puan DESC
  leaderboard.sort((a, b) => {
    if (b.passedCount !== a.passedCount) return b.passedCount - a.passedCount
    return b.avgScore - a.avgScore
  })

  const myRank = leaderboard.findIndex((l) => l.isMe) + 1

  return NextResponse.json({ leaderboard, myRank })
}
