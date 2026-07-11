import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import type { LojaAdaptada } from "@/types/loja";

gsap.registerPlugin(ScrollTrigger);

interface LocalizacaoProps {
  loja: LojaAdaptada;
}

export default function Localizacao({ loja }: LocalizacaoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const temaEscuro = loja.cores.secondary === "#0A0A0A";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const infoCard = section.querySelector(".local-info");
    const mapEl = section.querySelector(".local-map");

    if (infoCard) {
      gsap.fromTo(
        infoCard,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (mapEl) {
      gsap.fromTo(
        mapEl,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  const endereco = loja.endereco.linhaCompleta || "Endereço sob consulta";

  return (
    <section
      ref={sectionRef}
      id="localizacao"
      className="w-full py-24"
      style={{ backgroundColor: temaEscuro ? "#141414" : loja.cores.secondary }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="font-oswald text-xs font-medium uppercase tracking-[0.2em] block mb-4"
            style={{ color: loja.cores.primary }}
          >
            ONDE ESTAMOS
          </span>
          <h2 className="font-oswald text-2xl sm:text-3xl lg:text-[36px] font-bold uppercase tracking-[0.05em] leading-[1.1] text-white">
            VISITE O SHOWROOM
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info Card */}
          <div
            className="local-info lg:col-span-2 rounded-xl p-10 lg:p-12 flex flex-col justify-center"
            style={{ backgroundColor: temaEscuro ? "#1A1A1A" : "#ffffff" }}
          >
            <div className="w-8 h-8 flex items-center justify-center mb-6">
              <MapPin size={32} style={{ color: loja.cores.primary }} />
            </div>
            <p className="font-inter text-lg text-white leading-relaxed mb-6">
              {endereco}
            </p>
            <div className="border-t border-white/[0.08] pt-6 mb-4">
              <p className="font-inter text-[15px] text-[#A0A0A0]">
                {loja.horario}
              </p>
            </div>
            <a
              href={loja.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-lg font-medium mt-4 hover:underline"
              style={{ color: loja.cores.primary }}
            >
              {loja.telefone}
            </a>
          </div>

          {/* Map */}
          <div
            className="local-map lg:col-span-3 rounded-xl overflow-hidden h-[400px] flex items-center justify-center"
            style={{ backgroundColor: temaEscuro ? "#1A1A1A" : "#ffffff" }}
          >
            <p className="font-inter text-[#A0A0A0] text-center px-6">
              Mapa será exibido quando o endereço completo for cadastrado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
