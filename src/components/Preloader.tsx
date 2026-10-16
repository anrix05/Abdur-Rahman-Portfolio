import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

const isReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Preloader = ({ onComplete }: PreloaderProps) => {
    const reduced = isReducedMotion();
    const [progress, setProgress] = useState(reduced ? 100 : 0);
    const [isFinished, setIsFinished] = useState(reduced);

    useEffect(() => {
        if (reduced) {
            onComplete();
            return;
        }

        const isMobileOrSlow = typeof window !== 'undefined' && (
            window.innerWidth < 768 ||
            window.matchMedia('(pointer: coarse)').matches ||
            (typeof navigator !== 'undefined' && (
                navigator.maxTouchPoints > 0 ||
                (Boolean(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4)
            ))
        );

        // Cap duration strictly: faster increment step on mobile / low concurrency devices
        const stepTime = isMobileOrSlow ? 18 : 28;
        const stepIncMin = isMobileOrSlow ? 14 : 7;
        const stepIncRand = isMobileOrSlow ? 12 : 9;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsFinished(true);
                    onComplete();
                    return 100;
                }
                return prev + Math.floor(Math.random() * stepIncRand) + stepIncMin;
            });
        }, stepTime);

        // Hard cap timeout: never block mobile interaction for longer than 1.2s
        const maxSafetyTimer = setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setIsFinished(true);
            onComplete();
        }, isMobileOrSlow ? 1200 : 1800);

        return () => {
            clearInterval(interval);
            clearTimeout(maxSafetyTimer);
        };
    }, [onComplete, reduced]);

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between p-4 sm:p-8 md:p-16 select-none pointer-events-auto overflow-hidden"
                >
                    {/* Top Bar */}
                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 uppercase">
                        <span>PORTFOLIO '26</span>
                        <span>MUMBAI, IN</span>
                    </div>

                    {/* Center Big Bold Typography - ABDUR RAHMAN */}
                    <div className="flex flex-col items-center justify-center space-y-4 my-auto w-full px-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-center w-full"
                        >
                            <h1 className="font-display font-extrabold text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.35em] uppercase text-white leading-tight break-words">
                                ABDUR RAHMAN
                            </h1>
                        </motion.div>

                        <div className="w-36 sm:w-64 h-[1px] bg-zinc-800 relative overflow-hidden mt-4 sm:mt-6">
                            <motion.div
                                className="h-full bg-white"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Bottom Status / Percentage */}
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">
                            DEVELOPER & EDITOR
                        </span>
                        <span className="font-mono text-xl sm:text-2xl font-bold tracking-tighter text-white">
                            {Math.min(progress, 100)}%
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
