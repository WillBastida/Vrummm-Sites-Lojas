import { siteConfig } from "@/data/config";

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

export default function Footer() {
  return (
    <footer className="w-full bg-dark border-t border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 4L16 28L24 4"
                  stroke="#C8A45C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4L16 16L20 4"
                  stroke="#C8A45C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
              </svg>
              <span className="font-oswald text-lg font-bold uppercase tracking-[0.15em] text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="font-inter text-sm text-[#A0A0A0] max-w-[260px] leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-oswald text-xs font-medium uppercase tracking-[0.15em] text-gold mb-5">
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
            <h4 className="font-oswald text-xs font-medium uppercase tracking-[0.15em] text-gold mb-5">
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
            <h4 className="font-oswald text-xs font-medium uppercase tracking-[0.15em] text-gold mb-5">
              FALE CONOSCO
            </h4>
            <p className="font-inter text-base font-medium text-white mb-2">
              {siteConfig.phone}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-inter text-[15px] text-[#A0A0A0] hover:text-gold transition-colors duration-300 block mb-6"
            >
              {siteConfig.email}
            </a>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href={`https://instagram.com/${siteConfig.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] hover:text-gold hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] hover:text-gold hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href={siteConfig.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] hover:text-gold hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] hover:text-gold hover:scale-110 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.06] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-[13px] text-[#666666]">
            © 2025 Vrummm. Todos os direitos reservados.
          </p>
          <span className="font-inter text-[13px] text-[#666666] hover:text-[#A0A0A0] cursor-pointer transition-colors duration-300">
            Política de Privacidade
          </span>
        </div>
      </div>
    </footer>
  );
}
