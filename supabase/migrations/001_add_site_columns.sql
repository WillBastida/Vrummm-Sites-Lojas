-- Migration: colunas necessarias para o front Vrummm lojas
-- Aplicar em: Supabase Dashboard > SQL Editor > New query

-- Categoria do veiculo para filtros do showroom
ALTER TABLE public.veiculos
  ADD COLUMN IF NOT EXISTS categoria text;

-- Constraint opcional: garante valores validos
ALTER TABLE public.veiculos
  DROP CONSTRAINT IF EXISTS veiculos_categoria_check;

ALTER TABLE public.veiculos
  ADD CONSTRAINT veiculos_categoria_check
  CHECK (categoria IS NULL OR categoria IN ('seminovos', '0km', 'blindados'));

-- Texto "Sobre a loja" para a secao institucional
ALTER TABLE public.lojas
  ADD COLUMN IF NOT EXISTS sobre text;

-- Horario de funcionamento para a secao de localizacao
ALTER TABLE public.lojas
  ADD COLUMN IF NOT EXISTS horario_funcionamento text;
