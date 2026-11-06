"use client";

import { motion } from "framer-motion";

export default function MemoryStream() {
  return (
    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-full max-w-5xl z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => {
        const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
        const left = ((r1 - Math.floor(r1)) * 100).toFixed(2);
        const duration = 12 + (i % 5) * 2;
        const delay = i * 0.8;

        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-b from-teal-300 to-emerald-400 rounded-full blur-[0.5px] opacity-40 shadow-[0_0_8px_#5eead4]"
            style={{ left: `${left}%`, top: "-5%" }}
            animate={{
              y: ["0vh", "100vh"],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
