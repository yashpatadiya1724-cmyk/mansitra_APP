import React from 'react'

export const MansitraLogo = ({ size = 44, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="lg-new-bubble" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#85C1AA" />
        <stop offset="100%" stopColor="#1C6C63" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g filter="url(#glow)">
      {/* Bubble Outline + Stem */}
      <path 
        d="M 301,390 
           L 380,400 
           L 380,325 
           A 150 150 0 1 0 144,356
           C 170,440 250,380 260,280" 
        fill="none" 
        stroke="url(#lg-new-bubble)" 
        strokeWidth="32" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Right Leaf */}
      <path 
        d="M 260,280
           C 280,180 360,150 380,150
           C 380,230 320,270 260,280 Z"
        fill="url(#lg-new-bubble)" 
      />

      {/* Left Leaf */}
      <path 
        d="M 260,280
           C 220,210 150,190 130,190
           C 150,250 210,270 260,280 Z"
        fill="url(#lg-new-bubble)" 
      />

      {/* Veins (Negative Space Simulation) */}
      <path 
        d="M 260,280 C 310,230 350,180 370,160" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M 260,280 C 210,250 160,210 140,200" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
      />
    </g>
  </svg>
)

export default MansitraLogo;
