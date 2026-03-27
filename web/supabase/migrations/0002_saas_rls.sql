-- ============================================================
-- GençYZ B2B SaaS RLS Politikaları
-- ============================================================

alter table public.schools enable row level security;
alter table public.school_users enable row level security;
alter table public.classes enable row level security;
alter table public.class_students enable row level security;

-- -------------------- schools --------------------
create policy "super_admin: schools full access"
  on public.schools for all
  using (public.is_super_admin());

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
