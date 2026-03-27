import { createClient } from '@supabase/supabase-js'

// Bu client sadece API route'larında (server-side) kullanılır.
// Browser'a asla gönderilmez — service_role key içerir.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey || serviceKey === 'BURAYA_SERVICE_ROLE_KEY_EKLE') {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY .env.local dosyasında tanımlı değil')
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
