import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { projects, type Project } from '../data/projects';
import { ShowcaseOverlay } from './showcase/ShowcaseOverlay';
import { ProjectModal } from './showcase/ProjectModal';
import { ProjectGrid } from './showcase/ProjectGrid';

// Lazy-load the heavy 3D Canvas
const ProjectCanvas = lazy(() => import('./showcase/ProjectCanvas'));

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Responsive default: start with 3D on desktop, fall back to Grid on mobile or if reduced motion is requested
  const [is3DMode, setIs3DMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isMobile || prefersReduced) return false;
    }
    return true;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Initialize and manage GSAP ScrollTrigger pinning for the 3D showcase
  useEffect(() => {
    if (!is3DMode || !containerRef.current || !pinWrapperRef.current) {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
        ScrollTrigger.refresh();
      }
      return;
    }

    const totalProjects = projects.length;

    // Small delay to ensure layout has stabilized
    const timeout = setTimeout(() => {
      if (!containerRef.current || !pinWrapperRef.current) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinWrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        snap: {
          snapTo: 1 / (totalProjects - 1),
          duration: { min: 0.2, max: 0.45 },
          delay: 0.08,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const raw = Math.round(self.progress * (totalProjects - 1));
          const clamped = Math.max(0, Math.min(totalProjects - 1, raw));
          setActiveIndex(clamped);
        },
      });

      scrollTriggerRef.current = st;
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timeout);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [is3DMode]);

  // Navigate to specific project index (and scroll pin accordingly)
  const navigateToIndex = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, newIndex));
    setActiveIndex(clamped);

    if (is3DMode && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const targetScroll = st.start + (clamped / (projects.length - 1)) * (st.end - st.start);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetScroll);
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => navigateToIndex(activeIndex - 1);
  const handleNext = () => navigateToIndex(activeIndex + 1);

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section className="relative w-full pt-4 pb-12 sm:pb-16">
      {/* Visually Hidden Semantic DOM List for Accessibility */}
      <ul className="sr-only" aria-label="Portfolio Selected Works">
        {projects.map((p) => (
          <li key={p.slug}>
            <h4>
              {p.title} - {p.categoryLabel}
            </h4>
            <p>{p.description}</p>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer">
                Live demo for {p.title}
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                Source code for {p.title}
              </a>
            )}
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                LinkedIn overview for {p.title}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Section Header (Maintains Brutalist DNA) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`mb-8 sm:mb-12 border-b pb-5 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 max-w-7xl mx-auto ${
          isLight ? 'border-zinc-200' : 'border-zinc-800'
        }`}
      >
        <div>
          <span
            className={`text-xs font-mono tracking-[0.25em] uppercase font-semibold ${
              isLight ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            04 / SELECTED WORKS
          </span>
          <h2
            className={`font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-[0.06em] sm:tracking-[0.1em] uppercase mt-1 ${
              isLight ? 'text-zinc-950' : 'text-white'
            }`}
          >
            PORTFOLIO
          </h2>
        </div>
        <p
          className={`text-xs font-mono tracking-widest uppercase max-w-xs ${
            isLight ? 'text-zinc-600 font-medium' : 'text-zinc-400'
          }`}
        >
          {is3DMode
            ? 'SCROLL OR DRAG 3D STAGES • CLICK FOR DETAILS'
            : 'CURATED BENTO GRID • CLICK FOR DETAILS'}
        </p>
      </motion.div>

      {/* View Switch: 3D Scroll-Pinned Showcase OR Flat Bento Grid */}
      {is3DMode ? (
        /* Pin Container for ScrollTrigger */
        <div
          ref={containerRef}
          className="relative w-full h-[450vh] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
        >
          {/* Pinned Stage Canvas + Overlay */}
          <div
            ref={pinWrapperRef}
            className={`sticky top-0 w-full h-[100dvh] max-h-[880px] rounded-3xl border overflow-hidden shadow-2xl relative transition-colors duration-500 ${
              isLight
                ? 'bg-[#f4f4f5] border-zinc-300'
                : 'bg-[#09090b] border-zinc-800/90'
            }`}
          >
            {/* 3D Canvas Layer with Suspense */}
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-10 h-10 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: activeProject.accentColor,
                      borderTopColor: 'transparent',
                    }}
                  />
                </div>
              }
            >
              <ProjectCanvas
                projects={projects}
                activeIndex={activeIndex}
                onSelectIndex={navigateToIndex}
                onOpenModal={setModalProject}
                isLight={isLight}
              />
            </Suspense>

            {/* DOM Overlay with Syne Typography, Controls, & Metadata */}
            <ShowcaseOverlay
              project={activeProject}
              currentIndex={activeIndex}
              totalCount={projects.length}
              isLight={isLight}
              is3DMode={is3DMode}
              onToggleMode={() => setIs3DMode(false)}
              onPrev={handlePrev}
              onNext={handleNext}
              onOpenModal={setModalProject}
            />
          </div>
        </div>
      ) : (
        /* Bento Grid View */
        <div className="w-full">
          {/* Switch back to 3D Button Banner */}
          <div className="flex justify-end max-w-7xl mx-auto mb-4">
            <button
              onClick={() => setIs3DMode(true)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border shadow-lg cursor-pointer ${
                isLight
                  ? 'bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800'
                  : 'bg-white text-black border-white hover:bg-zinc-200'
              }`}
            >
              <span>SWITCH TO 3D STAGE VIEW</span>
            </button>
          </div>

          <ProjectGrid
            projects={projects}
            isLight={isLight}
            onOpenModal={setModalProject}
          />
        </div>
      )}

      {/* Interactive Detail Modal with Case Study & Media Gallery */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        isLight={isLight}
      />
    </section>
  );
}
