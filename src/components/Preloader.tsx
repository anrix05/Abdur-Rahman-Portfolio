import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsFinished(true);
                        setTimeout(onComplete, 700);
                    }, 400);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 8) + 4;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
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
                            transition={{ duration: 0.8 }}
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
