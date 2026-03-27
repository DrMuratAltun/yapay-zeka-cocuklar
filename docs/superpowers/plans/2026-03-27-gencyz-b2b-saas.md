# GençYZ B2B SaaS Modülü — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GençYZ web uygulamasına tamamen bağımsız Okul SaaS modülü eklemek — yeni Supabase projesi, öğretmen yönetimli öğrenci hesapları, Code.org tarzı kolay giriş.

**Architecture:** Yeni Supabase projesi (unkldyiweszmlyrxctee) üzerine 4 tablo + RLS. Öğrenciler proxy email ile Supabase Auth'a kayıtlı, öğretmen tüm hesapları yönetir. `/kolay-giris` sayfası sınıf kodu → nickname → sembol/PIN akışı sunar.

**Tech Stack:** Next.js 15 App Router, @supabase/ssr ^0.9, Supabase Auth (Admin API), TypeScript, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-27-gencyz-b2b-saas-design.md`

---

## İş Bölümü

| Görev | Sorumlu |
|-------|---------|
| Task 1-6 (altyapı, auth, API) | **Claude** |
| Task 7 (Admin UI) | **Gemini** |
| Task 8 (Okul Admin UI) | **Gemini** |
| Task 9 (Öğretmen UI) | **Gemini** |

---

## Dosya Haritası

```
web/
├── .env.local                                          MODIFY — yeni Supabase env
├── supabase/
│   └── migrations/
│       ├── 0001_saas_schema.sql                        CREATE — 4 tablo
│       └── 0002_saas_rls.sql                           CREATE — RLS politikaları
├── src/
│   ├── lib/
│   │   └── supabase/
│   │       ├── server.ts                               EXISTS — değişmez
│   │       ├── client.ts                               EXISTS — değişmez
│   │       └── admin.ts                                CREATE — service_role client
│   ├── types/
│   │   └── saas.ts                                     CREATE — SaaS tipleri
│   ├── middleware.ts                                   CREATE — rol koruması
│   ├── app/
│   │   ├── kolay-giris/
│   │   │   ├── page.tsx                                CREATE — öğrenci login UI
│   │   │   └── actions.ts                              CREATE — server actions
│   │   ├── (admin)/admin/okullar/
│   │   │   └── page.tsx                                CREATE — Gemini
│   │   ├── (okul)/okul/
│   │   │   └── page.tsx                                CREATE — Gemini
│   │   ├── (ogretmen)/ogretmen/siniflar/[classId]/
│   │   │   └── page.tsx                                CREATE — Gemini
│   │   └── api/
│   │       └── schools/
│   │           ├── route.ts                            CREATE — okul CRUD
│   │           └── students/
│   │               └── csv/
│   │                   └── route.ts                    CREATE — CSV upload
```

---

## Task 1: Env Setup + Supabase CLI

**Files:**
- Modify: `web/.env.local`
- Create: `web/supabase/config.toml` (supabase init çıktısı)

- [ ] **Step 1: Service role key'i al**

Supabase Dashboard → `unkldyiweszmlyrxctee` projesi → Settings → API → `service_role` (secret) key'i kopyala.

- [ ] **Step 2: .env.local güncelle**

`web/.env.local` dosyasını şu içerikle güncelle (mevcut içeriği tamamen değiştir):

```env
# GençYZ — Bağımsız Supabase Projesi
NEXT_PUBLIC_SUPABASE_URL=https://unkldyiweszmlyrxctee.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable__olEMS3KHhrEKvPRmb43qw_rBtpWvgg
SUPABASE_SERVICE_ROLE_KEY=<service_role_key_buraya>
```

- [ ] **Step 3: Supabase CLI'yi kur ve link et**

```bash
cd web
npm install supabase --save-dev
npx supabase init
npx supabase login
npx supabase link --project-ref unkldyiweszmlyrxctee
```

Beklenen çıktı: `Linked to project unkldyiweszmlyrxctee`

- [ ] **Step 4: Supabase email verification'ı kapat**

Supabase Dashboard → `unkldyiweszmlyrxctee` → Authentication → Email → "Confirm email" → **OFF** yap.

- [ ] **Step 5: Commit**

```bash
git add web/.env.local web/supabase/config.toml
git commit -m "chore: GençYZ bağımsız Supabase projesi bağlandı"
```

---

## Task 2: TypeScript Tipleri

**Files:**
- Create: `web/src/types/saas.ts`

- [ ] **Step 1: `src/types/saas.ts` oluştur**

```typescript
export type SchoolStatus = 'active' | 'suspended' | 'trial'
export type SaasRole = 'super_admin' | 'school_admin' | 'teacher' | 'student'
export type CredentialType = 'pin' | 'emoji' | 'word'

export interface School {
  id: string
  name: string
  quota_students: number
  quota_teachers: number
  status: SchoolStatus
  created_at: string
}

export interface SchoolUser {
  id: string
  school_id: string
  user_id: string
  role: SaasRole
  created_at: string
}

export interface Class {
  id: string
  school_id: string
  teacher_id: string
  name: string
  access_code: string
  credential_type: CredentialType
  created_at: string
}

export interface ClassStudent {
  id: string
  class_id: string
  user_id: string
  nickname: string          // sınıf içinde benzersiz
  credential_plain: string  // öğretmen için görünür (PIN/emoji kodu/kelime)
  created_at: string
}

// API yanıt tipleri
export interface StudentListItem {
  user_id: string
  nickname: string
  credential_plain: string
  class_id: string
}

export interface CsvUploadResult {
  success: string[]
  errors: { row: number; nickname: string; reason: string }[]
}

// Kolay giriş için
export interface KolayGirisStudent {
  nickname: string
  user_id: string
}

// Emoji seçimi için sabit liste
export const EMOJI_LIST = [
  { id: 'dog', emoji: '🐶' },
  { id: 'cat', emoji: '🐱' },
  { id: 'star', emoji: '⭐' },
  { id: 'rocket', emoji: '🚀' },
  { id: 'heart', emoji: '❤️' },
  { id: 'fire', emoji: '🔥' },
  { id: 'thunder', emoji: '⚡' },
  { id: 'rainbow', emoji: '🌈' },
  { id: 'moon', emoji: '🌙' },
  { id: 'sun', emoji: '☀️' },
  { id: 'tree', emoji: '🌳' },
  { id: 'diamond', emoji: '💎' },
] as const

export type EmojiId = typeof EMOJI_LIST[number]['id']
```

- [ ] **Step 2: Commit**

```bash
git add web/src/types/saas.ts
git commit -m "feat: SaaS TypeScript tipleri eklendi"
```

---

## Task 3: Supabase Admin Client

**Files:**
- Create: `web/src/lib/supabase/admin.ts`

Öğrenci hesabı oluşturmak/silmek için `service_role` yetkili client gerekli.

- [ ] **Step 1: `src/lib/supabase/admin.ts` oluştur**

```typescript
import { createClient } from '@supabase/supabase-js'

// Bu client sadece API route'larında (server-side) kullanılır.
// Browser'a asla gönderilmez — service_role key içerir.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Supabase admin env vars eksik')
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
```

- [ ] **Step 2: Doğrula**

`next dev` çalıştır, hata yoksa devam et.

```bash
cd web && npm run dev
# Ctrl+C ile kapat
```

- [ ] **Step 3: Commit**

```bash
git add web/src/lib/supabase/admin.ts
git commit -m "feat: Supabase admin client eklendi (service_role)"
```

---

## Task 4: Veritabanı Migration

**Files:**
- Create: `web/supabase/migrations/0001_saas_schema.sql`
- Create: `web/supabase/migrations/0002_saas_rls.sql`

- [ ] **Step 1: `0001_saas_schema.sql` oluştur**

```sql
-- ============================================================
-- GençYZ B2B SaaS Şema
-- ============================================================

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quota_students int not null default 30,
  quota_teachers int not null default 5,
  status text not null default 'trial' check (status in ('active', 'suspended', 'trial')),
  created_at timestamptz not null default now()
);

create table if not exists public.school_users (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('super_admin', 'school_admin', 'teacher', 'student')),
  created_at timestamptz not null default now(),
  unique(school_id, user_id)
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  teacher_id uuid not null references auth.users(id),
  name text not null,
  access_code text not null unique,
  credential_type text not null default 'pin' check (credential_type in ('pin', 'emoji', 'word')),
  created_at timestamptz not null default now()
);

create table if not exists public.class_students (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null,
  credential_plain text not null,
  created_at timestamptz not null default now(),
  unique(class_id, nickname),
  unique(class_id, user_id)
);

-- Yardımcı fonksiyon: mevcut kullanıcının rolünü döner
create or replace function public.get_my_school_role(p_school_id uuid)
returns text
language sql
security definer
stable
as $$
  select role from public.school_users
  where school_id = p_school_id and user_id = auth.uid()
  limit 1;
$$;

-- Yardımcı fonksiyon: super_admin kontrolü
create or replace function public.is_super_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.school_users
    where user_id = auth.uid() and role = 'super_admin'
  );
$$;
```

- [ ] **Step 2: `0002_saas_rls.sql` oluştur**

```sql
-- ============================================================
-- GençYZ B2B SaaS RLS Politikaları
-- ============================================================

alter table public.schools enable row level security;
alter table public.school_users enable row level security;
alter table public.classes enable row level security;
alter table public.class_students enable row level security;

-- -------------------- schools --------------------
-- Super admin hepsini görür
create policy "super_admin: schools full access"
  on public.schools for all
  using (public.is_super_admin());

-- Okul admin kendi okulunu görür
create policy "school_admin: see own school"
  on public.schools for select
  using (
    public.get_my_school_role(id) in ('school_admin', 'teacher', 'student')
  );

-- -------------------- school_users --------------------
create policy "super_admin: school_users full access"
  on public.school_users for all
  using (public.is_super_admin());

create policy "school_admin: manage own school users"
  on public.school_users for all
  using (
    public.get_my_school_role(school_id) in ('school_admin')
  );

create policy "teacher+: see own school users"
  on public.school_users for select
  using (
    public.get_my_school_role(school_id) in ('teacher', 'school_admin', 'super_admin')
  );

-- -------------------- classes --------------------
create policy "super_admin: classes full access"
  on public.classes for all
  using (public.is_super_admin());

create policy "school_admin: manage school classes"
  on public.classes for all
  using (
    public.get_my_school_role(school_id) in ('school_admin')
  );

create policy "teacher: manage own classes"
  on public.classes for all
  using (teacher_id = auth.uid());

create policy "student: see own class"
  on public.classes for select
  using (
    exists (
      select 1 from public.class_students
      where class_id = id and user_id = auth.uid()
    )
  );

-- -------------------- class_students --------------------
create policy "super_admin: class_students full access"
  on public.class_students for all
  using (public.is_super_admin());

create policy "teacher: manage own class students"
  on public.class_students for all
  using (
    exists (
      select 1 from public.classes
      where id = class_id and teacher_id = auth.uid()
    )
  );

create policy "student: see own record"
  on public.class_students for select
  using (user_id = auth.uid());
```

- [ ] **Step 3: Migration'ları prod'a uygula**

```bash
cd web
npx supabase db push
```

Beklenen çıktı: `Applying migration 0001_saas_schema.sql...` ve `0002_saas_rls.sql...` satırları.

- [ ] **Step 4: Doğrula**

Supabase Dashboard → `unkldyiweszmlyrxctee` → Table Editor → `schools`, `school_users`, `classes`, `class_students` tablolarının oluştuğunu kontrol et.

- [ ] **Step 5: Commit**

```bash
git add web/supabase/
git commit -m "feat: GençYZ SaaS migration (schema + RLS)"
```

---

## Task 5: Middleware (Rol Koruması)

**Files:**
- Create: `web/src/middleware.ts`

- [ ] **Step 1: `src/middleware.ts` oluştur**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Giriş gerektiren rotalar
  const protectedRoutes = ['/admin', '/okul', '/ogretmen']
  const isProtected = protectedRoutes.some(r => path.startsWith(r))

  if (isProtected && !user) {
    const loginUrl = new URL('/kolay-giris', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // Rol kontrolü (sadece giriş yapmış kullanıcılar için)
  if (user && isProtected) {
    const { data: roleData } = await supabase
      .from('school_users')
      .select('role')
      .eq('user_id', user.id)
      .single()

    const role = roleData?.role

    if (path.startsWith('/admin') && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (path.startsWith('/okul') && !['school_admin', 'super_admin'].includes(role ?? '')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (
      path.startsWith('/ogretmen') &&
      !['teacher', 'school_admin', 'super_admin'].includes(role ?? '')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/okul/:path*',
    '/ogretmen/:path*',
  ],
}
```

- [ ] **Step 2: Manuel test**

```bash
cd web && npm run dev
```

Tarayıcıda `http://localhost:3000/admin/okullar` adresine git → giriş yokken `/kolay-giris?redirect=/admin/okullar` adresine yönlenmeli.

- [ ] **Step 3: Commit**

```bash
git add web/src/middleware.ts
git commit -m "feat: SaaS middleware — rol bazlı rota koruması"
```

---

## Task 6: Kolay Giriş Sayfası (`/kolay-giris`)

**Files:**
- Create: `web/src/app/kolay-giris/page.tsx`
- Create: `web/src/app/kolay-giris/actions.ts`

### 6a: Server Action

- [ ] **Step 1: `src/app/kolay-giris/actions.ts` oluştur**

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { EMOJI_LIST, type KolayGirisStudent } from '@/types/saas'
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
  credential: string // PIN string | emoji ids joined by '-' | kelime
) {
  const supabase = await createClient()

  const email = `${nickname.toLowerCase()}@${accessCode.toUpperCase()}.gencyz.local`

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: credential,
  })

  if (error) {
    return { error: 'Giriş başarısız. Sembolünü kontrol et.' }
  }

  redirect('/ogrenci')
}
```

### 6b: Sayfa UI

- [ ] **Step 2: `src/app/kolay-giris/page.tsx` oluştur**

```typescript
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
    setStep('credential')
  }

  function handleEmojiToggle(emojiId: string) {
    setSelectedEmojis(prev => {
      if (prev.includes(emojiId)) return prev.filter(e => e !== emojiId)
      if (prev.length >= 3) return prev
      return [...prev, emojiId]
    })
  }

  async function handleCredentialSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    let credential = ''
    if (credentialType === 'pin') {
      credential = pin
    } else if (credentialType === 'emoji') {
      if (selectedEmojis.length !== 3) {
        setError('3 sembol seçmelisin.')
        setLoading(false)
        return
      }
      credential = selectedEmojis.join('-')
    } else {
      credential = pin // word tipi için de aynı input kullanılır
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

        {/* Adım 1: Sınıf Kodu */}
        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-3">🏫</div>
              <h1 className="text-2xl font-bold text-gray-800">GençYZ'e Hoş Geldin!</h1>
              <p className="text-gray-500 mt-1">Öğretmeninin verdiği sınıf kodunu gir</p>
            </div>
            <input
              type="text"
              placeholder="Örn: 6A-GYZ"
              value={accessCode}
              onChange={e => setAccessCode(e.target.value.toUpperCase())}
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

        {/* Adım 2: Nickname Seç */}
        {step === 'nickname' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl mb-3">👤</div>
              <h2 className="text-2xl font-bold text-gray-800">Sınıf: {accessCode}</h2>
              <p className="text-gray-500 mt-1">Adını seç</p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {students.map(s => (
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

        {/* Adım 3: Credential */}
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

            {/* PIN veya Word input */}
            {(credentialType === 'pin' || credentialType === 'word') && (
              <input
                type={credentialType === 'pin' ? 'tel' : 'text'}
                placeholder={credentialType === 'pin' ? '• • • •' : 'Kelimeni yaz...'}
                value={pin}
                onChange={e => setPin(e.target.value)}
                maxLength={credentialType === 'pin' ? 4 : 20}
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-center text-2xl tracking-widest focus:border-blue-400 focus:outline-none"
                required
              />
            )}

            {/* Emoji grid */}
            {credentialType === 'emoji' && (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {EMOJI_LIST.map(({ id, emoji }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleEmojiToggle(id)}
                      className={`text-3xl p-2 rounded-xl border-2 transition-all ${
                        selectedEmojis.includes(id)
                          ? 'border-blue-400 bg-blue-50 scale-110'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {emoji}
                      {selectedEmojis.includes(id) && (
                        <span className="block text-xs text-blue-500 font-bold">
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
```

- [ ] **Step 3: Manuel test**

```bash
cd web && npm run dev
```

`http://localhost:3000/kolay-giris` → 3 adımlı form görünmeli. Geçersiz kod girilince hata mesajı çıkmalı.

- [ ] **Step 4: Commit**

```bash
git add web/src/app/kolay-giris/
git commit -m "feat: kolay-giris sayfası — Code.org tarzı öğrenci girişi"
```

---

## Task 7: CSV Upload API

**Files:**
- Create: `web/src/app/api/schools/students/csv/route.ts`
- Create: `web/src/app/api/schools/route.ts`

### 7a: Okul CRUD API

- [ ] **Step 1: `src/app/api/schools/route.ts` oluştur**

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/schools — okul listesi (super_admin)
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/schools — okul oluştur (super_admin)
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const { name, quota_students, quota_teachers } = body

  if (!name || !quota_students || !quota_teachers) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('schools')
    .insert({ name, quota_students, quota_teachers, status: 'trial' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
```

### 7b: CSV Upload API

- [ ] **Step 2: Dizin oluştur ve `route.ts` yaz**

```typescript
// web/src/app/api/schools/students/csv/route.ts
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import type { CsvUploadResult } from '@/types/saas'

// CSV format: her satır bir nickname
// İlk satır başlık olabilir (nickname) — atlanır
// Örnek:
//   nickname
//   KaplanAli
//   YıldızAyşe

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const adminClient = createAdminClient()

  // Giriş kontrolü
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const classId = formData.get('classId') as string

  if (!file || !classId) {
    return NextResponse.json({ error: 'file ve classId zorunlu' }, { status: 400 })
  }

  // Sınıf bilgisini getir (credential_type, school_id, access_code)
  const { data: classData, error: classError } = await supabase
    .from('classes')
    .select('id, school_id, access_code, credential_type, teacher_id')
    .eq('id', classId)
    .single()

  if (classError || !classData) {
    return NextResponse.json({ error: 'Sınıf bulunamadı' }, { status: 404 })
  }

  // Öğretmen kontrolü
  if (classData.teacher_id !== user.id) {
    return NextResponse.json({ error: 'Bu sınıfa erişim yok' }, { status: 403 })
  }

  // Kota kontrolü: okuldaki mevcut öğrenci sayısı
  const { data: schoolData } = await supabase
    .from('schools')
    .select('quota_students')
    .eq('id', classData.school_id)
    .single()

  const { count: currentCount } = await supabase
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', classData.school_id)
    .eq('role', 'student')

  const quota = schoolData?.quota_students ?? 0
  const used = currentCount ?? 0

  // CSV parse
  const text = await file.text()
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  // Başlık satırını atla
  const dataLines = lines[0]?.toLowerCase().includes('nickname') ? lines.slice(1) : lines

  if (used + dataLines.length > quota) {
    return NextResponse.json(
      { error: `Kota aşılıyor! Mevcut: ${used}, Kota: ${quota}, Eklenecek: ${dataLines.length}` },
      { status: 422 }
    )
  }

  const result: CsvUploadResult = { success: [], errors: [] }

  for (let i = 0; i < dataLines.length; i++) {
    const nickname = dataLines[i].trim()
    if (!nickname) continue

    // Rastgele 4 haneli PIN üret
    const credential = String(Math.floor(1000 + Math.random() * 9000))
    const email = `${nickname.toLowerCase()}@${classData.access_code}.gencyz.local`

    // Supabase Auth user oluştur
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password: credential,
      email_confirm: true,
    })

    if (authError) {
      result.errors.push({ row: i + 1, nickname, reason: authError.message })
      continue
    }

    const newUserId = authData.user.id

    // school_users'a ekle
    await adminClient.from('school_users').insert({
      school_id: classData.school_id,
      user_id: newUserId,
      role: 'student',
    })

    // class_students'a ekle
    const { error: studentError } = await adminClient.from('class_students').insert({
      class_id: classId,
      user_id: newUserId,
      nickname,
      credential_plain: credential,
    })

    if (studentError) {
      // Auth user oluştu ama DB kaydı olmadı — kullanıcıyı temizle
      await adminClient.auth.admin.deleteUser(newUserId)
      result.errors.push({ row: i + 1, nickname, reason: 'Nickname zaten kullanımda' })
      continue
    }

    result.success.push(nickname)
  }

  return NextResponse.json(result, { status: 200 })
}
```

- [ ] **Step 3: CSV API'yi test et**

```bash
cd web && npm run dev
```

Test CSV dosyası oluştur (`/tmp/test.csv`):
```csv
nickname
TestOgrenci1
TestOgrenci2
```

```bash
# Önce bir sınıf ve öğretmen oluşturmak gerekli (Gemini'nin UI'ı sonra yapacak)
# Şimdilik API'nin parse ettiğini doğrula:
curl -X POST http://localhost:3000/api/schools/students/csv \
  -F "file=@/tmp/test.csv" \
  -F "classId=test-id"
# Beklenen: 401 Unauthorized (giriş yok)
```

- [ ] **Step 4: Commit**

```bash
git add web/src/app/api/
git commit -m "feat: okul CRUD API + CSV öğrenci yükleme API"
```

---

## Task 8: Super Admin UI — `/admin/okullar` (Gemini)

**Files:**
- Create: `web/src/app/(admin)/admin/okullar/page.tsx`

Gemini bu task'ı tamamlar. Gerekli API'ler (`GET/POST /api/schools`) Task 7'de hazır.

**Beklenen özellikler:**
- Okul listesi tablosu (isim, kota, durum, öğrenci sayısı)
- Yeni okul formu: isim, `quota_students`, `quota_teachers`, status
- `POST /api/schools` ile kaydet
- shadcn/ui Card + Table + Dialog kullan

---

## Task 9: Okul Admin UI — `/okul` (Gemini)

**Files:**
- Create: `web/src/app/(okul)/okul/page.tsx`

**Beklenen özellikler:**
- Kota özeti (kullanılan/toplam öğrenci, öğretmen)
- Öğretmen listesi + davet formu (email ile)
- Sınıf listesi (isim, öğrenci sayısı, access_code)

---

## Task 10: Öğretmen UI — `/ogretmen/siniflar/[classId]` (Gemini)

**Files:**
- Create: `web/src/app/(ogretmen)/ogretmen/siniflar/[classId]/page.tsx`

**Beklenen özellikler:**
- Sınıf bilgisi (isim, access_code, credential_type)
- Öğrenci listesi: nickname, credential_plain, PIN sıfırla butonu, çıkar butonu
- CSV yükleme formu → `POST /api/schools/students/csv`
- Yazdırılabilir liste butonu (window.print())

---

## Doğrulama Senaryoları

Tüm task'lar bittikten sonra şu senaryoları elle test et:

1. `http://localhost:3000/admin/okullar` → giriş yokken `/kolay-giris?redirect=/admin/okullar`'a yönlenmeli
2. Supabase Dashboard'dan `super_admin` rolü olan bir kullanıcı oluştur → `/kolay-giris` üzerinden giriş → `/admin/okullar` açılmalı
3. Super admin → okul oluştur (5 öğrenci kotası)
4. Öğretmen girişi → sınıf sayfasına git → CSV yükle (3 öğrenci) → başarılı
5. CSV ile 6 öğrenci yükle → 422 kota hatası
6. Oluşturulan öğrenci → `/kolay-giris` → sınıf kodu → nickname → PIN → giriş başarılı
