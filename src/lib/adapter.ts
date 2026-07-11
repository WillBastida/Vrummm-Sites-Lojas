import type {
  CategoriaVeiculo,
  CoresBrand,
  Endereco,
  LojaAdaptada,
  TemaPreset,
  VeiculoAdaptado,
} from "@/types/loja";

// ============================================================
// PRESETS DE TEMA
// ============================================================

const PRESETS: Record<TemaPreset, CoresBrand> = {
  "preto-showroom": { primary: "#C8A45C", secondary: "#0A0A0A" },
  "azul-confianca": { primary: "#2563EB", secondary: "#F8FAFC" },
  "vermelho-energia": { primary: "#DC2626", secondary: "#FAFAFA" },
  "cinza-neutro": { primary: "#374151", secondary: "#F3F4F6" },
  custom: { primary: "#C8A45C", secondary: "#0A0A0A" },
};

const PALAVRAS_IGNORADAS_MONOGRAMA = new Set([
  "de",
  "da",
  "do",
  "das",
  "dos",
  "e",
  "em",
  "com",
  "para",
  "a",
  "o",
  "os",
  "as",
  "ltda",
  "me",
  "epp",
  "ss",
  "veiculos",
  "veiculo",
  "carros",
  "carro",
  "multimarcas",
  "automoveis",
]);

// ============================================================
// HELPERS DE TEXTO
// ============================================================

export function normalizarNome(nome: unknown): string {
  if (!nome || typeof nome !== "string") return "Loja";

  return nome
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");
}

export function extrairMonograma(nome: string): string {
  const letras = nome
    .toLowerCase()
    .split(/\s+/)
    .filter((p) => p && !PALAVRAS_IGNORADAS_MONOGRAMA.has(p))
    .map((p) => p.charAt(0).toUpperCase())
    .slice(0, 3);

  return letras.join("") || nome.slice(0, 2).toUpperCase() || "LJ";
}

export function capitalizar(texto: unknown): string {
  if (!texto || typeof texto !== "string") return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// ============================================================
// HELPERS DE COR
// ============================================================

function hexParaRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalizado = hex.replace("#", "").trim();
  if (!/^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(normalizado)) return null;

  const expandido =
    normalizado.length === 3
      ? normalizado
          .split("")
          .map((c) => c + c)
          .join("")
      : normalizado;

  return {
    r: parseInt(expandido.slice(0, 2), 16),
    g: parseInt(expandido.slice(2, 4), 16),
    b: parseInt(expandido.slice(4, 6), 16),
  };
}

function luminancia(hex: string): number {
  const rgb = hexParaRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function corValida(hex: unknown): hex is string {
  return typeof hex === "string" && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim());
}

function contrasteOk(primary: string, secondary: string): boolean {
  const lum1 = luminancia(primary);
  const lum2 = luminancia(secondary);
  return Math.abs(lum1 - lum2) >= 0.35;
}

export function normalizarCores(coresBrand: unknown): {
  cores: CoresBrand;
  temaPreset: TemaPreset;
} {
  const raw =
    typeof coresBrand === "string" ? JSON.parse(coresBrand) : coresBrand;

  const primary = raw?.primary;
  const secondary = raw?.secondary;

  if (
    corValida(primary) &&
    corValida(secondary) &&
    contrasteOk(primary, secondary)
  ) {
    return {
      cores: {
        primary: primary.toLowerCase(),
        secondary: secondary.toLowerCase(),
      },
      temaPreset: determinarTemaPreset(primary),
    };
  }

  // Fallback elegante: preto showroom
  return {
    cores: PRESETS["preto-showroom"],
    temaPreset: "preto-showroom",
  };
}

function determinarTemaPreset(primary: string): TemaPreset {
  const rgb = hexParaRgb(primary);
  if (!rgb) return "custom";

  const { r, g, b } = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Cinza/neutro
  if (max - min < 30) return "cinza-neutro";
  // Vermelho predominante
  if (r > g + 50 && r > b + 50) return "vermelho-energia";
  // Azul predominante
  if (b > r + 30 && b > g + 30) return "azul-confianca";

  return "custom";
}

// ============================================================
// HELPERS DE CONTATO
// ============================================================

export function limparWhatsApp(whatsapp: unknown): string {
  if (!whatsapp || typeof whatsapp !== "string") return "";

  const digitos = whatsapp.replace(/\D/g, "");

  // Remove zero a esquerda de DDD (ex: 011999999999 -> 11999999999)
  if (digitos.length === 12 && digitos.startsWith("0") && digitos.startsWith("55", 1)) {
    return digitos.slice(1);
  }

  // Se comecar com 0 e tiver 11 digitos (ex: 011999999999)
  if (digitos.length === 12 && digitos.startsWith("0")) {
    return digitos.slice(1);
  }

  return digitos;
}

export function formatarTelefone(digitos: string): string {
  if (!digitos) return "";

  const ddi = digitos.startsWith("55") ? "+55 " : "";
  const resto = ddi ? digitos.slice(2) : digitos;

  if (resto.length === 11) {
    return `${ddi}(${resto.slice(0, 2)}) ${resto.slice(2, 7)}-${resto.slice(7)}`;
  }
  if (resto.length === 10) {
    return `${ddi}(${resto.slice(0, 2)}) ${resto.slice(2, 6)}-${resto.slice(6)}`;
  }

  return digitos;
}

export function gerarWhatsAppLink(
  digitos: string,
  mensagem?: string
): string {
  if (!digitos) return "#";
  const base = `https://api.whatsapp.com/send?phone=${digitos}`;
  if (!mensagem) return base;
  return `${base}&text=${encodeURIComponent(mensagem)}`;
}

// ============================================================
// ENDERECO
// ============================================================

export function normalizarEndereco(endereco: unknown): Endereco {
  if (!endereco) return { linhaCompleta: "" };

  if (typeof endereco === "string") {
    return { linhaCompleta: endereco.trim() };
  }

  if (typeof endereco === "object" && endereco !== null) {
    const e = endereco as Record<string, string>;
    const partes = [
      e.logradouro,
      e.numero,
      e.complemento,
      e.bairro,
      e.cidade && e.uf ? `${e.cidade} - ${e.uf}` : e.cidade || e.uf,
      e.cep,
    ].filter(Boolean);

    return {
      logradouro: e.logradouro,
      numero: e.numero,
      bairro: e.bairro,
      cidade: e.cidade,
      uf: e.uf,
      cep: e.cep,
      complemento: e.complemento,
      linhaCompleta: partes.join(", "),
    };
  }

  return { linhaCompleta: "" };
}

// ============================================================
// LOJA
// ============================================================

export function normalizarLoja(raw: Record<string, unknown>): LojaAdaptada {
  const nome = normalizarNome(raw.nome_fantasia);
  const monograma = extrairMonograma(nome);
  const whatsappDigitos = limparWhatsApp(raw.whatsapp);

  const { cores, temaPreset } = normalizarCores(raw.cores_brand);

  const instagram =
    typeof raw.instagram === "string" && raw.instagram.trim()
      ? raw.instagram.startsWith("@")
        ? raw.instagram
        : `@${raw.instagram}`
      : undefined;

  const facebook =
    typeof raw.facebook === "string" && raw.facebook.trim()
      ? raw.facebook.startsWith("http")
        ? raw.facebook
        : `https://facebook.com/${raw.facebook.replace(/^\//, "")}`
      : undefined;

  return {
    id: String(raw.id ?? ""),
    slug: String(raw.slug ?? ""),
    nome,
    nomeCurto: nome.split(" ")[0],
    whatsapp: whatsappDigitos,
    whatsappLink: gerarWhatsAppLink(
      whatsappDigitos,
      `Olá, ${nome.split(" ")[0]}! Vi o site e gostaria de mais informações.`
    ),
    telefone: formatarTelefone(whatsappDigitos),
    email: raw.email ? String(raw.email) : undefined,
    endereco: normalizarEndereco(raw.endereco),
    sobre:
      typeof raw.sobre === "string" && raw.sobre.trim()
        ? raw.sobre
        : `A ${nome} trabalha com seminovos e 0km multimarcas. Atendimento consultivo e transparência em cada negociação.`,
    horario:
      typeof raw.horario_funcionamento === "string" &&
      raw.horario_funcionamento.trim()
        ? raw.horario_funcionamento
        : "Segunda a Sexta: 9h às 18h | Sábado: 9h às 13h",
    logoUrl:
      typeof raw.logo_url === "string" && raw.logo_url.trim()
        ? raw.logo_url
        : undefined,
    monograma,
    cores,
    temaPreset,
    redes: { instagram, facebook },
    status: String(raw.status ?? "ativo"),
  };
}

// ============================================================
// VEICULO
// ============================================================

export function gerarTituloVeiculo(v: {
  marca?: unknown;
  modelo?: unknown;
  versao?: unknown;
}): string {
  const marca = String(v.marca ?? "").toUpperCase();
  const modelo = String(v.modelo ?? "").toUpperCase();
  const versao = String(v.versao ?? "").toUpperCase();

  const partes = [marca, modelo, versao].filter(Boolean);
  return partes.join(" ") || "Veículo";
}

export function formatarPreco(preco: unknown): string {
  const numero = typeof preco === "number" ? preco : Number(preco);
  if (Number.isNaN(numero)) return "Sob consulta";

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatarKm(km: unknown): string {
  const numero = typeof km === "number" ? km : Number(km);
  if (Number.isNaN(numero)) return "";
  return `${numero.toLocaleString("pt-BR")} KM`;
}

export function gerarAno(anoFab?: unknown, anoModelo?: unknown): string {
  const fab = String(anoFab ?? "");
  const mod = String(anoModelo ?? "");
  if (fab && mod && fab !== mod) return `${fab}/${mod}`;
  return mod || fab || "";
}

export function normalizarCategoria(
  categoria: unknown
): CategoriaVeiculo | "seminovos" {
  const valor = String(categoria ?? "").toLowerCase().trim();
  if (["seminovos", "0km", "blindados"].includes(valor)) {
    return valor as CategoriaVeiculo;
  }
  return "seminovos";
}

export function normalizarVeiculo(
  raw: Record<string, unknown>,
  fotosRaw: { url?: string; principal?: boolean; ordem?: number }[] = []
): VeiculoAdaptado {
  const titulo = gerarTituloVeiculo({
    marca: raw.marca,
    modelo: raw.modelo,
    versao: raw.versao,
  });

  const km = Number(raw.km ?? 0);
  const preco = Number(raw.preco ?? 0);
  const categoria = normalizarCategoria(raw.categoria);

  const fotos = fotosRaw
    .filter((f) => typeof f.url === "string" && f.url.trim())
    .sort((a, b) => (a.ordem ?? 999) - (b.ordem ?? 999));

  const fotoCapa =
    fotos.find((f) => f.principal)?.url || fotos[0]?.url || undefined;

  return {
    id: String(raw.id ?? ""),
    titulo,
    marca: capitalizar(raw.marca) || "",
    modelo: capitalizar(raw.modelo) || "",
    versao: raw.versao ? String(raw.versao) : undefined,
    ano: gerarAno(raw.ano_fab, raw.ano_modelo),
    km,
    kmFormatado: formatarKm(km),
    cor: capitalizar(raw.cor),
    preco,
    precoFormatado: preco > 0 ? formatarPreco(preco) : "Sob consulta",
    combustivel: capitalizar(raw.combustivel),
    cambio: capitalizar(raw.cambio),
    categoria,
    badge: categoria === "0km" ? "0KM" : categoria === "blindados" ? "BLINDADO" : undefined,
    destaque: Boolean(raw.destaque),
    fotoCapa,
    fotos: fotos.map((f) => f.url as string),
    status: String(raw.status ?? "disponivel"),
  };
}

// ============================================================
// FALLBACK: LOJA SEM ESTOQUE
// ============================================================

export function mensagemEstoqueVazio(nomeLoja: string): string {
  return `A ${nomeLoja} está preparando novas ofertas para você. Entre em contato pelo WhatsApp e seja o primeiro a saber dos próximos veículos.`;
}
