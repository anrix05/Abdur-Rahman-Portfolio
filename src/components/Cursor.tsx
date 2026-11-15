import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const checkIsDesktopPointer = (): boolean => {
  if (typeof window === 'undefined') return false;
  const isTouch =
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return !isTouch && !prefersReducedMotion;
};

export type CursorMode = 'DEFAULT' | 'HOVER' | 'VIEW' | 'DRAG';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [enabled] = useState<boolean>(checkIsDesktopPointer);
  const [cursorMode, setCursorMode] = useState<CursorMode>('DEFAULT');

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xCursorTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' });
    const yCursorTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' });
    const xFollowerTo = gsap.quickTo(follower, 'x', { duration: 0.28, ease: 'power3' });
    const yFollowerTo = gsap.quickTo(follower, 'y', { duration: 0.28, ease: 'power3' });

    const moveCursor = (e: MouseEvent) => {
      xCursorTo(e.clientX);
      yCursorTo(e.clientY);
      xFollowerTo(e.clientX);
      yFollowerTo(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewEl = target.closest('[data-cursor="VIEW"]');
      if (viewEl) {
        setCursorMode('VIEW');
        return;
      }

      const dragEl = target.closest('[data-cursor="DRAG"]');
      if (dragEl) {
        setCursorMode('DRAG');
        return;
      }

      const clickable = target.closest('a, button, [role="button"], input, textarea');
      if (clickable) {
        setCursorMode('HOVER');
        return;
      }

      setCursorMode('DEFAULT');
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [enabled]);

  // Animate follower based on cursorMode
  useEffect(() => {
    const follower = followerRef.current;
    const cursor = cursorRef.current;
    if (!follower || !cursor) return;

    if (cursorMode === 'VIEW' || cursorMode === 'DRAG') {
      gsap.to(follower, {
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(cursor, { opacity: 0, duration: 0.15 });
    } else if (cursorMode === 'HOVER') {
      gsap.to(follower, {
        width: 52,
        height: 52,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.2,
        ease: 'power2.out',
      });
      gsap.to(cursor, { opacity: 1, duration: 0.15 });
    } else {
      gsap.to(follower, {
        width: 44,
        height: 44,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(cursor, { opacity: 1, duration: 0.15 });
    }
  }, [cursorMode]);

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
        className="fixed top-0 left-0 w-11 h-11 border rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:flex items-center justify-center overflow-hidden transition-colors"
        aria-hidden="true"
      >
        {(cursorMode === 'VIEW' || cursorMode === 'DRAG') && (
          <span
            ref={textRef}
            className="text-[10px] font-mono font-extrabold tracking-widest text-black select-none pointer-events-none uppercase"
          >
            {cursorMode}
          </span>
        )}
      </div>
    </>
  );
};

export default Cursor;
