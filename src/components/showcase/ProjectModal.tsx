import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowUpRight, Play, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isLight: boolean;
}

export function ProjectModal({ project, onClose, isLight }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeMedia, setActiveMedia] = useState<'video' | number>('video');

  // Reset active media when project changes
  useEffect(() => {
    if (project?.assets.video) {
      setActiveMedia('video');
    } else {
      setActiveMedia(0);
    }
  }, [project]);

  // Focus trap and Escape listener
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
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
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const screens = project.assets.screens || [];
  const hasScreens = screens.length > 0;
  const hasVideo = Boolean(project.assets.video);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl z-10 flex flex-col p-5 sm:p-8 lg:p-10 focus:outline-none ${
            isLight
              ? 'bg-white text-zinc-950 border-zinc-300'
              : 'bg-zinc-950 text-white border-zinc-800'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b pb-5 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span
                  className={`text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  {project.categoryLabel}
                </span>
                {project.featured && (
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
              <h2
                id="modal-project-title"
                className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-wider leading-tight"
              >
                {project.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className={`p-2.5 rounded-2xl border transition-colors cursor-pointer shrink-0 ${
                isLight
                  ? 'bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Media Stage: Video or Active Screenshot */}
          {(hasVideo || hasScreens) && (
            <div className="mb-8 space-y-3">
              <div
                className={`relative w-full aspect-video rounded-2xl overflow-hidden border ${
                  isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                {activeMedia === 'video' && hasVideo ? (
                  <video
                    src={project.assets.video}
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

              {/* Media Switcher Thumbnails */}
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
                        : 'opacity-60 hover:opacity-100'
                    } ${isLight ? 'border-zinc-300' : 'border-zinc-700'}`}
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

          {/* Description */}
          <div className="mb-8">
            <h4
              className={`text-xs font-mono uppercase tracking-[0.2em] font-bold mb-2 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              OVERVIEW
            </h4>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isLight ? 'text-zinc-800' : 'text-zinc-300'
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* Case Study Section (Problem, Solution, Result) */}
          {project.caseStudy && (
            <div className="mb-8 space-y-4">
              <h4
                className={`text-xs font-mono uppercase tracking-[0.2em] font-bold ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                CASE STUDY
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Problem */}
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-red-500 text-xs font-mono font-bold uppercase tracking-wider">
                    <AlertCircle size={14} />
                    <span>PROBLEM</span>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-zinc-700' : 'text-zinc-300'
                    }`}
                  >
                    {project.caseStudy.problem}
                  </p>
                </div>

                {/* Solution */}
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-sky-500 text-xs font-mono font-bold uppercase tracking-wider">
                    <Sparkles size={14} />
                    <span>SOLUTION</span>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-zinc-700' : 'text-zinc-300'
                    }`}
                  >
                    {project.caseStudy.solution}
                  </p>
                </div>

                {/* Result */}
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-mono font-bold uppercase tracking-wider">
                    <CheckCircle2 size={14} />
                    <span>OUTCOME</span>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-zinc-700' : 'text-zinc-300'
                    }`}
                  >
                    {project.caseStudy.result}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="mb-8">
            <h4
              className={`text-xs font-mono uppercase tracking-[0.2em] font-bold mb-2 ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              TECHNOLOGY STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-xl text-xs font-mono uppercase tracking-wider border font-medium ${
                    isLight
                      ? 'bg-zinc-100 text-zinc-900 border-zinc-200'
                      : 'bg-zinc-900 text-zinc-200 border-zinc-800'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div
            className={`mt-auto pt-6 border-t flex flex-wrap items-center justify-between gap-3 ${
              isLight ? 'border-zinc-200' : 'border-zinc-800'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-lg ${
                    isLight
                      ? 'bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800'
                      : 'bg-white text-black border-white hover:bg-zinc-200'
                  }`}
                >
                  <span>OPEN LIVE DEMO</span>
                  <ArrowUpRight size={15} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                    isLight
                      ? 'bg-white text-zinc-900 border-zinc-300 hover:border-zinc-950'
                      : 'bg-zinc-900 text-white border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <Github size={16} />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                    isLight
                      ? 'bg-white text-zinc-900 border-zinc-300 hover:border-zinc-950'
                      : 'bg-zinc-900 text-white border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <span>VIEW ON LINKEDIN</span>
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              CLOSE (ESC)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
