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
