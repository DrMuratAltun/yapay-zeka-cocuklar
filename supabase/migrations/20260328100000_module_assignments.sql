-- ============================================================
-- GençYZ Modül Atama + Quiz İlerleme Sistemi
-- ============================================================

-- 1. classes tablosuna module_order kolonu
ALTER TABLE public.classes
  ADD COLUMN IF NOT EXISTS module_order TEXT NOT NULL DEFAULT 'sequential'
  CHECK (module_order IN ('sequential', 'random'));

-- 2. class_modules tablosu (hangi sinifa hangi bolumler atanmis)
CREATE TABLE IF NOT EXISTS public.class_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  bolum_no SMALLINT NOT NULL CHECK (bolum_no BETWEEN 1 AND 10),
  sort_order SMALLINT NOT NULL DEFAULT 0,
  min_quiz_score SMALLINT NOT NULL DEFAULT 60,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(class_id, bolum_no)
);

CREATE INDEX IF NOT EXISTS idx_class_modules_class ON public.class_modules(class_id);

-- 3. student_quiz_results tablosu (ogrenci quiz sonuclari)
CREATE TABLE IF NOT EXISTS public.student_quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  bolum_no SMALLINT NOT NULL CHECK (bolum_no BETWEEN 1 AND 10),
  score SMALLINT NOT NULL CHECK (score BETWEEN 0 AND 100),
  passed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, class_id, bolum_no)
);

CREATE INDEX IF NOT EXISTS idx_sqr_student_class ON public.student_quiz_results(student_id, class_id);

-- 4. school_users tablosuna is_active kolonu (ogretmen pasiflestirme)
ALTER TABLE public.school_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true NOT NULL;
