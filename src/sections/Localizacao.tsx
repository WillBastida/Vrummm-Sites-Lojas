import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/data/config";

gsap.registerPlugin(ScrollTrigger);

export default function Localizacao() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} id="localizacao" className="w-full bg-dark-elevated py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-oswald text-xs font-medium uppercase tracking-[0.2em] text-gold block mb-4">
            ONDE ESTAMOS
          </span>
          <h2 className="font-oswald text-2xl sm:text-3xl lg:text-[36px] font-bold uppercase tracking-[0.05em] leading-[1.1] text-white">
            VISITE NOSSO SHOWROOM
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info Card */}
          <div className="local-info lg:col-span-2 bg-dark-card rounded-xl p-10 lg:p-12 flex flex-col justify-center">
            <div className="w-8 h-8 flex items-center justify-center mb-6">
              <MapPin size={32} className="text-gold" />
            </div>
            <p className="font-inter text-lg text-white leading-relaxed mb-6">
              {siteConfig.address}
            </p>
            <div className="border-t border-white/[0.08] pt-6 mb-4">
              <p className="font-inter text-[15px] text-[#A0A0A0]">
                {siteConfig.hours}
              </p>
            </div>
            <a
              href={`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-lg font-medium text-gold mt-4 hover:underline"
            >
              {siteConfig.phone}
            </a>
          </div>

          {/* Map */}
          <div className="local-map lg:col-span-3 rounded-xl overflow-hidden h-[400px]">
            <iframe
              src={siteConfig.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(92%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Vrummm"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
