import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { TiltCard } from './common/TiltCard';

const WAVEFORM_HEIGHTS = [30, 65, 40, 85, 95, 50, 70, 90, 45, 80, 60, 30, 75, 90, 40, 60, 80, 50, 70, 40];

const About = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <section className="relative w-full pt-0 pb-8 sm:pb-12 scroll-mt-28 [perspective:1400px]">

            {/* Section Header with 3D Reveal */}
            <motion.div
                initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`mb-10 sm:mb-14 border-b pb-5 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 will-change-transform ${
                    isLight ? 'border-zinc-200' : 'border-zinc-800'
                }`}
            >
                <div>
                    <span className={`text-[clamp(10px,2.5vw,12px)] font-mono tracking-[0.25em] uppercase font-semibold ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>01 / PROFILE</span>
                    <h2 className={`font-display font-extrabold text-[clamp(1.5rem,6vw,3rem)] tracking-[0.04em] sm:tracking-[0.08em] uppercase mt-1 leading-tight break-words ${
                        isLight ? 'text-zinc-950' : 'text-white'
                    }`}>
                        ABOUT ABDUR
                    </h2>
                </div>
                <p className={`text-[clamp(10px,2.5vw,12px)] font-mono tracking-wider uppercase max-w-xs font-medium ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                    FULL-STACK & MOBILE DEVELOPER · 7-YEAR VIDEO EDITOR · MUMBAI
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                {/* Left IDE & Timeline Preview Box with TiltCard */}
                <motion.div
                    initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5 flex justify-center w-full will-change-transform"
                >
                    <TiltCard maxTilt={8} className="w-full">
                        <div className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border [transform-style:preserve-3d] ${
                            isLight 
                                ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/50' 
                                : 'bg-zinc-950 border-zinc-800 text-white'
                        }`}>
                            
                            {/* Editor Header Bar */}
                            <div 
                                style={{ transform: 'translateZ(20px)' }}
                                className={`h-10 border-b px-4 sm:px-5 flex items-center justify-between transition-transform ${
                                    isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                                </div>
                                <span className={`text-[11px] font-mono tracking-wider ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>DEV_X_EDITOR.TSX</span>
                                <span className="text-[10px] font-mono text-zinc-400">UTF-8</span>
                            </div>

                            {/* Code Workspace Preview with Horizontal Scroll Container */}
                            <div 
                                tabIndex={0}
                                aria-label="Code editor snippet"
                                style={{ transform: 'translateZ(14px)' }}
                                className={`p-4 sm:p-6 font-mono text-xs space-y-1.5 overflow-x-auto scroll-hide overscroll-contain transition-transform ${
                                    isLight ? 'bg-zinc-50 text-zinc-800' : 'bg-black text-zinc-300'
                                }`}
                            >
                                <div className="min-w-fit">
                                    <div><span className="text-zinc-400 mr-2">1</span><span className={isLight ? 'text-blue-600 font-bold' : 'text-white font-bold'}>interface</span> <span className={isLight ? 'text-zinc-950 font-bold' : 'text-zinc-200'}>AbdurCraft</span> &#123;</div>
                                    <div><span className="text-zinc-400 mr-2">2</span>  role: <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-zinc-400'}>'Full-Stack & Mobile Dev'</span>;</div>
                                    <div><span className="text-zinc-400 mr-2">3</span>  background: <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-zinc-400'}>'7 Years Video & Content Editing'</span>;</div>
                                    <div><span className="text-zinc-400 mr-2">4</span>  location: <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-zinc-400'}>'Mumbai, India'</span>;</div>
                                    <div><span className="text-zinc-400 mr-2">5</span>  stack: [<span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'React Native'</span>, <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'Next.js'</span>, <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'TypeScript'</span>, <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'Supabase'</span>];</div>
                                    <div><span className="text-zinc-400 mr-2">6</span>  shipped: [<span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'NexaLink'</span>, <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'The Graveyard'</span>,</div>
                                    <div><span className="text-zinc-400 mr-2">7</span>            <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'V Notice'</span>, <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'AttendAI'</span>];</div>
                                    <div><span className="text-zinc-400 mr-2">8</span>&#125;</div>
                                </div>
                            </div>

                            {/* Interactive Timeline Mockup */}
                            <div 
                                style={{ transform: 'translateZ(24px)' }}
                                className={`border-t p-3.5 sm:p-5 space-y-2.5 transition-transform ${
                                    isLight ? 'bg-white border-zinc-200' : 'bg-zinc-950 border-zinc-800'
                                }`}
                            >
                                <div className={`flex items-center justify-between text-[11px] font-mono tracking-wider ${
                                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}>
                                    <span>TIMELINE_METRICS</span>
                                    <span>00:07:28:14</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9">
                                    {WAVEFORM_HEIGHTS.map((height, i) => (
                                        <div 
                                            key={i} 
                                            className={`flex-1 rounded-sm transition-all duration-300 ${
                                                i % 4 === 0 
                                                    ? (isLight ? 'bg-zinc-900' : 'bg-white') 
                                                    : (isLight ? 'bg-zinc-300' : 'bg-zinc-800')
                                            }`} 
                                            style={{ height: `${height}%` }} 
                                        />
                                    ))}
                                </div>
                                <div className={`flex items-center justify-between text-[10px] font-mono border-t pt-2 mt-1 ${
                                    isLight ? 'border-zinc-200 text-zinc-500' : 'border-zinc-800 text-zinc-500'
                                }`}>
                                    <span className="truncate">VIDYALANKAR INST. OF TECH</span>
                                    <span className="shrink-0">B.TECH ECS ('28)</span>
                                </div>

                            </div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Editorial Content Cards with TiltCard and Scroll Reveals */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5 w-full">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                        whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <TiltCard maxTilt={6}>
                            <div className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-lg [transform-style:preserve-3d] ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}>
                                <h3 
                                    style={{ transform: 'translateZ(24px)' }}
                                    className={`font-display font-bold text-[clamp(1rem,4vw,1.25rem)] uppercase tracking-wider mb-2.5 break-words transition-transform ${
                                        isLight ? 'text-zinc-950' : 'text-white'
                                    }`}
                                >
                                    BUILDING PRODUCTS END TO END
                                </h3>
                                <p 
                                    style={{ transform: 'translateZ(12px)' }}
                                    className={`text-[clamp(0.8rem,2.8vw,0.875rem)] leading-relaxed transition-transform ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}
                                >
                                    I'm a full-stack and mobile developer in Mumbai, working mainly with <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>React Native</strong>, <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Next.js</strong>, and <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Supabase</strong>. I take a product from the database to the interface, and I care about three things: it loads fast, it doesn't lose data, and the person using it never feels confused.
                                </p>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                        whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <TiltCard maxTilt={6}>
                            <div className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-lg [transform-style:preserve-3d] ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}>
                                <h3 
                                    style={{ transform: 'translateZ(24px)' }}
                                    className={`font-display font-bold text-[clamp(1rem,4vw,1.25rem)] uppercase tracking-wider mb-2.5 leading-snug break-words transition-transform ${
                                        isLight ? 'text-zinc-950' : 'text-white'
                                    }`}
                                >
                                    SECURITY & DATA, NOT AN AFTERTHOUGHT
                                </h3>
                                <p 
                                    style={{ transform: 'translateZ(12px)' }}
                                    className={`text-[clamp(0.8rem,2.8vw,0.875rem)] leading-relaxed transition-transform ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}
                                >
                                    <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Love Connect</strong> uses biometric login and a hybrid Firebase + SQLite layer that keeps working offline. For <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>NexaLink</strong>, I locked down a Supabase backend with Row Level Security on 17 tables and tamper-evident audit logs. <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>The Graveyard</strong> adds payments and GitHub-verified project listings.
                                </p>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, rotateX: 12, y: 40, z: -80 }}
                        whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <TiltCard maxTilt={6}>
                            <div className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-lg [transform-style:preserve-3d] ${
                                isLight 
                                    ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}>
                                <h3 
                                    style={{ transform: 'translateZ(24px)' }}
                                    className={`font-display font-bold text-[clamp(1rem,4vw,1.25rem)] uppercase tracking-wider mb-2.5 break-words transition-transform ${
                                        isLight ? 'text-zinc-950' : 'text-white'
                                    }`}
                                >
                                    THE EDITOR'S EYE
                                </h3>
                                <p 
                                    style={{ transform: 'translateZ(12px)' }}
                                    className={`text-[clamp(0.8rem,2.8vw,0.875rem)] leading-relaxed transition-transform ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}
                                >
                                    Seven years of video and content editing taught me pacing, hierarchy, and cutting whatever doesn't earn its place. I bring that to interfaces: tight copy, clear layouts, and motion with a purpose.
                                </p>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default About;
