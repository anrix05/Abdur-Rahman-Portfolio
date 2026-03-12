import { motion } from 'framer-motion';

const Experience = () => {
    const experiences = [
        {
            role: 'Back End Developer',
            company: 'Self-employed',
            period: 'Jan 2025 - Present',
            description: 'Designed server-side architecture for Love Connect. Engineered a dual-database backend strategy combining Firebase Realtime Database for live sync and SQLite for on-device persistence. Built a layered authentication backend integrating Firebase Auth with biometric triggers. Architected Firestore data models and deployed Cloud Functions.',
            tech: ['Firebase', 'SQLite', 'Cloud Functions', 'NoSQL']
        },
        {
            role: 'Frontend Developer',
            company: 'Self-employed',
            period: 'Jan 2026 - Feb 2026',
            description: 'Sole developer of Love Connect, a full-stack React Native mobile app covering 8+ feature modules. Architected a hybrid data layer that keeps real-time sync active when online and falls back to local persistence offline, delivering zero data loss. Built a biometric authentication system with a custom privacy mode ("Spicy Mode").',
            tech: ['React Native', 'TypeScript', 'Redux', 'Biometrics']
        },
        {
            role: 'Editor',
            company: 'Self-employed',
            period: 'Mar 2019 - Feb 2026',
            description: 'Edited technical and creative content for independent projects, maintaining consistency in tone, structure, and clarity across written and digital deliverables. Applied feedback-driven revision cycles to improve draft quality.',
            tech: ['Content Editing', 'Creative Writing', 'Revision Cycles']
        },
        {
            role: 'Bachelor of Technology (B.Tech)',
            company: 'Vidyalankar Institute of Technology',
            period: '2nd Year, 4th Sem',
            description: 'Focusing on Computer Science fundamentals, software engineering principles, and data-driven applications. Maintaining excellence in core engineering subjects.',
            tech: ['Java', 'React', 'Data Structures', 'DBMS']
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
                Experience & Education
            </motion.h2>

            <div className="relative border-l-2 border-neon-lime/30 ml-4 md:ml-0 md:pl-0 space-y-16 max-w-4xl w-full">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="relative pl-8 md:pl-12 group"
                    >
                        {/* Timeline Dot with Pulse */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-lime shadow-[0_0_10px_rgba(204,255,0,0.8)] group-hover:scale-125 transition-transform duration-300" />

                        <div className="bg-obsidian/80 border border-white/10 p-8 rounded-2xl hover:border-neon-lime/50 hover:bg-obsidian transition-all duration-300 shadow-xl backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                    <h4 className="text-lg text-neon-lime/80">{exp.company}</h4>
                                </div>
                                <span className="text-emerald font-mono text-sm bg-emerald/10 px-3 py-1 rounded-full mt-2 md:mt-0 border border-emerald/30">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-gray-400 leading-relaxed mb-6">
                                {exp.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t, i) => (
                                    <span key={i} className="text-xs text-neon-lime/60 px-2 py-1 bg-white/5 rounded border border-white/5">
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
