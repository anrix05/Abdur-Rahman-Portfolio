import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/profile.png';

const Typewriter = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const timeout = setTimeout(() => setBlink(!blink), 500);
        return () => clearTimeout(timeout);
    }, [blink]);

    // Typing logic
    useEffect(() => {
        if (index >= words.length) {
            setIndex(0); // Loop back
            return;
        }

        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span className="font-mono text-purple-400">
            {words[index].substring(0, subIndex)}
            <span className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
        </span>
    );
};

const Hero = () => {
    return (
        <div className="relative flex flex-col h-screen w-full items-center justify-center z-20 overflow-hidden pt-20 md:pt-0">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-6 items-center w-full">

                {/* Text Content */}
                <div className="flex flex-col gap-5 justify-center text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-2 relative"
                    >
                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight">
                            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Abdur Rahman</span>
                        </h1>
                        <h2 className="text-xl md:text-4xl text-gray-300 font-light flex flex-col md:flex-row gap-2 items-center md:items-start justify-center md:justify-start">
                            <span>I am a</span>
                            <Typewriter words={['Frontend Developer', 'React Native Dev', 'Next.js Dev']} />
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed"
                    >
                        Building secure mobile apps that users actually love. Focused on <strong>React Native</strong> and <strong>Next.js</strong>. Creator of <strong>Love Connect</strong>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="flex gap-4 justify-center md:justify-start mt-4"
                    >
                        <a href="#projects" className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                            View Projects
                        </a>
                        <a href="#contact" className="px-8 py-3 rounded-full border border-purple-500/50 text-purple-200 hover:bg-purple-900/20 transition-all font-semibold backdrop-blur-sm">
                            Contact Me
                        </a>
                    </motion.div>
                </div>

                {/* Profile Image / Graphic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center items-center relative"
                >
                    {/* Rotating Rings */}
                    <div className="absolute w-[350px] h-[350px] border border-purple-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-[380px] h-[380px] border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                    {/* Image Container with Glow */}
                    <div className="w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-purple-500/50 shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-black/50 relative z-10">
                        {/* Placeholder until user uploads image */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-gray-500 italic">
                            Profile Photo
                        </div>
                        {/* Try to load real image if available */}
                        <img
                            src={profilePic}
                            alt="Abdur Rahman"
                            className="w-full h-full object-cover absolute inset-0 opacity-100"
                            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Hero;
