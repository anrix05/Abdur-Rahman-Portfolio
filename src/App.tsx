import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Hyperspeed, { hyperspeedPresets } from './components/Hyperspeed';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-obsidian min-h-screen text-white selection:bg-neon-lime selection:text-obsidian relative overflow-x-hidden font-sans">
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-25">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div id="hero"><Hero /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 pb-40">
          <div id="about"><About /></div>
          <div id="skills"><Skills /></div>
          <div id="experience"><Experience /></div>
          <div id="projects"><Projects /></div>
          <div id="contact"><Contact /></div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
