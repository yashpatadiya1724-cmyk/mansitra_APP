"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useEmotionTheme } from "@/context/ThemeContext";

function NeuralNetwork({ count = 300, isDark = false }) {
  const points = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
      const r2 = Math.sin((i + 50) * 78.233) * 43758.5453;
      const r3 = Math.sin((i + 100) * 45.164) * 43758.5453;

      const spread = isDark ? 14 : 12;
      pos[i * 3] = ((r1 - Math.floor(r1)) - 0.5) * spread;
      pos[i * 3 + 1] = ((r2 - Math.floor(r2)) - 0.5) * spread;
      pos[i * 3 + 2] = ((r3 - Math.floor(r3)) - 0.5) * spread;
    }
    return pos;
  }, [count, isDark]);

  useFrame((state) => {
    if (points.current) {
      const speed = isDark ? 0.06 : 0.03;
      points.current.rotation.y = state.clock.elapsedTime * speed;
      points.current.rotation.x = state.clock.elapsedTime * (speed * 0.5);
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
        size={isDark ? 0.06 : 0.04}
        color={isDark ? "#34d399" : "#0d9488"}
        transparent
        opacity={isDark ? 0.8 : 0.5}
        sizeAttenuation
      />
    </points>
  );
}

function BreathingOrb({ isDark = false }) {
  const orbRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const breathSpeed = isDark ? 3 : 4;
    const breathDepth = isDark ? 0.04 : 0.02;
    const scale = 1.01 + Math.sin(time * (Math.PI * 2) / breathSpeed) * breathDepth;
    if (orbRef.current) {
      orbRef.current.scale.set(scale, scale, scale);
      orbRef.current.rotation.y = state.mouse.x * (isDark ? 0.8 : 0.5);
      orbRef.current.rotation.x = -state.mouse.y * (isDark ? 0.8 : 0.5);
    }
  });

  return (
    <group>
      <Sphere ref={orbRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={isDark ? "#064e3b" : "#ccfbf1"}
          emissive={isDark ? "#10b981" : "#0d9488"}
          emissiveIntensity={isDark ? 1.2 : 0.6}
          envMapIntensity={isDark ? 2 : 1}
          clearcoat={1}
          clearcoatRoughness={isDark ? 0.05 : 0.1}
          roughness={isDark ? 0.05 : 0.1}
          metalness={isDark ? 0.95 : 0.9}
          distort={isDark ? 0.5 : 0.35}
          speed={isDark ? 3 : 2}
        />
      </Sphere>
    </group>
  );
}

export default function Hero3D() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${
      isDark ? "opacity-100" : "opacity-70"
    }`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Light theme: warm soft ambient. Dark theme: dramatic deep space lighting */}
        <ambientLight intensity={isDark ? 0.3 : 0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={isDark ? 1.8 : 1.2} 
          color={isDark ? "#34d399" : "#5eead4"} 
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={isDark ? 0.8 : 0.5} 
          color={isDark ? "#0284c7" : "#0f766e"} 
        />
        {/* Dark mode: add a blue rim light for depth */}
        {isDark && (
          <pointLight position={[0, -5, 3]} intensity={0.6} color="#6366f1" distance={15} />
        )}
        <NeuralNetwork count={isDark ? 500 : 300} isDark={isDark} />
        <BreathingOrb isDark={isDark} />
      </Canvas>
    </div>
  );
}
