import React, { useRef } from 'react';
import type { Project } from '../../data/projects';
import { ProjectCardFrame } from './ProjectCardFrame';
import { TiltCard } from '../common/TiltCard';

interface CoverflowCarouselProps {
  projects: Project[];
  activeIndex: number;
  isLight: boolean;
  onSelectIndex: (index: number) => void;
  onOpenModal: (project: Project) => void;
}

export function CoverflowCarousel({
  projects,
  activeIndex,
  isLight,
  onSelectIndex,
  onOpenModal,
}: CoverflowCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDistance = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    dragDistance.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer capture not supported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current !== null) {
      dragDistance.current = e.clientX - dragStartX.current;
    }
  };

  const handlePointerUp = () => {
    if (dragStartX.current !== null) {
      const threshold = 40;
      if (dragDistance.current < -threshold && activeIndex < projects.length - 1) {
        onSelectIndex(activeIndex + 1);
      } else if (dragDistance.current > threshold && activeIndex > 0) {
        onSelectIndex(activeIndex - 1);
      }
    }
    dragStartX.current = null;
    dragDistance.current = 0;
  };

  return (
    <div
      ref={containerRef}
      data-cursor="CAROUSEL"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
      className="relative w-full h-[420px] sm:h-[460px] lg:h-[480px] overflow-hidden [perspective:1600px] select-none py-4 flex items-center justify-center"
    >
      {/* 3D Preserve Track */}
      <div className="w-full h-full relative [transform-style:preserve-3d] flex items-center justify-center">
        {projects.map((project, idx) => {
          const offset = idx - activeIndex;
          const isVisible = Math.abs(offset) <= 2;
          const isActive = offset === 0;

          if (!isVisible) {
            return (
              <div
                key={project.slug}
                aria-hidden="true"
                style={{
                  opacity: 0,
                  visibility: 'hidden',
                  pointerEvents: 'none',
                }}
                className="absolute inset-x-0 w-full max-w-[560px] h-[320px] sm:h-[380px] mx-auto"
              />
            );
          }

          // Exact Coverflow Transform Formulations
          const translateX = offset * 58; // percentage offset
          const translateZ = -Math.abs(offset) * 220; // depth behind
          const rotateY = offset * -35; // perspective tilt angle
          const scale = Math.max(0.72, 1 - Math.abs(offset) * 0.14);
          const opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.35);
          const zIndex = 30 - Math.abs(offset) * 5;

          const cardTransform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

          return (
            <div
              key={project.slug}
              onClick={(e) => {
                e.stopPropagation();
                if (isActive) {
                  onOpenModal(project);
                } else {
                  onSelectIndex(idx);
                }
              }}
              style={{
                transform: cardTransform,
                opacity,
                zIndex,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
                transformStyle: 'preserve-3d',
              }}
              className={`absolute w-[86vw] max-w-[560px] h-[320px] sm:h-[380px] cursor-pointer will-change-transform ${
                isActive ? 'cursor-pointer' : 'cursor-pointer'
              }`}
            >
              {/* Active card gets TiltCard hover effect and soft accent glow */}
              {isActive ? (
                <TiltCard
                  maxTilt={8}
                  style={{
                    boxShadow: `0 0 35px ${project.accentColor}33, 0 16px 36px rgba(0,0,0,0.45)`,
                  }}
                  className="w-full h-full rounded-2xl"
                >
                  <ProjectCardFrame
                    project={project}
                    isActive={true}
                    isLight={isLight}
                    onClick={() => onOpenModal(project)}
                  />
                </TiltCard>
              ) : (
                <div className="w-full h-full pointer-events-auto">
                  <ProjectCardFrame
                    project={project}
                    isActive={false}
                    isLight={isLight}
                    onClick={() => onSelectIndex(idx)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edge Gradient Mask hints to keep carousel visually framed */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#fafafa] dark:from-black to-transparent z-40" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#fafafa] dark:from-black to-transparent z-40" />
    </div>
  );
}

