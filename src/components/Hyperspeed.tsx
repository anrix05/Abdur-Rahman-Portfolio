import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

/**
 * Hyperspeed Background Component
 * 
 * High-performance Three.js warp speed effect with mobile power-saving,
 * DPR clamp, visibility pausing, and reduced-motion support.
 */

export interface HyperspeedOptions {
  onSpeedUp?: () => void;
  onSlowDown?: () => void;
  distortion?: 'turbulentDistortion' | 'mountainDistortion' | 'xyDistortion' | 'LongRaceDistortion' | 'deepDistortion' | 'none';
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: [number, number];
  lightStickHeight?: [number, number];
  movingAwaySpeed?: [number, number];
  movingCloserSpeed?: [number, number];
  carLightsLength?: [number, number];
  carLightsRadius?: [number, number];
  carWidthPercentage?: [number, number];
  carShiftX?: [number, number];
  carFloorSeparation?: [number, number];
  colors?: {
    roadColor: number;
    islandColor: number;
    background: number;
    shoulderLines: number;
    brokenLines: number;
    leftCars: number[];
    rightCars: number[];
    sticks: number;
  };
}

export interface HyperspeedProps {
  effectOptions?: HyperspeedOptions;
  className?: string;
}

const DEFAULT_OPTIONS: HyperspeedOptions = {
  onSpeedUp: () => { },
  onSlowDown: () => { },
  distortion: 'turbulentDistortion',
  length: 350,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 85,
  fovSpeedUp: 120,
  speedUp: 1.8,
  carLightsFade: 0.4,
  colors: {
    roadColor: 0x000000,
    islandColor: 0x000000,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xffffff, 0xd4d4d8, 0xa1a1aa], // High contrast editorial mono
    rightCars: [0xffffff, 0xe4e4e7, 0x71717a],
    sticks: 0xffffff,
  }
};

export const Hyperspeed = forwardRef<HTMLDivElement, HyperspeedProps>(({ effectOptions, className }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => containerRef.current!);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const options = { ...DEFAULT_OPTIONS, ...effectOptions };
    const colors = { ...DEFAULT_OPTIONS.colors, ...effectOptions?.colors };
    
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = typeof window !== 'undefined' && (
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
    );
    const isLowPower = typeof navigator !== 'undefined' && (
      (Boolean(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4) ||
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true
    );

    // Three.js renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: 'low-power'
    });

    // DPR clamped to 1 on mobile or low-power devices to avoid GPU thermal throttling
    renderer.setPixelRatio(isMobile || isLowPower ? 1 : Math.min(window.devicePixelRatio, 1.5));
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(options.fov || 85, 1, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 6;

    const resize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / (height || 1);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Line particle count: strictly reduced on mobile / low-power devices
    const count = isMobile || isLowPower ? 160 : 380;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3 * 2);
    const lineColors = new Float32Array(count * 3 * 2);

    for (let i = 0; i < count; i++) {
      const z = Math.random() * options.length!;
      const r = options.roadWidth! + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;

      const idx = i * 6;
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = -z;
      
      positions[idx + 3] = x;
      positions[idx + 4] = y;
      positions[idx + 5] = -(z + 10 + Math.random() * 40);

      const colorSet = (i % 2 === 0 ? colors.leftCars : colors.rightCars) || [0xffffff];
      const chosenColor = new THREE.Color(colorSet[Math.floor(Math.random() * colorSet.length)]);
      
      lineColors[idx] = chosenColor.r;
      lineColors[idx + 1] = chosenColor.g;
      lineColors[idx + 2] = chosenColor.b;
      
      lineColors[idx + 3] = chosenColor.r;
      lineColors[idx + 4] = chosenColor.g;
      lineColors[idx + 5] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const material = new THREE.LineBasicMaterial({ 
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);

    const basePositions = positions.slice();

    // If user prefers reduced motion, render a single static frame and do not start animation loop
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('resize', resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    // Animation state
    let isVisible = true;
    let isTabActive = true;
    let animationId: number;
    let lastTime = 0;
    const fps = isMobile ? 30 : 60;
    const interval = 1000 / fps;

    // Pause when hero is scrolled out of viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Pause when browser tab is hidden
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const applyDistortion = (time: number) => {
      const pos = geometry.attributes.position.array as Float32Array;
      const speed = isMobile ? 2.5 : 4.0;
      const timeMs = time * 0.001;
      
      for (let i = 0; i < count; i++) {
        const idx = i * 6;
        const zIdx = idx + 2;
        const zIdxNext = idx + 5;
        
        pos[idx] = basePositions[idx];
        pos[idx + 1] = basePositions[idx + 1];
        pos[idx + 3] = basePositions[idx + 3];
        pos[idx + 4] = basePositions[idx + 4];

        pos[zIdx] += speed;
        pos[zIdxNext] += speed;

        if (pos[zIdx] > 40) {
          const newZ = options.length!;
          const length = 10 + Math.random() * 40;
          pos[zIdx] = -newZ;
          pos[zIdxNext] = -(newZ + length);
        }

        const offset = Math.sin(timeMs + pos[zIdx] * 0.01) * 0.015;
        pos[idx] += offset;
        pos[idx + 3] += offset;
      }
      geometry.attributes.position.needsUpdate = true;
    };

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) return;

      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      applyDistortion(time);
      renderer.render(scene, camera);
    };

    animate(0);

    // Mouse speedup ONLY on non-mobile desktop devices with a fine pointer
    const container = containerRef.current;
    const handleMouseDown = () => {
      if (isMobile) return;
      camera.fov = options.fovSpeedUp || 110;
      camera.updateProjectionMatrix();
    };

    const handleMouseUp = () => {
      if (isMobile) return;
      camera.fov = options.fov || 85;
      camera.updateProjectionMatrix();
    };

    if (!isMobile && container) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (!isMobile && container) {
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      }
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [effectOptions]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full overflow-hidden ${className || ''}`}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
});

export default Hyperspeed;
