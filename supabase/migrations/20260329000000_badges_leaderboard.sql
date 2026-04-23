-- Rozet tanımları (sabit, seed data)
CREATE TABLE IF NOT EXISTS public.badge_definitions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  condition_type TEXT NOT NULL CHECK (condition_type IN ('modules_completed', 'avg_score', 'perfect_score', 'first_quiz', 'all_modules')),
  condition_value INT NOT NULL DEFAULT 1,
  sort_order SMALLINT NOT NULL DEFAULT 0
);

-- Öğrenci kazanılmış rozetleri
CREATE TABLE IF NOT EXISTS public.student_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL REFERENCES public.badge_definitions(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, badge_id)
);

CREATE INDEX IF NOT EXISTS idx_student_badges_student ON public.student_badges(student_id);

-- Seed rozet tanımları
INSERT INTO public.badge_definitions (id, name, description, icon, condition_type, condition_value, sort_order) VALUES
  ('first_step',    'Ilk Adim',       'Ilk quizi tamamla',                  '⭐', 'first_quiz',        1,  1),
  ('explorer',      'Kasif',          '3 modulu tamamla',                   '🧭', 'modules_completed', 3,  2),
  ('expert',        'Uzman',          '5 modulu tamamla',                   '🏅', 'modules_completed', 5,  3),
  ('coder',         'Kodcu',          '7 modulu tamamla',                   '💻', 'modules_completed', 7,  4),
  ('ethics_hero',   'Etik Kahraman',  '9 modulu tamamla',                   '⚖️', 'modules_completed', 9,  5),
  ('graduate',      'Mezun',          'Tum 10 modulu tamamla',              '🎓', 'all_modules',       10, 6),
  ('high_scorer',   'Yuksek Puan',    'Ortalama 80 ustu puan al',           '🌟', 'avg_score',         80, 7),
  ('perfectionist', 'Mukemmelci',     'Bir quizden 100 puan al',            '💎', 'perfect_score',     100,8)
ON CONFLICT (id) DO NOTHING;
