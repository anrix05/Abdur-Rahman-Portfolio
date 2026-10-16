import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, FolderGit2, Cpu, Grid, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { projects, type Project } from '../data/projects';

// Check for existing screenshots in src/assets/projects/ dynamically
const projectScreenshots = import.meta.glob<{ default: string }>(
    '../assets/projects/*.{webp,png,jpg,jpeg}',
    { eager: true }
);

/**
 * Resolves a real image URL only if the file actually exists locally or is a valid URL.
 */
const resolveProjectImage = (imageField?: string): string | null => {
    if (!imageField) return null;

    // Check against globbed assets in src/assets/projects/
    for (const [path, mod] of Object.entries(projectScreenshots)) {
        const filename = path.split('/').pop()?.toLowerCase();
        const targetFilename = imageField.split('/').pop()?.toLowerCase();
        if (filename && targetFilename && filename === targetFilename) {
            return mod.default;
        }
        if (path.endsWith(imageField) || imageField.endsWith(path)) {
            return mod.default;
        }
    }

    // Allow full external HTTP/HTTPS URLs
    if (imageField.startsWith('http://') || imageField.startsWith('https://')) {
        return imageField;
    }

    return null;
};

/**
 * Builds a two-letter monogram from:
 * 1. The initials of the first two words (e.g. "V Notice" -> "VN", "Love Connect" -> "LC")
 * 2. For a single CamelCase word, the first two capital letters (e.g. "ZeroBlur" -> "ZB", "AttendAI" -> "AA", "NexaLink" -> "NL")
 */
const getMonogram = (title: string): string => {
    const cleaned = title.replace(/[()]/g, '').trim();
    const words = cleaned.split(/\s+/).filter(Boolean);

    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }

    const capitals = cleaned.match(/[A-Z]/g);
    if (capitals && capitals.length >= 2) {
        return (capitals[0] + capitals[1]).toUpperCase();
    }

    return cleaned.slice(0, 2).toUpperCase();
};

interface ProjectCardProps {
    project: Project;
    isLight: boolean;
    inGrid?: boolean;
}

const ProjectCard = ({ project, isLight, inGrid = false }: ProjectCardProps) => {
    const [imgFailed, setImgFailed] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent trigger if clicking directly on child anchor links or buttons
        if ((e.target as HTMLElement).closest('a')) return;
        const targetUrl = project.demo || project.link || project.github;
        if (targetUrl) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const monogram = getMonogram(project.title);
    const resolvedImage = resolveProjectImage(project.image);
    const showImage = Boolean(resolvedImage) && !imgFailed;

    return (
        <div
            onClick={handleCardClick}
            tabIndex={0}
            role="button"
            aria-label={`${project.title} - ${project.categoryLabel}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(e as unknown as React.MouseEvent);
                }
            }}
            className={`${
                inGrid 
                    ? 'w-full' 
                    : 'w-[82vw] max-w-[360px] sm:w-[46vw] sm:max-w-[380px] lg:w-[400px] flex-shrink-0'
            } h-[590px] sm:h-[620px] md:h-[650px] border rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl group cursor-pointer relative focus:outline-none focus:ring-2 ${
                isLight 
                    ? 'bg-white border-zinc-200 hover:border-zinc-950 shadow-zinc-200/50 hover:bg-zinc-50 focus:ring-zinc-950' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-white hover:bg-zinc-900/60 focus:ring-white'
            }`}
        >
            <div className="flex flex-col flex-grow">
                {/* 16:10 Image or Monogram Fallback Tile */}
                <div className={`aspect-[16/10] w-full rounded-2xl mb-4 sm:mb-5 overflow-hidden border relative flex items-center justify-center transition-colors shrink-0 ${
                    isLight 
                        ? 'bg-zinc-100 border-zinc-200 group-hover:border-zinc-300' 
                        : 'bg-zinc-900/80 border-zinc-800 group-hover:border-zinc-700'
                }`}>
                    {showImage ? (
                        <img
                            src={resolvedImage!}
                            alt={`${project.title} interface preview`}
                            loading="lazy"
                            decoding="async"
                            width={400}
                            height={250}
                            onError={() => setImgFailed(true)}
                            className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center select-none text-center p-4">
                            <span className={`font-display font-extrabold text-3xl sm:text-4xl tracking-widest transition-opacity ${
                                isLight ? 'text-zinc-500 group-hover:text-zinc-700' : 'text-zinc-400 group-hover:text-zinc-200'
                            }`}>
                                {monogram}
                            </span>
                            <span className={`text-[9px] font-mono tracking-widest uppercase mt-1 ${
                                isLight ? 'text-zinc-600' : 'text-zinc-400'
                            }`}>
                                {project.categoryLabel.split('•')[0]?.trim()}
                            </span>
                        </div>
                    )}

                    {/* Top Corner Watermark Tag (Retained on Fallback Tile) */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                        {project.featured && (
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border tracking-widest uppercase shadow-sm ${
                                isLight 
                                    ? 'bg-zinc-950 text-white border-zinc-950' 
                                    : 'bg-white text-black border-white'
                            }`}>
                                FLAGSHIP
                            </span>
                        )}
                    </div>
                </div>

                {/* Card Header & Category Tag */}
                <div className="flex items-center justify-between mb-2.5 sm:mb-3 shrink-0">
                    <span className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-semibold ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                        {project.categoryLabel}
                    </span>
                    <div className={`p-2 rounded-xl border transition-colors ${
                        isLight 
                            ? 'bg-zinc-100 border-zinc-200 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white' 
                            : 'bg-zinc-900 border-zinc-800 text-white group-hover:border-zinc-600'
                    }`}>
                        {project.type === 'software' ? <FolderGit2 size={14} /> : <Cpu size={14} />}
                    </div>
                </div>

                {/* Project Title (Aligned minimum height so descriptions line up) */}
                <h3 className={`font-display font-extrabold text-lg sm:text-2xl mb-2 sm:mb-2.5 tracking-wider uppercase transition-colors flex items-center justify-between min-h-[3rem] sm:min-h-[3.75rem] shrink-0 leading-tight break-words ${
                    isLight ? 'text-zinc-950 group-hover:text-black' : 'text-white group-hover:text-zinc-100'
                }`}>
                    <span>{project.title}</span>
                    <ArrowUpRight size={18} className={`opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 ${
                        isLight ? 'text-zinc-950' : 'text-white'
                    }`} />
                </h3>

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4 sm:line-clamp-5 ${
                    isLight ? 'text-zinc-700 font-normal' : 'text-zinc-400'
                }`}>
                    {project.description}
                </p>

                {/* Tech Tags (Pinned above footer) */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 mt-auto">
                    {project.tags.map((tag, i) => (
                        <span 
                            key={i} 
                            className={`text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-1 rounded-lg border uppercase tracking-wider font-medium ${
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

            {/* Action Links Pinned to Bottom with min 44px tap target height */}
            <div className={`mt-auto shrink-0 flex items-center gap-3 pt-3.5 sm:pt-4 border-t text-[11px] sm:text-xs font-mono tracking-wider uppercase ${
                isLight ? 'border-zinc-200' : 'border-zinc-900'
            }`}>
                {project.type === 'software' ? (
                    <>
                        {/* Render CODE / GITHUB button ONLY when a real repo URL exists */}
                        {project.github && (
                            <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl transition-colors z-10 ${
                                    !project.demo
                                        ? (isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold ml-auto' : 'bg-zinc-900 hover:bg-zinc-800 text-white font-bold ml-auto')
                                        : (isLight ? 'hover:bg-zinc-100 text-zinc-700 hover:text-zinc-950 font-semibold' : 'hover:bg-zinc-900 text-zinc-300 hover:text-white')
                                }`}
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${project.title} source code on GitHub`}
                            >
                                <Github size={15} /> <span>{project.demo ? 'CODE' : 'GITHUB'}</span> {!project.demo && <ArrowUpRight size={15} />}
                            </a>
                        )}
                        {project.demo && (
                            <a 
                                href={project.demo} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl font-bold transition-all ml-auto z-10 ${
                                    isLight ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
                                }`}
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${project.title} live deployment demo`}
                            >
                                <span>LIVE DEMO</span> <ArrowUpRight size={15} />
                            </a>
                        )}
                    </>
                ) : (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`inline-flex items-center justify-center gap-2 w-full py-2.5 min-h-[44px] font-bold rounded-xl transition-colors text-xs uppercase z-10 ${
                            isLight 
                                ? 'bg-zinc-950 text-white hover:bg-zinc-800' 
                                : 'bg-white text-black hover:bg-zinc-200'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${project.title} view on LinkedIn`}
                    >
                        <span>VIEW ON LINKEDIN</span>
                        <ExternalLink size={14} />
                    </a>
                )}
            </div>
        </div>
    );
};

const Projects = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [showGrid, setShowGrid] = useState(false);
    const [isTouchPaused, setIsTouchPaused] = useState(false);
    const touchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Pause continuous marquee on touch interactions
    const handleTouchStart = () => {
        setIsTouchPaused(true);
        if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };

    const handleTouchEnd = () => {
        touchTimeoutRef.current = setTimeout(() => {
            setIsTouchPaused(false);
        }, 2000);
    };

    // Duplicate list for seamless infinite looping in marquee
    const marqueeProjects = [...projects, ...projects];

    return (
        <section className="relative w-full pt-0 pb-12 sm:pb-16 overflow-hidden">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`mb-10 sm:mb-14 border-b pb-5 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 max-w-7xl mx-auto ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <div>
                    <span className={`text-xs font-mono tracking-[0.25em] uppercase font-semibold ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>04 / PORTFOLIO</span>
                    <h2 className={`font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-[0.06em] sm:tracking-[0.1em] uppercase mt-1 ${
                        isLight ? 'text-zinc-950' : 'text-white'
                    }`}>
                        SELECTED WORKS
                    </h2>
                </div>
                <p className={`text-xs font-mono tracking-widest uppercase max-w-xs ${
                    isLight ? 'text-zinc-600 font-medium' : 'text-zinc-400'
                }`}>
                    CLICK ANY CARD TO OPEN DEMO • REEL & GRID
                </p>
            </motion.div>

            {/* Reel (Marquee) Wrapper with edge fades hidden on mobile */}
            <div className="relative w-full">
                {/* Left Edge Fade Mask - hidden on mobile so it doesn't clip cards */}
                <div className={`hidden sm:block absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none ${
                    isLight ? 'bg-gradient-to-r from-[#fafafa] to-transparent' : 'bg-gradient-to-r from-black to-transparent'
                }`} />

                {/* Right Edge Fade Mask - hidden on mobile so it doesn't clip cards */}
                <div className={`hidden sm:block absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none ${
                    isLight ? 'bg-gradient-to-l from-[#fafafa] to-transparent' : 'bg-gradient-to-l from-black to-transparent'
                }`} />

                {/* Smooth Infinite Marquee Reel with Touch Pause and Snap Usability */}
                <div 
                    className="w-full overflow-x-auto scroll-hide py-4 touch-pan-x"
                    tabIndex={0}
                    aria-label="Scrollable showcase reel of featured projects"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div 
                        className="marquee-content flex gap-4 sm:gap-6 items-stretch"
                        style={{ animationPlayState: isTouchPaused ? 'paused' : undefined }}
                    >
                        {marqueeProjects.map((project, index) => (
                            <ProjectCard 
                                key={`${project.title}-marquee-${index}`} 
                                project={project} 
                                isLight={isLight} 
                                inGrid={false}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* View All Projects Button (Full width on mobile) */}
            <div className="flex justify-center mt-8 sm:mt-12 px-3 sm:px-4">
                <button
                    onClick={() => setShowGrid(!showGrid)}
                    aria-expanded={showGrid}
                    aria-controls="all-projects-grid"
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-2xl transition-all shadow-xl group cursor-pointer border ${
                        isLight 
                            ? 'bg-white border-zinc-300 text-zinc-950 hover:bg-zinc-950 hover:text-white shadow-zinc-200/50' 
                            : 'bg-zinc-900 border-zinc-800 text-white hover:bg-white hover:text-black hover:border-white'
                    }`}
                >
                    <Grid size={16} />
                    <span>{showGrid ? 'HIDE PROJECTS GRID' : 'VIEW ALL PROJECTS IN GRID'}</span>
                    {showGrid ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>

            {/* Full Grid View Container: 1 col on phones, 2 on tablets, 3 on lg+ */}
            <AnimatePresence>
                {showGrid && (
                    <motion.div
                        id="all-projects-grid"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`max-w-7xl mx-auto mt-8 sm:mt-12 pt-8 border-t overflow-hidden ${
                            isLight ? 'border-zinc-200' : 'border-zinc-800/80'
                        }`}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={`${project.title}-grid-${index}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04, duration: 0.35 }}
                                    className="flex w-full h-full"
                                >
                                    <ProjectCard project={project} isLight={isLight} inGrid={true} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default Projects;
