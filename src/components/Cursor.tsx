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

export type CursorMode = 'DEFAULT' | 'HOVER' | 'STAGE';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState<boolean>(checkIsDesktopPointer);
  const [cursorMode, setCursorMode] = useState<CursorMode>('DEFAULT');

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xCursorTo = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3' });
    const yCursorTo = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3' });
    const xFollowerTo = gsap.quickTo(follower, 'x', { duration: 0.22, ease: 'power3' });
    const yFollowerTo = gsap.quickTo(follower, 'y', { duration: 0.22, ease: 'power3' });

    const moveCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isOverStage = target ? Boolean(target.closest('[data-cursor="STAGE"], [data-cursor="CAROUSEL"]')) : false;

      xCursorTo(e.clientX);
      yCursorTo(e.clientY);

      if (isOverStage) {
        // Offset small badge 18px to bottom-right of pointer so it NEVER covers content
        xFollowerTo(e.clientX + 22);
        yFollowerTo(e.clientY + 22);
        setCursorMode('STAGE');
        return;
      }

      // Normal centered follower
      xFollowerTo(e.clientX);
      yFollowerTo(e.clientY);

      const clickable = target ? Boolean(target.closest('a, button, [role="button"], input, textarea')) : false;
      if (clickable) {
        setCursorMode('HOVER');
        return;
      }

      setCursorMode('DEFAULT');
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [enabled]);

  useEffect(() => {
    const follower = followerRef.current;
    const cursor = cursorRef.current;
    if (!follower || !cursor) return;

    if (cursorMode === 'STAGE') {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.15 });
      gsap.to(follower, {
        width: 48,
        height: 22,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        opacity: 0.95,
        duration: 0.2,
        ease: 'power2.out',
      });
    } else if (cursorMode === 'HOVER') {
      gsap.to(cursor, { opacity: 1, scale: 1.2, duration: 0.15 });
      gsap.to(follower, {
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.45)',
        opacity: 1,
        duration: 0.18,
        ease: 'power2.out',
      });
    } else {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.15 });
      gsap.to(follower, {
        width: 36,
        height: 36,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.22)',
        opacity: 0.8,
        duration: 0.2,
        ease: 'power2.out',
      });
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
        className="fixed top-0 left-0 w-9 h-9 border rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {cursorMode === 'STAGE' && (
          <span className="text-[9px] font-mono font-extrabold tracking-widest text-black select-none pointer-events-none uppercase">
            DRAG
          </span>
        )}
      </div>
    </>
  );
};

export default Cursor;
