import { useEffect, useRef, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/config";
import gsap from "gsap";

const navLinks = [
  { label: "Seminovos", href: "#showroom" },
  { label: "0km", href: "#showroom" },
  { label: "Blindados", href: "#showroom" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#localizacao" },
];

export default function Header() {
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

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-dark/95 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-dark/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
            </div>
            <span className="font-oswald text-xl font-bold uppercase tracking-[0.15em] text-white">
              {siteConfig.name}
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
              {siteConfig.phone}
            </span>
            <a
              href="#showroom"
              onClick={(e) => handleNavClick(e, "#showroom")}
              className="flex items-center gap-2 border border-gold text-gold px-6 py-2.5 font-oswald text-xs uppercase tracking-[0.15em] hover:bg-gold hover:text-dark transition-all duration-300"
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
        <div className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-oswald text-2xl font-semibold uppercase tracking-[0.1em] text-white hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 text-center">
            <p className="font-inter text-lg text-white mb-4">{siteConfig.phone}</p>
            <a
              href="#showroom"
              onClick={(e) => handleNavClick(e, "#showroom")}
              className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3 font-oswald text-sm uppercase tracking-[0.15em] hover:bg-gold hover:text-dark transition-all duration-300"
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
