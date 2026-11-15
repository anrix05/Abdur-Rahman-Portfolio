import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowUpRight, Play, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isLight: boolean;
}

export function ProjectModal({ project, onClose, isLight }: ProjectModalProps) {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [activeMedia, setActiveMedia] = useState<'video' | number>(0);

  // When project opens, save trigger element and reset media
  useEffect(() => {
    if (project) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      if (project.assets.video) {
        setActiveMedia('video');
      } else {
        setActiveMedia(0);
      }
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
    }
  }, [project]);

  // Lock body scroll, pause Lenis, trap focus & listen for keyboard events
  useEffect(() => {
    if (!project) return;

    // 1. Pause Lenis smooth scrolling
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis) lenis.stop();

    // 2. Lock body scroll with scrollbar padding compensation
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Scroll modal container to top
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }

    // 4. Keyboard handlers (Esc to close, Arrow keys/PgUp/PgDn for content scrolling, Tab for focus trap)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const scrollEl = modalScrollRef.current;
      if (!scrollEl) return;

      // Enable keyboard scrolling within modal content
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          scrollEl.scrollBy({ top: 120, behavior: 'smooth' });
          e.preventDefault();
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          scrollEl.scrollBy({ top: -120, behavior: 'smooth' });
          e.preventDefault();
        }
      } else if (e.key === 'Home') {
        scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
        e.preventDefault();
      } else if (e.key === 'End') {
        scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
        e.preventDefault();
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusables = scrollEl.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      if (lenis) lenis.start();
      previouslyFocusedElement.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const screens = project.assets.screens || [];
  const hasScreens = screens.length > 0;
  const hasVideo = Boolean(project.assets.video);

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 lg:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Dimmed Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl sm:rounded-3xl border shadow-2xl z-10 flex flex-col overflow-hidden focus:outline-none ${
            isLight
              ? 'bg-white text-zinc-950 border-zinc-300'
              : 'bg-zinc-950 text-white border-zinc-800'
          }`}
        >
          {/* Top Bar Header */}
          <div className="flex items-start justify-between gap-4 border-b p-5 sm:p-7 shrink-0 z-20">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span
                  className={`text-[clamp(9px,2.4vw,11px)] font-mono uppercase tracking-[0.2em] font-bold ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  {project.categoryLabel}
                </span>
                {project.featured && (
                  <span
                    className={`text-[clamp(8px,2.2vw,9px)] font-mono px-2 py-0.5 rounded-full uppercase tracking-widest font-bold border ${
                      isLight
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-white text-black border-white'
                    }`}
                  >
                    FLAGSHIP
                  </span>
                )}
              </div>
              <h2
                id="modal-project-title"
                className="font-display font-extrabold text-[clamp(1.25rem,5.5vw,2.25rem)] uppercase tracking-wider leading-tight break-words"
              >
                {project.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close case study modal"
              className={`p-2.5 rounded-2xl border transition-colors cursor-pointer shrink-0 ${
                isLight
                  ? 'bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Dedicated Scroll Container (Independent from window scroll) */}
          <div
            ref={modalScrollRef}
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 sm:pt-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Media Showcase: Video or Active Screenshot */}
            {(hasVideo || hasScreens) && (
              <div className="space-y-3">
                <div
                  className={`relative w-full aspect-video rounded-2xl overflow-hidden border ${
                    isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  {activeMedia === 'video' && hasVideo ? (
                    <video
                      src={project.assets.video}
                      poster={project.assets.hero}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : typeof activeMedia === 'number' && screens[activeMedia] ? (
                    <img
                      src={screens[activeMedia]}
                      alt={`${project.title} preview ${activeMedia + 1}`}
                      className="w-full h-full object-contain"
                    />
                  ) : project.assets.hero ? (
                    <img
                      src={project.assets.hero}
                      alt={`${project.title} hero`}
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>

                {/* Media Switcher Thumbnails (Scrollable on small screens) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scroll-hide">
                  {hasVideo && (
                    <button
                      onClick={() => setActiveMedia('video')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
                        activeMedia === 'video'
                          ? (isLight ? 'bg-zinc-950 text-white border-zinc-950' : 'bg-white text-black border-white')
                          : (isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-zinc-900 border-zinc-800 text-zinc-400')
                      }`}
                    >
                      <Play size={13} />
                      <span>DEMO VIDEO</span>
                    </button>
                  )}
                  {screens.map((screenUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(idx)}
                      className={`relative w-16 h-10 rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        activeMedia === idx
                          ? 'ring-2 ring-offset-2 ring-current'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={screenUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Project Overview */}
            <div className="space-y-3">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                OVERVIEW
              </span>
              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                {project.description}
              </p>
            </div>

            {/* Case Study Problem & Solution */}
            {project.caseStudy && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2 text-rose-500">
                    <AlertCircle size={16} />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      THE PROBLEM
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {project.caseStudy.problem}
                  </p>
                </div>

                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      THE ARCHITECTURE & SOLUTION
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Case Study Impact */}
            {project.caseStudy?.result && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3 ${
                  isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/40 border-zinc-800'
                }`}
              >
                <Sparkles size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                    ENGINEERING OUTCOME
                  </span>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {project.caseStudy.result}
                  </p>
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="space-y-2 pt-2">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-mono px-3 py-1 rounded-xl border uppercase tracking-wider font-semibold ${
                      isLight
                        ? 'bg-zinc-100 text-zinc-900 border-zinc-300'
                        : 'bg-zinc-900 text-zinc-200 border-zinc-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-lg ${
                    isLight
                      ? 'bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800'
                      : 'bg-white text-black border-white hover:bg-zinc-200'
                  }`}
                >
                  <span>VISIT LIVE DEPLOYMENT</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${
                    isLight
                      ? 'bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-100'
                      : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  <Github size={15} />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${
                    isLight
                      ? 'bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-100'
                      : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  <ExternalLink size={15} />
                  <span>LINKEDIN OVERVIEW</span>
                </a>
              )}
            </div>

            {/* Bottom scroll hint spacing */}
            <div className="h-6" />
          </div>

          {/* Bottom subtle gradient fade hint */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-950/40 to-transparent z-20" />
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
