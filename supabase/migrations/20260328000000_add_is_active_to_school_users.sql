-- school_users tablosuna is_active kolonu ekle (ogretmen/idareci pasiflestirme icin)
ALTER TABLE public.school_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true NOT NULL;

-- schools tablosuna da status guncellemesi icin index
CREATE INDEX IF NOT EXISTS idx_school_users_is_active ON public.school_users(is_active);
