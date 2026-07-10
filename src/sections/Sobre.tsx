import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Sobre() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const image = section.querySelector(".sobre-image");
    const textEls = section.querySelectorAll(".sobre-text-anim");

    if (image) {
      gsap.fromTo(
        image,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    gsap.fromTo(
      textEls,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
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

  return (
    <section ref={sectionRef} id="sobre" className="w-full bg-dark py-24">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div className="sobre-image rounded-xl overflow-hidden aspect-[4/3]">
          <img
            src="/images/showroom-interior.jpg"
            alt="Interior do showroom Vrummm"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div>
          <span className="sobre-text-anim font-oswald text-xs font-medium uppercase tracking-[0.2em] text-gold block mb-4">
            SOBRE NÓS
          </span>
          <h2 className="sobre-text-anim font-oswald text-2xl sm:text-3xl lg:text-[36px] font-bold uppercase tracking-[0.05em] leading-[1.1] text-white mb-6">
            CONFIANÇA E EXCELÊNCIA EM CADA NEGOCIAÇÃO
          </h2>
          <p className="sobre-text-anim font-inter text-base text-[#A0A0A0] leading-[1.7] mb-4">
            A Vrummm nasceu da paixão por carros e do compromisso com a
            transparência. Há mais de 15 anos, conectamos pessoas aos veículos
            dos sonhos com atendimento consultivo e curadoria premium.
          </p>
          <p className="sobre-text-anim font-inter text-base text-[#A0A0A0] leading-[1.7] mb-6">
            Cada veículo em nosso showroom passa por uma inspeção rigorosa de
            mais de 150 itens. Não vendemos carros. Entregamos confiança sobre
            quatro rodas.
          </p>
          <a
            href="#localizacao"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#localizacao")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="sobre-text-anim inline-flex items-center gap-2 font-oswald text-[13px] font-medium uppercase tracking-[0.1em] text-gold hover:translate-x-1 hover:underline transition-all duration-300"
          >
            Conheça nossa história
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
