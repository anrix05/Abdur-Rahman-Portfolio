import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaSkull } from 'react-icons/fa';
import { ArrowUpRight, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../config/site';
import { scrollToSection } from '../utils/scroll';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const mobilePanelRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    // Scroll state tracking
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                setScrolled(window.scrollY > 20);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar, { passive: true });
            return () => window.removeEventListener('scroll', controlNavbar);
        }
    }, []);

    // Body scroll lock and Lenis stop/start when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
            lenis?.stop();
        } else {
            document.body.style.overflow = '';
            const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = '';
            const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
            lenis?.start();
        };
    }, [isOpen]);

    // Close on click outside
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

    // Close on Escape key and focus trap
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                toggleButtonRef.current?.focus();
                return;
            }

            if (e.key === 'Tab' && mobilePanelRef.current) {
                const focusables = mobilePanelRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (focusables.length === 0) return;

                const firstEl = focusables[0];
                const lastEl = focusables[focusables.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const navLinks = [
        { name: 'ABOUT', href: '#about' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'EXPERIENCE', href: '#experience' },
        { name: 'PROJECTS', href: '#projects' },
    ];

    const isLight = theme === 'light';

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        // Small timeout allows menu animation & body unfreeze before scrolling
        setTimeout(() => {
            scrollToSection(href);
        }, 50);
    };

    return (
        <header
            ref={menuRef}
            className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
            style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}
        >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between h-14 sm:h-16 px-3.5 sm:px-6 rounded-2xl transition-all duration-300 ${
                    scrolled 
                        ? isLight 
                            ? 'bg-white/95 text-zinc-950 border border-zinc-200 shadow-xl backdrop-blur-xl' 
                            : 'bg-black/95 text-white border border-zinc-800 shadow-2xl backdrop-blur-xl'
                        : isLight
                            ? 'bg-white/80 text-zinc-950 border border-zinc-200/80 backdrop-blur-md'
                            : 'bg-black/60 text-white border border-zinc-800/80 backdrop-blur-md'
                }`}>
                    {/* Brand Logo */}
                    <div 
                        className="flex items-center gap-2 cursor-pointer group shrink-0" 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <span className={`font-display font-black text-lg sm:text-xl tracking-[0.12em] sm:tracking-[0.15em] uppercase group-hover:opacity-80 transition-opacity ${
                            isLight ? 'text-zinc-950' : 'text-white'
                        }`}>
                            {SITE_CONFIG.shortName}
                        </span>
                    </div>

                    {/* Desktop Navigation Links (Visible on lg: >=1024px) */}
                    <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8" aria-label="Main Navigation">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-xs font-mono tracking-[0.2em] font-semibold transition-colors py-2 ${
                                    isLight 
                                        ? 'text-zinc-700 hover:text-zinc-950' 
                                        : 'text-zinc-300 hover:text-white'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA & Theme Toggle Button (Visible on lg: >=1024px) */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 min-h-[44px] rounded-full border text-[11px] font-mono font-semibold tracking-wider transition-all cursor-pointer ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800'
                            }`}
                            aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
                            title={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
                        >
                            {isLight ? <Sun size={13} className="text-amber-500" /> : <Moon size={13} className="text-zinc-300" />}
                            <span>{isLight ? 'LIGHT' : 'B/W'}</span>
                        </button>

                        {/* GitHub */}
                        <a 
                            href={SITE_CONFIG.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="GitHub Profile - Abdur Rahman"
                            title="GitHub Profile"
                            className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
                                isLight ? 'text-zinc-700 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            <FaGithub size={16} />
                        </a>

                        {/* LinkedIn */}
                        <a 
                            href={SITE_CONFIG.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="LinkedIn Profile - Abdur Rahman"
                            title="LinkedIn Profile"
                            className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
                                isLight ? 'text-zinc-700 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            <FaLinkedin size={16} />
                        </a>

                        {/* The Graveyard (Skull Icon) */}
                        <a 
                            href={SITE_CONFIG.graveyardUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="The Graveyard - Marketplace for Abandoned Side Projects"
                            title="The Graveyard - Side Projects Marketplace"
                            className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
                                isLight ? 'text-zinc-700 hover:text-zinc-950' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            <FaSkull size={16} />
                        </a>

                        {/* Resume Download Button */}
                        <a 
                            href={SITE_CONFIG.resumeUrl}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            download="Abdur_Rahman_Resume.pdf"
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[44px] rounded-full border text-[11px] font-mono font-semibold tracking-wider transition-all ${
                                isLight 
                                    ? 'border-zinc-300 text-zinc-800 hover:bg-zinc-100' 
                                    : 'border-zinc-700 text-zinc-200 hover:bg-zinc-900'
                            }`}
                            aria-label="Download Resume (PDF)"
                            title="Download Resume"
                        >
                            <Download size={12} />
                            <span>RESUME</span>
                        </a>
                        
                        {/* Contact Me CTA */}
                        <a 
                            href="#contact" 
                            onClick={(e) => handleNavClick(e, '#contact')}
                            className={`inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 min-h-[44px] rounded-full font-mono text-xs font-bold tracking-wider transition-colors uppercase ml-1 ${
                                isLight 
                                    ? 'bg-zinc-950 text-white hover:bg-zinc-800' 
                                    : 'bg-white text-black hover:bg-zinc-200'
                            }`}
                        >
                            <span>CONTACT ME</span>
                            <ArrowUpRight size={13} />
                        </a>
                    </div>

                    {/* Mobile Controls (Visible below lg: <1024px) */}
                    <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2.5 min-w-[44px] min-h-[44px] rounded-xl border flex items-center justify-center text-xs font-mono transition-colors cursor-pointer ${
                                isLight 
                                    ? 'bg-zinc-100 border-zinc-300 text-zinc-800' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                            }`}
                            aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
                            title={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
                        >
                            {isLight ? <Sun size={17} className="text-amber-500" /> : <Moon size={17} className="text-zinc-300" />}
                        </button>

                        {/* Hamburger / Close Button */}
                        <button
                            ref={toggleButtonRef}
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2.5 min-w-[44px] min-h-[44px] rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                                isLight 
                                    ? 'border-zinc-300 text-zinc-800 hover:bg-zinc-100' 
                                    : 'border-zinc-800 text-zinc-200 hover:bg-zinc-900'
                            }`}
                            aria-expanded={isOpen}
                            aria-controls="mobile-nav-menu"
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        >
                            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Sheet with 48px+ Tap Targets, Focus Trap, and Accessible Roles */}
            {isOpen && (
                <div 
                    id="mobile-nav-menu"
                    ref={mobilePanelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation Menu"
                    className="lg:hidden max-w-7xl mx-auto px-3 sm:px-6 mt-2"
                >
                    <div className={`border rounded-3xl p-5 sm:p-6 shadow-2xl space-y-2.5 backdrop-blur-2xl transition-all ${
                        isLight ? 'bg-white/98 border-zinc-200 text-zinc-950' : 'bg-black/98 border-zinc-800 text-white'
                    }`}>
                        {/* Navigation Section Links */}
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`flex items-center min-h-[48px] px-4 py-3 rounded-2xl font-mono text-xs sm:text-sm tracking-widest transition-colors uppercase font-semibold ${
                                        isLight 
                                            ? 'text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100' 
                                            : 'text-zinc-200 hover:text-white hover:bg-zinc-900'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className={`h-[1px] my-2 ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'}`} />

                        {/* Primary Mobile Action Buttons (Min 48px Height) */}
                        <div className="space-y-2 pt-1">
                            <a
                                href={SITE_CONFIG.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download="Abdur_Rahman_Resume.pdf"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-2xl font-mono text-xs font-bold tracking-widest uppercase border text-center transition-colors ${
                                    isLight 
                                        ? 'border-zinc-300 text-zinc-900 hover:bg-zinc-100' 
                                        : 'border-zinc-800 text-zinc-100 hover:bg-zinc-900'
                                }`}
                                aria-label="Download Resume (PDF)"
                            >
                                <Download size={14} />
                                <span>DOWNLOAD RESUME (PDF)</span>
                            </a>

                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className={`flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-2xl font-mono text-xs font-bold tracking-widest uppercase text-center transition-colors ${
                                    isLight ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
                                }`}
                            >
                                <span>CONTACT ME</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>

                        {/* Social Links Bar inside Mobile Menu with 48x48px Tap Targets */}
                        <div className={`flex items-center justify-around pt-3 border-t ${
                            isLight ? 'border-zinc-200' : 'border-zinc-800'
                        }`}>
                            <a 
                                href={SITE_CONFIG.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="GitHub Profile"
                                className={`p-3 min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors rounded-xl ${
                                    isLight ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                }`}
                            >
                                <FaGithub size={18} />
                            </a>
                            <a 
                                href={SITE_CONFIG.linkedinUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="LinkedIn Profile"
                                className={`p-3 min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors rounded-xl ${
                                    isLight ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                }`}
                            >
                                <FaLinkedin size={18} />
                            </a>
                            <a 
                                href={SITE_CONFIG.graveyardUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="The Graveyard - Side Projects Marketplace"
                                className={`p-3 min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors rounded-xl ${
                                    isLight ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                }`}
                            >
                                <FaSkull size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
