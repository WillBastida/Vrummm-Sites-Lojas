import type { LojaAdaptada } from "@/types/loja";

interface FooterProps {
  loja: LojaAdaptada;
}

const navLinks = [
  { label: "Seminovos", href: "#showroom" },
  { label: "0km", href: "#showroom" },
  { label: "Blindados", href: "#showroom" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contato", href: "#localizacao" },
];

const serviceLinks = [
  "Financiamento",
  "Venda seu Carro",
  "Consignação",
  "Seguro",
  "Garantia Estendida",
];

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

export default function Footer({ loja }: FooterProps) {
  return (
    <footer
      className="w-full border-t border-white/[0.06]"
      style={{ backgroundColor: loja.cores.secondary }}
    >
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {loja.logoUrl ? (
                <img
                  src={loja.logoUrl}
                  alt={loja.nome}
                  className="h-6 w-auto object-contain"
                />
              ) : (
                <div
                  className="w-6 h-6 flex items-center justify-center rounded font-oswald font-bold text-xs"
                  style={{
                    backgroundColor: loja.cores.primary,
                    color: loja.cores.secondary,
                  }}
                >
                  {loja.monograma}
                </div>
              )}
              <span className="font-oswald text-lg font-bold uppercase tracking-[0.15em] text-white">
                {loja.nomeCurto}
              </span>
            </div>
            <p className="font-inter text-sm text-[#A0A0A0] max-w-[260px] leading-relaxed">
              {loja.sobre.slice(0, 120)}
              {loja.sobre.length > 120 ? "..." : ""}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="font-oswald text-xs font-medium uppercase tracking-[0.15em] mb-5"
              style={{ color: loja.cores.primary }}
            >
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-inter text-[15px] text-[#A0A0A0] hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-oswald text-xs font-medium uppercase tracking-[0.15em] mb-5"
              style={{ color: loja.cores.primary }}
            >
              SERVIÇOS
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="font-inter text-[15px] text-[#A0A0A0] hover:text-white hover:translate-x-1 inline-block transition-all duration-300 cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-oswald text-xs font-medium uppercase tracking-[0.15em] mb-5"
              style={{ color: loja.cores.primary }}
            >
              FALE CONOSCO
            </h4>
            <p className="font-inter text-base font-medium text-white mb-2">
              {loja.telefone}
            </p>
            {loja.email && (
              <a
                href={`mailto:${loja.email}`}
                className="font-inter text-[15px] text-[#A0A0A0] hover:text-white transition-colors duration-300 block mb-6"
              >
                {loja.email}
              </a>
            )}
            <div className="flex items-center gap-4">
              {loja.redes.instagram && (
                <a
                  href={`https://instagram.com/${loja.redes.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A0A0A0] hover:scale-110 transition-all duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.color = loja.cores.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {loja.redes.facebook && (
                <a
                  href={loja.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A0A0A0] hover:scale-110 transition-all duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.color = loja.cores.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.06] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-[13px] text-[#666666]">
            © {new Date().getFullYear()} {loja.nomeCurto}. Todos os direitos reservados.
          </p>
          <span className="font-inter text-[13px] text-[#666666] hover:text-[#A0A0A0] cursor-pointer transition-colors duration-300">
            Política de Privacidade
          </span>
        </div>
      </div>
    </footer>
  );
}
