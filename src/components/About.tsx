import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const WAVEFORM_HEIGHTS = [30, 65, 40, 85, 95, 50, 70, 90, 45, 80, 60, 30, 75, 90, 40, 60, 80, 50, 70, 40];

const About = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <section className="relative w-full py-12">

            {/* Section Header */}
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
                    <span className={`text-xs font-mono tracking-[0.25em] uppercase ${
                        isLight ? 'text-zinc-500' : 'text-zinc-500'
                    }`}>01 / PROFILE</span>
                    <h2 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase mt-1 ${
                        isLight ? 'text-zinc-950' : 'text-white'
                    }`}>
                        ABOUT ABDUR
                    </h2>
                </div>
                <p className={`text-xs font-mono tracking-wider uppercase max-w-xs ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                    DEVELOPER & EDITORIAL CREATIVE BASED IN MUMBAI
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Left IDE & Timeline Preview Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-5 flex justify-center w-full"
                >
                    <div className={`w-full rounded-3xl overflow-hidden shadow-2xl border ${
                        isLight 
                            ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 text-white'
                    }`}>
                        
                        {/* Editor Header Bar */}
                        <div className={`h-10 border-b px-5 flex items-center justify-between ${
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

                        {/* Code Workspace Preview */}
                        <div className={`p-6 font-mono text-xs space-y-2 ${
                            isLight ? 'bg-zinc-50 text-zinc-800' : 'bg-black text-zinc-300'
                        }`}>
                            <div><span className="text-zinc-400">1</span>  <span className={isLight ? 'text-blue-600 font-bold' : 'text-white font-bold'}>interface</span> <span className={isLight ? 'text-zinc-950 font-bold' : 'text-zinc-200'}>AbdurCraft</span> &#123;</div>
                            <div><span className="text-zinc-400">2</span>    role: <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-zinc-400'}>'Frontend & Mobile Dev'</span>;</div>
                            <div><span className="text-zinc-400">3</span>    background: <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-zinc-400'}>'7 Years Video & Content Editing'</span>;</div>
                            <div><span className="text-zinc-400">4</span>    location: <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-zinc-400'}>'Mumbai, India'</span>;</div>
                            <div><span className="text-zinc-400">5</span>    stack: [<span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'React Native'</span>, <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'Next.js'</span>, <span className={isLight ? 'text-purple-700 font-semibold' : 'text-zinc-400'}>'TypeScript'</span>];</div>
                            <div><span className="text-zinc-400">6</span>  &#125;</div>
                        </div>

                        {/* Interactive Timeline Mockup */}
                        <div className={`border-t p-5 space-y-3 ${
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
                                <span className="text-[10px] font-mono text-zinc-400 mr-3">V1</span>
                                <div className={`h-5 rounded px-2.5 text-[10px] flex items-center font-mono uppercase tracking-wider font-bold ${
                                    isLight ? 'bg-zinc-950 text-white' : 'bg-white text-black'
                                }`}>
                                    COMPOSITION_V1.MP4
                                </div>
                            </div>

                            {/* Code Track */}
                            <div className={`h-8 rounded-lg border relative overflow-hidden flex items-center px-3 ${
                                isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                            }`}>
                                <span className="text-[10px] font-mono text-zinc-400 mr-3">V2</span>
                                <div className={`h-5 rounded px-2.5 text-[10px] flex items-center font-mono uppercase tracking-wider font-medium ${
                                    isLight ? 'bg-zinc-200 text-zinc-900 border border-zinc-300' : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                                }`}>
                                    REACT_NATIVE_STATE.TS
                                </div>
                            </div>

                            {/* Audio Track */}
                            <div className={`h-8 rounded-lg border relative overflow-hidden flex items-center px-3 gap-1 ${
                                isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
                            }`}>
                                <span className="text-[10px] font-mono text-zinc-400 mr-2">A1</span>
                                <div className="flex items-center gap-1 h-3 opacity-60">
                                    {WAVEFORM_HEIGHTS.map((h, i) => (
                                        <div key={i} className={`w-[3px] rounded-full ${isLight ? 'bg-zinc-600' : 'bg-zinc-400'}`} style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 border-t text-xs font-mono flex items-center justify-between ${
                            isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}>
                            <span>VIDYALANKAR INST. OF TECH</span>
                            <span>B.TECH ECS ('28)</span>
                        </div>

                    </div>
                </motion.div>

                {/* Streamlined Editorial Content Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-7 space-y-5"
                >
                    <div className={`p-7 rounded-3xl border transition-all duration-300 shadow-lg ${
                        isLight 
                            ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}>
                        <h3 className={`font-display font-bold text-xl uppercase tracking-wider mb-2 ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>FULL-STACK MOBILE & FRONTEND FOCUS</h3>
                        <p className={`text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Frontend and Mobile Engineer based in Mumbai, specializing in <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>React Native</strong> and <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Next.js</strong>. I craft applications focused on speed, intuitive UX, and zero compromise on performance.
                        </p>
                    </div>

                    <div className={`p-7 rounded-3xl border transition-all duration-300 shadow-lg ${
                        isLight 
                            ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}>
                        <h3 className={`font-display font-bold text-xl uppercase tracking-wider mb-2 ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>ARCHITECTURE & DATA PERSISTENCE</h3>
                        <p className={`text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Creator of <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Love Connect</strong> & <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>The Graveyard</strong>. Designed hybrid database architectures combining Firebase for instant real-time sync with SQLite for on-device offline persistence and biometric authentication.
                        </p>
                    </div>

                    <div className={`p-7 rounded-3xl border transition-all duration-300 shadow-lg ${
                        isLight 
                            ? 'bg-white border-zinc-200 hover:border-zinc-400 shadow-zinc-200/50' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}>
                        <h3 className={`font-display font-bold text-xl uppercase tracking-wider mb-2 ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>7 YEARS EDITORIAL & UI PRECISION</h3>
                        <p className={`text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Pursuing B.Tech in Electronic & Computer Science at <strong className={isLight ? 'text-zinc-950 font-bold' : 'text-white font-semibold'}>Vidyalankar Institute of Technology</strong> (2024–2028). Combining 7 years of video and technical content editing with software engineering to bring meticulous visual polish to every digital product.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
