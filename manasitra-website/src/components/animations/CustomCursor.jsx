"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile touch pointer
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: cursorX.get(), y: cursorY.get() };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    document.body.style.cursor = 'none';
    const interactables = document.querySelectorAll('a, button, input, textarea, select, .magnetic-card');
    
    interactables.forEach((el) => {
      el.style.cursor = 'none';
      el.addEventListener('mouseenter', () => {
        if (el.classList.contains('magnetic-card')) setIsHoveringCard(true);
        else setIsHoveringButton(true);
      });
      el.addEventListener('mouseleave', () => {
        setIsHoveringCard(false);
        setIsHoveringButton(false);
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isTouch) return null;

  let size = 28;
  if (isHoveringButton) size = 48;
  if (isHoveringCard) size = 64;

  return (
    <>
      {/* Main Cursor Tracking Div */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden sm:flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
        }}
      >
        {/* Breathing & Interaction Animation Container */}
        <motion.div
          animate={{
            scale: isClicking ? 0.7 : isHoveringButton || isHoveringCard ? 1.2 : [1, 1.1, 1],
            rotate: isHoveringButton ? -15 : isHoveringCard ? 15 : [0, 5, -5, 0],
          }}
          transition={{
            scale: isClicking 
              ? { type: "spring", stiffness: 400, damping: 10 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-full h-full relative drop-shadow-[0_4px_8px_rgba(16,185,129,0.4)]"
        >
          {/* Detailed Leaf SVG */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            style={{
              filter: isHoveringCard ? "drop-shadow(0 0 12px rgba(52, 211, 153, 0.8))" : "none"
            }}
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" /> {/* Emerald 500 */}
                <stop offset="50%" stopColor="#059669" /> {/* Emerald 600 */}
                <stop offset="100%" stopColor="#047857" /> {/* Emerald 700 */}
              </linearGradient>
              <linearGradient id="veinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
              </linearGradient>
            </defs>

            {/* Main Leaf Body */}
            <path
              d="M10,10 C 45,5 95,20 95,95 C 20,95 5,45 10,10 Z"
              fill="url(#leafGradient)"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
            />
            
            {/* Center Vein */}
            <path
              d="M10,10 Q 40,40 90,90"
              stroke="url(#veinGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Side Veins */}
            <path d="M30,30 L 60,15" stroke="url(#veinGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50,50 L 85,35" stroke="url(#veinGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M70,70 L 95,60" stroke="url(#veinGradient)" strokeWidth="1.5" strokeLinecap="round" />
            
            <path d="M30,30 L 15,60" stroke="url(#veinGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50,50 L 35,85" stroke="url(#veinGradient)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M70,70 L 60,95" stroke="url(#veinGradient)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Enhanced Neon Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: 4 }}
            animate={{ width: 120, height: 120, opacity: 0, borderWidth: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden sm:block"
            style={{
              x: ripple.x,
              y: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
              borderColor: "#34d399", // Emerald 400
              boxShadow: "0 0 15px rgba(52, 211, 153, 0.6), inset 0 0 15px rgba(52, 211, 153, 0.3)",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
