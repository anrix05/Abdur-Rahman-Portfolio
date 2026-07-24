import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, FolderGit2, Cpu, Grid, ChevronDown, ChevronUp } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    tags: string[];
    type: 'software' | 'hardware';
    link?: string;
    github?: string;
    demo?: string;
    categoryLabel: string;
}

const Projects = () => {
    const [showGrid, setShowGrid] = useState(false);

    const projects: Project[] = [
        {
            title: 'ZeroBlur',
            description: 'A premium digital assets marketplace built for UI Kits, Code Snippets, and design templates with high contrast interactions and tactical asset previews.',
            tags: ['React 18', 'Framer Motion', 'Lucide React', 'Vanilla CSS'],
            type: 'software',
            categoryLabel: 'MARKETPLACE • WEB',
            demo: 'https://zeroblur.anrix.me/',
            github: 'https://github.com/anrix05/ZeroBlur',
        },
        {
            title: 'The Graveyard',
            description: 'A dedicated platform for developers to buy, sell, and adopt unfinished side projects. Features instant digital asset delivery, real-time chat, and Razorpay integration.',
            tags: ['Next.js 15', 'Supabase', 'React 19', 'Razorpay'],
            type: 'software',
            categoryLabel: 'SAAS MARKETPLACE • WEB',
            demo: 'https://graveyard.anrix.me',
            github: 'https://github.com/anrix05/The-Graveyard',
        },
        {
            title: 'Love Connect',
            description: 'Full-stack relationship management suite focused on privacy and real-time syncing. Features biometric security and a hybrid Firebase + SQLite offline fallback architecture.',
            tags: ['React Native', 'Firebase', 'SQLite', 'Biometrics'],
            type: 'software',
            categoryLabel: 'MOBILE APP • IOS / ANDROID',
            github: 'https://github.com/anrix05/Love-Connect',
            demo: 'https://expo.dev/accounts/anrix/projects/relationship-app/builds/c5be3738-1ba4-4664-b8b2-a21a09038aaf',
        },
        {
            title: 'Auto Shed (Smart Roof)',
            description: 'An IoT automated roofing mechanism equipped with rain sensors to automatically cover open areas during sudden weather changes.',
            tags: ['IoT', 'Arduino', 'Sensors', 'Automation'],
            type: 'hardware',
            categoryLabel: 'HARDWARE & EMBEDDED',
            link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
        },
        {
            title: 'Digital Keypad Lock',
            description: 'Hardware security lock featuring matrix keypad authorization and real-time status monitoring for smart access control.',
            tags: ['Embedded Systems', 'C++', 'Security', 'Hardware'],
            type: 'hardware',
            categoryLabel: 'HARDWARE & SECURITY',
            link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
        },
    ];

    // Duplicate list for seamless infinite looping
    const marqueeProjects = [...projects, ...projects];

    const handleCardClick = (project: Project, e: React.MouseEvent) => {
        // Prevent trigger if clicking directly on child links
        if ((e.target as HTMLElement).closest('a')) return;
        const targetUrl = project.demo || project.link || project.github;
        if (targetUrl) {
            window.open(targetUrl, '_blank');
        }
    };

    return (
        <section className="relative w-full py-12 sm:py-16 overflow-hidden">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10 sm:mb-14 border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                <div>
                    <span className="text-xs font-mono text-zinc-500 tracking-[0.25em] uppercase">04 / PORTFOLIO</span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase text-white mt-1">
                        SELECTED WORKS
                    </h2>
                </div>
                <p className="text-xs font-mono text-zinc-400 tracking-widest uppercase max-w-xs">
                    CLICK ANY CARD TO OPEN DEMO • REEL & GRID
                </p>
            </motion.div>

            {/* Edge Fade Overlays */}
            <div className="absolute left-0 top-36 bottom-[120px] w-12 sm:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-36 bottom-[120px] w-12 sm:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            {/* Single-Line Smooth Infinite Marquee Reel */}
            <div className="w-full overflow-x-auto scroll-hide py-4">
                <motion.div
                    className="flex gap-4 sm:gap-6 w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 35,
                            ease: 'linear',
                        },
                    }}
                >
                    {marqueeProjects.map((project, index) => (
                        <div
                            key={index}
                            onClick={(e) => handleCardClick(project, e)}
                            className="w-[290px] sm:w-[360px] md:w-[400px] flex-shrink-0 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-white transition-all duration-300 shadow-xl group cursor-pointer hover:bg-zinc-900/60 relative"
                        >
                            <div>
                                {/* Card Header & Category Tag */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                                        {project.categoryLabel}
                                    </span>
                                    <div className="p-2 rounded-xl bg-zinc-900 text-white border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                                        {project.type === 'software' ? <FolderGit2 size={14} /> : <Cpu size={14} />}
                                    </div>
                                </div>

                                {/* Project Title */}
                                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-3 tracking-wider uppercase group-hover:text-zinc-100 transition-colors flex items-center justify-between">
                                    <span>{project.title}</span>
                                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                                </h3>

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                                    {project.description}
                                </p>
                            </div>

                            <div>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                                    {project.tags.map((tag, i) => (
                                        <span 
                                            key={i} 
                                            className="text-[10px] sm:text-[11px] font-mono text-zinc-300 px-2.5 sm:px-3 py-1 bg-zinc-900 rounded-lg border border-zinc-800 uppercase tracking-wider"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Links */}
                                <div className="flex items-center gap-4 pt-4 sm:pt-5 border-t border-zinc-900 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
                                    {project.type === 'software' ? (
                                        <>
                                            {project.github && (
                                                <a 
                                                    href={project.github} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors z-10"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Github size={14} /> CODE
                                                </a>
                                            )}
                                            {project.demo && (
                                                <a 
                                                    href={project.demo} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-white font-bold hover:underline transition-all ml-auto z-10"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    LIVE DEMO <ArrowUpRight size={14} />
                                                </a>
                                            )}
                                        </>
                                    ) : (
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors text-xs uppercase z-10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span>VIEW ON LINKEDIN</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </motion.div>
            </div>

            {/* View All Projects Button */}
            <div className="flex justify-center mt-10 sm:mt-12 px-4">
                <button
                    onClick={() => setShowGrid(!showGrid)}
                    className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-zinc-900 border border-zinc-800 text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-2xl hover:bg-white hover:text-black hover:border-white transition-all shadow-xl group cursor-pointer"
                >
                    <Grid size={15} />
                    <span>{showGrid ? 'HIDE ALL PROJECTS GRID' : 'VIEW ALL PROJECTS IN GRID'}</span>
                    {showGrid ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
            </div>

            {/* Full Grid View Container */}
            <AnimatePresence>
                {showGrid && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 pt-8 border-t border-zinc-800/80 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.4 }}
                                    onClick={(e) => handleCardClick(project, e)}
                                    className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-white transition-all duration-300 shadow-xl group cursor-pointer hover:bg-zinc-900/60"
                                >
                                    <div>
                                        {/* Card Header & Category Tag */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                                                {project.categoryLabel}
                                            </span>
                                            <div className="p-2 rounded-xl bg-zinc-900 text-white border border-zinc-800">
                                                {project.type === 'software' ? <FolderGit2 size={14} /> : <Cpu size={14} />}
                                            </div>
                                        </div>

                                        {/* Project Title */}
                                        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-3 tracking-wider uppercase group-hover:text-zinc-100 transition-colors flex items-center justify-between">
                                            <span>{project.title}</span>
                                            <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div>
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                                            {project.tags.map((tag, i) => (
                                                <span 
                                                    key={i} 
                                                    className="text-[10px] sm:text-[11px] font-mono text-zinc-300 px-2.5 sm:px-3 py-1 bg-zinc-900 rounded-lg border border-zinc-800 uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Links */}
                                        <div className="flex items-center gap-4 pt-4 sm:pt-5 border-t border-zinc-900 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
                                            {project.type === 'software' ? (
                                                <>
                                                    {project.github && (
                                                        <a 
                                                            href={project.github} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Github size={14} /> CODE
                                                        </a>
                                                    )}
                                                    {project.demo && (
                                                        <a 
                                                            href={project.demo} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-white font-bold hover:underline transition-all ml-auto"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            LIVE DEMO <ArrowUpRight size={14} />
                                                        </a>
                                                    )}
                                                </>
                                            ) : (
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors text-xs uppercase"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span>VIEW ON LINKEDIN</span>
                                                    <ExternalLink size={13} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
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
