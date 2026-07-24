import { motion } from 'framer-motion';
import { Layout, Server, Wrench, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const categories = [
        {
            id: 'frontend',
            title: 'FRONTEND & MOBILE',
            icon: Layout,
            skills: ['React Native', 'Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
            id: 'backend',
            title: 'BACKEND & DATABASES',
            icon: Server,
            skills: ['Node.js', 'Firebase', 'SQLite', 'Java', 'Biometric Auth', 'Cloud Functions', 'REST APIs'],
        },
        {
            id: 'tools',
            title: 'DEVELOPMENT TOOLS',
            icon: Wrench,
            skills: ['Git / GitHub', 'VS Code', 'Android Studio', 'Figma', 'Postman', 'Vite', 'Vercel'],
        },
        {
            id: 'soft',
            title: 'WORKFLOW & CREATIVE',
            icon: Users,
            skills: ['Agile Development', 'UI/UX Design', 'Video Editing', 'Problem Solving', 'Data Security', 'Performance Tuning'],
        }
    ];

    return (
        <section className="relative w-full py-12">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`mb-14 border-b pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <div>
                    <span className="text-xs font-mono text-zinc-500 tracking-[0.25em] uppercase">02 / CAPABILITIES</span>
                    <h2 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase mt-1 ${
                        isLight ? 'text-zinc-950' : 'text-white'
                    }`}>
                        TECHNICAL STACK
                    </h2>
                </div>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`border p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                        >
                            <div>
                                <div className="flex items-center gap-3.5 mb-6">
                                    <div className={`p-3 rounded-2xl border transition-colors ${
                                        isLight 
                                            ? 'bg-zinc-100 border-zinc-200 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white' 
                                            : 'bg-zinc-900 border-zinc-800 text-white group-hover:bg-white group-hover:text-black'
                                    }`}>
                                        <IconComponent size={20} />
                                    </div>
                                    <h3 className={`font-display font-bold text-xl tracking-wider uppercase ${
                                        isLight ? 'text-zinc-950' : 'text-white'
                                    }`}>
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {category.skills.map((skill, idx) => (
                                        <span 
                                            key={idx} 
                                            className={`px-3.5 py-2 border rounded-xl text-xs font-mono tracking-wider transition-all ${
                                                isLight 
                                                    ? 'bg-zinc-100/80 text-zinc-800 border-zinc-200/90 hover:bg-zinc-200 hover:text-zinc-950' 
                                                    : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

        </section>
    );
};

export default Skills;
