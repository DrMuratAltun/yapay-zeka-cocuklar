-- ============================================
-- Bağımsız GençYZ B2B SaaS Modülü
-- ============================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. schools tablosu (Okul verileri ve kotalar)
CREATE TABLE IF NOT EXISTS public.schools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  quota_students INTEGER DEFAULT 100,
  quota_teachers INTEGER DEFAULT 5,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. school_users tablosu (Hangi okulda kim var)
CREATE TABLE IF NOT EXISTS public.school_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'school_admin', 'teacher', 'student')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(school_id, user_id)
);

CREATE INDEX idx_school_users_school ON public.school_users(school_id);
CREATE INDEX idx_school_users_user ON public.school_users(user_id);
CREATE INDEX idx_school_users_role ON public.school_users(role);

-- 3. classes tablosu (Öğretmenlerin sınıfları ve "Kolay Giriş" kodu)
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  grade_level TEXT,
  access_code TEXT UNIQUE, -- Code.org stili giriş için (örn: 6A-1234)
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_classes_school ON public.classes(school_id);
CREATE INDEX idx_classes_access_code ON public.classes(access_code);

-- 4. class_students (Hangi öğrenci hangi sınıfta)
CREATE TABLE IF NOT EXISTS public.class_students (
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (class_id, student_id)
);

-- RLS POLICIES (Row-Level Security)
-- NOT: Tam güvenlik için policies aktifleştirildi.
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_students ENABLE ROW LEVEL SECURITY;

-- Schools RLS
CREATE POLICY "Public read schools" ON public.schools FOR SELECT USING (true);
CREATE POLICY "Super admin can all schools" ON public.schools FOR ALL USING (
  EXISTS(SELECT 1 FROM public.school_users WHERE user_id = auth.uid() AND role = 'super_admin')
);

-- School Users RLS
CREATE POLICY "Users can see users in own school" ON public.school_users FOR SELECT USING (
  EXISTS(SELECT 1 FROM public.school_users su WHERE su.user_id = auth.uid() AND su.school_id = school_users.school_id)
);
CREATE POLICY "Super and School admins can insert users" ON public.school_users FOR INSERT WITH CHECK (
  EXISTS(SELECT 1 FROM public.school_users su WHERE su.user_id = auth.uid() AND su.school_id = school_users.school_id AND su.role IN ('super_admin', 'school_admin'))
);

-- Classes RLS
CREATE POLICY "Users can see classes in own school" ON public.classes FOR SELECT USING (
  EXISTS(SELECT 1 FROM public.school_users su WHERE su.user_id = auth.uid() AND su.school_id = classes.school_id)
);
CREATE POLICY "Teachers and admins can insert classes" ON public.classes FOR INSERT WITH CHECK (
  EXISTS(SELECT 1 FROM public.school_users su WHERE su.user_id = auth.uid() AND su.school_id = classes.school_id AND su.role IN ('super_admin', 'school_admin', 'teacher'))
);

-- Class Students RLS
CREATE POLICY "Users can see students in own class" ON public.class_students FOR SELECT USING (
  EXISTS(
    SELECT 1 FROM public.classes c
    JOIN public.school_users su ON su.school_id = c.school_id
    WHERE c.id = class_students.class_id AND su.user_id = auth.uid()
  )
);
CREATE POLICY "Teachers can add students to their class" ON public.class_students FOR INSERT WITH CHECK (
  EXISTS(SELECT 1 FROM public.classes c WHERE c.id = class_students.class_id AND c.teacher_id = auth.uid()) OR
  EXISTS(SELECT 1 FROM public.school_users su JOIN public.classes c ON c.school_id = su.school_id WHERE c.id = class_students.class_id AND su.user_id = auth.uid() AND su.role IN ('super_admin', 'school_admin'))
);
