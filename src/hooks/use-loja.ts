import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { normalizarLoja, normalizarVeiculo } from "@/lib/adapter";
import type { LojaAdaptada, VeiculoAdaptado } from "@/types/loja";

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return (array ?? []).reduce((acc, item) => {
    const grupo = String(item[key]);
    if (!acc[grupo]) acc[grupo] = [];
    acc[grupo].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

function getSlugFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("slug");
}

interface UseLojaResult {
  loja: LojaAdaptada | null;
  veiculos: VeiculoAdaptado[];
  loading: boolean;
  erro: string | null;
  slug: string | null;
}

export function useLoja(): UseLojaResult {
  const [loja, setLoja] = useState<LojaAdaptada | null>(null);
  const [veiculos, setVeiculos] = useState<VeiculoAdaptado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(getSlugFromUrl());

  useEffect(() => {
    const currentSlug = getSlugFromUrl();
    setSlug(currentSlug);

    if (!currentSlug) {
      setLoading(false);
      return;
    }

    let cancelado = false;

    async function carregar() {
      try {
        setLoading(true);
        setErro(null);

        // 1. Busca loja pelo slug
        const { data: lojaRaw, error: lojaError } = await supabase
          .from("lojas")
          .select("*")
          .eq("slug", currentSlug)
          .single();

        if (lojaError || !lojaRaw) {
          throw new Error("Loja não encontrada.");
        }

        // 2. Busca veiculos ativos da loja
        const { data: veiculosRaw } = await supabase
          .from("veiculos")
          .select("*")
          .eq("loja_id", lojaRaw.id)
          .in("status", ["disponivel", "ativo"]);

        // 3. Busca fotos dos veiculos
        const veiculoIds = veiculosRaw?.map((v) => v.id) ?? [];
        let fotosRaw: Record<string, unknown>[] = [];

        if (veiculoIds.length > 0) {
          const { data: fotosData } = await supabase
            .from("fotos_veiculo")
            .select("*")
            .in("veiculo_id", veiculoIds);
          fotosRaw = (fotosData as Record<string, unknown>[]) ?? [];
        }

        if (cancelado) return;

        const fotosPorVeiculo = groupBy(fotosRaw, "veiculo_id");

        const lojaAdaptada = normalizarLoja(
          lojaRaw as Record<string, unknown>
        );
        const veiculosAdaptados = (veiculosRaw ?? []).map((v) =>
          normalizarVeiculo(
            v as Record<string, unknown>,
            fotosPorVeiculo[v.id] ?? []
          )
        );

        setLoja(lojaAdaptada);
        setVeiculos(veiculosAdaptados);
      } catch (err) {
        if (cancelado) return;
        setErro(err instanceof Error ? err.message : "Erro ao carregar dados.");
      } finally {
        if (!cancelado) setLoading(false);
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, []);

  return { loja, veiculos, loading, erro, slug };
}
