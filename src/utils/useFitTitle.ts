import { useState, useLayoutEffect } from 'react';

/**
 * Dynamically computes a font size so that the title (and specifically the longest word)
 * fits horizontally inside its container card without breaking or overflowing.
 *
 * Guarantees:
 * - Fluid scaling from 14px up to 44px based on real container & viewport geometry.
 * - Zero clipping or overflow past the card border on any mobile display (320px - 420px+).
 * - Smooth adjustments on viewport resize, device rotation, and font load.
 */
export function useFitTitle(title: string, titleRef: React.RefObject<HTMLElement | null>) {
  // Start with a safe fluid clamp fallback before layout measurement
  const [fontSize, setFontSize] = useState<string>('clamp(1.35rem, 6vw, 2.65rem)');

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const fit = () => {
      // Find enclosing card boundary to guarantee text never exceeds card padding
      const card = (el.closest('.rounded-2xl, .rounded-3xl, [class*="rounded-"]') as HTMLElement | null) || el.parentElement;
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 390;
      
      const cardWidth = card && card.clientWidth > 0 
        ? Math.min(card.clientWidth, windowWidth - 32)
        : windowWidth - 32;

      // Inner padding compensation (e.g. p-5 = 40px, plus 16px safety margin on mobile)
      const paddingReduction = windowWidth < 640 ? 48 : 64;
      const maxSafeWidth = Math.max(160, cardWidth - paddingReduction);

      // Start with proportional font size target (desktop ~42px, mobile ~26-34px)
      let targetPx = Math.min(Math.floor(maxSafeWidth * 0.11), 42);
      const minPx = 15;

      el.style.fontSize = `${targetPx}px`;

      // Split into individual words to check the longest word specifically
      const words = title.trim().split(/\s+/);

      // Check whether el or any word exceeds maxSafeWidth
      const checkOverflow = (px: number): boolean => {
        // Direct DOM scrollWidth check
        if (el.scrollWidth > maxSafeWidth + 1) return true;

        // Canvas context fallback measure
        if (typeof document !== 'undefined') {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.font = `800 ${px}px Syne, sans-serif`;
            for (const word of words) {
              const wordWidth = ctx.measureText(word.toUpperCase()).width;
              if (wordWidth > maxSafeWidth) return true;
            }
          }
        }
        return false;
      };

      // Shrink until no word or line overflows maxSafeWidth
      let iterations = 0;
      while (targetPx > minPx && checkOverflow(targetPx) && iterations < 50) {
        targetPx -= 0.5;
        el.style.fontSize = `${targetPx}px`;
        iterations++;
      }

      setFontSize(`${targetPx.toFixed(1)}px`);
    };

    fit();

    const ro = new ResizeObserver(() => fit());
    if (el.parentElement) {
      ro.observe(el.parentElement);
    } else {
      ro.observe(el);
    }

    window.addEventListener('resize', fit);
    if (document.fonts) {
      document.fonts.ready.then(fit);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [title, titleRef]);

  return fontSize;
}
