import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// GET /api/badges — öğrencinin rozetlerini getir + yeni kazanılanları kontrol et
export async function GET() {
  const supabase = await createClient()
  const adminClient = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Öğrenci mi kontrol
  const { data: studentData } = await supabase
    .from('class_students')
    .select('class_id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!studentData) {
    return NextResponse.json({ badges: [], definitions: [] })
  }

  // Quiz sonuçlarını çek
  const { data: quizResults } = await adminClient
    .from('student_quiz_results')
    .select('bolum_no, score, passed')
    .eq('student_id', user.id)
    .eq('class_id', studentData.class_id)

  const results = quizResults ?? []
  const passedCount = results.filter((r) => r.passed).length
  const scores = results.map((r) => r.score)
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
  const hasFirstQuiz = results.length > 0
  const hasPerfect = scores.some((s) => s === 100)

  // Rozet tanımlarını çek
  const { data: definitions } = await adminClient
    .from('badge_definitions')
    .select('*')
    .order('sort_order')

  const allDefs = definitions ?? []

  // Her rozet için kontrol
  const earnedBadgeIds: string[] = []
  for (const def of allDefs) {
    let earned = false
    switch (def.condition_type) {
      case 'first_quiz':
        earned = hasFirstQuiz
        break
      case 'modules_completed':
        earned = passedCount >= def.condition_value
        break
      case 'all_modules':
        earned = passedCount >= def.condition_value
        break
      case 'avg_score':
        earned = scores.length > 0 && avgScore >= def.condition_value
        break
      case 'perfect_score':
        earned = hasPerfect
        break
    }
    if (earned) earnedBadgeIds.push(def.id)
  }

  // Mevcut rozetleri çek
  const { data: existingBadges } = await adminClient
    .from('student_badges')
    .select('badge_id')
    .eq('student_id', user.id)

  const existingIds = new Set((existingBadges ?? []).map((b) => b.badge_id))

  // Yeni kazanılan rozetleri kaydet
  const newBadges = earnedBadgeIds.filter((id) => !existingIds.has(id))
  if (newBadges.length > 0) {
    await adminClient.from('student_badges').insert(
      newBadges.map((badge_id) => ({
        student_id: user.id,
        badge_id,
      }))
    )
  }

  return NextResponse.json({
    definitions: allDefs,
    earned: earnedBadgeIds,
    newlyEarned: newBadges,
  })
}
