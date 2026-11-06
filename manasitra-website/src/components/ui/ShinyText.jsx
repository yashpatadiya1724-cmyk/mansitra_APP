"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ShinyText({
  children,
  className = "",
  speed = 3,
}) {
  return (
    <motion.span
      className={cn(
        "relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-teal-400 to-teal-800 bg-[length:200%_100%]",
        className
      )}
      animate={{
        backgroundPosition: ["0% 0%", "200% 0%"],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
