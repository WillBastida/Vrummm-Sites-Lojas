import { siteConfig, vehicles, filterCategories } from "@/data/config";
import type { LojaAdaptada, VeiculoAdaptado } from "@/types/loja";

export const lojaDemo: LojaAdaptada = {
  id: "demo",
  slug: "demo",
  nome: "Vrummm Multimarcas",
  nomeCurto: "Vrummm",
  whatsapp: siteConfig.whatsapp,
  whatsappLink: `https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}&text=${encodeURIComponent(
    siteConfig.whatsappMessage
  )}`,
  telefone: siteConfig.phone,
  email: siteConfig.email,
  endereco: { linhaCompleta: siteConfig.address },
  sobre:
    "A Vrummm nasceu da paixão por carros e do compromisso com a transparência. Há mais de 15 anos, conectamos pessoas aos veículos dos sonhos com atendimento consultivo e curadoria premium.",
  horario: siteConfig.hours,
  logoUrl: undefined,
  monograma: "VR",
  cores: { primary: "#C8A45C", secondary: "#0A0A0A" },
  temaPreset: "preto-showroom",
  redes: {
    instagram: siteConfig.instagram,
    facebook: siteConfig.facebook,
  },
  status: "ativo",
};

export const veiculosDemo: VeiculoAdaptado[] = vehicles.map((v) => ({
  id: String(v.id),
  titulo: v.model,
  marca: v.model.split(" ")[0],
  modelo: v.model.split(" ").slice(1, 3).join(" "),
  versao: v.model.split(" ").slice(3).join(" ") || undefined,
  ano: v.year,
  km: Number(v.km.replace(/\D/g, "")),
  kmFormatado: v.km,
  cor: "",
  preco: Number(v.price.replace(/[R$\s.]/g, "").replace(",", ".")),
  precoFormatado: v.price,
  combustivel: "Flex",
  cambio: "Automático",
  categoria: v.category as VeiculoAdaptado["categoria"],
  badge: v.badge,
  destaque: false,
  fotoCapa: v.image,
  fotos: [v.image],
  status: "disponivel",
}));

export { filterCategories };
