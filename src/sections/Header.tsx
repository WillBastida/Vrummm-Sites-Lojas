import { useEffect, useRef, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import gsap from "gsap";
import type { LojaAdaptada } from "@/types/loja";

interface HeaderProps {
  loja: LojaAdaptada;
}

const navLinks = [
  { label: "Seminovos", href: "#showroom" },
  { label: "0km", href: "#showroom" },
  { label: "Blindados", href: "#showroom" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#localizacao" },
];

export default function Header({ loja }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -72, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const bgStyle = scrolled
    ? { backgroundColor: `${loja.cores.secondary}F2` } // ~95% opacity
    : { backgroundColor: `${loja.cores.secondary}CC` }; // ~80% opacity

  return (
    <>
      <header
        ref={headerRef}
        style={bgStyle}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 backdrop-blur-xl border-b border-white/[0.06]"
      >
        <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            {loja.logoUrl ? (
              <img
                src={loja.logoUrl}
                alt={loja.nome}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <div
                className="w-8 h-8 flex items-center justify-center rounded font-oswald font-bold text-sm"
                style={{
                  backgroundColor: loja.cores.primary,
                  color: loja.cores.secondary,
                }}
              >
                {loja.monograma}
              </div>
            )}
            <span className="font-oswald text-xl font-bold uppercase tracking-[0.15em] text-white">
              {loja.nomeCurto}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-oswald text-[13px] font-medium uppercase tracking-[0.12em] text-[#A0A0A0] hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="font-inter text-sm font-medium text-white">
              {loja.telefone}
            </span>
            <a
              href="#showroom"
              onClick={(e) => handleNavClick(e, "#showroom")}
              className="flex items-center gap-2 border px-6 py-2.5 font-oswald text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:text-dark"
              style={{
                borderColor: loja.cores.primary,
                color: loja.cores.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = loja.cores.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Search size={14} />
              Ver Veículos
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          style={{ backgroundColor: `${loja.cores.secondary}FA` }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-oswald text-2xl font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300"
              style={{ "--hover-color": loja.cores.primary } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = loja.cores.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 text-center">
            <p className="font-inter text-lg text-white mb-4">{loja.telefone}</p>
            <a
              href="#showroom"
              onClick={(e) => handleNavClick(e, "#showroom")}
              className="inline-flex items-center gap-2 border px-8 py-3 font-oswald text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:text-dark"
              style={{
                borderColor: loja.cores.primary,
                color: loja.cores.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = loja.cores.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Search size={16} />
              Ver Veículos
            </a>
          </div>
        </div>
      )}
    </>
  );
}
