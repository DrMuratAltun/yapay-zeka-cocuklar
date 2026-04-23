import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ role: null })

  const adminClient = createAdminClient()
  const { data } = await adminClient
    .from('school_users')
    .select('role')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  return NextResponse.json({ role: data?.role ?? null })
}
