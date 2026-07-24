import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaSkull } from 'react-icons/fa';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                setScrolled(window.scrollY > 30);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => window.removeEventListener('scroll', controlNavbar);
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const navLinks = [
        { name: 'ABOUT', href: '#about' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'EXPERIENCE', href: '#experience' },
        { name: 'PROJECTS', href: '#projects' },
    ];

    const isLight = theme === 'light';

    return (
        <header
            ref={menuRef}
            className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className={`flex items-center justify-between h-16 px-6 rounded-2xl transition-all duration-300 ${
                    scrolled 
                        ? isLight 
                            ? 'bg-white/90 text-zinc-950 border border-zinc-200 shadow-xl backdrop-blur-xl' 
                            : 'bg-black/90 text-white border border-zinc-800 shadow-2xl backdrop-blur-xl'
                        : isLight
                            ? 'bg-white/60 text-zinc-950 border border-zinc-200/60 backdrop-blur-md'
                            : 'bg-black/40 text-white border border-zinc-800/60 backdrop-blur-md'
                }`}>
                    {/* Brand Logo */}
                    <div 
                        className="flex items-center gap-2 cursor-pointer group" 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <span className={`font-display font-black text-xl tracking-[0.15em] uppercase group-hover:opacity-80 transition-opacity ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>
                            ABDUR.R
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-xs font-mono tracking-[0.2em] font-semibold transition-colors ${
                                    isLight 
                                        ? 'text-zinc-600 hover:text-zinc-950' 
                                        : 'text-zinc-400 hover:text-white'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA & Theme Toggle Button */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono font-semibold tracking-wider transition-all cursor-pointer ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800'
                            }`}
                            title="Toggle Theme"
                        >
                            {isLight ? <Sun size={13} className="text-amber-500" /> : <Moon size={13} className="text-zinc-300" />}
                            <span>{isLight ? 'LIGHT' : 'B/W'}</span>
                        </button>

                        <a 
                            href="https://github.com/anrix05" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title="GitHub"
                            className={`p-2 transition-colors ${isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                        >
                            <FaGithub size={16} />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/abdur-rahman-vit/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title="LinkedIn"
                            className={`p-2 transition-colors ${isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                        >
                            <FaLinkedin size={16} />
                        </a>
                        <a 
                            href="https://graveyard.anrix.me" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title="The Graveyard"
                            className={`p-2 transition-colors ${isLight ? 'text-zinc-600 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                        >
                            <FaSkull size={16} />
                        </a>
                        
                        <a 
                            href="#contact" 
                            className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full font-mono text-xs font-bold tracking-wider transition-colors uppercase ml-1 ${
                                isLight 
                                    ? 'bg-zinc-950 text-white hover:bg-zinc-800' 
                                    : 'bg-white text-black hover:bg-zinc-200'
                            }`}
                        >
                            <span>CONTACT US</span>
                            <ArrowUpRight size={13} />
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-300 text-zinc-800' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                            }`}
                            aria-label="Toggle theme"
                        >
                            {isLight ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg focus:outline-none transition-colors ${
                                isLight ? 'text-zinc-800 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                            }`}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden max-w-7xl mx-auto px-4 mt-2">
                    <div className={`border rounded-2xl p-6 shadow-2xl space-y-3 backdrop-blur-xl ${
                        isLight ? 'bg-white border-zinc-200 text-zinc-950' : 'bg-black border-zinc-800 text-white'
                    }`}>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2.5 rounded-xl font-mono text-xs tracking-widest transition-colors uppercase ${
                                    isLight ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100' : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-widest uppercase text-center ${
                                isLight ? 'bg-zinc-950 text-white' : 'bg-white text-black'
                            }`}
                        >
                            CONTACT US →
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
