import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { heroSlides } from "@/data/config";
import type { LojaAdaptada, VeiculoAdaptado } from "@/types/loja";

interface HeroProps {
  loja: LojaAdaptada;
  veiculos?: VeiculoAdaptado[];
}

export default function Hero({ loja, veiculos = [] }: HeroProps) {
  const destaques = veiculos.filter((v) => v.fotoCapa);
  const slides =
    destaques.length > 0
      ? destaques.slice(0, 3).map((v) => ({
          image: v.fotoCapa as string,
          alt: v.titulo,
        }))
      : heroSlides;

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Entrance animation
  useEffect(() => {
    if (contentRef.current) {
      const children = contentRef.current.children;
      gsap.fromTo(
        children[0],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        children[1],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.7 }
      );
      gsap.fromTo(
        children[2],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 }
      );
      gsap.fromTo(
        children[3],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.1 }
      );
    }
  }, []);

  // Transition function
  const transitionSlide = useCallback(
    (nextIndex: number) => {
      if (isAnimating || nextIndex === current) return;
      setIsAnimating(true);

      const currentEl = imageRefs.current[current];
      const nextEl = imageRefs.current[nextIndex];

      if (currentEl && nextEl) {
        gsap.set(nextEl, { x: "30%", opacity: 0, zIndex: 2 });
        gsap.set(currentEl, { zIndex: 1 });

        const tl = gsap.timeline({
          onComplete: () => {
            setCurrent(nextIndex);
            setIsAnimating(false);
            gsap.set(currentEl, { x: "0%", opacity: 1, zIndex: 0 });
          },
        });

        tl.to(
          currentEl,
          {
            x: "-30%",
            opacity: 0,
            duration: 1.2,
            ease: "power3.inOut",
          },
          0
        );

        tl.to(
          nextEl,
          {
            x: "0%",
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          0
        );
      }
    },
    [current, isAnimating]
  );

  // Autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = (current + 1) % slides.length;
      transitionSlide(next);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, transitionSlide, slides.length]);

  // Mouse parallax
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * -15;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;

      const currentEl = imageRefs.current[current];
      if (currentEl && !isAnimating) {
        gsap.to(currentEl.querySelector("img"), {
          x,
          y,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [current, isAnimating]);

  const handleIndicatorClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    transitionSlide(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: loja.cores.secondary }}
    >
      {/* Background images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => { imageRefs.current[index] = el; }}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: index === 0 ? 1 : 0,
            zIndex: index === 0 ? 1 : 0,
          }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover will-change-transform"
          />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `linear-gradient(to right, ${loja.cores.secondary}F2 0%, ${loja.cores.secondary}B3 40%, ${loja.cores.secondary}4D 100%)`,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[3] h-full flex flex-col justify-center max-w-[1280px] mx-auto px-6 lg:px-8"
      >
        <span
          className="font-oswald text-xs font-medium uppercase tracking-[0.2em] mb-4 opacity-0"
          style={{ color: loja.cores.primary }}
        >
          SHOWROOM PREMIUM
        </span>
        <h1 className="font-oswald text-4xl sm:text-5xl lg:text-[56px] font-bold uppercase tracking-[0.08em] leading-[1.0] text-white mb-5 max-w-[640px] opacity-0">
          SEU PRÓXIMO CARRO ESTÁ AQUI.
        </h1>
        <p className="font-inter text-base lg:text-lg font-normal leading-relaxed text-[#A0A0A0] mb-10 max-w-[540px] opacity-0">
          {loja.nome} tem seminovos e 0km multimarcas com atendimento consultivo
          e transparência em cada etapa.
        </p>
        <div className="flex flex-wrap gap-4 opacity-0">
          <a
            href="#showroom"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#showroom")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-dark px-9 py-3.5 font-oswald text-[13px] font-medium uppercase tracking-[0.12em] hover:scale-[1.02] transition-all duration-300"
            style={{ backgroundColor: loja.cores.primary }}
          >
            Ver Veículos
          </a>
          <a
            href="#localizacao"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#localizacao")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-transparent border border-white/30 text-white px-9 py-3.5 font-oswald text-[13px] font-medium uppercase tracking-[0.12em] hover:border-white transition-all duration-300"
          >
            Fale Conosco
          </a>
        </div>
      </div>

      {/* Carousel indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-6 lg:left-8 z-[3] flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: index === current ? "2rem" : "0.75rem",
                backgroundColor:
                  index === current ? loja.cores.primary : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
