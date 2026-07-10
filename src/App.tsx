import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import CTACards from "@/sections/CTACards";
import Showroom from "@/sections/Showroom";
import Servicos from "@/sections/Servicos";
import Sobre from "@/sections/Sobre";
import Localizacao from "@/sections/Localizacao";
import Footer from "@/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

gsap.registerPlugin(ScrollTrigger);

function App() {
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

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <CTACards />
        <Showroom />
        <Servicos />
        <Sobre />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
