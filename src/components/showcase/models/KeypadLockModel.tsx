import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { Project } from '../../../data/projects';

interface KeypadLockModelProps {
  project: Project;
  isActive: boolean;
  isLight: boolean;
  onClick?: () => void;
}

export function KeypadLockModel({ project, isActive, isLight, onClick }: KeypadLockModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const buttonsGroupRef = useRef<THREE.Group>(null);
  const statusLedRef = useRef<THREE.Mesh>(null);

  // 4x4 keypad grid labels
  const keys = useMemo(() => [
    ['1', '2', '3', 'A'],
    ['4', '5', '6', 'B'],
    ['7', '8', '9', 'C'],
    ['*', '0', '#', 'D'],
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (isActive) {
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.15;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.07;
    } else {
      groupRef.current.rotation.y = 0;
      groupRef.current.position.y = 0;
    }

    // Animate sequential button press cycles
    if (buttonsGroupRef.current) {
      const activeKeyIndex = Math.floor((t * 2) % 16);
      buttonsGroupRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Mesh) {
          if (idx === activeKeyIndex && isActive) {
            child.position.z = 0.08; // Pressed inwards
            (child.material as THREE.MeshStandardMaterial).color.set(project.accentColor);
          } else {
            child.position.z = 0.13; // Rest position
            (child.material as THREE.MeshStandardMaterial).color.set(isLight ? '#27272a' : '#18181b');
          }
        }
      });
    }

    // Animate Status LED (cycles between red locked and green verified)
    if (statusLedRef.current) {
      const cycle = Math.floor(t % 4);
      const isUnlocked = cycle === 3 && isActive;
      (statusLedRef.current.material as THREE.MeshBasicMaterial).color.set(isUnlocked ? '#22c55e' : '#ef4444');
    }
  });

  const width = 2.4;
  const height = 3.6;
  const depth = 0.26;

  const chassisColor = isLight ? '#27272a' : '#121214';
  const faceplateColor = isLight ? '#18181b' : '#09090b';

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Heavy Machined Aluminum Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={chassisColor} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Recessed Keypad Faceplate */}
      <mesh position={[0, -0.2, depth / 2 + 0.005]}>
        <planeGeometry args={[width - 0.2, height - 1.1]} />
        <meshStandardMaterial color={faceplateColor} roughness={0.5} />
      </mesh>

      {/* Top LCD Display Screen */}
      <mesh position={[0, 1.15, depth / 2 + 0.01]}>
        <planeGeometry args={[1.9, 0.65]} />
        <meshStandardMaterial color="#042f2e" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Fake LCD Segments / Passcode dots */}
      <mesh position={[0, 1.15, depth / 2 + 0.02]}>
        <planeGeometry args={[1.2, 0.12]} />
        <meshBasicMaterial color="#2dd4bf" />
      </mesh>

      {/* Dual Status LED Indicator */}
      <mesh ref={statusLedRef} position={[0.78, 1.15, depth / 2 + 0.025]}>
        <circleGeometry args={[0.07, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* 4x4 Matrix Keypad Buttons */}
      <group ref={buttonsGroupRef} position={[0, -0.2, depth / 2]}>
        {keys.flatMap((row, r) =>
          row.map((_, c) => {
            const x = (c - 1.5) * 0.44;
            const y = (1.5 - r) * 0.44;
            return (
              <mesh key={`${r}-${c}`} position={[x, y, 0.13]}>
                <boxGeometry args={[0.34, 0.34, 0.08]} />
                <meshStandardMaterial
                  color={isLight ? '#27272a' : '#18181b'}
                  roughness={0.3}
                  metalness={0.7}
                />
              </mesh>
            );
          })
        )}
      </group>

      {/* Chassis Screws at 4 corners */}
      {([
        [-width / 2 + 0.14, height / 2 - 0.14],
        [width / 2 - 0.14, height / 2 - 0.14],
        [-width / 2 + 0.14, -height / 2 + 0.14],
        [width / 2 - 0.14, -height / 2 + 0.14],
      ] as const).map(([x, y], i) => (
        <mesh key={i} position={[x, y, depth / 2 + 0.005]}>
          <circleGeometry args={[0.04, 12]} />
          <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Subtle Perimeter Accent Wireframe when Active */}
      {isActive && (
        <lineSegments position={[0, 0, depth / 2 + 0.01]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
          <lineBasicMaterial color={project.accentColor} linewidth={1.5} transparent opacity={0.7} />
        </lineSegments>
      )}
    </group>
  );
}
