import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../context/ThemeContext';

function GeometryCluster({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const cube1Ref = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  // Mouse coords normalized (-1 to 1)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Lerp mouse parallax
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.04);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.04);

    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.current.x * 0.35 + t * 0.04;
      groupRef.current.rotation.x = mouse.current.y * 0.25 + Math.sin(t * 0.06) * 0.1;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2;
      ring1Ref.current.rotation.y = t * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.15;
      ring2Ref.current.rotation.z = t * 0.25;
    }

    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.3;
      icoRef.current.rotation.z = t * 0.2;
      icoRef.current.position.y = Math.sin(t * 0.8) * 0.2;
    }

    if (cube1Ref.current) {
      cube1Ref.current.rotation.x = t * 0.25;
      cube1Ref.current.rotation.y = t * 0.35;
      cube1Ref.current.position.y = 1.4 + Math.sin(t + 1) * 0.15;
    }

    if (cube2Ref.current) {
      cube2Ref.current.rotation.x = -t * 0.2;
      cube2Ref.current.rotation.z = t * 0.3;
      cube2Ref.current.position.y = -1.5 + Math.cos(t + 2) * 0.15;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.4;
      octaRef.current.rotation.x = t * 0.25;
      octaRef.current.position.x = 2.4 + Math.sin(t * 0.7) * 0.2;
    }
  });

  const wireColor = isLight ? '#52525b' : '#a1a1aa';
  const faintColor = isLight ? '#71717a' : '#d4d4d8';

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Wireframe Icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial
          color={faintColor}
          wireframe
          transparent
          opacity={isLight ? 0.35 : 0.45}
        />
      </mesh>

      {/* Outer Torus Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={isLight ? 0.25 : 0.35}
        />
      </mesh>

      {/* Inner Torus Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={isLight ? 0.2 : 0.3}
        />
      </mesh>

      {/* Floating Satellite Cube 1 */}
      <mesh ref={cube1Ref} position={[-2.2, 1.4, -0.5]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={isLight ? 0.25 : 0.35}
        />
      </mesh>

      {/* Floating Satellite Cube 2 */}
      <mesh ref={cube2Ref} position={[2.0, -1.5, 0.5]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={isLight ? 0.25 : 0.35}
        />
      </mesh>

      {/* Floating Satellite Octahedron */}
      <mesh ref={octaRef} position={[2.4, 0.8, -0.8]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={isLight ? 0.25 : 0.35}
        />
      </mesh>
    </group>
  );
}

export default function HeroCluster() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance: Single active WebGL context rule
  // Pause rendering when Hero is scrolled out of view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pointer-events-none select-none overflow-hidden"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <GeometryCluster isLight={isLight} />
        </Canvas>
      )}
    </div>
  );
}
