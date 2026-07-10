import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, Wallet, FileCheck, Shield } from "lucide-react";
import { features } from "@/data/config";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Wallet,
  FileCheck,
  Shield,
};

export default function Servicos() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerEls = section.querySelectorAll(".servicos-header-anim");
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

    const cards = section.querySelectorAll(".servico-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0]?.parentElement,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section || t.trigger === cards[0]?.parentElement) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F5F5F5] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="servicos-header-anim font-oswald text-xs font-medium uppercase tracking-[0.2em] text-gold block mb-4">
            NOSSOS SERVIÇOS
          </span>
          <h2 className="servicos-header-anim font-oswald text-2xl sm:text-3xl lg:text-[36px] font-bold uppercase tracking-[0.05em] leading-[1.1] text-dark max-w-[700px] mx-auto">
            HÁ MAIS DE 15 ANOS CUIDANDO DE QUEM EXIGE O MELHOR.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="servico-card bg-white rounded-xl p-10 text-center hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-400"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-gold" />
                </div>
                <h3 className="font-oswald text-xl font-semibold uppercase text-dark mb-3">
                  {feature.title}
                </h3>
                <p className="font-inter text-[15px] text-[#666666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
