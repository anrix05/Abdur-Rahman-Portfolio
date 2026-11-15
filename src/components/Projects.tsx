import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  ChevronLeft,
  ChevronRight,
  Layers,
  Box,
  Eye,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { projects, type Project } from '../data/projects';
import { CoverflowCarousel } from './showcase/CoverflowCarousel';
import { ProjectGrid } from './showcase/ProjectGrid';
import { ProjectModal } from './showcase/ProjectModal';
import { useFitTitle } from '../utils/useFitTitle';

export default function Projects() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Responsive default: Desktop starts in 3D Coverflow, mobile (<768px) or prefers-reduced-motion starts in Grid
  const [is3DMode, setIs3DMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isMobile || prefersReduced) return false;
    }
    return true;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const activeProject = projects[activeIndex] || projects[0];

  // Dynamic Syne title fitting to prevent horizontal overflow or mid-word breaks
  const titleFontSize = useFitTitle(activeProject.title, titleRef);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' && activeIndex < projects.length - 1) {
        setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Enter') {
        setModalProject(activeProject);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, activeProject, modalProject]);

  const formattedIndex = String(activeIndex + 1).padStart(2, '0');
  const formattedTotal = String(projects.length).padStart(2, '0');

  return (
    <section className="relative w-full pt-0 pb-12 sm:pb-16">
      {/* Visually Hidden Semantic DOM List for Accessibility & Crawlers */}
      <ul className="sr-only" aria-label="Selected portfolio projects">
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
          </li>
        ))}
      </ul>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`mb-8 sm:mb-10 border-b pb-5 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 max-w-7xl mx-auto ${
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

        {/* View Switcher Toggle & Mode Description */}
        <div className="flex items-center gap-4">
          <p
            className={`hidden sm:inline-block text-xs font-mono tracking-widest uppercase ${
              isLight ? 'text-zinc-600 font-medium' : 'text-zinc-400'
            }`}
          >
            {is3DMode ? '3D COVERFLOW CAROUSEL' : 'CURATED BENTO GRID'}
          </p>

          <button
            onClick={() => setIs3DMode(!is3DMode)}
            aria-label="Toggle between 3D Coverflow and Grid views"
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border shadow-lg cursor-pointer ${
              isLight
                ? 'bg-white text-zinc-950 border-zinc-300 hover:bg-zinc-950 hover:text-white'
                : 'bg-zinc-900 text-white border-zinc-800 hover:bg-white hover:text-black hover:border-white'
            }`}
          >
            {is3DMode ? <Box size={14} /> : <Layers size={14} />}
            <span>{is3DMode ? 'GRID VIEW' : '3D VIEW'}</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                isLight ? 'bg-zinc-100 text-zinc-800' : 'bg-zinc-800 text-zinc-200'
              }`}
            >
              SWITCH
            </span>
          </button>
        </div>
      </motion.div>

      {/* Main Content Area: Stacked in-flow 3D Coverflow OR Grid */}
      {is3DMode ? (
        <div className="w-full max-w-7xl mx-auto flex flex-col space-y-6">
          {/* TOP: Full-width 3D Coverflow Carousel Block */}
          <div className="w-full">
            <CoverflowCarousel
              projects={projects}
              activeIndex={activeIndex}
              isLight={isLight}
              onSelectIndex={(idx) => setActiveIndex(idx)}
              onOpenModal={(proj) => setModalProject(proj)}
            />
          </div>

          {/* Carousel Navigation Controls: Arrows, Progress, Dots */}
          <div className="flex items-center justify-between w-full px-2 sm:px-4 z-20">
            {/* Left/Right Arrow Buttons & Counter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous project"
                className={`p-2.5 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-white text-zinc-950 border-zinc-300 hover:bg-zinc-100'
                    : 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1))}
                disabled={activeIndex === projects.length - 1}
                aria-label="Next project"
                className={`p-2.5 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-white text-zinc-950 border-zinc-300 hover:bg-zinc-100'
                    : 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                <ChevronRight size={16} />
              </button>

              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase border ${
                  isLight
                    ? 'bg-white text-zinc-950 border-zinc-300'
                    : 'bg-black text-white border-zinc-800'
                }`}
              >
                {formattedIndex} / {formattedTotal}
              </span>
            </div>

            {/* Clickable Dot Indicators for all 9 projects */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {projects.map((p, idx) => (
                <button
                  key={p.slug}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Jump to project ${idx + 1}: ${p.title}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'w-6 bg-zinc-950 dark:bg-white'
                      : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* BELOW: Info Panel (2-column grid, collapses to 1 column on small screens) */}
          <div
            className={`w-full rounded-2xl sm:rounded-3xl border p-5 sm:p-7 lg:p-9 shadow-xl transition-all duration-300 ${
              isLight
                ? 'bg-white border-zinc-200 text-zinc-950'
                : 'bg-zinc-950 border-zinc-800 text-white'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
              >
                {/* Left Column: Category, Flagship, Single-line Title, 3-line Description */}
                <div className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}
                    >
                      {activeProject.categoryLabel}
                    </span>
                    {activeProject.featured && (
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-widest font-bold border ${
                          isLight
                            ? 'bg-zinc-950 text-white border-zinc-950'
                            : 'bg-white text-black border-white'
                        }`}
                      >
                        FLAGSHIP
                      </span>
                    )}
                  </div>

                  {/* Single-line fitted Syne title */}
                  <h3
                    ref={titleRef}
                    onClick={() => setModalProject(activeProject)}
                    style={{
                      fontSize: titleFontSize,
                      wordBreak: 'normal',
                      overflowWrap: 'normal',
                      hyphens: 'none',
                      textWrap: 'balance',
                    }}
                    className="font-display font-extrabold uppercase tracking-[0.03em] leading-[1.05] break-words cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {activeProject.title}
                  </h3>

                  {/* 3-line clamped description with ellipsis */}
                  <p
                    className={`text-xs sm:text-sm font-sans leading-relaxed line-clamp-3 ${
                      isLight ? 'text-zinc-700' : 'text-zinc-300'
                    }`}
                  >
                    {activeProject.description}
                  </p>
                </div>

                {/* Right Column: Tech Tags and Action Buttons */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-lg border uppercase tracking-wider font-semibold ${
                          isLight
                            ? 'bg-zinc-100 text-zinc-800 border-zinc-300'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2">
                    <button
                      onClick={() => setModalProject(activeProject)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-lg cursor-pointer ${
                        isLight
                          ? 'bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800'
                          : 'bg-white text-black border-white hover:bg-zinc-200'
                      }`}
                    >
                      <Eye size={13} />
                      <span>CASE STUDY</span>
                    </button>

                    {activeProject.demo && (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${
                          isLight
                            ? 'bg-white text-zinc-950 border-zinc-300 hover:border-zinc-950'
                            : 'bg-zinc-900 text-white border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <span>LIVE</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}

                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${
                          isLight
                            ? 'bg-white text-zinc-800 border-zinc-300 hover:text-zinc-950 hover:border-zinc-950'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-600'
                        }`}
                      >
                        <Github size={14} />
                        <span>CODE</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Bento Grid View */
        <ProjectGrid
          projects={projects}
          isLight={isLight}
          onOpenModal={(proj) => setModalProject(proj)}
        />
      )}

      {/* Case Study Modal Dialog */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        isLight={isLight}
      />
    </section>
  );
}
