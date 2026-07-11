import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoja } from "@/hooks/use-loja";
import { lojaDemo, veiculosDemo } from "@/data/demo";

import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import CTACards from "@/sections/CTACards";
import Showroom from "@/sections/Showroom";
import Servicos from "@/sections/Servicos";
import Sobre from "@/sections/Sobre";
import Localizacao from "@/sections/Localizacao";
import Footer from "@/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Loading from "@/components/Loading";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { loja: lojaSupabase, veiculos: veiculosSupabase, loading, erro, slug } = useLoja();

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const usarDemo = !slug || (!loading && !lojaSupabase && !erro);
  const loja = usarDemo ? lojaDemo : lojaSupabase;
  const veiculos = usarDemo ? veiculosDemo : veiculosSupabase;

  if (loading && slug) {
    return <Loading />;
  }

  if (erro && slug) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-oswald text-2xl uppercase tracking-[0.1em] text-white mb-4">
          Loja não encontrada
        </h1>
        <p className="font-inter text-[#A0A0A0] max-w-md mb-8">
          {erro}
        </p>
        <a
          href="/?slug=teste-vrummm"
          className="bg-gold text-dark px-8 py-3 font-oswald text-xs uppercase tracking-[0.15em] hover:bg-gold-light transition-colors"
        >
          Ver loja de teste
        </a>
      </div>
    );
  }

  if (!loja) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundColor: loja.cores.secondary,
        "--primary-color": loja.cores.primary,
        "--secondary-color": loja.cores.secondary,
      } as React.CSSProperties}
    >
      <Header loja={loja} />
      <main>
        <Hero loja={loja} />
        <CTACards loja={loja} />
        <Showroom loja={loja} veiculos={veiculos} />
        <Servicos />
        <Sobre loja={loja} />
        <Localizacao loja={loja} />
      </main>
      <Footer loja={loja} />
      <WhatsAppButton loja={loja} />
    </div>
  );
}

export default App;
