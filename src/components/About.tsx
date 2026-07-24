import { motion } from 'framer-motion';

const WAVEFORM_HEIGHTS = [30, 65, 40, 85, 95, 50, 70, 90, 45, 80, 60, 30, 75, 90, 40, 60, 80, 50, 70, 40];

const About = () => {
    return (
        <section className="relative w-full py-12">

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-14 border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <span className="text-xs font-mono text-zinc-500 tracking-[0.25em] uppercase">01 / PROFILE</span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase text-white mt-1">
                        ABOUT ABDUR
                    </h2>
                </div>
                <p className="text-xs font-mono text-zinc-400 tracking-wider uppercase max-w-xs">
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
                    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                        
                        {/* Editor Header Bar */}
                        <div className="h-10 bg-zinc-900 border-b border-zinc-800 px-5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                            </div>
                            <span className="text-[11px] font-mono text-zinc-400 tracking-wider">DEV_X_EDITOR.TSX</span>
                            <span className="text-[10px] font-mono text-zinc-600">UTF-8</span>
                        </div>

                        {/* Code Workspace Preview */}
                        <div className="p-6 font-mono text-xs text-zinc-300 space-y-2 bg-black">
                            <div><span className="text-zinc-600">1</span>  <span className="text-white font-bold">interface</span> <span className="text-zinc-200">AbdurCraft</span> &#123;</div>
                            <div><span className="text-zinc-600">2</span>    role: <span className="text-zinc-400">'Frontend & Mobile Dev'</span>;</div>
                            <div><span className="text-zinc-600">3</span>    background: <span className="text-zinc-400">'7 Years Video & Content Editing'</span>;</div>
                            <div><span className="text-zinc-600">4</span>    location: <span className="text-zinc-400">'Mumbai, India'</span>;</div>
                            <div><span className="text-zinc-600">5</span>    stack: [<span className="text-zinc-400">'React Native'</span>, <span className="text-zinc-400">'Next.js'</span>, <span className="text-zinc-400">'TypeScript'</span>];</div>
                            <div><span className="text-zinc-600">6</span>  &#125;</div>
                        </div>

                        {/* Interactive Timeline Mockup */}
                        <div className="border-t border-zinc-800 bg-zinc-950 p-5 space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 tracking-wider">
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                                    NLE TIMELINE
                                </span>
                                <span>00:01:24:18</span>
                            </div>

                            {/* Video Track */}
                            <div className="h-8 bg-zinc-900 rounded-lg border border-zinc-800 relative overflow-hidden flex items-center px-3">
                                <span className="text-[10px] font-mono text-zinc-500 mr-3">V1</span>
                                <div className="h-5 bg-white text-black font-bold rounded px-2.5 text-[10px] flex items-center font-mono uppercase tracking-wider">
                                    COMPOSITION_V1.MP4
                                </div>
                            </div>

                            {/* Code Track */}
                            <div className="h-8 bg-zinc-900 rounded-lg border border-zinc-800 relative overflow-hidden flex items-center px-3">
                                <span className="text-[10px] font-mono text-zinc-500 mr-3">V2</span>
                                <div className="h-5 bg-zinc-800 border border-zinc-700 text-zinc-200 rounded px-2.5 text-[10px] flex items-center font-mono uppercase tracking-wider">
                                    REACT_NATIVE_STATE.TS
                                </div>
                            </div>

                            {/* Audio Track */}
                            <div className="h-8 bg-zinc-900 rounded-lg border border-zinc-800 relative overflow-hidden flex items-center px-3 gap-1">
                                <span className="text-[10px] font-mono text-zinc-500 mr-2">A1</span>
                                <div className="flex items-center gap-1 h-3 opacity-60">
                                    {WAVEFORM_HEIGHTS.map((h, i) => (
                                        <div key={i} className="w-[3px] bg-zinc-400 rounded-full" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-zinc-900 border-t border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-between">
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
                    <div className="p-7 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-colors shadow-lg">
                        <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-2">FULL-STACK MOBILE & FRONTEND FOCUS</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Frontend and Mobile Engineer based in Mumbai, specializing in <strong className="text-white font-semibold">React Native</strong> and <strong className="text-white font-semibold">Next.js</strong>. I craft applications focused on speed, intuitive UX, and zero compromise on performance.
                        </p>
                    </div>

                    <div className="p-7 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-colors shadow-lg">
                        <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-2">ARCHITECTURE & DATA PERSISTENCE</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Creator of <strong className="text-white font-semibold">Love Connect</strong> & <strong className="text-white font-semibold">The Graveyard</strong>. Designed hybrid database architectures combining Firebase for instant real-time sync with SQLite for on-device offline persistence and biometric authentication.
                        </p>
                    </div>

                    <div className="p-7 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-colors shadow-lg">
                        <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-2">7 YEARS EDITORIAL & UI PRECISION</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Pursuing B.Tech in Electronic & Computer Science at <strong className="text-white font-semibold">Vidyalankar Institute of Technology</strong> (2024–2028). Combining 7 years of video and technical content editing with software engineering to bring meticulous visual polish to every digital product.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
