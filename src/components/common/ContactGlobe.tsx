import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';

function WireframeGlobeMesh({ isLight }: { isLight: boolean }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.15;
      globeRef.current.rotation.x = t * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.2;
      ringRef.current.rotation.x = t * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.25;
      innerRef.current.rotation.z = t * 0.15;
    }
  });

  const wireColor = isLight ? '#52525b' : '#a1a1aa';
  const faintColor = isLight ? '#71717a' : '#d4d4d8';

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Wireframe Sphere Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 18, 14]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={isLight ? 0.35 : 0.45}
        />
      </mesh>

      {/* Orbiting Equatorial Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.85, 0.015, 16, 48]} />
        <meshBasicMaterial
          color={faintColor}
          wireframe
          transparent
          opacity={isLight ? 0.25 : 0.35}
        />
      </mesh>

      {/* Inner Geometric Node */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial
          color={faintColor}
          wireframe
          transparent
          opacity={isLight ? 0.25 : 0.35}
        />
      </mesh>
    </group>
  );
}

export default function ContactGlobe() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Single active WebGL context rule: only mount/render when visible
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-44 sm:h-52 rounded-2xl border overflow-hidden relative flex items-center justify-center transition-colors pointer-events-none select-none"
      style={{
        backgroundColor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
        borderColor: isLight ? '#e4e4e7' : '#27272a',
      }}
    >
      {/* Coordinate Stamp Label */}
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest uppercase opacity-60">
        MUMBAI, IN · 19.0760° N, 72.8777° E
      </div>
      <div className="absolute bottom-3 right-3 text-[9px] font-mono tracking-widest uppercase opacity-50">
        GLOBAL REACH
      </div>

      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <WireframeGlobeMesh isLight={isLight} />
        </Canvas>
      )}
    </div>
  );
}
