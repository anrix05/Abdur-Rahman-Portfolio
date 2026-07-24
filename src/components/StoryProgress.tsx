import { useEffect, useState } from 'react';

const chapters = [
    { id: 'hero', label: 'OVERVIEW' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
];

const StoryProgress = () => {
    const [activeChapter, setActiveChapter] = useState('hero');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-45% 0px -45% 0px',
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

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5">
            {chapters.map((chapter) => (
                <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    className="group flex items-center gap-3 flex-row-reverse"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            activeChapter === chapter.id
                                ? 'bg-white scale-150 ring-4 ring-white/20'
                                : 'bg-zinc-800 group-hover:bg-zinc-500'
                        }`}
                    />
                    <span
                        className={`text-[10px] font-mono uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                            activeChapter === chapter.id ? 'text-white opacity-100 font-bold' : 'text-zinc-500'
                        }`}
                    >
                        {chapter.label}
                    </span>
                </a>
            ))}
        </div>
    );
};

export default StoryProgress;
