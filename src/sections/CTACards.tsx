import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, KeyRound, ArrowRight } from "lucide-react";
import type { LojaAdaptada } from "@/types/loja";

gsap.registerPlugin(ScrollTrigger);

interface CTACardsProps {
  loja: LojaAdaptada;
}

export default function CTACards({ loja }: CTACardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "QUERO COMPRAR UM CARRO",
      description: `Encontre o veículo ideal no showroom da ${loja.nomeCurto} com as melhores condições.`,
      image: "/images/card-comprar.jpg",
      link: "#showroom",
      linkText: "Ver veículos",
      icon: Car,
    },
    {
      title: "QUERO VENDER MEU CARRO",
      description: `Avaliação justa do seu veículo com pagamento ágil e processo simplificado na ${loja.nomeCurto}.`,
      image: "/images/card-vender.jpg",
      link: "#localizacao",
      linkText: "Solicitar avaliação",
      icon: KeyRound,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardEls = section.querySelectorAll(".cta-card");

    gsap.fromTo(
      cardEls,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20"
      style={{ backgroundColor: loja.cores.secondary === "#0A0A0A" ? "#141414" : loja.cores.secondary }}
    >
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <a
              key={index}
              href={card.link}
              onClick={(e) => handleClick(e, card.link)}
              className="cta-card group relative rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-card transition-all duration-400 flex flex-col sm:flex-row"
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                backgroundColor: loja.cores.secondary === "#0A0A0A" ? "#1A1A1A" : "#ffffff",
              }}
            >
              {/* Image */}
              <div className="sm:w-1/2 h-48 sm:h-auto relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 hidden sm:block"
                  style={{
                    background: `linear-gradient(to right, transparent, ${loja.cores.secondary}CC)`,
                  }}
                />
                <div
                  className="absolute inset-0 sm:hidden"
                  style={{
                    background: `linear-gradient(to top, ${loja.cores.secondary}CC, transparent)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="sm:w-1/2 p-8 flex flex-col justify-center">
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <Icon size={32} style={{ color: loja.cores.primary }} />
                </div>
                <h3 className="font-oswald text-xl lg:text-2xl font-bold uppercase tracking-[0.05em] text-white mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="font-inter text-sm lg:text-base text-[#A0A0A0] mb-5 leading-relaxed">
                  {card.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 font-oswald text-[13px] font-medium uppercase tracking-[0.1em] group-hover:translate-x-1 transition-transform duration-300"
                  style={{ color: loja.cores.primary }}
                >
                  {card.linkText}
                  <ArrowRight size={14} />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
