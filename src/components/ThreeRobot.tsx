import { useRef, useState, useEffect, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const Robot = ({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) => {
    const group = useRef<THREE.Group>(null);
    const bodyGroup = useRef<THREE.Group>(null);
    const leftShoulder = useRef<THREE.Group>(null);
    const leftForearm = useRef<THREE.Group>(null);
    const rightShoulder = useRef<THREE.Group>(null);
    const rightForearm = useRef<THREE.Group>(null);
    const head = useRef<THREE.Group>(null);

    const [mode, setMode] = useState('GREETING');

    // Helper function to reset arm positions (Must be defined before useFrame)
    const resetArms = (
        lS: MutableRefObject<THREE.Group | null>,
        lF: MutableRefObject<THREE.Group | null>,
        rS: MutableRefObject<THREE.Group | null>,
        rF: MutableRefObject<THREE.Group | null>
    ) => {
        if (lS.current) {
            lS.current.rotation.z = THREE.MathUtils.lerp(lS.current.rotation.z, 0.3, 0.1);
            lS.current.rotation.x = THREE.MathUtils.lerp(lS.current.rotation.x, 0, 0.1);
        }
        if (lF.current) lF.current.rotation.z = THREE.MathUtils.lerp(lF.current.rotation.z, 0, 0.1);

        if (rS.current) rS.current.rotation.z = THREE.MathUtils.lerp(rS.current.rotation.z, -0.3, 0.1);
        if (rS.current) rS.current.rotation.x = THREE.MathUtils.lerp(rS.current.rotation.x, 0, 0.1);
        if (rF.current) rF.current.rotation.z = THREE.MathUtils.lerp(rF.current.rotation.z, 0, 0.1);
    };

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const cycleMode = () => {
            const modes = ['IDLE', 'ORBIT', 'DANCE', 'IDLE'];
            const nextMode = modes[Math.floor(Math.random() * modes.length)];
            setMode(nextMode);

            const duration = nextMode === 'IDLE' ? 5000 : 4000;
            timeout = setTimeout(cycleMode, duration);
        };

        timeout = setTimeout(() => {
            cycleMode();
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Approximate threshold due to camera zoom
    const scale = isMobile ? 0.6 : 1;
    const positionY = isMobile ? -1.5 : -0.2; // Move down on mobile

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // --- HEAD TRACKING (Follows Cursor) ---
        if (head.current) {
            const targetHeadY = mouse.current.x * 0.5;
            const targetHeadX = -mouse.current.y * 0.5;

            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, targetHeadY, 0.1);
            head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, targetHeadX, 0.1);
        }

        if (group.current) {
            const targetBodyY = mouse.current.x * 0.1;
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetBodyY, 0.05);
        }

        // --- ANIMATION MODES ---

        // 1. GREETING
        if (mode === 'GREETING') {
            if (leftShoulder.current) {
                leftShoulder.current.rotation.z = THREE.MathUtils.lerp(leftShoulder.current.rotation.z, 2.8, 0.05);
                leftShoulder.current.rotation.x = THREE.MathUtils.lerp(leftShoulder.current.rotation.x, 0.5, 0.05);
            }
            if (leftForearm.current) {
                leftForearm.current.rotation.z = Math.sin(t * 10) * 0.3 - 0.2;
            }
        }

        // 2. ORBIT
        else if (mode === 'ORBIT') {
            resetArms(leftShoulder, leftForearm, rightShoulder, rightForearm);

            if (bodyGroup.current) {
                bodyGroup.current.position.x = Math.sin(t * 2) * 2;
                bodyGroup.current.position.z = Math.cos(t * 2) * 1;
                bodyGroup.current.rotation.y = 0;
            }
        }

        // 3. DANCE
        else if (mode === 'DANCE') {
            if (bodyGroup.current) {
                bodyGroup.current.position.y = Math.sin(t * 10) * 0.2;
            }

            if (leftShoulder.current && rightShoulder.current) {
                leftShoulder.current.rotation.z = 2 + Math.sin(t * 8) * 0.5;
                leftShoulder.current.rotation.x = 0.5;

                rightShoulder.current.rotation.z = -2 - Math.sin(t * 8) * 0.5;
                rightShoulder.current.rotation.x = -0.5;
            }
        }

        // 4. IDLE
        else {
            resetArms(leftShoulder, leftForearm, rightShoulder, rightForearm);

            if (bodyGroup.current) {
                bodyGroup.current.position.x = THREE.MathUtils.lerp(bodyGroup.current.position.x, 0, 0.05);
                bodyGroup.current.position.y = THREE.MathUtils.lerp(bodyGroup.current.position.y, 0, 0.05);
                bodyGroup.current.position.z = THREE.MathUtils.lerp(bodyGroup.current.position.z, 0, 0.05);
                bodyGroup.current.rotation.y = 0;
            }
        }
    });

    return (
        <group ref={bodyGroup} scale={[scale, scale, scale]} position={[0, positionY, 0]}>
            <group ref={group}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>

                    {/* === HEAD === */}
                    <group ref={head} position={[0, 1.4, 0]}>
                        <mesh castShadow receiveShadow>
                            <sphereGeometry args={[0.65, 64, 64]} />
                            <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.8} />
                        </mesh>
                        <mesh position={[0, 0.05, 0.52]}>
                            <boxGeometry args={[0.7, 0.35, 0.2]} />
                            <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
                        </mesh>
                        <mesh position={[-0.2, 0.1, 0.63]} rotation={[0, 0, 0.1]}>
                            <boxGeometry args={[0.18, 0.08, 0.05]} />
                            <meshBasicMaterial color="#06b6d4" />
                        </mesh>
                        <mesh position={[0.2, 0.1, 0.63]} rotation={[0, 0, -0.1]}>
                            <boxGeometry args={[0.18, 0.08, 0.05]} />
                            <meshBasicMaterial color="#06b6d4" />
                        </mesh>
                        <mesh position={[0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.15, 0.15, 0.1]} />
                            <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[-0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.15, 0.15, 0.1]} />
                            <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[0.4, 0.6, 0]} rotation={[0, 0, -0.2]}>
                            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                            <meshStandardMaterial color="#888" metalness={1} />
                        </mesh>

                        {mode === 'GREETING' && (
                            <Html position={[1.2, 0.8, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
                                <div className="bg-white/90 text-black px-4 py-2 rounded-2xl rounded-bl-none font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-bounce w-max">
                                    Hi! Welcome! 👋
                                </div>
                            </Html>
                        )}
                        {mode === 'DANCE' && (
                            <Html position={[0, 1.2, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
                                <div className="text-cyan-400 font-bold text-xl animate-pulse">
                                    ♪ ♫ ♪
                                </div>
                            </Html>
                        )}
                    </group>

                    {/* === BODY === */}
                    <group position={[0, -0.2, 0]}>
                        <mesh position={[0, 0.65, 0]}>
                            <cylinderGeometry args={[0.15, 0.2, 0.3]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.5, 0.35, 0.9, 16]} />
                            <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.8} />
                        </mesh>
                        <mesh position={[0, 0.3, 0.45]} rotation={[0, 0, Math.PI]}>
                            <circleGeometry args={[0.15, 3]} />
                            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={3} toneMapped={false} />
                        </mesh>
                        <mesh position={[0, -0.2, 0]}>
                            <sphereGeometry args={[0.3, 32, 32]} />
                            <meshStandardMaterial color="#111" />
                        </mesh>
                    </group>

                    {/* === LEFT ARM === */}
                    <group position={[-1.0, 0.5, 0]} ref={leftShoulder} rotation={[0, 0, 0.3]}>
                        <mesh>
                            <sphereGeometry args={[0.25]} />
                            <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, -0.5, 0]}>
                            <cylinderGeometry args={[0.12, 0.1, 0.8]} />
                            <meshStandardMaterial color="#1a1a2e" metalness={0.6} />
                        </mesh>
                        <group position={[0, -1, 0]} ref={leftForearm}>
                            <mesh>
                                <sphereGeometry args={[0.18]} />
                                <meshStandardMaterial color="#333" />
                            </mesh>
                            <mesh position={[0, -0.5, 0]}>
                                <cylinderGeometry args={[0.1, 0.15, 0.8]} />
                                <meshStandardMaterial color="#1a1a2e" metalness={0.6} />
                            </mesh>
                            <mesh position={[0, -1, 0]}>
                                <boxGeometry args={[0.2, 0.3, 0.1]} />
                                <meshStandardMaterial color="#555" />
                            </mesh>
                        </group>
                    </group>

                    {/* === RIGHT ARM === */}
                    <group position={[1.0, 0.5, 0]} ref={rightShoulder} rotation={[0, 0, -0.3]}>
                        <mesh>
                            <sphereGeometry args={[0.25]} />
                            <meshStandardMaterial color="#8b5cf6" metalness={0.8} />
                        </mesh>
                        <mesh position={[0, -0.5, 0]}>
                            <cylinderGeometry args={[0.12, 0.1, 0.8]} />
                            <meshStandardMaterial color="#1a1a2e" metalness={0.6} />
                        </mesh>
                        <group position={[0, -1, 0]} ref={rightForearm}>
                            <mesh>
                                <sphereGeometry args={[0.18]} />
                                <meshStandardMaterial color="#333" />
                            </mesh>
                            <mesh position={[0, -0.5, 0]}>
                                <cylinderGeometry args={[0.1, 0.15, 0.8]} />
                                <meshStandardMaterial color="#1a1a2e" metalness={0.6} />
                            </mesh>
                            <mesh position={[0, -1, 0]}>
                                <boxGeometry args={[0.2, 0.3, 0.1]} />
                                <meshStandardMaterial color="#555" />
                            </mesh>
                        </group>
                    </group>

                </Float>
            </group>
        </group>
    );
};

const ThreeRobot = () => {
    const mouse = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollY = window.scrollY;
            const threshold = window.innerHeight * 0.8;
            if (scrollY > threshold) {
                const opacity = Math.max(0, 1 - (scrollY - threshold) / 300);
                containerRef.current.style.opacity = opacity.toString();
                if (opacity <= 0) containerRef.current.style.visibility = 'hidden';
                else containerRef.current.style.visibility = 'visible';
            } else {
                containerRef.current.style.opacity = '1';
                containerRef.current.style.visibility = 'visible';
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-300">
            <Canvas shadows className="w-full h-full" camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.8} color="#ffffff" />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <pointLight position={[-5, 0, -5]} intensity={3} color="#8b5cf6" />
                <pointLight position={[5, 2, 5]} intensity={3} color="#06b6d4" />
                <Robot mouse={mouse} />
                <Environment preset="city" blur={0.6} />
            </Canvas>
        </div>
    );
};

export default ThreeRobot;
