import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { Project } from '../../../data/projects';
import { useSafeTexture, useActiveVideoTexture } from '../useSafeTexture';

interface WebBrowserModelProps {
  project: Project;
  isActive: boolean;
  isLight: boolean;
  onClick?: () => void;
}

export function WebBrowserModel({ project, isActive, isLight, onClick }: WebBrowserModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const heroTexture = useSafeTexture(project.assets.hero);
  const videoTexture = useActiveVideoTexture(project.assets.video, isActive);

  const displayTexture = (isActive && videoTexture) ? videoTexture : heroTexture;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing float when active
    if (isActive) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.04;
    } else {
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
    }
  });

  const width = 4.2;
  const height = 2.625; // 16:10 aspect
  const barHeight = 0.22;
  const frameColor = isLight ? '#18181b' : '#09090b';
  const chromeColor = isLight ? '#27272a' : '#18181b';
  const addressColor = isLight ? '#3f3f46' : '#27272a';

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Outer Chassis */}
      <mesh position={[0, -barHeight / 2, -0.05]}>
        <boxGeometry args={[width + 0.12, height + barHeight + 0.12, 0.08]} />
        <meshStandardMaterial color={frameColor} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Chrome Top Bar */}
      <mesh position={[0, height / 2 + barHeight / 2, 0.01]}>
        <planeGeometry args={[width, barHeight]} />
        <meshStandardMaterial color={chromeColor} roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Browser Controls: 3 dots */}
      <mesh position={[-width / 2 + 0.2, height / 2 + barHeight / 2, 0.02]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-width / 2 + 0.32, height / 2 + barHeight / 2, 0.02]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>
      <mesh position={[-width / 2 + 0.44, height / 2 + barHeight / 2, 0.02]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* Fake Address Bar Pill */}
      <mesh position={[0.2, height / 2 + barHeight / 2, 0.02]}>
        <planeGeometry args={[width * 0.5, barHeight * 0.55]} />
        <meshStandardMaterial color={addressColor} roughness={0.5} />
      </mesh>

      {/* Screen Surface with Texture / Video */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={displayTexture} toneMapped={false} />
      </mesh>

      {/* Subtle Frame Edge Highlight Glow */}
      {isActive && (
        <lineSegments position={[0, 0, 0.02]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(width + 0.02, height + barHeight + 0.02)]} />
          <lineBasicMaterial color={project.accentColor} linewidth={1.5} transparent opacity={0.6} />
        </lineSegments>
      )}
    </group>
  );
}
