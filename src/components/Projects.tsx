import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';

interface Project {
    title: string;
    description: string;
    tags: string[];
    color: string;
    type: 'software' | 'hardware';
    link?: string;
    github?: string;
    demo?: string;
    content?: React.ReactNode;
}

const Projects = () => {
    const projects: Project[] = [
        {
            title: 'ZeroBlur',
            description: 'A premium Neo-Brutalist digital assets marketplace for UI Kits, Code Snippets, and Templates. Built with high contrast, tactical interactions, and bold design.',
            tags: ['React 18', 'Framer Motion', 'Lucide React', 'Vanilla CSS'],
            color: 'from-[#ffe17c] to-[#ffb300]',
            type: 'software',
            demo: 'https://zeroblur.anrix.me/',
            github: 'https://github.com/anrix05/ZeroBlur',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500 bg-[#ffe17c]/5">
                    {/* High-Contrast Dot Grid */}
                    <div className="absolute inset-0" style={{ 
                        backgroundImage: 'radial-gradient(rgba(0,0,0,0.8) 2px, transparent 2px)', 
                        backgroundSize: '32px 32px',
                        opacity: 0.15
                    }} />

                    {/* Iconic Stickers: Lightning Bolt */}
                    <motion.div
                        className="absolute top-8 right-8 text-7xl select-none"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [-5, 5, -5]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ filter: 'drop-shadow(4px 4px 0px #000)' }}
                    >
                        ⚡
                    </motion.div>

                    {/* Iconic Stickers: Package */}
                    <motion.div
                        className="absolute bottom-10 left-10 text-6xl select-none"
                        animate={{ 
                            y: [0, -15, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        style={{ filter: 'drop-shadow(4px 4px 0px #000)' }}
                    >
                        📦
                    </motion.div>

                    {/* "ZB" Tactical Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="px-6 py-2 bg-black text-[#ffe17c] font-black text-4xl border-2 border-black tracking-tighter"
                            animate={{ 
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ZB.V1
                        </motion.div>
                        {/* Crosshair lines */}
                        <div className="absolute w-12 h-[2px] bg-black/20 -translate-x-16" />
                        <div className="absolute w-12 h-[2px] bg-black/20 translate-x-16" />
                        <div className="absolute w-[2px] h-12 bg-black/20 -translate-y-16" />
                        <div className="absolute w-[2px] h-12 bg-black/20 translate-y-16" />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-black/40" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-black/40" />
                </div>
            )
        },
        {
            title: 'The Graveyard',
            description: 'A marketplace for developers to buy, sell, and "adopt" unfinished coding projects. Features secure asset delivery, real-time chat, and Razorpay payments.',
            tags: ['Next.js 15', 'Supabase', 'React 19', 'Razorpay'],
            color: 'from-violet-600 to-indigo-600',
            type: 'software',
            demo: 'https://graveyard.anrix.me',
            github: 'https://github.com/anrix05/The-Graveyard',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div
                        className="absolute top-10 right-10 text-7xl text-violet-500/30 group-hover:text-violet-400/50 transition-colors"
                        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        ☠️
                    </motion.div>
                    <motion.div
                        className="absolute bottom-10 left-10 text-5xl text-indigo-500/30 group-hover:text-indigo-400/50 transition-colors"
                        animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    >
                        👻
                    </motion.div>
                    {/* Digital Grid Glitch */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                </div>
            )
        },
        {
            title: 'Love Connect',
            description: 'A relationship management suite focusing on emotional connection and privacy. Features biometric authentication and a hybrid Firebase/SQLite architecture.',
            tags: ['React Native', 'Firebase', 'SQLite', 'Biometrics'],
            color: 'from-pink-500 to-rose-600',
            type: 'software',
            github: 'https://github.com/anrix05/Love-Connect',
            demo: 'https://expo.dev/accounts/anrix/projects/relationship-app/builds/c5be3738-1ba4-4664-b8b2-a21a09038aaf',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div
                        className="absolute top-1/4 left-1/4 text-6xl text-pink-500/30 group-hover:text-pink-400/50 transition-colors"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ❤️
                    </motion.div>
                    <motion.div
                        className="absolute bottom-1/3 right-1/4 text-5xl text-rose-500/30 group-hover:text-rose-400/50 transition-colors"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    >
                        💖
                    </motion.div>
                    {/* Biometric Scan Line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[3px] bg-pink-500/50 blur-[3px]"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            )
        },
        {
            title: 'Auto Shed (Smart Roof)',
            description: 'Intelligent roofing system equipped with rain sensors to automatically close and protect open spaces during weather changes.',
            tags: ['IoT', 'Arduino', 'Sensors', 'Automation'],
            color: 'from-orange-500 to-red-600',
            type: 'hardware',
            link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Rain Effect */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[3px] bg-blue-400/50"
                            style={{ left: `${12 * i + 8}%`, height: '25px' }}
                            animate={{ top: ['-10%', '110%'] }}
                            transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: 'linear' }}
                        />
                    ))}
                    {/* Shield/Roof Pulse */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-orange-500/20 to-transparent"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
            )
        },
        {
            title: 'Digital Lock',
            description: 'Secure hardware locking mechanism featuring keypad entry and remote status monitoring for enhanced home security.',
            tags: ['Embedded Systems', 'C++', 'Security', 'Hardware'],
            color: 'from-green-500 to-emerald-600',
            type: 'hardware',
            link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Binary Rain */}
                    <div className="absolute inset-0 flex justify-around text-sm font-mono text-green-500/40 group-hover:text-green-400/60 transition-colors">
                        <motion.div animate={{ y: [0, 100] }} transition={{ duration: 5, repeat: Infinity }}>10101</motion.div>
                        <motion.div animate={{ y: [0, 100] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}>01001</motion.div>
                        <motion.div animate={{ y: [0, 100] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }}>11100</motion.div>
                    </div>
                    {/* Lock Icon */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center text-8xl text-green-500/20 group-hover:text-green-400/40 transition-colors"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        🔒
                    </motion.div>
                </div>
            )
        },
    ];

    return (
        <section className="py-20 flex flex-col items-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-lime to-emerald"
            >
                Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="group relative bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden hover:border-neon-lime/50 transition-all duration-300"
                    >
                        {/* Custom Background Animation */}
                        {project.content}

                        {/* Glow Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>

                        <div className="p-8 relative z-10 flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{project.title}</h3>
                            <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-neon-lime/80 border border-white/10 font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                {project.type === 'software' ? (
                                    <>
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                                                <FaGithub /> Code
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        )}
                                    </>
                                ) : (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-neon-lime transition-colors text-sm w-full justify-center font-medium bg-white/5 py-2 rounded-lg hover:bg-white/10 border border-white/5">
                                        <FaLinkedin className="text-lg" /> View Project on LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
