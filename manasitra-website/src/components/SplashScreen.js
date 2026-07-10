"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashScreen({ onFinish }) {
  const loaderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // If the user presses escape, we can skip it.
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsVisible(false);
        if (onFinish) onFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFinish]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Reveal Waveform and text smoothly
      tl.to("#wave-svg", { opacity: 1, duration: 0.5, y: -10, ease: "power2.out" })
        .to("#brand-text", { opacity: 1, duration: 0.8, letterSpacing: "0.3em", ease: "power3.out" }, "-=0.3")
        .to("#tagline-text", { opacity: 1, duration: 0.6, y: 5, ease: "power2.out" }, "-=0.4");

      // 2. Add a strong energetic scale/glitch punch shift before transition
      tl.to("#brand-text", { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" });

      // 3. Exit animation - panel drops up/fades out beautifully
      tl.to(loaderRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.4,
        onComplete: () => {
          setIsVisible(false);
          if (onFinish) onFinish();
        }
      });
    }, loaderRef);

    return () => ctx.revert(); // cleanup gsap animations
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div 
      ref={loaderRef} 
      id="loader" 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F19] overflow-hidden"
    >
      {/* Glowing Fluid Background Particle Layer */}
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[#00F2FE] to-[#9B51E0] rounded-full blur-[120px] opacity-30 base-pulse"></div>
      
      {/* Content Wrapper */}
      <div className="relative z-10 text-center">
        {/* Animated SVG Soundwave/Graph Lines */}
        <svg id="wave-svg" className="w-48 h-16 mx-auto mb-4 opacity-0" viewBox="0 0 200 60">
          <path d="M10 30 Q 30 10, 50 30 T 90 30 T 130 30 T 170 30 T 190 30" fill="none" stroke="#00F2FE" strokeWidth="3" />
        </svg>
        
        {/* Brand Logo Text */}
        <h1 id="brand-text" className="text-4xl md:text-6xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F2FE] to-[#9B51E0] uppercase opacity-0">
          Manasitra
        </h1>
        <p id="tagline-text" className="text-xs tracking-[0.4em] text-gray-400 uppercase mt-2 opacity-0">
          Decoding Emotions
        </p>
      </div>

      {/* Skip Button */}
      <button 
        onClick={() => {
            setIsVisible(false);
            if (onFinish) onFinish();
        }}
        className="absolute top-6 right-6 z-[101] text-white/50 hover:text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all border border-white/10"
      >
        Skip Intro
      </button>
    </div>
  );
}
