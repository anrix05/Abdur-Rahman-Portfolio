import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import StoryProgress from './components/StoryProgress';

gsap.registerPlugin(ScrollTrigger);

function MainContent() {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-500 ${
      isLight ? 'bg-[#fafafa] text-zinc-900 selection:bg-zinc-900 selection:text-white' : 'bg-black text-white selection:bg-white selection:text-black'
    }`}>
      {/* Intro Preloader */}
      <Preloader onComplete={() => setLoading(false)} />

      <Cursor />
      <StoryProgress />

      <div className={`relative z-10 transition-opacity duration-700 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Navbar />
        <div id="hero"><Hero /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-36 pb-32">
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

function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;
