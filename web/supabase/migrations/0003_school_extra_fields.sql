-- Okul tablosuna yeni alanlar ekle
ALTER TABLE schools ADD COLUMN IF NOT EXISTS expires_at timestamptz DEFAULT (now() + interval '1 year');
ALTER TABLE schools ADD COLUMN IF NOT EXISTS contact_email text;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS contact_phone text;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS address text;
