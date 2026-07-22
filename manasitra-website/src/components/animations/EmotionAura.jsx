"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function EmotionAura({ children }) {
  const { scrollYProgress } = useScroll();

  // Morph background hue based on scroll depth
  const background = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "linear-gradient(180deg, #faf9f8 0%, #f0fdf4 100%)", // Calm Sage
      "linear-gradient(180deg, #f0fdf4 0%, #ccfbf1 100%)", // Hopeful Teal
      "linear-gradient(180deg, #ccfbf1 0%, #f1f5f9 100%)", // Energetic Cool
      "linear-gradient(180deg, #f1f5f9 0%, #faf9f8 100%)", // Restored Peace
    ]
  );

  return (
    <motion.div style={{ background }} className="transition-colors duration-1000">
      {children}
    </motion.div>
  );
}
