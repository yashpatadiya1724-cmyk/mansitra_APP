"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TracingBeam({ children, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef(null);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, 600]),
    { stiffness: 500, damping: 90 }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, 800]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <div className="absolute -left-4 md:-left-12 top-3 h-full">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-teal-400 shadow-md"
        >
          <motion.div
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "#0d9488" : "#ccfbf1",
              borderColor: scrollYProgress.get() > 0 ? "#5eead4" : "#ffffff",
            }}
            className="h-2 w-2 rounded-full border border-white bg-teal-500"
          />
        </motion.div>

        <svg
          viewBox="0 0 20 800"
          aria-hidden="true"
          className="ml-4 block h-full w-20"
        >
          <motion.path
            d="M 1 0V 800"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          <motion.path
            d="M 1 0V 800"
            fill="none"
            stroke="url(#gradient-beam)"
            strokeWidth="2"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="gradient-beam"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#5eead4" stopOpacity="0" />
              <stop stopColor="#0d9488" />
              <stop offset="0.325" stopColor="#0f766e" />
              <stop offset="1" stopColor="#99f6e4" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
