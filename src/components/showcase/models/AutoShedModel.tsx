import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { Project } from '../../../data/projects';

interface AutoShedModelProps {
  project: Project;
  isActive: boolean;
  isLight: boolean;
  onClick?: () => void;
}

export function AutoShedModel({ project, isActive, isLight, onClick }: AutoShedModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const slidingRoofRef = useRef<THREE.Group>(null);
  const rainPointsRef = useRef<THREE.Points>(null);

  // Generate rain drop positions
  const rainCount = 180;
  const [rainPositions, rainSpeeds] = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    const spd = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 4.2;
      pos[i * 3 + 1] = Math.random() * 3.5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      spd[i] = Math.random() * 0.08 + 0.04;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle gentle yaw turn when active
    if (isActive) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.25 - 0.3;
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
    } else {
      groupRef.current.rotation.y = -0.3;
      groupRef.current.position.y = 0;
    }

    // Animate sliding canopy slats (automated closing when rain detected)
    if (slidingRoofRef.current) {
      // Periodic open/close slide cycle
      const slide = (Math.sin(t * 0.8) + 1) * 0.5; // 0 to 1
      slidingRoofRef.current.position.x = -1.2 + slide * 1.2;
    }

    // Animate falling rain particles
    if (rainPointsRef.current) {
      const positions = rainPointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= rainSpeeds[i];
        if (positions[i * 3 + 1] < -0.8) {
          positions[i * 3 + 1] = 3.5;
        }
      }
      rainPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const frameColor = isLight ? '#27272a' : '#18181b';
  const pillarColor = isLight ? '#3f3f46' : '#27272a';
  const glassRoofColor = '#38bdf8';
  const sensorColor = '#10b981';

  return (
    <group ref={groupRef} onClick={onClick} position={[0, -0.3, 0]}>
      {/* Base Ground Foundation Slab */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[3.6, 0.15, 3.0]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} metalness={0.7} />
      </mesh>

      {/* 4 Corner Support Structural Pillars */}
      {([
        [-1.6, 0.05, -1.3],
        [1.6, 0.05, -1.3],
        [-1.6, 0.05, 1.3],
        [1.6, 0.05, 1.3],
      ] as const).map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.07, 0.07, 2.2, 16]} />
          <meshStandardMaterial color={pillarColor} roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* Roof Perimeter Rail Frame */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[3.45, 0.1, 2.85]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} wireframe />
      </mesh>

      {/* Fixed Half-Roof Canopy */}
      <mesh position={[0.85, 1.2, 0]}>
        <boxGeometry args={[1.7, 0.06, 2.8]} />
        <meshStandardMaterial
          color={isLight ? '#71717a' : '#3f3f46'}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Motorized Sliding Roof Mechanism */}
      <group ref={slidingRoofRef} position={[-0.85, 1.25, 0]}>
        <mesh>
          <boxGeometry args={[1.75, 0.06, 2.76]} />
          <meshStandardMaterial
            color={glassRoofColor}
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        {/* Drive Rail Guides */}
        <mesh position={[0, -0.05, 1.36]}>
          <boxGeometry args={[1.8, 0.04, 0.05]} />
          <meshBasicMaterial color={project.accentColor} />
        </mesh>
        <mesh position={[0, -0.05, -1.36]}>
          <boxGeometry args={[1.8, 0.04, 0.05]} />
          <meshBasicMaterial color={project.accentColor} />
        </mesh>
      </group>

      {/* Rain Sensor PCB Unit on Pillar */}
      <mesh position={[1.65, 0.9, 1.1]}>
        <boxGeometry args={[0.08, 0.28, 0.2]} />
        <meshStandardMaterial color="#064e3b" roughness={0.4} />
      </mesh>
      {/* Sensor Gold Plated Traces */}
      <mesh position={[1.7, 0.9, 1.1]}>
        <planeGeometry args={[0.01, 0.16]} />
        <meshBasicMaterial color={sensorColor} />
      </mesh>

      {/* Rain Particles */}
      <points ref={rainPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[rainPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#38bdf8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Active Accent Beacon */}
      {isActive && (
        <mesh position={[1.65, 1.1, 1.1]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={project.accentColor} />
        </mesh>
      )}
    </group>
  );
}
