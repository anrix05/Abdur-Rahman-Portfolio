import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../utils/scroll';

const chapters = [
    { id: 'hero', label: 'OVERVIEW' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
];

const StoryProgress = () => {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [activeChapter, setActiveChapter] = useState('hero');
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveChapter(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        chapters.forEach((chapter) => {
            const element = document.getElementById(chapter.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        scrollToSection(id);
    };

    return (
        <>
            {/* Mobile & Tablet Thin Top Scroll Progress Line (<xl: <1280px) */}
            <div 
                className="xl:hidden fixed top-0 inset-x-0 h-[2.5px] z-50 pointer-events-none"
                style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
                aria-hidden="true"
            >
                <div 
                    className={`h-full transition-all duration-150 ${
                        isLight ? 'bg-zinc-950' : 'bg-white'
                    }`}
                    style={{ width: `${scrollPercent}%` }}
                />
            </div>

            {/* Desktop Side Chapter Bar (xl+: >=1280px) */}
            <aside 
                className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5"
                aria-label="Section chapter navigation"
            >
                {chapters.map((chapter) => (
                    <a
                        key={chapter.id}
                        href={`#${chapter.id}`}
                        onClick={(e) => handleClick(e, chapter.id)}
                        className="group flex items-center gap-3 flex-row-reverse"
                        aria-label={`Jump to ${chapter.label} section`}
                    >
                        {/* Inactive dots maintain at least 3:1 WCAG contrast against background */}
                        <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                activeChapter === chapter.id
                                    ? isLight 
                                        ? 'bg-zinc-950 scale-150 ring-4 ring-zinc-950/20' 
                                        : 'bg-white scale-150 ring-4 ring-white/30'
                                    : isLight 
                                        ? 'bg-zinc-500 group-hover:bg-zinc-800' 
                                        : 'bg-zinc-600 group-hover:bg-zinc-400'
                            }`}
                        />
                        <span
                            className={`text-[10px] font-mono uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                                activeChapter === chapter.id 
                                    ? isLight 
                                        ? 'text-zinc-950 opacity-100 font-bold' 
                                        : 'text-white opacity-100 font-bold' 
                                    : isLight 
                                        ? 'text-zinc-700' 
                                        : 'text-zinc-400'
                            }`}
                        >
                            {chapter.label}
                        </span>
                    </a>
                ))}
            </aside>
        </>
    );
};

export default StoryProgress;
