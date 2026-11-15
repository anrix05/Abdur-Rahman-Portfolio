import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Project } from '../../data/projects';
import { ProjectStage } from './ProjectStage';

interface ProjectCanvasProps {
  projects: Project[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenModal: (project: Project) => void;
  isLight: boolean;
}

interface SceneGroupProps {
  projects: Project[];
  activeIndex: number;
  onOpenModal: (project: Project) => void;
  isLight: boolean;
}

function SceneGroup({ projects, activeIndex, onOpenModal, isLight }: SceneGroupProps) {
  const currentOffset = useRef(activeIndex);
  const activeColor = projects[activeIndex]?.accentColor || '#10b981';

  useFrame((_, delta) => {
    // Smooth lerp toward target activeIndex
    const factor = Math.min(delta * 6.5, 1);
    currentOffset.current = THREE.MathUtils.lerp(currentOffset.current, activeIndex, factor);
  });

  return (
    <>
      {/* Neutral Studio Lighting */}
      <ambientLight intensity={isLight ? 0.7 : 0.45} />
      <directionalLight position={[5, 8, 6]} intensity={isLight ? 1.0 : 0.7} />
      <directionalLight position={[-6, -4, -4]} intensity={isLight ? 0.3 : 0.2} />

      {/* Low-intensity accent point light for active model */}
      <pointLight
        position={[0, -0.5, 2.5]}
        color={activeColor}
        intensity={isLight ? 0.9 : 1.3}
        distance={7}
        decay={2}
      />

      {/* 3D Arc of Projects */}
      {projects.map((project, idx) => (
        <StageWrapper
          key={project.slug}
          project={project}
          index={idx}
          currentOffset={currentOffset}
          isActive={idx === activeIndex}
          isLight={isLight}
          onOpenModal={onOpenModal}
        />
      ))}
    </>
  );
}

interface StageWrapperProps {
  project: Project;
  index: number;
  currentOffset: React.MutableRefObject<number>;
  isActive: boolean;
  isLight: boolean;
  onOpenModal: (project: Project) => void;
}

function StageWrapper({
  project,
  index,
  currentOffset,
  isActive,
  isLight,
  onOpenModal,
}: StageWrapperProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const diff = index - currentOffset.current;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

    // Curved parabolic gallery layout, offset right on desktop to leave room for editorial copy
    const x = diff * 5.2 + (isDesktop ? 1.5 : 0);
    const z = -Math.abs(diff) * 2.0;
    const rotY = -diff * 0.24;
    const scale = Math.max(0.65, 1 - Math.abs(diff) * 0.14);

    groupRef.current.position.set(x, 0, z);
    groupRef.current.rotation.set(0, rotY, 0);
    groupRef.current.scale.set(scale, scale, scale);

    // Fade or hide far-away stages
    groupRef.current.visible = Math.abs(diff) < 3.2;
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        if (isActive) {
          onOpenModal(project);
        }
      }}
    >
      <ProjectStage
        project={project}
        isActive={isActive}
        isLight={isLight}
        onClick={() => {
          if (isActive) onOpenModal(project);
        }}
      />
    </group>
  );
}

export default function ProjectCanvas({
  projects,
  activeIndex,
  onSelectIndex,
  onOpenModal,
  isLight,
}: ProjectCanvasProps) {
  const dragStartX = useRef<number | null>(null);
  const dragDistance = useRef(0);

  // Drag interaction to swipe between projects
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragDistance.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      dragDistance.current = e.clientX - dragStartX.current;
    }
  };

  const handlePointerUp = () => {
    if (dragStartX.current !== null) {
      const threshold = 55;
      if (dragDistance.current < -threshold && activeIndex < projects.length - 1) {
        onSelectIndex(activeIndex + 1);
      } else if (dragDistance.current > threshold && activeIndex > 0) {
        onSelectIndex(activeIndex - 1);
      }
    }
    dragStartX.current = null;
    dragDistance.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && activeIndex < projects.length - 1) {
        onSelectIndex(activeIndex + 1);
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        onSelectIndex(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, projects.length, onSelectIndex]);

  return (
    <div
      className="w-full h-full relative touch-pan-y cursor-grab active:cursor-grabbing select-none"
      data-cursor="DRAG"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="w-full h-full pointer-events-auto"
      >
        <SceneGroup
          projects={projects}
          activeIndex={activeIndex}
          onOpenModal={onOpenModal}
          isLight={isLight}
        />
      </Canvas>
    </div>
  );
}
