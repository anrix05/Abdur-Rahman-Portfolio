import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
    const categories = [
        {
            id: 'frontend',
            title: 'Frontend',
            skills: ['Next.js 15', 'React Native', 'React 19', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'GSAP'],
            color: 'group-hover:border-cyan-500/50',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <motion.div
                        className="absolute top-12 right-8 text-5xl text-cyan-500/30 font-mono font-bold group-hover:text-cyan-400/50 transition-colors duration-300"
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        &lt;/&gt;
                    </motion.div>
                    <motion.div
                        className="absolute bottom-10 left-8 text-7xl text-purple-500/20 font-mono font-bold group-hover:text-purple-400/40 transition-colors duration-300"
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
            skills: ['Supabase', 'Node.js', 'PostgreSQL', 'Edge Functions', 'Razorpay', 'SQLite', 'Firebase'],
            color: 'group-hover:border-green-500/50',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Data Streams */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-green-500/40 w-[1px]"
                            style={{ left: `${20 + i * 15}%`, top: '-10%', height: '120%' }}
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 2 + i, repeat: Infinity }}
                        >
                            <motion.div
                                className="w-full h-[30%] bg-green-400 blur-[2px] group-hover:bg-green-300 transition-colors"
                                animate={{ y: ['-100%', '600%'] }}
                                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'linear' }}
                            />
                        </motion.div>
                    ))}
                    {/* Database Icon Representation */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-green-500/30 rounded-full flex flex-col justify-center items-center gap-1 group-hover:border-green-400/60 transition-colors">
                        <div className="w-8 h-1 bg-green-500/30 rounded-full group-hover:bg-green-400/60" />
                        <div className="w-8 h-1 bg-green-500/30 rounded-full group-hover:bg-green-400/60" />
                        <div className="w-8 h-1 bg-green-500/30 rounded-full group-hover:bg-green-400/60" />
                    </div>
                </div>
            )
        },
        {
            id: 'tools',
            title: 'Tools & DevOps',
            skills: ['Git / GitHub', 'VS Code', 'Figma', 'Postman', 'Vite', 'Vercel', 'Android Studio'],
            color: 'group-hover:border-blue-500/50',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-[-20%] right-[-10%] w-32 h-32 border-4 border-dashed border-blue-500/30 rounded-full group-hover:border-blue-400/50 transition-colors"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute bottom-[-10%] left-[-5%] w-24 h-24 border-4 border-dashed border-purple-500/30 rounded-full group-hover:border-purple-400/50 transition-colors"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute top-6 left-6 font-mono text-xs text-blue-300/60 group-hover:text-blue-200 transition-colors">
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
            color: 'group-hover:border-pink-500/50',
            content: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
                    {/* Connecting Nodes */}
                    <svg className="absolute inset-0 w-full h-full">
                        <motion.circle cx="20%" cy="30%" r="4" fill="#f472b6" animate={{ r: [4, 6, 4] }} transition={{ duration: 3, repeat: Infinity }} />
                        <motion.circle cx="80%" cy="20%" r="4" fill="#818cf8" animate={{ r: [4, 6, 4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1 }} />
                        <motion.circle cx="50%" cy="80%" r="4" fill="#34d399" animate={{ r: [4, 6, 4] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} />

                        <motion.line x1="20%" y1="30%" x2="80%" y2="20%" stroke="#f472b6" strokeWidth="2" strokeOpacity="0.4"
                            animate={{ strokeDasharray: ["0 100", "100 0"] }} transition={{ duration: 5, repeat: Infinity }}
                        />
                        <motion.line x1="80%" y1="20%" x2="50%" y2="80%" stroke="#818cf8" strokeWidth="2" strokeOpacity="0.4" />
                        <motion.line x1="50%" y1="80%" x2="20%" y2="30%" stroke="#34d399" strokeWidth="2" strokeOpacity="0.4" />
                    </svg>
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
                className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
            >
                Technical Arsenal
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl px-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`relative bg-[#0b0b1e]/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl ${category.color} transition-all duration-300 group overflow-hidden`}
                    >
                        {/* Background Animation Layer */}
                        {category.content}

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6 text-purple-300 group-hover:text-purple-200 transition-colors">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="relative group/skill">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-0 group-hover/skill:opacity-75 transition duration-200" />
                                        <span className="relative block px-4 py-2 bg-black rounded-lg text-gray-300 border border-white/10 text-sm font-medium">
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
