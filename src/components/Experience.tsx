import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TiltCard } from './common/TiltCard';

const Experience = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const timelineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 85%', 'end 75%'],
    });
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const experiences = [
        {
            role: 'Full-Stack Developer',
            company: 'NexaLink - Smart India Hackathon (SIH25017), Vidyalankar Institute of Technology',
            period: undefined,
            type: 'work',
            description: 'Built a centralized alumni data management and engagement platform with role-based access, verified mentorship matching, job and event workflows, real-time messaging, and a hardened Supabase backend (Row Level Security, hash-chained audit logs).',
            tech: ['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS']
        },
        {
            role: 'Founder & Full-Stack Developer',
            company: 'The Graveyard (Independent)',
            period: undefined,
            type: 'work',
            description: 'Designed and built a marketplace where developers sell, hand over, or find co-founders for abandoned side projects, with tombstone-style project data, a zip-inspecting publish wizard, GitHub-verified commit history, and Razorpay payments.',
            tech: ['Next.js', 'Supabase', 'Razorpay', 'Framer Motion']
        },
        {
            role: 'Full-Stack Mobile Engineer',
            company: 'Love Connect (Independent)',
            period: 'JAN 2025 – PRESENT',
            type: 'work',
            description: 'Engineered a dual-database layer combining Firebase Realtime Database for instant live sync with on-device SQLite persistence and offline-first fallback sync. Built layered biometric auth and custom privacy controls, delivering 8+ core feature modules as sole developer with intuitive Framer Motion UI/UX.',
            tech: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'SQLite', 'Cloud Functions', 'Biometric Auth']
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
        <section className="relative w-full pt-0 pb-8 sm:pb-12 scroll-mt-28 [perspective:1400px]">
            
            {/* Header with 3D Reveal */}
            <motion.div
                initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`mb-10 sm:mb-12 border-b pb-5 sm:pb-6 w-full will-change-transform ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <span className={`text-[clamp(10px,2.5vw,12px)] font-mono tracking-[0.2em] uppercase font-semibold ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>03 / BACKGROUND</span>
                <h2 className={`font-display font-extrabold text-[clamp(1.5rem,6vw,3rem)] tracking-[0.04em] sm:tracking-[0.08em] uppercase mt-1 leading-tight break-words ${
                    isLight ? 'text-zinc-950' : 'text-white'
                }`}>
                    EXPERIENCE
                </h2>
            </motion.div>

            {/* Timeline with Scroll-filling Line */}
            <div 
                ref={timelineRef}
                className="relative ml-2 sm:ml-4 md:ml-6 pl-5 sm:pl-7 md:pl-11 space-y-8 sm:space-y-10 w-full"
            >
                {/* Background Line */}
                <div 
                    className={`absolute left-0 top-2 bottom-4 w-[2px] ${
                        isLight ? 'bg-zinc-200' : 'bg-zinc-800'
                    }`}
                />

                {/* Animated Scroll Fill Line */}
                <motion.div 
                    style={{ scaleY: lineScaleY, transformOrigin: 'top center' }}
                    className={`absolute left-0 top-2 bottom-4 w-[2px] will-change-transform ${
                        isLight ? 'bg-zinc-950' : 'bg-white'
                    }`}
                />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                        whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group w-full will-change-transform"
                    >
                        {/* Flat Circular Timeline Node with entrance glow */}
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4 }}
                            className={`absolute -left-[26px] sm:-left-[34px] md:-left-[50px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-10 ${
                                isLight 
                                    ? 'bg-white border-zinc-400 group-hover:border-zinc-950 group-hover:scale-125' 
                                    : 'bg-black border-zinc-600 group-hover:border-white group-hover:scale-125'
                            }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${
                                isLight ? 'bg-zinc-700 group-hover:bg-zinc-950' : 'bg-zinc-400 group-hover:bg-white'
                            }`} />
                        </motion.div>

                        {/* Content Card wrapped in TiltCard */}
                        <TiltCard maxTilt={5} className="w-full">
                            <div className={`border p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-xl w-full [transform-style:preserve-3d] ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50 text-zinc-900' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-white'
                            }`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 [transform-style:preserve-3d]">
                                    <div>
                                        <div 
                                            style={{ transform: 'translateZ(24px)' }}
                                            className="flex items-center gap-2 flex-wrap transition-transform"
                                        >
                                            {exp.type === 'work' ? (
                                                <Briefcase size={16} className={isLight ? 'text-zinc-700' : 'text-zinc-400'} />
                                            ) : (
                                                <GraduationCap size={16} className={isLight ? 'text-zinc-700' : 'text-zinc-400'} />
                                            )}
                                            <h3 className={`font-display font-bold text-[clamp(0.95rem,3.8vw,1.25rem)] tracking-wider uppercase break-words ${
                                                isLight ? 'text-zinc-950' : 'text-white'
                                            }`}>
                                                {exp.role}
                                            </h3>
                                        </div>
                                        <p 
                                            style={{ transform: 'translateZ(16px)' }}
                                            className={`text-[clamp(11px,2.8vw,13px)] font-mono mt-1 break-words transition-transform ${
                                                isLight ? 'text-zinc-600 font-medium' : 'text-zinc-400'
                                            }`}
                                        >
                                            {exp.company}
                                        </p>
                                    </div>
                                    
                                    {/* Date Badge */}
                                    {Boolean(exp.period) && (
                                        <span 
                                            style={{ transform: 'translateZ(28px)' }}
                                            className={`inline-flex font-mono text-[clamp(9px,2.4vw,11px)] font-semibold px-3 py-1 rounded-full w-fit tracking-wider border shrink-0 transition-transform ${
                                                isLight 
                                                    ? 'bg-zinc-100 border-zinc-300 text-zinc-800' 
                                                    : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                                            }`}
                                        >
                                            {exp.period}
                                        </span>
                                    )}
                                </div>

                                <p 
                                    style={{ transform: 'translateZ(12px)' }}
                                    className={`text-[clamp(0.8rem,2.8vw,0.875rem)] leading-relaxed mb-5 transition-transform ${
                                        isLight ? 'text-zinc-700 font-normal' : 'text-zinc-400'
                                    }`}
                                >
                                    {exp.description}
                                </p>

                                <div 
                                    style={{ transform: 'translateZ(18px)' }}
                                    className="flex flex-wrap gap-1.5 sm:gap-2 transition-transform"
                                >
                                    {exp.tech.map((t, i) => (
                                        <span 
                                            key={i} 
                                            className={`text-[10px] sm:text-[11px] font-mono border px-2.5 sm:px-3 py-1 rounded-lg tracking-wider uppercase ${
                                                isLight 
                                                    ? 'bg-zinc-100/90 border-zinc-300 text-zinc-900 font-medium' 
                                                    : 'bg-black border-zinc-800 text-zinc-300'
                                            }`}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Experience;
