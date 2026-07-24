import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import profilePic from '../assets/profile.png';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <section className={`relative min-h-[90vh] lg:min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 flex flex-col justify-between px-3 sm:px-6 lg:px-8 transition-colors duration-500 ${
            isLight ? 'bg-[#fafafa]' : 'bg-black'
        }`}>
            
            {/* Inner Framed Container */}
            <div className={`w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-14 relative overflow-hidden shadow-2xl min-h-[80vh] flex flex-col justify-between transition-colors duration-500 ${
                isLight 
                    ? 'bg-black text-white border border-zinc-800' 
                    : 'bg-white text-black'
            }`}>
                
                {/* Top Giant Expanded Headline (JUUN.J Style) */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`w-full text-center border-b pb-4 sm:pb-8 z-20 ${
                        isLight ? 'border-zinc-800' : 'border-black/10'
                    }`}
                >
                    <h1 className={`font-display font-extrabold text-2xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.06em] sm:tracking-[0.12em] md:tracking-[0.18em] uppercase leading-tight break-words ${
                        isLight ? 'text-white' : 'text-black'
                    }`}>
                        KNOW ABDUR.R
                    </h1>
                </motion.div>

                {/* Middle Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto py-6 sm:py-8 z-20">
                    
                    {/* Left Column Text / Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-4 flex flex-col justify-center space-y-4 sm:space-y-6 text-left"
                    >
                        <div className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest rounded-full w-fit ${
                            isLight ? 'bg-white text-black' : 'bg-black text-white'
                        }`}>
                            <span>FRONTEND & MOBILE DEV</span>
                        </div>

                        <h2 className={`font-display font-bold text-xl sm:text-2xl lg:text-3xl tracking-tight uppercase leading-tight ${
                            isLight ? 'text-white' : 'text-black'
                        }`}>
                            CRAFT BEYOND BORDERS
                        </h2>

                        <p className={`text-xs sm:text-sm lg:text-base leading-relaxed font-normal ${
                            isLight ? 'text-zinc-300' : 'text-zinc-600'
                        }`}>
                            Fueled by deep-rooted passion, Abdur Rahman's journey from Mumbai to global tech reflects his ambition to engineer seamless digital products. Specialized in <strong className={isLight ? 'text-white font-semibold' : 'text-black font-semibold'}>React Native</strong> and <strong className={isLight ? 'text-white font-semibold' : 'text-black font-semibold'}>Next.js</strong>.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                            <a 
                                href="#projects" 
                                className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 font-semibold text-[11px] sm:text-xs font-mono uppercase tracking-wider rounded-full transition-all shadow-md group ${
                                    isLight 
                                        ? 'bg-white text-black hover:bg-zinc-200' 
                                        : 'bg-black text-white hover:bg-zinc-800'
                                }`}
                            >
                                <span>VIEW WORKS</span>
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            <a 
                                href="#contact" 
                                className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 border font-semibold text-[11px] sm:text-xs font-mono uppercase tracking-wider rounded-full transition-all ${
                                    isLight 
                                        ? 'border-white text-white hover:bg-white hover:text-black' 
                                        : 'border-black text-black hover:bg-black hover:text-white'
                                }`}
                            >
                                <span>CONTACT</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Center Column: High Contrast Editorial Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="lg:col-span-5 flex justify-center items-center relative py-4 lg:py-0"
                    >
                        <div className={`relative w-56 sm:w-72 lg:w-80 xl:w-96 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border group ${
                            isLight ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-black/10'
                        }`}>
                            <img
                                src={profilePic}
                                alt="Abdur Rahman"
                                className="w-full h-full object-cover bw-image group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            
                            {/* Inner Watermark Tag */}
                            <div className={`absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 backdrop-blur-md rounded-xl flex items-center justify-between text-[11px] sm:text-xs font-mono ${
                                isLight ? 'bg-white/90 text-black' : 'bg-black/80 text-white'
                            }`}>
                                <span className="font-bold">ABDUR RAHMAN</span>
                                <span className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>VIT '28</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Key Metrics & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={`lg:col-span-3 flex flex-col justify-center space-y-4 sm:space-y-6 border-t lg:border-t-0 lg:border-l pt-4 sm:pt-6 lg:pt-0 lg:pl-8 ${
                            isLight ? 'border-zinc-800' : 'border-black/10'
                        }`}
                    >
                        <div>
                            <span className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                                isLight ? 'text-white' : 'text-black'
                            }`}>07+</span>
                            <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1 ${
                                isLight ? 'text-zinc-400' : 'text-zinc-500'
                            }`}>Years Content & Editing</p>
                        </div>

                        <div>
                            <span className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                                isLight ? 'text-white' : 'text-black'
                            }`}>03</span>
                            <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1 ${
                                isLight ? 'text-zinc-400' : 'text-zinc-500'
                            }`}>Flagship Apps (ZeroBlur, Love Connect, Graveyard)</p>
                        </div>

                        <div>
                            <span className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                                isLight ? 'text-white' : 'text-black'
                            }`}>100%</span>
                            <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1 ${
                                isLight ? 'text-zinc-400' : 'text-zinc-500'
                            }`}>Data Security & Reliability</p>
                        </div>
                    </motion.div>

                </div>

                {/* Bottom Ticker / Descriptor */}
                <div className={`border-t pt-3 sm:pt-4 flex flex-wrap items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-widest z-20 gap-2 ${
                    isLight ? 'border-zinc-800 text-zinc-400' : 'border-black/10 text-zinc-500'
                }`}>
                    <span>BASED IN MUMBAI, INDIA</span>
                    <span className="hidden md:inline">•</span>
                    <span>REACT NATIVE • NEXT.JS • TYPESCRIPT</span>
                    <span className="hidden md:inline">•</span>
                    <span>AVAILABLE FOR ROLES</span>
                </div>

            </div>

        </section>
    );
};

export default Hero;
