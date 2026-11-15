import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { Project } from '../../../data/projects';
import { useSafeTexture } from '../useSafeTexture';

interface PhoneModelProps {
  project: Project;
  isActive: boolean;
  isLight: boolean;
  onClick?: () => void;
}

export function PhoneModel({ project, isActive, isLight, onClick }: PhoneModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const heroTexture = useSafeTexture(project.assets.hero);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isActive) {
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.09;
      groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.08;
      groupRef.current.rotation.x = Math.cos(t * 0.7) * 0.03;
    } else {
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.x = 0;
    }
  });

  const width = 1.75;
  const height = 3.6;
  const depth = 0.12;
  const screenWidth = 1.62;
  const screenHeight = 3.42;

  const bodyColor = isLight ? '#1c1917' : '#0a0a0a';
  const edgeColor = isLight ? '#44403c' : '#262626';

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Phone Body (Rounded Box Chassis) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Side Band Trim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.02, height + 0.02, depth - 0.02]} />
        <meshStandardMaterial color={edgeColor} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Screen Surface */}
      <mesh position={[0, 0, depth / 2 + 0.005]}>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshBasicMaterial map={heroTexture} toneMapped={false} />
      </mesh>

      {/* Top Dynamic Island / Notch */}
      <mesh position={[0, screenHeight / 2 - 0.15, depth / 2 + 0.01]}>
        <boxGeometry args={[0.45, 0.08, 0.008]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Speaker ear slit */}
      <mesh position={[0, screenHeight / 2 - 0.06, depth / 2 + 0.01]}>
        <boxGeometry args={[0.2, 0.02, 0.005]} />
        <meshBasicMaterial color="#333333" />
      </mesh>

      {/* Side Volume Buttons */}
      <mesh position={[-width / 2 - 0.015, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.35, 0.04]} />
        <meshStandardMaterial color={edgeColor} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[-width / 2 - 0.015, 0.05, 0]}>
        <boxGeometry args={[0.02, 0.35, 0.04]} />
        <meshStandardMaterial color={edgeColor} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Side Power Button */}
      <mesh position={[width / 2 + 0.015, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.45, 0.04]} />
        <meshStandardMaterial color={edgeColor} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Subtle Accent Glow Ring when Active */}
      {isActive && (
        <lineSegments position={[0, 0, depth / 2 + 0.01]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
          <lineBasicMaterial color={project.accentColor} linewidth={1.5} transparent opacity={0.7} />
        </lineSegments>
      )}
    </group>
  );
}
