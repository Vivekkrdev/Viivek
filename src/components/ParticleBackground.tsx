import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const count = 150;

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [positions, velocities];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positionArray[i3] += velocities[i3];
      positionArray[i3 + 1] += velocities[i3 + 1];
      positionArray[i3 + 2] += velocities[i3 + 2];

      const dx = positionArray[i3] - mouseRef.current.x * 5;
      const dy = positionArray[i3 + 1] - mouseRef.current.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        positionArray[i3] += dx * 0.01;
        positionArray[i3 + 1] += dy * 0.01;
      }

      if (positionArray[i3] > 10) positionArray[i3] = -10;
      if (positionArray[i3] < -10) positionArray[i3] = 10;
      if (positionArray[i3 + 1] > 10) positionArray[i3 + 1] = -10;
      if (positionArray[i3 + 1] < -10) positionArray[i3 + 1] = 10;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const particlePositions = useRef<Float32Array>(new Float32Array(150 * 3));

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(150 * 150 * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!lineRef.current) return;
    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;
    const maxDistance = 2;

    for (let i = 0; i < 150; i++) {
      for (let j = i + 1; j < 150; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = particlePositions.current[i3] - particlePositions.current[j3];
        const dy = particlePositions.current[i3 + 1] - particlePositions.current[j3 + 1];
        const dz = particlePositions.current[i3 + 2] - particlePositions.current[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance && lineIndex < positions.length - 6) {
          positions[lineIndex++] = particlePositions.current[i3];
          positions[lineIndex++] = particlePositions.current[i3 + 1];
          positions[lineIndex++] = particlePositions.current[i3 + 2];
          positions[lineIndex++] = particlePositions.current[j3];
          positions[lineIndex++] = particlePositions.current[j3 + 1];
          positions[lineIndex++] = particlePositions.current[j3 + 2];
        }
      }
    }

    for (let i = lineIndex; i < positions.length; i++) {
      positions[i] = 0;
    }

    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
