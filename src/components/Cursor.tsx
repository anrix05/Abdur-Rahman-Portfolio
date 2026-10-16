import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const checkIsDesktopPointer = (): boolean => {
    if (typeof window === 'undefined') return false;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches ||
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !isTouch && !prefersReducedMotion;
};

const Cursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [enabled] = useState<boolean>(checkIsDesktopPointer);

    useEffect(() => {
        if (!enabled) return;
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

        window.addEventListener('mousemove', moveCursor, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [enabled]);

    // Do not render anything into DOM on touch or reduced motion devices
    if (!enabled) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
                aria-hidden="true"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
                aria-hidden="true"
            />
        </>
    );
};

export default Cursor;
