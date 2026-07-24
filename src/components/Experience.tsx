import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

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
                className={`mb-12 border-b pb-6 w-full ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <span className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase">03 / BACKGROUND</span>
                <h2 className={`font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-[0.05em] uppercase mt-1 leading-tight break-words ${
                    isLight ? 'text-zinc-950' : 'text-white'
                }`}>
                    EXPERIENCE
                </h2>
            </motion.div>

            {/* Timeline */}
            <div className={`relative border-l ml-4 md:ml-6 pl-6 md:pl-10 space-y-10 w-full ${
                isLight ? 'border-zinc-300' : 'border-zinc-800'
            }`}>
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="relative group w-full"
                    >
                        {/* Timeline Node */}
                        <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                            isLight 
                                ? 'bg-white border-zinc-400 group-hover:border-zinc-950 group-hover:scale-125' 
                                : 'bg-black border-zinc-500 group-hover:border-white group-hover:scale-125'
                        }`}>
                            <div className={`w-1 h-1 rounded-full ${
                                isLight ? 'bg-zinc-600 group-hover:bg-zinc-950' : 'bg-zinc-400 group-hover:bg-white'
                            }`} />
                        </div>

                        {/* Content Card */}
                        <div className={`border p-6 sm:p-7 md:p-8 rounded-3xl transition-all duration-300 shadow-xl w-full ${
                            isLight 
                                ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50 text-zinc-900' 
                                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-white'
                        }`}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {exp.type === 'work' ? (
                                            <Briefcase size={16} className={isLight ? 'text-zinc-700' : 'text-zinc-400'} />
                                        ) : (
                                            <GraduationCap size={16} className={isLight ? 'text-zinc-700' : 'text-zinc-400'} />
                                        )}
                                        <h3 className={`font-display font-bold text-lg sm:text-xl tracking-wider uppercase ${
                                            isLight ? 'text-zinc-950' : 'text-white'
                                        }`}>
                                            {exp.role}
                                        </h3>
                                    </div>
                                    <p className={`text-xs sm:text-sm font-mono mt-1 ${
                                        isLight ? 'text-zinc-600 font-medium' : 'text-zinc-400'
                                    }`}>
                                        {exp.company}
                                    </p>
                                </div>
                                
                                <span className={`inline-flex font-mono text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full w-fit tracking-wider border shrink-0 ${
                                    isLight 
                                        ? 'bg-zinc-100 border-zinc-200 text-zinc-800' 
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                                }`}>
                                    {exp.period}
                                </span>
                            </div>

                            <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                                isLight ? 'text-zinc-600 font-normal' : 'text-zinc-400'
                            }`}>
                                {exp.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t, i) => (
                                    <span 
                                        key={i} 
                                        className={`text-[10px] sm:text-[11px] font-mono border px-2.5 sm:px-3 py-1 rounded-lg tracking-wider uppercase ${
                                            isLight 
                                                ? 'bg-zinc-100/90 border-zinc-200 text-zinc-800 font-medium' 
                                                : 'bg-black border-zinc-800 text-zinc-400'
                                        }`}
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
