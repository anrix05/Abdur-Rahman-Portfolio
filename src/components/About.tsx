import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const WAVEFORM_HEIGHTS = [30, 65, 40, 85, 95, 50, 70, 90, 45, 80, 60, 30, 75, 90, 40, 60, 80, 50, 70, 40];

const About = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <section className="relative w-full pt-0 pb-8 sm:pb-12">

            {/* Section Header */}
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
                    }`}>01 / PROFILE</span>
                    <h2 className={`font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-[0.06em] sm:tracking-[0.1em] uppercase mt-1 ${
                        isLight ? 'text-zinc-950' : 'text-white'
                    }`}>
                        ABOUT ABDUR
                    </h2>
                </div>
                <p className={`text-xs font-mono tracking-wider uppercase max-w-xs font-medium ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                    FULL-STACK & MOBILE DEVELOPER · 7-YEAR VIDEO EDITOR · MUMBAI
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                {/* Left IDE & Timeline Preview Box - Stacks above cards on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-5 flex justify-center w-full"
                >
                    <div className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border ${
                        isLight 
                            ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 text-white'
                    }`}>
                        
                        {/* Editor Header Bar */}
                        <div className={`h-10 border-b px-4 sm:px-5 flex items-center justify-between ${
                            isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                        }`}>
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
                            className={`p-4 sm:p-6 font-mono text-xs space-y-1.5 overflow-x-auto scroll-hide overscroll-contain ${
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
                        <div className={`border-t p-3.5 sm:p-5 space-y-2.5 ${
                            isLight ? 'bg-white border-zinc-200' : 'bg-zinc-950 border-zinc-800'
                        }`}>
                            <div className={`flex items-center justify-between text-[11px] font-mono tracking-wider ${
                                isLight ? 'text-zinc-600' : 'text-zinc-400'
                            }`}>
                                <span className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isLight ? 'bg-zinc-950' : 'bg-white'}`}></span>
                                    NLE TIMELINE
                                </span>
                                <span>00:01:24:18</span>
                            </div>

                            {/* Video Track */}
                            <div className={`h-8 rounded-lg border relative overflow-hidden flex items-center px-3 ${
                                isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                            }`}>
                                <span className="text-[10px] font-mono text-zinc-400 mr-3 shrink-0">V1</span>
                                <div className={`h-5 rounded px-2.5 text-[10px] flex items-center font-mono uppercase tracking-wider font-bold truncate ${
                                    isLight ? 'bg-zinc-950 text-white' : 'bg-white text-black'
                                }`}>
                                    COMPOSITION_V1.MP4
                                </div>
                            </div>

                            {/* Code Track */}
                            <div className={`h-8 rounded-lg border relative overflow-hidden flex items-center px-3 ${
                                isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                            }`}>
                                <span className="text-[10px] font-mono text-zinc-400 mr-3 shrink-0">V2</span>
                                <div className={`h-5 rounded px-2.5 text-[10px] flex items-center font-mono uppercase tracking-wider font-medium truncate ${
                                    isLight ? 'bg-zinc-200 text-zinc-900 border border-zinc-300' : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                                }`}>
                                    REACT_NATIVE_STATE.TS
                                </div>
                            </div>

                            {/* Audio Track */}
                            <div className={`h-8 rounded-lg border relative overflow-hidden flex items-center px-3 gap-1 ${
                                isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                            }`}>
                                <span className="text-[10px] font-mono text-zinc-400 mr-2 shrink-0">A1</span>
                                <div className="flex items-center gap-1 h-3 opacity-60 overflow-hidden">
                                    {WAVEFORM_HEIGHTS.map((h, i) => (
                                        <div key={i} className={`w-[3px] rounded-full shrink-0 ${isLight ? 'bg-zinc-600' : 'bg-zinc-400'}`} style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`p-3.5 sm:p-4 border-t text-xs font-mono flex items-center justify-between gap-2 ${
                            isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}>
                            <span className="truncate">VIDYALANKAR INST. OF TECH</span>
                            <span className="shrink-0">B.TECH ECS ('28)</span>
                        </div>

                    </div>
                </motion.div>

                {/* Streamlined Editorial Content Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="lg:col-span-7 space-y-4 sm:space-y-5 w-full"
                >
                    {/* Card 1 */}
                    <div className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-lg ${
                        isLight 
                            ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}>
                        <h3 className={`font-display font-bold text-lg sm:text-xl uppercase tracking-wider mb-2.5 break-words ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>BUILDING PRODUCTS END TO END</h3>
                        <p className={`text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            I'm a full-stack and mobile developer in Mumbai, working mainly with <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>React Native</strong>, <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Next.js</strong>, and <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Supabase</strong>. I take a product from the database to the interface, and I care about three things: it loads fast, it doesn't lose data, and the person using it never feels confused.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-lg ${
                        isLight 
                            ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}>
                        <h3 className={`font-display font-bold text-lg sm:text-xl uppercase tracking-wider mb-2.5 leading-snug break-words ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>SECURITY & DATA, NOT AN AFTERTHOUGHT</h3>
                        <p className={`text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Love Connect</strong> uses biometric login and a hybrid Firebase + SQLite layer that keeps working offline. For <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>NexaLink</strong>, I locked down a Supabase backend with Row Level Security on 17 tables and tamper-evident audit logs. <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>The Graveyard</strong> adds payments and GitHub-verified project listings.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-lg ${
                        isLight 
                            ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}>
                        <h3 className={`font-display font-bold text-lg sm:text-xl uppercase tracking-wider mb-2.5 break-words ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>THE EDITOR'S EYE</h3>
                        <p className={`text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Seven years of video and content editing taught me pacing, hierarchy, and cutting whatever doesn't earn its place. I bring that to interfaces: tight copy, clear layouts, and motion with a purpose.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
