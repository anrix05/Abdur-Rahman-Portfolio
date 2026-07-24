import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            role: 'Backend & Mobile Engineer',
            company: 'Love Connect (Independent)',
            period: 'JAN 2025 – PRESENT',
            type: 'work',
            description: 'Designed server-side architecture and mobile application for Love Connect. Engineered a dual-database layer combining Firebase Realtime Database for instant live sync with on-device SQLite persistence. Built layered biometric auth and custom privacy controls.',
            tech: ['React Native', 'Firebase', 'SQLite', 'Cloud Functions', 'Biometrics']
        },
        {
            role: 'Frontend Mobile Developer',
            company: 'Love Connect (Independent)',
            period: 'JAN 2026 – FEB 2026',
            type: 'work',
            description: 'Sole developer for the mobile application spanning 8+ core feature modules. Built offline-first fallback sync architecture preventing data loss, designed intuitive UI/UX with Framer Motion, and integrated secure biometric triggers.',
            tech: ['React Native', 'TypeScript', 'Redux', 'Biometric Auth']
        },
        {
            role: 'Content & Video Editor',
            company: 'Independent Projects',
            period: 'MAR 2019 – FEB 2026',
            type: 'work',
            description: 'Edited technical and creative multimedia content across independent projects for over 7 years. Fine-tuned visual pacing, narrative structure, and design consistency across written and video deliverables.',
            tech: ['Video Editing', 'Content Strategy', 'Visual Design']
        },
        {
            role: 'B.Tech in Electronic & Computer Science',
            company: 'Vidyalankar Institute of Technology',
            period: '2024 – 2028',
            type: 'edu',
            description: 'Studying core electronic systems, computer science fundamentals, data structures, algorithms, and software engineering. Certified in Java (NPTEL) and software development frameworks (TCS iON).',
            tech: ['Electronics', 'Java', 'Data Structures', 'DBMS', 'Software Engineering']
        },
    ];

    return (
        <section className="relative w-full py-12">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-14 border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <span className="text-xs font-mono text-zinc-500 tracking-[0.25em] uppercase">03 / BACKGROUND</span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase text-white mt-1">
                        EXPERIENCE
                    </h2>
                </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative border-l border-zinc-800 ml-4 md:ml-6 pl-6 md:pl-10 space-y-10">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="relative group"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-zinc-500 group-hover:border-white group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-zinc-400 group-hover:bg-white" />
                        </div>

                        {/* Content Card */}
                        <div className="bg-zinc-950 border border-zinc-800 p-7 md:p-8 rounded-3xl hover:border-zinc-700 transition-all duration-300 shadow-xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        {exp.type === 'work' ? (
                                            <Briefcase size={16} className="text-zinc-400" />
                                        ) : (
                                            <GraduationCap size={16} className="text-zinc-400" />
                                        )}
                                        <h3 className="font-display font-bold text-xl text-white tracking-wider uppercase">
                                            {exp.role}
                                        </h3>
                                    </div>
                                    <p className="text-sm font-mono text-zinc-400 mt-1">
                                        {exp.company}
                                    </p>
                                </div>
                                
                                <span className="inline-flex font-mono text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full w-fit tracking-wider">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                {exp.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t, i) => (
                                    <span 
                                        key={i} 
                                        className="text-[11px] font-mono text-zinc-400 bg-black border border-zinc-800 px-3 py-1 rounded-lg tracking-wider uppercase"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Experience;
