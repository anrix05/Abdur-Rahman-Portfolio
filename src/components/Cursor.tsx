import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // Set initial positions and center offsets
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        // Use quickTo for high-performance mouse tracking
        const xCursorTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yCursorTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
        const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
        const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

        const moveCursor = (e: MouseEvent) => {
            xCursorTo(e.clientX);
            yCursorTo(e.clientY);
            xFollowerTo(e.clientX);
            yFollowerTo(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
            />
        </>
    );
};

export default Cursor;
