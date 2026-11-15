import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { Project } from '../../../data/projects';
import { useSafeTexture, useActiveVideoTexture } from '../useSafeTexture';

interface KioskModelProps {
  project: Project;
  isActive: boolean;
  isLight: boolean;
  onClick?: () => void;
}

export function KioskModel({ project, isActive, isLight, onClick }: KioskModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const heroTexture = useSafeTexture(project.assets.hero);
  const videoTexture = useActiveVideoTexture(project.assets.video, isActive);

  const displayTexture = (isActive && videoTexture) ? videoTexture : heroTexture;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isActive) {
      groupRef.current.position.y = Math.sin(t * 1.4) * 0.07;
      groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.05;
    } else {
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
    }
  });

  const screenWidth = 3.8;
  const screenHeight = 2.28; // 800x480 (5:3)
  const bezel = 0.15;
  const depth = 0.12;

  const metalColor = isLight ? '#27272a' : '#18181b';
  const standColor = isLight ? '#3f3f46' : '#27272a';

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Upper Display Enclosure */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[screenWidth + bezel * 2, screenHeight + bezel * 2, depth]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Screen Mesh */}
      <mesh position={[0, 0.4, depth / 2 + 0.005]}>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshBasicMaterial map={displayTexture} toneMapped={false} />
      </mesh>

      {/* Kiosk Bezel Badge "V-NOTICE DISPLAY" */}
      <mesh position={[0, 0.4 - screenHeight / 2 - 0.06, depth / 2 + 0.01]}>
        <planeGeometry args={[0.9, 0.06]} />
        <meshBasicMaterial color="#52525b" />
      </mesh>

      {/* Pedestal Neck Stand */}
      <mesh position={[0, -1.2, -0.05]} rotation={[0.05, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 1.8, 24]} />
        <meshStandardMaterial color={standColor} roughness={0.4} metalness={0.85} />
      </mesh>

      {/* Heavy Base Plate */}
      <mesh position={[0, -2.1, -0.05]}>
        <cylinderGeometry args={[0.95, 1.05, 0.1, 32]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Status LED on stand */}
      <mesh position={[0, -0.85, 0.1]}>
        <circleGeometry args={[0.03, 16]} />
        <meshBasicMaterial color={project.accentColor} />
      </mesh>

      {/* Subtle Frame Edge Highlight Glow when Active */}
      {isActive && (
        <lineSegments position={[0, 0.4, depth / 2 + 0.01]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(screenWidth + bezel * 2, screenHeight + bezel * 2)]} />
          <lineBasicMaterial color={project.accentColor} linewidth={1.5} transparent opacity={0.7} />
        </lineSegments>
      )}
    </group>
  );
}
