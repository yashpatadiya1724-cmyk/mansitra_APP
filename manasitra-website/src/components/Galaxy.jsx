"use client";

import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

export default function Galaxy({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1,
  glowIntensity = 0.3,
  saturation = 0,
  hueShift = 140,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  starSpeed = 0.5,
  speed = 1
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    mountRef.current.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 5, 10);
    camera.lookAt([0, 0, 0]);

    const scene = new Transform();

    // Particle settings
    const particleCount = Math.floor(5000 * density);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    const color = new Float32Array([1.0, 1.0, 1.0]); 

    for (let i = 0; i < particleCount; i++) {
      // Spiral distribution
      const radius = Math.random() * 8 + 0.1;
      const angle = radius * 3 + Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 1.5;

      positions[i * 3 + 0] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5; // y
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread; // z

      sizes[i] = Math.random() * 0.5 + 0.1;
      phases[i] = Math.random() * Math.PI * 2;

      // Base color logic
      // Adding hueShift effect roughly by mixing colors
      const hue = (angle + hueShift * 0.01) % (Math.PI * 2);
      colors[i * 3 + 0] = 0.5 + Math.cos(hue) * 0.5;
      colors[i * 3 + 1] = 0.5 + Math.sin(hue) * 0.5;
      colors[i * 3 + 2] = 0.8 + Math.cos(hue + 1) * 0.2;
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      color: { size: 3, data: colors },
      size: { size: 1, data: sizes },
      phase: { size: 1, data: phases },
    });

    const vertex = `
      attribute vec3 position;
      attribute vec3 color;
      attribute float size;
      attribute float phase;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform vec3 uMouse;
      uniform float uRepulsion;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        
        vec3 pos = position;
        
        // Mouse repulsion
        float dist = distance(pos, uMouse);
        if (dist < uRepulsion) {
          vec3 dir = normalize(pos - uMouse);
          pos += dir * (uRepulsion - dist) * 0.5;
        }

        // Twinkle
        vAlpha = 0.5 + 0.5 * sin(phase + uTime * ${twinkleIntensity});

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / gl_Position.w);
      }
    `;

    const fragment = `
      precision highp float;
      varying vec3 vColor;
      varying float vAlpha;

      uniform float uGlow;

      void main() {
        // Create soft circle
        vec2 uv = gl_PointCoord.xy - vec2(0.5);
        float dist = length(uv);
        
        if (dist > 0.5) discard;
        
        float alpha = (0.5 - dist) * 2.0 * vAlpha * uGlow;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0, 0] },
        uRepulsion: { value: mouseRepulsion ? repulsionStrength : 0 },
        uGlow: { value: glowIntensity * 5.0 }
      },
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    particles.setParent(scene);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      if (!mouseInteraction) return;
      const rect = gl.canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      program.uniforms.uMouse.value = [mouseX * 10, mouseY * 10, 0];
    };
    
    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationFrameId;
    const startTime = Date.now();

    const update = () => {
      const time = (Date.now() - startTime) * 0.001 * speed;
      program.uniforms.uTime.value = time * starSpeed * 5.0;
      
      particles.rotation.y = time * rotationSpeed;
      particles.rotation.z = time * rotationSpeed * 0.2;

      renderer.render({ scene, camera });
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', handleResize);
    // Initial resize to fit container
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && gl.canvas) {
        mountRef.current.removeChild(gl.canvas);
      }
    };
  }, [
    mouseRepulsion, mouseInteraction, density, glowIntensity, 
    saturation, hueShift, twinkleIntensity, rotationSpeed, 
    repulsionStrength, autoCenterRepulsion, starSpeed, speed
  ]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', pointerEvents: mouseInteraction ? 'auto' : 'none' }} />
  );
}
