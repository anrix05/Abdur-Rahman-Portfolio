import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight, Layers, Eye, Box } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ShowcaseOverlayProps {
  project: Project;
  currentIndex: number;
  totalCount: number;
  isLight: boolean;
  is3DMode: boolean;
  onToggleMode: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenModal: (project: Project) => void;
}

export function ShowcaseOverlay({
  project,
  currentIndex,
  totalCount,
  isLight,
  is3DMode,
  onToggleMode,
  onPrev,
  onNext,
  onOpenModal,
}: ShowcaseOverlayProps) {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-7 lg:p-10 pt-24 sm:pt-28 lg:pt-32 z-20">
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full pointer-events-auto">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span
            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase border ${
              isLight
                ? 'bg-white/90 text-zinc-950 border-zinc-300 shadow-sm'
                : 'bg-black/90 text-white border-zinc-800 shadow-sm'
            }`}
          >
            {formattedIndex} / {formattedTotal}
          </span>
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: project.accentColor }}
          />
        </div>

        {/* 3D / GRID Mode Switcher Toggle */}
        <button
          onClick={onToggleMode}
          aria-label="Toggle between 3D Showcase and Flat Grid views"
          className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border shadow-lg cursor-pointer ${
            isLight
              ? 'bg-white/90 text-zinc-950 border-zinc-300 hover:bg-zinc-950 hover:text-white'
              : 'bg-black/90 text-white border-zinc-800 hover:bg-white hover:text-black hover:border-white'
          }`}
        >
          {is3DMode ? <Layers size={14} /> : <Box size={14} />}
          <span>{is3DMode ? '3D VIEW' : 'GRID VIEW'}</span>
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
              isLight ? 'bg-zinc-100 text-zinc-800' : 'bg-zinc-800 text-zinc-200'
            }`}
          >
            SWITCH
          </span>
        </button>
      </div>

      {/* Center Left Project Meta Information */}
      <div className="max-w-xl lg:max-w-md lg:w-[46%] mt-auto sm:my-auto pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2 sm:gap-3"
          >
            {/* Category Subtitle */}
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold ${
                  isLight ? 'text-zinc-700' : 'text-zinc-400'
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

            {/* Giant Stretched Syne Title */}
            <h3
              data-cursor="VIEW"
              onClick={() => onOpenModal(project)}
              className={`font-display font-extrabold text-[clamp(2rem,6vw,5.5rem)] uppercase tracking-[0.04em] sm:tracking-[0.08em] leading-none drop-shadow-sm break-words cursor-pointer ${
                isLight ? 'text-zinc-950' : 'text-white'
              }`}
            >
              {project.title}
            </h3>

            {/* One-Line Pitch */}
            <p
              className={`text-xs sm:text-sm font-sans max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-3 ${
                isLight ? 'text-zinc-700' : 'text-zinc-300'
              }`}
            >
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.slice(0, 5).map((tag, i) => (
                <span
                  key={i}
                  className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-lg border uppercase tracking-wider font-semibold ${
                    isLight
                      ? 'bg-white/80 text-zinc-800 border-zinc-300'
                      : 'bg-zinc-900/90 text-zinc-300 border-zinc-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-3">
              {/* Modal Trigger */}
              <button
                onClick={() => onOpenModal(project)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-lg cursor-pointer ${
                  isLight
                    ? 'bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800'
                    : 'bg-white text-black border-white hover:bg-zinc-200'
                }`}
              >
                <Eye size={14} />
                <span>CASE STUDY</span>
              </button>

              {/* Live Demo Link */}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${
                    isLight
                      ? 'bg-white text-zinc-950 border-zinc-300 hover:border-zinc-950'
                      : 'bg-zinc-900 text-white border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <span>LIVE</span>
                  <ArrowUpRight size={14} />
                </a>
              )}

              {/* GitHub Link */}
              {project.github && (
                <a
                  href={project.github}
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

              {/* Hardware / External Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${
                    isLight
                      ? 'bg-white text-zinc-950 border-zinc-300 hover:border-zinc-950'
                      : 'bg-zinc-900 text-white border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <span>OVERVIEW</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Row: Navigation Arrows & Indicator Track */}
      <div className="flex items-center justify-between w-full pointer-events-auto pt-4">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            aria-label="Previous project"
            className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isLight
                ? 'bg-white/90 text-zinc-950 border-zinc-300 hover:bg-zinc-100'
                : 'bg-zinc-950/90 text-white border-zinc-800 hover:bg-zinc-900'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalCount - 1}
            aria-label="Next project"
            className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isLight
                ? 'bg-white/90 text-zinc-950 border-zinc-300 hover:bg-zinc-100'
                : 'bg-zinc-950/90 text-white border-zinc-800 hover:bg-zinc-900'
            }`}
          >
            <ChevronRight size={18} />
          </button>
          <span
            className={`hidden sm:inline-block ml-2 text-[10px] font-mono tracking-widest uppercase ${
              isLight ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            USE ARROWS OR DRAG
          </span>
        </div>

        {/* Progress Bar Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalCount }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-6 bg-current'
                  : 'w-1.5 opacity-30 hover:opacity-60 bg-current'
              }`}
              style={{
                color: i === currentIndex ? project.accentColor : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
