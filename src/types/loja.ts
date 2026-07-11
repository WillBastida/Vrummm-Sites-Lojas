export interface Endereco {
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  complemento?: string;
  linhaCompleta?: string;
}

export interface CoresBrand {
  primary: string;
  secondary: string;
}

export interface RedesSociais {
  instagram?: string;
  facebook?: string;
}

export interface LojaAdaptada {
  id: string;
  slug: string;
  nome: string;
  nomeCurto: string;
  whatsapp: string;
  whatsappLink: string;
  telefone: string;
  email?: string;
  endereco: Endereco;
  sobre: string;
  horario: string;
  logoUrl?: string;
  monograma: string;
  cores: CoresBrand;
  temaPreset: TemaPreset;
  redes: RedesSociais;
  status: string;
}

export interface VeiculoAdaptado {
  id: string;
  titulo: string;
  marca: string;
  modelo: string;
  versao?: string;
  ano: string;
  km: number;
  kmFormatado: string;
  cor: string;
  preco: number;
  precoFormatado: string;
  combustivel: string;
  cambio: string;
  categoria: CategoriaVeiculo;
  badge?: string;
  destaque: boolean;
  fotoCapa?: string;
  fotos: string[];
  status: string;
}

export type CategoriaVeiculo = "seminovos" | "0km" | "blindados";

export type TemaPreset =
  | "preto-showroom"
  | "azul-confianca"
  | "vermelho-energia"
  | "cinza-neutro"
  | "custom";

export const CATEGORIAS_VEICULO: { key: CategoriaVeiculo; label: string }[] = [
  { key: "todos" as unknown as CategoriaVeiculo, label: "Todos" },
  { key: "seminovos", label: "Seminovos" },
  { key: "0km", label: "0km" },
  { key: "blindados", label: "Blindados" },
];
