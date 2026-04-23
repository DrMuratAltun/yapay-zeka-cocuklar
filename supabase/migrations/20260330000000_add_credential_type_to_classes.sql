-- classes tablosuna credential_type kolonu ekle (pin, emoji, word)
ALTER TABLE public.classes
  ADD COLUMN IF NOT EXISTS credential_type TEXT DEFAULT 'pin'
  CHECK (credential_type IN ('pin', 'emoji', 'word'));
