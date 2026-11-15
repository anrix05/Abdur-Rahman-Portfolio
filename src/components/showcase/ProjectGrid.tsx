import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, FolderGit2, Cpu, Eye } from 'lucide-react';
import type { Project } from '../../data/projects';
import { TiltCard } from '../common/TiltCard';

interface ProjectGridProps {
  projects: Project[];
  isLight: boolean;
  onOpenModal: (project: Project) => void;
}

export function ProjectGrid({ projects, isLight, onOpenModal }: ProjectGridProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 [perspective:1400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {projects.map((project, idx) => {
          const thumbImage = project.assets.thumb || project.assets.hero;

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, rotateX: 10, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.4 }}
              className="flex"
            >
              <TiltCard
                maxTilt={6}
                className={`rounded-3xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl group relative w-full [transform-style:preserve-3d] ${
                  isLight
                    ? 'bg-white border-zinc-200 hover:border-zinc-950 shadow-zinc-200/50'
                    : 'bg-zinc-950 border-zinc-800 hover:border-white'
                }`}
              >
              <div className="flex flex-col flex-grow">
                {/* 16:10 Thumbnail Image */}
                <div
                  onClick={() => onOpenModal(project)}
                  className={`aspect-[16/10] w-full rounded-2xl mb-4 sm:mb-5 overflow-hidden border relative flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                    isLight
                      ? 'bg-zinc-100 border-zinc-200 group-hover:border-zinc-400'
                      : 'bg-zinc-900 border-zinc-800 group-hover:border-zinc-600'
                  }`}
                >
                  {thumbImage ? (
                    <img
                      src={thumbImage}
                      alt={`${project.title} thumbnail`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <span
                        className="font-display font-extrabold text-3xl sm:text-4xl tracking-widest uppercase"
                        style={{ color: project.accentColor }}
                      >
                        {project.title.slice(0, 2).toUpperCase()}
                      </span>
                      <span
                        className={`text-[9px] font-mono tracking-widest uppercase mt-1 ${
                          isLight ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        {project.kind.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Flagship Badge */}
                  {project.featured && (
                    <span
                      className={`absolute top-2.5 right-2.5 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border tracking-widest uppercase shadow-sm ${
                        isLight
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-black border-white'
                      }`}
                    >
                      FLAGSHIP
                    </span>
                  )}
                </div>

                {/* Card Subheader */}
                <div className="flex items-center justify-between mb-2 shrink-0">
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-semibold ${
                      isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}
                  >
                    {project.categoryLabel}
                  </span>
                  <div
                    className={`p-1.5 rounded-xl border ${
                      isLight
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-900'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                    }`}
                  >
                    {project.type === 'software' ? <FolderGit2 size={13} /> : <Cpu size={13} />}
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onOpenModal(project)}
                  className={`font-display font-extrabold text-xl sm:text-2xl mb-2 tracking-wide uppercase transition-colors flex items-center justify-between cursor-pointer leading-tight ${
                    isLight ? 'text-zinc-950 group-hover:text-black' : 'text-white group-hover:text-zinc-100'
                  }`}
                >
                  <span>{project.title}</span>
                  <ArrowUpRight
                    size={17}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1.5 ${
                      isLight ? 'text-zinc-950' : 'text-white'
                    }`}
                  />
                </h3>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${
                    isLight ? 'text-zinc-700' : 'text-zinc-400'
                  }`}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-lg border uppercase tracking-wider font-medium ${
                        isLight
                          ? 'bg-zinc-100 text-zinc-800 border-zinc-300'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div
                className={`mt-auto shrink-0 flex items-center justify-between gap-2 pt-3.5 border-t text-[11px] font-mono tracking-wider uppercase ${
                  isLight ? 'border-zinc-200' : 'border-zinc-900'
                }`}
              >
                <button
                  onClick={() => onOpenModal(project)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border font-bold transition-colors cursor-pointer ${
                    isLight
                      ? 'bg-zinc-100 text-zinc-950 border-zinc-300 hover:bg-zinc-200'
                      : 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  <Eye size={13} />
                  <span>DETAILS</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl border transition-colors ${
                        isLight
                          ? 'hover:bg-zinc-100 border-zinc-300 text-zinc-800'
                          : 'hover:bg-zinc-800 border-zinc-800 text-zinc-200'
                      }`}
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition-all ${
                        isLight
                          ? 'bg-zinc-950 text-white hover:bg-zinc-800'
                          : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                      aria-label={`${project.title} live demo`}
                    >
                      <span>LIVE</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition-all ${
                        isLight
                          ? 'bg-zinc-950 text-white hover:bg-zinc-800'
                          : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                      aria-label={`${project.title} LinkedIn overview`}
                    >
                      <span>LINK</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
}

