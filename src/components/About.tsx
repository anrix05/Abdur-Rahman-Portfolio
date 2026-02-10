import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="relative w-full py-20 px-6 max-w-7xl mx-auto flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
                    About Me
                </h2>
                <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

                {/* Visual/Image Side - Glassmorphism Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center w-full"
                >
                    {/* Interactive Editor & Dev Card */}
                    <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden group bg-[#0a051e] border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-500">

                        {/* Scrolling Code Background */}
                        <div className="absolute inset-0 opacity-20 text-[10px] text-purple-500 font-mono p-4 overflow-hidden select-none pointer-events-none">
                            <motion.div
                                animate={{ y: ["0%", "-50%"] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="space-y-1"
                            >
                                {/* Duplicate content for seamless loop */}
                                {[...Array(2)].map((_, sectionIndex) => (
                                    <div key={sectionIndex} className="space-y-1">
                                        <div className="whitespace-nowrap"><span className="text-pink-500">const</span> <span className="text-yellow-300">Editor</span> = <span className="text-green-400">"Creative"</span>;</div>
                                        <div className="whitespace-nowrap"><span className="text-pink-500">const</span> <span className="text-yellow-300">Dev</span> = <span className="text-green-400">"Logic"</span>;</div>
                                        <div className="whitespace-nowrap"><span className="text-blue-400">function</span> <span className="text-yellow-300">createMagic</span>() &#123;</div>
                                        <div className="whitespace-nowrap pl-4"><span className="text-purple-400">return</span> <span className="text-yellow-300">Editor</span> + <span className="text-yellow-300">Dev</span>;</div>
                                        <div className="whitespace-nowrap">&#125;</div>
                                        <div className="whitespace-nowrap text-gray-500">// Rendering seamless UI...</div>
                                        <div className="whitespace-nowrap text-gray-500">// Compiling assets...</div>
                                        <div className="whitespace-nowrap"><span className="text-blue-400">import</span> <span className="text-yellow-300">React</span> <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;</div>
                                        <div className="whitespace-nowrap"><span className="text-pink-500">const</span> <span className="text-yellow-300">App</span> = () <span className="text-blue-400">=&gt;</span> <span className="text-green-400">"Build"</span>;</div>
                                        <div className="h-10"></div> {/* Spacer */}
                                    </div>
                                ))}
                            </motion.div>
                            {/* Gradient Mask for fading */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0a051e] via-transparent to-[#0a051e] pointer-events-none" />
                        </div>

                        {/* Video Timeline (Editor Aspect) - Realistic NLE */}
                        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-[#121212] border-t border-white/10 flex flex-col justify-between group-hover:h-[50%] transition-all duration-500 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">

                            {/* Toolbar / Time Ruler */}
                            <div className="h-8 bg-[#1e1e1e] border-b border-white/5 flex items-center px-4 justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-[10px] text-gray-400 font-mono flex gap-4">
                                    <span>00:00:12:05</span>
                                    <span className="text-purple-400">V1</span>
                                </div>
                            </div>

                            {/* Tracks Container */}
                            <div className="flex-1 p-3 space-y-2 relative overflow-hidden">

                                {/* Playhead - Moving */}
                                <motion.div
                                    className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-30 pointer-events-none"
                                    animate={{ left: ["10%", "90%"] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="absolute top-0 -left-[4px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-red-500" />
                                </motion.div>

                                {/* Video Track 1 */}
                                <div className="h-8 bg-[#1a1a1a] rounded flex items-center relative overflow-hidden border border-white/5">
                                    <span className="absolute left-1 text-[8px] text-gray-600 font-mono z-10">V1</span>
                                    <div className="absolute left-[10%] w-[40%] h-full bg-blue-900/40 border border-blue-500/30 rounded-sm flex items-center px-2">
                                        <span className="text-[7px] text-blue-200/50 truncate">Main_Camera_01.mp4</span>
                                    </div>
                                    <div className="absolute left-[55%] w-[30%] h-full bg-blue-800/40 border border-blue-500/30 rounded-sm flex items-center px-2">
                                        <span className="text-[7px] text-blue-200/50 truncate">Wide_Shot.mov</span>
                                    </div>
                                </div>

                                {/* Video Track 2 (Overlay) */}
                                <div className="h-8 bg-[#1a1a1a] rounded flex items-center relative overflow-hidden border border-white/5">
                                    <span className="absolute left-1 text-[8px] text-gray-600 font-mono z-10">V2</span>
                                    <div className="absolute left-[30%] w-[20%] h-[80%] bg-purple-900/40 border border-purple-500/30 rounded-sm flex items-center px-2">
                                        <span className="text-[7px] text-purple-200/50 truncate">Overlay_Glitch</span>
                                    </div>
                                </div>

                                {/* Audio Track */}
                                <div className="h-8 bg-[#1a1a1a] rounded flex items-center relative overflow-hidden border border-white/5 mt-1">
                                    <span className="absolute left-1 text-[8px] text-gray-600 font-mono z-10">A1</span>
                                    <div className="absolute left-[10%] w-[75%] h-[80%] bg-green-900/40 border border-green-500/30 rounded-sm flex items-center px-2 overflow-hidden">
                                        {/* Fake Waveform */}
                                        <div className="flex items-center gap-[1px] h-full w-full opacity-50">
                                            {Array.from({ length: 40 }).map((_, i) => (
                                                <div key={i} className="w-[2px] bg-green-400" style={{ height: `${Math.random() * 80 + 20}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements (Dev Aspect) */}
                        <motion.div
                            className="absolute top-12 right-8 text-5xl text-cyan-400/10 font-bold font-mono rotate-12 z-0"
                            animate={{ y: [0, -15, 0], rotate: [12, 18, 12] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            &lt;/&gt;
                        </motion.div>
                        <motion.div
                            className="absolute top-24 left-8 text-6xl text-purple-400/10 font-bold -rotate-12 z-0"
                            animate={{ scale: [1, 1.1, 1], rotate: [-12, -6, -12] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        >
                            &#123; &#125;
                        </motion.div>

                        {/* Central Glow Effect */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl z-0"
                            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            <div className="relative group-hover:scale-105 transition-transform duration-500">
                                <h3 className="relative text-5xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] tracking-tight">
                                    Editor & Dev
                                </h3>
                            </div>
                            <div className="relative bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <p className="text-cyan-300 font-mono text-sm tracking-wide">
                                    Crafting Digital Stories
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Text Content - Enhanced Typography */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 text-gray-300 text-lg leading-relaxed"
                >
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors">
                        <p>
                            I am a **Frontend Developer** with a unique background in content editing. Currently, I specialize in building complex mobile applications using **React Native** and **JavaScript**.
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors">
                        <p>
                            My latest venture, **The Graveyard**, is a unique marketplace for unfinished code. It demonstrates my full-stack expertise with **Next.js 15**, **Supabase**, and bank-grade security implementations like RLS and edge-verified payments.
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors">
                        <p>
                            I also created **Love Connect**, a relationship management app that proves my mobile development skills with **React Native**, focusing on biometric security and offline-first architectures.
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors">
                        <p>
                            Beyond code, my 7 years as an **Editor** have honed my attention to detail—an essential skill for pixel-perfect UI implementation. I hold a degree from **Vidyalankar Institute of Technology** and am always learning.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
