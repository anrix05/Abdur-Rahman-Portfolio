/**
 * Calculates the current responsive fixed navbar height + safe margin.
 * - Mobile (<640px): 68px (56px bar + 12px margin)
 * - Tablet (640px-1023px): 80px (64px bar + 16px margin)
 * - Desktop (>=1024px): 104px (80px bar + 24px margin)
 */
export const getResponsiveNavOffset = (): number => {
  if (typeof window === 'undefined') return 104;
  if (window.innerWidth < 640) return 68;
  if (window.innerWidth < 1024) return 80;
  return 104;
};

/**
 * Smooth scrolling utility that respects responsive fixed navbar offsets
 * and prefers-reduced-motion user accessibility preferences.
 */
export const scrollToSection = (id: string, explicitOffset?: number) => {
  if (typeof window === 'undefined') return;

  const offset = explicitOffset ?? getResponsiveNavOffset();
  const cleanId = id.replace(/^#/, '');
  const target = document.getElementById(cleanId);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If Lenis instance is available on window, delegate to Lenis
  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, options?: { offset?: number; immediate?: boolean }) => void } }).__lenis;
  if (lenis && !prefersReducedMotion) {
    lenis.scrollTo(target, { offset: -offset });
    return;
  }

  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
};
