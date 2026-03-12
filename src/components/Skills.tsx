import { motion } from 'framer-motion';

const Skills = () => {
    const categories = [
        {
            id: 'frontend',
            title: 'Frontend',
            skills: ['React Native', 'Next.js', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
            color: 'group-hover:border-neon-lime/50',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <motion.div
                        className="absolute top-12 right-8 text-5xl text-neon-lime/20 font-mono font-bold group-hover:text-neon-lime/40 transition-colors duration-300"
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        &lt;/&gt;
                    </motion.div>
                    <motion.div
                        className="absolute bottom-10 left-8 text-7xl text-emerald/15 font-mono font-bold group-hover:text-emerald/30 transition-colors duration-300"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        &#123; &#125;
                    </motion.div>
                </div>
            )
        },
        {
            id: 'backend',
            title: 'Backend & Data',
            skills: ['Node.js', 'Firebase', 'SQLite', 'Java', 'Biometric Auth', 'Cloud Functions'],
            color: 'group-hover:border-emerald/50',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Data Streams */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-emerald/30 w-[1px]"
                            style={{ left: `${20 + i * 15}%`, top: '-10%', height: '120%' }}
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 2 + i, repeat: Infinity }}
                        >
                            <motion.div
                                className="w-full h-[30%] bg-emerald/40 blur-[2px] group-hover:bg-emerald/60 transition-colors"
                                animate={{ y: ['-100%', '600%'] }}
                                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'linear' }}
                            />
                        </motion.div>
                    ))}
                    {/* Database Icon Representation */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-emerald/30 rounded-full flex flex-col justify-center items-center gap-1 group-hover:border-emerald/60 transition-colors">
                        <div className="w-8 h-1 bg-emerald/30 rounded-full group-hover:bg-emerald/50" />
                        <div className="w-8 h-1 bg-emerald/30 rounded-full group-hover:bg-emerald/50" />
                        <div className="w-8 h-1 bg-emerald/30 rounded-full group-hover:bg-emerald/50" />
                    </div>
                </div>
            )
        },
        {
            id: 'tools',
            title: 'Tools & DevOps',
            skills: ['Git / GitHub', 'VS Code', 'Figma', 'Postman', 'Vite', 'Vercel', 'Android Studio'],
            color: 'group-hover:border-neon-lime/40',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-[-20%] right-[-10%] w-32 h-32 border-4 border-dashed border-neon-lime/20 rounded-full group-hover:border-neon-lime/40 transition-colors"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute bottom-[-10%] left-[-5%] w-24 h-24 border-4 border-dashed border-emerald/20 rounded-full group-hover:border-emerald/40 transition-colors"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute top-6 left-6 font-mono text-xs text-neon-lime/50 group-hover:text-neon-lime/80 transition-colors">
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            $ npm install universe
                        </motion.span>
                    </div>
                </div>
            )
        },
        {
            id: 'soft',
            title: 'Soft Skills',
            skills: ['Agile Methodology', 'Team Collaboration', 'Problem Solving', 'Time Management', 'Attention to Detail'],
            color: 'group-hover:border-emerald/40',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
                    {/* Connecting Nodes */}
                    <div className="absolute inset-0 w-full h-full">
                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full">
                            <motion.line x1="20%" y1="30%" x2="80%" y2="20%" stroke="#ccff00" strokeWidth="2" strokeOpacity="0.3"
                                animate={{ strokeDasharray: ["0, 100", "100, 0"] }} transition={{ duration: 5, repeat: Infinity }}
                            />
                            <line x1="80%" y1="20%" x2="50%" y2="80%" stroke="#10b981" strokeWidth="2" strokeOpacity="0.3" />
                            <line x1="50%" y1="80%" x2="20%" y2="30%" stroke="#ccff00" strokeWidth="2" strokeOpacity="0.3" />
                        </svg>

                        {/* Nodes (Divs) */}
                        <motion.div
                            className="absolute w-3 h-3 bg-neon-lime rounded-full -translate-x-1/2 -translate-y-1/2"
                            style={{ left: '20%', top: '30%' }}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute w-3 h-3 bg-emerald rounded-full -translate-x-1/2 -translate-y-1/2"
                            style={{ left: '80%', top: '20%' }}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                        />
                        <motion.div
                            className="absolute w-3 h-3 bg-neon-lime rounded-full -translate-x-1/2 -translate-y-1/2"
                            style={{ left: '50%', top: '80%' }}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                        />
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="py-20 flex flex-col items-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-neon-lime to-emerald"
            >
                Technical Arsenal
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl px-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`relative bg-obsidian/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl ${category.color} transition-all duration-300 group overflow-hidden`}
                    >
                        {/* Background Animation Layer */}
                        {category.content}

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6 text-neon-lime/90 group-hover:text-neon-lime transition-colors">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="relative group/skill">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-lime to-emerald rounded-lg blur opacity-0 group-hover/skill:opacity-50 transition duration-200" />
                                        <span className="relative block px-4 py-2 bg-obsidian rounded-lg text-gray-300 border border-white/10 text-sm font-medium">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
