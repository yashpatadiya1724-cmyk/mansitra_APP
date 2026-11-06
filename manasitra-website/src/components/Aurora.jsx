"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Aurora({ 
  colorStops = ["#7cff67","#B497CF","#5227FF"], 
  amplitude = 1, 
  blend = 0.5 
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Parse colors
    const colors = colorStops.map(c => new THREE.Color(c));
    const c1 = colors[0] || new THREE.Color("#000000");
    const c2 = colors[1] || new THREE.Color("#000000");
    const c3 = colors[2] || new THREE.Color("#000000");

    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Shader material for Aurora effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height) },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uColor3: { value: c3 },
        uAmplitude: { value: amplitude },
        uBlend: { value: blend }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uAmplitude;
        uniform float uBlend;

        varying vec2 vUv;

        // Simple noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                             -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i); // Avoid truncation effects in permutation
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / uResolution.xy;
          
          float n = snoise(vec2(st.x * 2.0 - uTime * 0.1, st.y * 3.0 + uTime * 0.2)) * uAmplitude;
          float n2 = snoise(vec2(st.x * 1.5 + uTime * 0.15, st.y * 2.0 - uTime * 0.1)) * uAmplitude;
          
          float mix1 = smoothstep(0.0, 1.0, st.y + n * uBlend);
          float mix2 = smoothstep(0.0, 1.0, st.x + n2 * uBlend);

          vec3 color = mix(uColor1, uColor2, mix1);
          color = mix(color, uColor3, mix2);

          // Add some glow/aurora essence
          float alpha = smoothstep(0.0, 1.0, sin(st.y * 3.14159) * (0.5 + 0.5 * n));
          
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId;
    const startTime = Date.now();

    const animate = () => {
      material.uniforms.uTime.value = (Date.now() - startTime) * 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [colorStops, amplitude, blend]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
  );
}
