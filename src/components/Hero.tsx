import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import profileWebp from '../assets/profile.webp';
import profileSmWebp from '../assets/profile-sm.webp';
import { useTheme } from '../context/ThemeContext';
import { FEATURED_PROJECTS_COUNT, LIVE_DEPLOYMENTS_COUNT } from '../data/projects';
import { SITE_CONFIG } from '../config/site';
import { scrollToSection } from '../utils/scroll';
import { TiltCard } from './common/TiltCard';

// Lazy-load Three.js Hyperspeed background to split heavy 3D vendor bundle
const Hyperspeed = lazy(() => import('./Hyperspeed'));

const Hero = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const sectionRef = useRef<HTMLElement>(null);
    const heroCardRef = useRef<HTMLDivElement>(null);

    // Format metrics derived directly from project data
    const featuredFormatted = String(FEATURED_PROJECTS_COUNT).padStart(2, '0');
    const deploymentsFormatted = String(LIVE_DEPLOYMENTS_COUNT).padStart(2, '0');

    // Scroll-linked "fold away" effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const foldRotateX = useTransform(scrollYProgress, [0, 1], [0, 7]);
    const foldScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

    // Layered mouse parallax for first-fold elements (max ~12px)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };

    const pX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
    const pY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

    const headlineX = useTransform(pX, (v) => v * 0.35);
    const headlineY = useTransform(pY, (v) => v * 0.35);

    const roleX = useTransform(pX, (v) => v * 0.6);
    const roleY = useTransform(pY, (v) => v * 0.6);

    const valueX = useTransform(pX, (v) => v * 0.85);
    const valueY = useTransform(pY, (v) => v * 0.85);

    const bodyX = useTransform(pX, (v) => v * 0.5);
    const bodyY = useTransform(pY, (v) => v * 0.5);

    const ctaX = useTransform(pX, (v) => v * 1.15);
    const ctaY = useTransform(pY, (v) => v * 1.15);

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!heroCardRef.current) return;
        const rect = heroCardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handlePointerLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section 
            ref={sectionRef}
            className={`relative pt-18 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 transition-colors duration-500 scroll-mt-24 [perspective:1400px] ${
                isLight ? 'bg-[#fafafa]' : 'bg-black'
            }`}
        >
            {/* Inner Framed Container with 3D Fold-away and Mouse Parallax */}
            <motion.div 
                ref={heroCardRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={{
                    rotateX: foldRotateX,
                    scale: foldScale,
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                }}
                className={`w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-12 relative overflow-hidden shadow-2xl transition-colors duration-500 flex flex-col justify-between will-change-transform ${
                    isLight 
                        ? 'bg-black text-white border border-zinc-800' 
                        : 'bg-white text-black'
                }`}
            >
                
                {/* Ambient Hyperspeed Warp Background */}
                <div className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-20 z-0 overflow-hidden" aria-hidden="true">
                    <Suspense fallback={null}>
                        <Hyperspeed />
                    </Suspense>
                </div>

                {/* ========================================================
                    1. FIRST VIEWPORT FOLD
                    Fits headline, role, value prop, intro, & 3 CTAs above fold
                   ======================================================== */}
                <div className="flex flex-col justify-center min-h-[min(calc(100svh-5.5rem),800px)] py-3 sm:py-6 lg:py-8 z-10 [transform-style:preserve-3d]">
                    
                    {/* Top Giant Expanded Headline */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{ x: headlineX, y: headlineY, transform: 'translateZ(20px)' }}
                        className={`w-full text-center border-b pb-3 sm:pb-5 z-20 will-change-transform ${
                            isLight ? 'border-zinc-800' : 'border-black/10'
                        }`}
                    >
                        <h1 className={`font-display font-extrabold text-[clamp(1.85rem,min(6.2vw,7.5vh),6.5rem)] tracking-[0.03em] xs:tracking-[0.06em] sm:tracking-[0.14em] uppercase leading-[1.05] break-normal ${
                            isLight ? 'text-white' : 'text-black'
                        }`}>
                            KNOW ABDUR.R
                        </h1>
                    </motion.div>

                    {/* First-Fold Core Pitch & Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="flex flex-col items-center text-center max-w-3xl mx-auto my-auto py-3 sm:py-5 space-y-3 sm:space-y-4 lg:space-y-5 z-20 w-full [transform-style:preserve-3d]"
                    >
                        {/* Role Pill */}
                        <motion.div 
                            style={{ x: roleX, y: roleY, transform: 'translateZ(30px)' }}
                            className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest rounded-full font-bold shadow-sm ${
                                isLight ? 'bg-white text-black' : 'bg-black text-white'
                            }`}
                        >
                            <span>{SITE_CONFIG.role}</span>
                        </motion.div>

                        {/* One-Line Value Proposition */}
                        <motion.h2 
                            style={{ x: valueX, y: valueY, transform: 'translateZ(24px)' }}
                            className={`font-display font-extrabold text-lg sm:text-2xl md:text-3xl tracking-tight uppercase leading-tight flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-3.5 ${
                                isLight ? 'text-white' : 'text-black'
                            }`}
                        >
                            <span>CRAFT BEYOND BORDERS</span>
                            <span 
                                aria-hidden="true" 
                                className={`hidden md:inline-block w-1.5 h-1.5 rounded-full ${
                                    isLight ? 'bg-white' : 'bg-black'
                                }`} 
                            />
                            <span>REACT NATIVE & NEXT.JS</span>
                        </motion.h2>

                        {/* Concrete First-Person Intro Paragraph */}
                        <motion.p 
                            style={{ x: bodyX, y: bodyY, transform: 'translateZ(14px)' }}
                            className={`text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl ${
                                isLight ? 'text-zinc-300' : 'text-zinc-700'
                            }`}
                        >
                            I'm Abdur Rahman, a developer from Mumbai building mobile apps and full-stack web products. Recently I shipped <strong>NexaLink</strong> (an alumni platform for VIT, built for the Smart India Hackathon), <strong>The Graveyard</strong> (a marketplace for abandoned side projects), <strong>V Notice</strong> (digital notice boards for campus departments), and <strong>AttendAI</strong> (handwritten attendance sheets to Excel using vision AI).
                        </motion.p>

                        {/* Primary CTAs: View Works, Resume, Contact with Magnetic Pull & Pressed Depth */}
                        <motion.div 
                            style={{ x: ctaX, y: ctaY, transform: 'translateZ(35px)' }}
                            className="pt-1 sm:pt-2 grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto"
                        >
                            <a 
                                href="#projects" 
                                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 min-h-[48px] font-bold text-xs font-mono uppercase tracking-wider rounded-full transition-transform duration-150 cursor-pointer shadow-lg active:scale-95 active:translate-y-0.5 w-full sm:w-auto ${
                                    isLight 
                                        ? 'bg-white text-black hover:bg-zinc-200' 
                                        : 'bg-black text-white hover:bg-zinc-800'
                                }`}
                            >
                                <span>VIEW SELECTED WORKS</span>
                                <ArrowUpRight size={15} />
                            </a>

                            <a 
                                href="/resume.pdf" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 min-h-[48px] border font-bold text-xs font-mono uppercase tracking-wider rounded-full transition-transform duration-150 cursor-pointer active:scale-95 active:translate-y-0.5 w-full sm:w-auto ${
                                    isLight 
                                        ? 'border-white text-white hover:bg-white hover:text-black' 
                                        : 'border-black text-black hover:bg-black hover:text-white'
                                }`}
                                aria-label="Download Resume (PDF)"
                                title="Download Resume"
                            >
                                <Download size={13} />
                                <span>RESUME</span>
                            </a>

                            <a 
                                href="#contact" 
                                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 min-h-[48px] border font-bold text-xs font-mono uppercase tracking-wider rounded-full transition-transform duration-150 cursor-pointer active:scale-95 active:translate-y-0.5 w-full sm:w-auto ${
                                    isLight 
                                        ? 'border-white text-white hover:bg-white hover:text-black' 
                                        : 'border-black text-black hover:bg-black hover:text-white'
                                }`}
                            >
                                <span>CONTACT</span>
                            </a>
                        </motion.div>
                    </motion.div>

                </div>

                {/* ========================================================
                    2. LOWER HERO BLOCK: Portrait (TiltCard Depth) & Metrics
                    Single column on mobile, two columns from md: up
                   ======================================================== */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center pt-8 sm:pt-12 border-t z-20 w-full ${
                    isLight ? 'border-zinc-800' : 'border-black/10'
                }`}>
                    
                    {/* Left Column: High Contrast Editorial Portrait with 3D Depth Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full flex justify-center md:justify-start md:pr-8 lg:pr-12"
                    >
                        <TiltCard maxTilt={10} className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-sm rounded-2xl overflow-hidden shadow-2xl">
                            <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border group [transform-style:preserve-3d] ${
                                isLight ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-black/10'
                            }`}>
                                <picture className="w-full h-full block">
                                    <source
                                        type="image/webp"
                                        srcSet={`${profileSmWebp} 384w, ${profileWebp} 768w`}
                                        sizes="(max-width: 640px) 280px, 384px"
                                    />
                                    <img
                                        src={profileWebp}
                                        alt="Abdur Rahman - Full-Stack & Mobile Developer"
                                        width={384}
                                        height={512}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover bw-image group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </picture>
                                
                                {/* Inner Watermark Tag Floating on translateZ */}
                                <div 
                                    style={{ transform: 'translateZ(35px)' }}
                                    className={`absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 backdrop-blur-md rounded-xl flex items-center justify-between text-[11px] sm:text-xs font-mono shadow-lg transition-transform ${
                                        isLight ? 'bg-white/95 text-black' : 'bg-black/90 text-white'
                                    }`}
                                >
                                    <span className="font-bold">{SITE_CONFIG.name}</span>
                                    <span className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>{SITE_CONFIG.collegeYear}</span>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Right Column: Values Derived Dynamically from Projects Data with Thin Divider */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className={`w-full flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10 md:pl-8 lg:pl-12 md:border-l ${
                            isLight ? 'md:border-zinc-800' : 'md:border-black/10'
                        }`}
                    >
                        <div>
                            <span className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
                                isLight ? 'text-white' : 'text-black'
                            }`}>07+</span>
                            <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1.5 font-semibold ${
                                isLight ? 'text-zinc-400' : 'text-zinc-600'
                            }`}>YEARS CONTENT & EDITING</p>
                        </div>

                        <div>
                            <span className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
                                isLight ? 'text-white' : 'text-black'
                            }`}>{featuredFormatted}</span>
                            <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1.5 font-semibold ${
                                isLight ? 'text-zinc-400' : 'text-zinc-600'
                            }`}>FLAGSHIP PRODUCTS</p>
                        </div>

                        <div>
                            <span className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
                                isLight ? 'text-white' : 'text-black'
                            }`}>{deploymentsFormatted}</span>
                            <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1.5 font-semibold ${
                                isLight ? 'text-zinc-400' : 'text-zinc-600'
                            }`}>LIVE DEPLOYMENTS</p>
                        </div>
                    </motion.div>

                </div>

                {/* Bottom Ticker / Descriptor */}
                <div className={`border-t pt-4 sm:pt-6 mt-8 sm:mt-10 flex flex-wrap items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-widest z-20 gap-2 font-medium ${
                    isLight ? 'border-zinc-800 text-zinc-400' : 'border-black/10 text-zinc-600'
                }`}>
                    <span>BASED IN {SITE_CONFIG.location}</span>
                    <span className="hidden md:inline">•</span>
                    <span>REACT NATIVE • NEXT.JS • TYPESCRIPT</span>
                    <span className="hidden md:inline">•</span>
                    <span>AVAILABLE FOR HIGH-IMPACT ROLES</span>
                </div>

            </motion.div>

        </section>
    );
};

export default Hero;
