"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetwork({ count = 100 }) {
  const points = useRef();
  
  // Generate random positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
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
        size={0.05}
        color="#0f766e" // teal-700
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
    // Breathe scale: 1.00 -> 1.02 every 5 seconds
    // sin(time * PI * 2 / 5) goes from -1 to 1 every 5s
    const scale = 1.01 + Math.sin(time * (Math.PI * 2) / 5) * 0.01;
    if (orbRef.current) {
      orbRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={orbRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#ccfbf1" // teal-100
        emissive="#0d9488" // teal-600
        emissiveIntensity={0.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        roughness={0.2}
        metalness={0.8}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#5eead4" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#111827" />
        <NeuralNetwork count={150} />
        <BreathingOrb />
      </Canvas>
    </div>
  );
}
