import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current;
    groupRef.current.rotation.y = t * 0.1 + mouseRef.current.x * 0.3 + scroll * 2;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 + mouseRef.current.y * 0.2 + scroll * 0.5;
    groupRef.current.position.y = -scroll * 2;
    groupRef.current.position.x = Math.sin(scroll * 1.5) * 1.5;
    const scale = Math.max(0.5, 1 - scroll * 0.3);
    groupRef.current.scale.setScalar(scale);
  });

  const handlePointerMove = (e: any) => {
    mouseRef.current.x = (e.point.x / 5);
    mouseRef.current.y = (e.point.y / 5);
  };

  return (
    <group ref={groupRef} onPointerMove={handlePointerMove}>
      {/* Central sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Inner solid sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#0d1025"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Orbiting rings */}
      <Float speed={1} rotationIntensity={1} floatIntensity={0.2}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      {/* Floating code symbols - small cubes */}
      {useMemo(() => {
        const cubes = [];
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 3 + Math.random() * 0.5;
          cubes.push(
            <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={0.5}>
              <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.5, Math.sin(angle) * 0.5]}>
                <boxGeometry args={[0.12, 0.12, 0.12]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#3b82f6' : '#06b6d4'}
                  emissive={i % 2 === 0 ? '#3b82f6' : '#06b6d4'}
                  emissiveIntensity={0.8}
                />
              </mesh>
            </Float>
          );
        }
        return cubes;
      }, [])}

      {/* Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={useMemo(() => {
              const arr = new Float32Array(300);
              for (let i = 0; i < 300; i++) {
                arr[i] = (Math.random() - 0.5) * 10;
              }
              return arr;
            }, [])}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#3b82f6" transparent opacity={0.6} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
