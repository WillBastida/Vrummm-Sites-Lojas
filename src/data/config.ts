export interface Vehicle {
  id: number;
  model: string;
  price: string;
  km: string;
  year: string;
  image: string;
  badge?: string;
  category: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const siteConfig = {
  name: "VRUMMM",
  tagline: "Concessionária especializada em veículos premium desde 2008.",
  phone: "(11) 99999-9999",
  whatsapp: "5511999999999",
  whatsappMessage: "Olá, vim através do site e gostaria de mais informações.",
  email: "contato@vrummm.com.br",
  address: "Av. das Nações Unidas, 12.555 — Brooklin Novo, São Paulo — SP, 04578-000",
  hours: "Segunda a Sexta: 9h às 19h | Sábado: 10h às 16h",
  instagram: "@vrummm",
  facebook: "https://facebook.com/vrummm",
  youtube: "https://youtube.com/vrummm",
  tiktok: "https://tiktok.com/@vrummm",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.0!2d-46.68!3d-23.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM3JzEyLjAiUyA0NsKwNDAnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1",
  heroTitle: "SEU PRÓXIMO CARRO ESTÁ AQUI.",
  heroSubtitle: "Concessionária especializada em seminovos de luxo, blindados e 0km. Atendimento consultivo e transparência em cada etapa.",
  heroLabel: "SHOWROOM PREMIUM",
};

export const vehicles: Vehicle[] = [
  {
    id: 1,
    model: "BMW X5 XDRIVE 30D M SPORT",
    price: "R$ 589.900",
    km: "45.000 KM",
    year: "2023/2024",
    image: "/images/car-1.jpg",
    badge: "BLINDADO",
    category: "blindados",
  },
  {
    id: 2,
    model: "PORSCHE CAYENNE COUPE 3.0 V6",
    price: "R$ 749.900",
    km: "28.000 KM",
    year: "2022/2023",
    image: "/images/car-2.jpg",
    category: "seminovos",
  },
  {
    id: 3,
    model: "MERCEDES-BENZ GLE 400D AMG LINE",
    price: "R$ 649.900",
    km: "32.000 KM",
    year: "2023/2024",
    image: "/images/car-3.jpg",
    badge: "0KM",
    category: "0km",
  },
  {
    id: 4,
    model: "AUDI Q7 3.0 TDI S LINE",
    price: "R$ 529.900",
    km: "55.000 KM",
    year: "2022/2023",
    image: "/images/car-4.jpg",
    category: "seminovos",
  },
  {
    id: 5,
    model: "RANGE ROVER VELAR P250 R-DYNAMIC",
    price: "R$ 489.900",
    km: "38.000 KM",
    year: "2023/2023",
    image: "/images/car-5.jpg",
    category: "seminovos",
  },
  {
    id: 6,
    model: "VOLVO XC90 T8 INSCRIPTION",
    price: "R$ 459.900",
    km: "41.000 KM",
    year: "2022/2023",
    image: "/images/car-6.jpg",
    badge: "BLINDADO",
    category: "blindados",
  },
];

export const features: Feature[] = [
  {
    icon: "Wrench",
    title: "Oficina Especializada",
    description: "Equipe técnica dedicada à excelência em cada detalhe do seu veículo.",
  },
  {
    icon: "Wallet",
    title: "Financiamento",
    description: "Condições sob medida com aprovação ágil e consultoria especializada.",
  },
  {
    icon: "FileCheck",
    title: "Assessoria Completa",
    description: "Acompanhamos todo o processo: documentação, transferência e entrega.",
  },
  {
    icon: "Shield",
    title: "Garantia Premium",
    description: "Garantia estendida e suporte pós-venda de excelência para sua tranquilidade.",
  },
];

export const filterCategories = [
  { key: "todos", label: "Todos" },
  { key: "seminovos", label: "Seminovos" },
  { key: "0km", label: "0km" },
  { key: "blindados", label: "Blindados" },
];

export const heroSlides = [
  { image: "/images/hero-1.jpg", alt: "BMW X5 - SUV de luxo" },
  { image: "/images/hero-2.jpg", alt: "Porsche Cayenne Coupe" },
  { image: "/images/hero-3.jpg", alt: "Range Rover Velar" },
];
