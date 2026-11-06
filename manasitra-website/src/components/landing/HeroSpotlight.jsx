"use client";

import { useEmotionTheme } from "@/context/ThemeContext";

export default function HeroSpotlight({ className = "" }) {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <svg
      className={`pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] top-[-20%] left-[-10%] transition-opacity duration-700 ${
        isDark ? "opacity-60" : "opacity-40"
      } ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={isDark ? "#10b981" : "#5eead4"}
          fillOpacity={isDark ? "0.35" : "0.25"}
        />
      </g>
      {/* Dark mode: second blue-purple spotlight for depth */}
      {isDark && (
        <g filter="url(#spotlight-filter)">
          <ellipse
            cx="1200"
            cy="400"
            rx="1400"
            ry="200"
            transform="matrix(-0.7 -0.7 -0.7 0.7 3200 1800)"
            fill="#6366f1"
            fillOpacity="0.15"
          />
        </g>
      )}
      <defs>
        <filter
          id="spotlight-filter"
          x="0.860352"
          y="0.838867"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={isDark ? 200 : 151} result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
