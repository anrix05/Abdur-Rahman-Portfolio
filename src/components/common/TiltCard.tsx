import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
}

/**
 * TiltCard: Reusable CSS 3D depth card.
 * Features:
 * - perspective(1000px) with spring-smoothed rotation (8-10deg)
 * - transform-style: preserve-3d allowing child translateZ elements to float
 * - Dynamic radial glare layer following pointer
 * - Shadow shifting opposite to tilt angle
 * - Disabled automatically on touch devices or prefers-reduced-motion
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  style = {},
  onClick,
  id,
}: TiltCardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const cardRef = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const isHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(isHover && !isReduced);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  // Spring smoothing for rotation
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Dynamic shadow shifting opposite to tilt
  const shadowX = useTransform(rotateY, [-maxTilt, maxTilt], [12, -12]);
  const shadowY = useTransform(rotateX, [-maxTilt, maxTilt], [-12, 12]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) =>
      `${sx}px ${sy}px 28px -4px ${
        isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.45)'
      }`
  );

  // Glare position & dynamic background (called unconditionally at top level)
  const glareXPercent = useTransform(mouseX, [-0.5, 0.5], [10, 90]);
  const glareYPercent = useTransform(mouseY, [-0.5, 0.5], [10, 90]);
  const glareBackground = useTransform(
    [glareXPercent, glareYPercent],
    ([gx, gy]) =>
      `radial-gradient(circle 280px at ${gx}% ${gy}%, rgba(255,255,255,${
        isLight ? '0.6' : '0.22'
      }), transparent 80%)`
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    glareOpacity.set(isLight ? 0.35 : 0.22);
  };

  const handlePointerLeave = () => {
    if (!canTilt) return;
    mouseX.set(0);
    mouseY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onPointerMove={canTilt ? handlePointerMove : undefined}
      onPointerLeave={canTilt ? handlePointerLeave : undefined}
      style={{
        ...style,
        rotateX: canTilt ? rotateX : 0,
        rotateY: canTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
        boxShadow: canTilt ? boxShadow : undefined,
      }}
      className={`relative [perspective:1000px] will-change-transform ${className}`}
    >
      {/* Glare Overlay */}
      {glare && canTilt && (
        <motion.div
          aria-hidden="true"
          style={{
            opacity: glareOpacity,
            background: glareBackground,
          }}
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay transition-opacity duration-300"
        />
      )}

      {/* Card Content with preserved 3D child hierarchy */}
      <div className="w-full h-full [transform-style:preserve-3d]">
        {children}
      </div>
    </motion.div>
  );
}
