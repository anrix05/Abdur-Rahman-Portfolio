import { motion } from 'framer-motion';
import { Layout, Server, Wrench, Users, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const categories = [
        {
            id: 'frontend',
            title: 'FRONTEND & MOBILE',
            icon: Layout,
            colSpan: 'md:col-span-1',
            skills: ['React Native', 'Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
            id: 'ai-vision',
            title: 'AI, VISION & EMBEDDED',
            icon: Cpu,
            colSpan: 'md:col-span-1',
            skills: ['Gemini API (Vision)', 'OpenPyXL', 'Raspberry Pi', 'Computer Vision', 'IoT / Arduino', 'Embedded Systems'],
        },
        {
            id: 'backend',
            title: 'BACKEND & DATABASES',
            icon: Server,
            colSpan: 'md:col-span-2',
            skills: [
                'Python', 
                'Flask', 
                'FastAPI', 
                'Supabase (Auth, Storage)', 
                'PostgreSQL', 
                'SQLAlchemy', 
                'Row Level Security', 
                'Razorpay (Payments)', 
                'Node.js', 
                'Firebase', 
                'SQLite', 
                'REST APIs', 
                'Cloud Functions', 
                'Java', 
                'Biometric Auth'
            ],
        },
        {
            id: 'tools',
            title: 'DEVELOPMENT TOOLS',
            icon: Wrench,
            colSpan: 'md:col-span-1',
            skills: ['Git / GitHub', 'VS Code', 'Android Studio', 'Figma', 'Postman', 'Vite', 'Vercel'],
        },
        {
            id: 'soft',
            title: 'WORKFLOW & CREATIVE',
            icon: Users,
            colSpan: 'md:col-span-1',
            skills: ['Agile Development', 'UI/UX Design', 'Video Editing', 'Problem Solving', 'Data Security', 'Performance Tuning'],
        }
    ];

    return (
        <section className="relative w-full pt-0 pb-8 sm:pb-12">
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`mb-10 sm:mb-14 border-b pb-5 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <div>
                    <span className={`text-xs font-mono tracking-[0.25em] uppercase font-semibold ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>02 / CAPABILITIES</span>
                    <h2 className={`font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-[0.06em] sm:tracking-[0.1em] uppercase mt-1 ${
                        isLight ? 'text-zinc-950' : 'text-white'
                    }`}>
                        TECHNICAL STACK
                    </h2>
                </div>
            </motion.div>

            {/* Bento Grid: 1 col on phones, 2 cols on tablets/laptops */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06, duration: 0.5 }}
                            className={`${category.colSpan} border p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                        >
                            <div>
                                <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-6">
                                    <div className={`p-2.5 sm:p-3 rounded-2xl border transition-colors shrink-0 ${
                                        isLight 
                                            ? 'bg-zinc-100 border-zinc-200 text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white' 
                                            : 'bg-zinc-900 border-zinc-800 text-white group-hover:bg-white group-hover:text-black'
                                    }`}>
                                        <IconComponent size={18} />
                                    </div>
                                    <h3 className={`font-display font-bold text-base sm:text-xl tracking-wider uppercase break-words ${
                                        isLight ? 'text-zinc-950' : 'text-white'
                                    }`}>
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                                    {category.skills.map((skill, idx) => (
                                        <span 
                                            key={idx} 
                                            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 border rounded-xl text-[11px] sm:text-xs font-mono tracking-wider transition-all font-medium max-w-full break-words ${
                                                isLight 
                                                    ? 'bg-zinc-100/90 text-zinc-900 border-zinc-300 hover:bg-zinc-200 hover:text-black' 
                                                    : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-600 hover:text-white'
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
