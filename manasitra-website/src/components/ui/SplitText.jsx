"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SplitText({
  text = "",
  className = "",
  delay = 0.1,
  wordClassName = "",
}) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(12px)",
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap gap-x-[0.3em]", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={child}
          className={cn("inline-block transform-gpu", wordClassName)}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
