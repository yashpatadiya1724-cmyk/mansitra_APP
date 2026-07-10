"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function FloatingLines({
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = 4,
  lineDistance = 33,
  bendRadius = 8,
  bendStrength = 5,
  interactive = true,
  parallax = true,
  animationSpeed = 0.9,
  gradientStart = "#e945f5",
  gradientMid = "#6f6f6f",
  gradientEnd = "#6a6a6a"
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const waves = [];
    
    // Convert hex to THREE.Color
    const cStart = new THREE.Color(gradientStart);
    const cMid = new THREE.Color(gradientMid);
    const cEnd = new THREE.Color(gradientEnd);

    // Create lines for each enabled wave
    const waveConfigs = {
      top: { yOffset: 30, amplitude: 10 * bendStrength, phase: 0 },
      middle: { yOffset: 0, amplitude: 15 * bendStrength, phase: 1 },
      bottom: { yOffset: -30, amplitude: 10 * bendStrength, phase: 2 }
    };

    enabledWaves.forEach(waveType => {
      const config = waveConfigs[waveType];
      if (!config) return;

      for (let i = 0; i < lineCount; i++) {
        const material = new THREE.LineBasicMaterial({
          color: (i % 2 === 0) ? cStart : (i % 3 === 0 ? cEnd : cMid),
          transparent: true,
          opacity: 0.6 - (i * 0.1)
        });

        const points = [];
        for (let x = -100; x <= 100; x += 2) {
          points.push(new THREE.Vector3(x, 0, 0));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        
        line.position.y = config.yOffset + (i * lineDistance * 0.1);
        line.position.z = -i * 5;
        
        scene.add(line);
        waves.push({ mesh: line, index: i, config });
      }
    });

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      if (!interactive || !mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationFrameId;
    let time = 0;

    const animate = () => {
      time += 0.01 * animationSpeed;

      if (parallax) {
        camera.position.x += (mouseX * 20 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 20 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
      }

      waves.forEach((wave) => {
        const positions = wave.mesh.geometry.attributes.position.array;
        
        for (let j = 0; j < positions.length; j += 3) {
          const x = positions[j];
          // y is j + 1
          const yWave = Math.sin(x * 0.05 / bendRadius + time + wave.config.phase) * wave.config.amplitude;
          const detailWave = Math.cos(x * 0.1 + time * 1.5) * (wave.index * 2);
          
          positions[j + 1] = yWave + detailWave;
        }
        
        wave.mesh.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [enabledWaves, lineCount, lineDistance, bendRadius, bendStrength, interactive, parallax, animationSpeed, gradientStart, gradientMid, gradientEnd]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', pointerEvents: interactive ? 'auto' : 'none' }} />
  );
}
