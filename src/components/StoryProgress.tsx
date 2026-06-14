import { useEffect, useState } from 'react';

const chapters = [
    { id: 'hero', label: 'Start' },
    { id: 'about', label: 'The Story' },
    { id: 'skills', label: 'The Arsenal' },
    { id: 'experience', label: 'The Journey' },
    { id: 'projects', label: 'The Works' },
    { id: 'contact', label: 'The Future' },
];

const StoryProgress = () => {
    const [activeChapter, setActiveChapter] = useState('hero');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-45% 0px -45% 0px', // detects when section is in the middle 10% of the viewport
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
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
            {chapters.map((chapter) => (
                <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    className="group flex items-center gap-4 flex-row-reverse"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeChapter === chapter.id
                            ? 'bg-white scale-125'
                            : 'bg-neutral-800 group-hover:bg-neutral-600'
                            }`}
                    />
                    <span
                        className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 -mr-2 group-hover:mr-0 ${activeChapter === chapter.id ? 'text-white opacity-100 mr-0' : 'text-neutral-500'
                            }`}
                    >
                        {chapter.label}
                    </span>
                </a>
            ))}

            {/* Connecting Line */}
            <div className="absolute right-[5px] top-0 bottom-0 w-[2px] bg-neutral-900 -z-10 rounded-full">
                <div
                    className="w-full bg-white transition-all duration-300"
                    style={{
                        height: `${(chapters.findIndex(c => c.id === activeChapter) / (chapters.length - 1)) * 100}%`
                    }}
                ></div>
            </div>
        </div>
    );
};

export default StoryProgress;
