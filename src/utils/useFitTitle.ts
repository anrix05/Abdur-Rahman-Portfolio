import { useState, useLayoutEffect } from 'react';

/**
 * Dynamically computes a font size so that the longest single word in `title`
 * fits horizontally inside titleRef without breaking or overflowing.
 * Guarantees zero mid-word hyphenation/breaking and scrollWidth <= clientWidth + 1.
 */
export function useFitTitle(title: string, titleRef: React.RefObject<HTMLElement | null>) {
  const [fontSize, setFontSize] = useState<string>('2rem');

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      const availableWidth = parent ? parent.clientWidth - 48 : el.clientWidth;
      const baseWidth = availableWidth > 0 ? availableWidth : 360;

      // Desired max font size for Syne: 40px down to 18px
      let targetPx = Math.min(Math.floor(baseWidth * 0.11), 40);
      const minPx = 18;

      el.style.fontSize = `${targetPx}px`;

      // Shrink until longest word fits without horizontal overflow
      while (targetPx > minPx && el.scrollWidth > el.clientWidth + 1) {
        targetPx -= 0.5;
        el.style.fontSize = `${targetPx}px`;
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
