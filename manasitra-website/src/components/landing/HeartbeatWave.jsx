"use client";

import { motion } from "framer-motion";

export default function HeartbeatWave() {
  return (
    <div className="w-full overflow-hidden py-6 bg-gradient-to-r from-transparent via-teal-900/5 to-transparent relative z-10">
      <div className="max-w-5xl mx-auto px-6 relative h-12 flex items-center justify-center">
        <svg viewBox="0 0 500 50" className="w-full h-full opacity-60">
          <motion.path
            d="M 0,25 L 150,25 L 170,10 L 185,40 L 200,5 L 215,45 L 230,25 L 500,25"
            fill="none"
            stroke="url(#heartbeat-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="heartbeat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ccfbf1" stopOpacity="0" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="1" />
              <stop offset="100%" stopColor="#ccfbf1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
