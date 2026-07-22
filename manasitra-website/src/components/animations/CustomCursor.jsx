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

  let size = 20;
  if (isHoveringButton) size = 50;
  if (isHoveringCard) size = 80;
  if (isClicking) size = size * 0.8;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white/90 backdrop-blur-sm hidden sm:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
          boxShadow: isHoveringButton ? "0 0 20px 5px rgba(255,255,255,0.4)" : "0 0 10px 0 rgba(255,255,255,0.2)",
        }}
        animate={{
          width: size,
          height: size,
          borderRadius: isHoveringCard ? "16px" : "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 rounded-full border border-teal-400 pointer-events-none z-[9998] hidden sm:block"
            style={{
              x: ripple.x,
              y: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
