-- Ejecutar una sola vez en Supabase SQL Editor
ALTER TABLE public.water_entries ADD COLUMN IF NOT EXISTS details jsonb NOT NULL DEFAULT '{}'::jsonb;
