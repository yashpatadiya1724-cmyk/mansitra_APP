"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BorderBeam({
  className = "",
  size = 200,
  duration = 6,
  delay = 0,
  colorFrom = "#5eead4",
  colorTo = "#0d9488",
}) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]">
      <motion.div
        className={cn(
          "absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent opacity-80",
          className
        )}
        style={{
          width: size,
          offsetPath: "rect(0 auto auto 0 round 24px)",
          "--color-from": colorFrom,
          "--color-to": colorTo,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      />
    </div>
  );
}
