'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { KolayGirisStudent } from '@/types/saas'
import { redirect } from 'next/navigation'

// Sınıf koduna göre öğrenci listesini getir (login ekranı için)
// NOT: Öğrenci henüz giriş yapmadığından adminClient kullanılır (RLS bypass).
// Sadece nickname ve user_id döner — credential_plain asla client'a gönderilmez.
export async function getStudentsByClassCode(
  accessCode: string
): Promise<{ students: KolayGirisStudent[]; credentialType: string } | null> {
  const adminClient = createAdminClient()

  const { data: classData, error } = await adminClient
    .from('classes')
    .select('id, credential_type')
    .eq('access_code', accessCode.toUpperCase())
    .single()

  if (error || !classData) return null

  const { data: students } = await adminClient
    .from('class_students')
    .select('nickname, user_id')
    .eq('class_id', classData.id)
    .order('nickname')

  return {
    students: students ?? [],
    credentialType: classData.credential_type,
  }
}

// Öğrenci girişi
export async function loginStudent(
  accessCode: string,
  nickname: string,
  credential: string,
  redirectTo?: string
): Promise<{ error: string } | void> {
  const supabase = await createClient()

  const email = `${nickname.toLowerCase()}@${accessCode.toUpperCase()}.gencyz.local`

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: credential,
  })

  if (error) {
    return { error: 'Giriş başarısız. Sembolünü kontrol et.' }
  }

  redirect(redirectTo ?? '/ogrenci')
}
