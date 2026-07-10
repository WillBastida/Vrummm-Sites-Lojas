import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { vehicles, filterCategories } from "@/data/config";
import type { Vehicle } from "@/data/config";

gsap.registerPlugin(ScrollTrigger);

export default function Showroom() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredVehicles: Vehicle[] =
    activeFilter === "todos"
      ? vehicles
      : vehicles.filter((v) => v.category === activeFilter);

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

  return (
    <section ref={sectionRef} id="showroom" className="w-full bg-dark py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <span className="showroom-header-anim font-oswald text-xs font-medium uppercase tracking-[0.2em] text-gold block mb-3">
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
                className={`font-oswald text-xs font-medium uppercase tracking-[0.1em] px-5 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === cat.key
                    ? "bg-gold text-dark"
                    : "bg-transparent border border-white/15 text-[#A0A0A0] hover:border-white hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="vehicle-card bg-dark-elevated rounded-xl overflow-hidden group hover:bg-dark-card transition-colors duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.model}
                  className="w-full h-full object-cover vehicle-card-image will-change-transform"
                  loading="lazy"
                />
                {vehicle.badge && (
                  <span className="absolute top-3 left-3 bg-gold text-dark text-[11px] font-semibold uppercase px-3 py-1 rounded">
                    {vehicle.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter text-[13px] text-[#A0A0A0] uppercase">
                    {vehicle.km}
                  </span>
                  <span className="font-inter text-[13px] text-[#A0A0A0]">
                    {vehicle.year}
                  </span>
                </div>
                <h3 className="font-oswald text-base font-semibold uppercase text-white leading-tight line-clamp-2 mb-4 min-h-[44px]">
                  {vehicle.model}
                </h3>
                <div className="border-t border-white/[0.06] pt-4">
                  <span className="font-oswald text-2xl font-bold text-gold">
                    {vehicle.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 border border-gold text-gold px-8 py-3 font-oswald text-[13px] font-medium uppercase tracking-[0.12em] hover:bg-gold hover:text-dark transition-all duration-300">
            Ver todos os veículos
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
