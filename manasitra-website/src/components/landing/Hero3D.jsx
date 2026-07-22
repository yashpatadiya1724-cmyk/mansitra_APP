"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetwork({ count = 300 }) {
  const points = useRef();

  // Deterministic positions based on index i to avoid hydration mismatch
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
      const r2 = Math.sin((i + 50) * 78.233) * 43758.5453;
      const r3 = Math.sin((i + 100) * 45.164) * 43758.5453;

      pos[i * 3] = ((r1 - Math.floor(r1)) - 0.5) * 12;
      pos[i * 3 + 1] = ((r2 - Math.floor(r2)) - 0.5) * 12;
      pos[i * 3 + 2] = ((r3 - Math.floor(r3)) - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.04;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#0d9488"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function BreathingOrb() {
  const orbRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Breathe scale: 1.00 -> 1.02 every 4 seconds
    const scale = 1.01 + Math.sin(time * (Math.PI * 2) / 4) * 0.02;
    if (orbRef.current) {
      orbRef.current.scale.set(scale, scale, scale);
      // Mouse interaction
      orbRef.current.rotation.y = state.mouse.x * 0.5;
      orbRef.current.rotation.x = -state.mouse.y * 0.5;
    }
  });

  return (
    <group>
      <Sphere ref={orbRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ccfbf1"
          emissive="#0d9488"
          emissiveIntensity={0.6}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          roughness={0.1}
          metalness={0.9}
          distort={0.35}
          speed={2}
        />
      </Sphere>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#5eead4" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0f766e" />
        <NeuralNetwork count={300} />
        <BreathingOrb />
      </Canvas>
    </div>
  );
}
