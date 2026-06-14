import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

/**
 * Hyperspeed Background Component
 * 
 * A high-performance Three.js based warp speed effect.
 * Features:
 * - Customizable distortions (turbulent, mountain, xy, LongRace, deep)
 * - Interactive speed-up/slow-down
 * - Multiple presets for color and geometry
 * - Responsive container filling
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
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x0c0c0c,
    islandColor: 0x0c0c0c,
    background: 0x0c0c0c,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xccff00, 0xaaff00, 0xccff00], // Neon Lime variations
    rightCars: [0x10b981, 0x059669, 0x34d399], // Emerald variations
    sticks: 0xccff00,
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
    
    // Internal state for animation
    const state = {
      speed: 1,
      targetSpeed: 1,
      fov: options.fov || 90,
      targetFov: options.fov || 90,
    };

    // Three.js setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(colors.background);

    const camera = new THREE.PerspectiveCamera(state.fov, 1, 0.1, 10000);
    camera.position.z = 10;
    camera.position.y = 7;

    const resize = () => {
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resize);
    resize();

    // Create Geometry & Materials
    const count = 800; // Reduced from 2000 for better performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3 * 2);
    const lineColors = new Float32Array(count * 3 * 2);

    for (let i = 0; i < count; i++) {
      const z = Math.random() * options.length!;
      const r = options.roadWidth! + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;

      const idx = i * 6;
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = -z;
      
      positions[idx + 3] = x;
      positions[idx + 4] = y;
      positions[idx + 5] = -(z + 10 + Math.random() * 50);

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
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);

    // Keep a copy of base positions to prevent distortion drift accumulation
    const basePositions = positions.slice();

    // Distortion logic
    const applyDistortion = (time: number) => {
      const pos = geometry.attributes.position.array as Float32Array;
      const speed5 = state.speed * 5;
      const timeMs = time * 0.001;
      
      for (let i = 0; i < count; i++) {
        const idx = i * 6;
        const zIdx = idx + 2;
        const zIdxNext = idx + 5;
        
        // Reset X and Y back to base positions before applying distortion
        pos[idx] = basePositions[idx];
        pos[idx + 1] = basePositions[idx + 1];
        pos[idx + 3] = basePositions[idx + 3];
        pos[idx + 4] = basePositions[idx + 4];

        // Moving lines
        pos[zIdx] += speed5;
        pos[zIdxNext] += speed5;

        // Reset if passed
        if (pos[zIdx] > 50) {
          const newZ = options.length!;
          const length = 10 + Math.random() * 50;
          pos[zIdx] = -newZ;
          pos[zIdxNext] = -(newZ + length);
        }

        // Apply distortion
        if (options.distortion === 'turbulentDistortion') {
          const offset = Math.sin(timeMs + pos[zIdx] * 0.01) * 0.02;
          pos[idx] += offset;
          pos[idx + 3] += offset;
        } else if (options.distortion === 'mountainDistortion') {
            const offset = Math.cos(pos[zIdx] * 0.005) * 0.05;
            pos[idx + 1] += offset;
            pos[idx + 4] += offset;
        }
      }
      geometry.attributes.position.needsUpdate = true;
    };

    // Animation Loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      // Speed interpolation
      state.speed += (state.targetSpeed - state.speed) * 0.05;
      state.fov += (state.targetFov - state.fov) * 0.05;
      
      camera.fov = state.fov;
      camera.updateProjectionMatrix();

      applyDistortion(time);
      
      renderer.render(scene, camera);
    };

    animate(0);

    // Interaction handlers - scoped to container for mousedown/touchstart
    const container = containerRef.current;

    const handleMouseDown = () => {
      state.targetSpeed = options.speedUp!;
      state.targetFov = options.fovSpeedUp!;
      options.onSpeedUp?.();
    };

    const handleMouseUp = () => {
      state.targetSpeed = 1;
      state.targetFov = options.fov!;
      options.onSlowDown?.();
    };

    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('touchstart', handleMouseDown);
    }
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('touchstart', handleMouseDown);
      }
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
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
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
    </div>
  );
});

export default Hyperspeed;
