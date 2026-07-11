import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import type { LojaAdaptada, VeiculoAdaptado } from "@/types/loja";
import { mensagemEstoqueVazio } from "@/lib/adapter";

gsap.registerPlugin(ScrollTrigger);

interface ShowroomProps {
  loja: LojaAdaptada;
  veiculos: VeiculoAdaptado[];
}

const filterCategories = [
  { key: "todos", label: "Todos" },
  { key: "seminovos", label: "Seminovos" },
  { key: "0km", label: "0km" },
  { key: "blindados", label: "Blindados" },
];

export default function Showroom({ loja, veiculos }: ShowroomProps) {
  const [activeFilter, setActiveFilter] = useState("todos");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredVehicles: VeiculoAdaptado[] =
    activeFilter === "todos"
      ? veiculos
      : veiculos.filter((v) => v.categoria === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerEls = section.querySelectorAll(".showroom-header-anim");
    gsap.fromTo(
      headerEls,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
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

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".vehicle-card");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [activeFilter]);

  const handleFilter = (key: string) => {
    if (key === activeFilter) return;

    const grid = gridRef.current;
    if (!grid) {
      setActiveFilter(key);
      return;
    }

    const cards = grid.querySelectorAll(".vehicle-card");

    gsap.to(cards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setActiveFilter(key);
        requestAnimationFrame(() => {
          const newCards = grid.querySelectorAll(".vehicle-card");
          gsap.fromTo(
            newCards,
            { opacity: 0, scale: 0.95, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.4,
              ease: "power3.out",
            }
          );
        });
      },
    });
  };

  const temaEscuro = loja.cores.secondary === "#0A0A0A";

  return (
    <section
      ref={sectionRef}
      id="showroom"
      className="w-full py-24"
      style={{ backgroundColor: loja.cores.secondary }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <span
              className="showroom-header-anim font-oswald text-xs font-medium uppercase tracking-[0.2em] block mb-3"
              style={{ color: loja.cores.primary }}
            >
              SHOWROOM
            </span>
            <h2 className="showroom-header-anim font-oswald text-3xl lg:text-[40px] font-bold uppercase tracking-[0.06em] leading-[1.1] text-white">
              ÚLTIMAS OFERTAS
            </h2>
          </div>
          <div className="showroom-header-anim flex flex-wrap gap-3">
            {filterCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleFilter(cat.key)}
                className="font-oswald text-xs font-medium uppercase tracking-[0.1em] px-5 py-2 rounded-full transition-all duration-300 border"
                style={{
                  backgroundColor:
                    activeFilter === cat.key ? loja.cores.primary : "transparent",
                  color:
                    activeFilter === cat.key
                      ? loja.cores.secondary
                      : "#A0A0A0",
                  borderColor:
                    activeFilter === cat.key ? loja.cores.primary : "rgba(255,255,255,0.15)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="vehicle-card rounded-xl overflow-hidden group transition-colors duration-300 cursor-pointer"
                style={{
                  backgroundColor: temaEscuro ? "#141414" : "#ffffff",
                }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {vehicle.fotoCapa ? (
                    <img
                      src={vehicle.fotoCapa}
                      alt={vehicle.titulo}
                      className="w-full h-full object-cover vehicle-card-image will-change-transform"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: temaEscuro ? "#1A1A1A" : "#F3F4F6" }}
                    >
                      <span className="font-oswald text-lg uppercase tracking-[0.1em]" style={{ color: loja.cores.primary }}>
                        {loja.monograma}
                      </span>
                    </div>
                  )}
                  {vehicle.badge && (
                    <span
                      className="absolute top-3 left-3 text-dark text-[11px] font-semibold uppercase px-3 py-1 rounded"
                      style={{ backgroundColor: loja.cores.primary }}
                    >
                      {vehicle.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-inter text-[13px] text-[#A0A0A0] uppercase">
                      {vehicle.kmFormatado}
                    </span>
                    <span className="font-inter text-[13px] text-[#A0A0A0]">
                      {vehicle.ano}
                    </span>
                  </div>
                  <h3 className="font-oswald text-base font-semibold uppercase text-white leading-tight line-clamp-2 mb-4 min-h-[44px]">
                    {vehicle.titulo}
                  </h3>
                  <div className="border-t border-white/[0.06] pt-4">
                    <span
                      className="font-oswald text-2xl font-bold"
                      style={{ color: loja.cores.primary }}
                    >
                      {vehicle.precoFormatado}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-xl" style={{ backgroundColor: temaEscuro ? "#141414" : "#ffffff" }}>
            <h3 className="font-oswald text-xl uppercase tracking-[0.1em] text-white mb-4">
              Estoque sob consulta
            </h3>
            <p className="font-inter text-[#A0A0A0] max-w-md mx-auto mb-8">
              {mensagemEstoqueVazio(loja.nomeCurto)}
            </p>
            <a
              href={loja.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-dark px-8 py-3 font-oswald text-[13px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: loja.cores.primary }}
            >
              Falar no WhatsApp
              <ArrowRight size={14} />
            </a>
          </div>
        )}

        {/* Bottom CTA */}
        {filteredVehicles.length > 0 && (
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-2 border px-8 py-3 font-oswald text-[13px] font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:text-dark"
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
              Ver todos os veículos
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
