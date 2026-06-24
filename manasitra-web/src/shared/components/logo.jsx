export const MansitraLogo = ({ size = 44 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width={size} height={size}>
    <defs>
      <linearGradient id="lg-bubble" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6ECECE"/>
        <stop offset="100%" stopColor="#5BBABA"/>
      </linearGradient>
      <linearGradient id="lg-petal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#7DD4C8"/>
        <stop offset="45%"  stopColor="#F0B090"/>
        <stop offset="100%" stopColor="#F08090"/>
      </linearGradient>
      <linearGradient id="lg-wave" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#7DD4C8"/>
        <stop offset="50%"  stopColor="#F0B090"/>
        <stop offset="100%" stopColor="#F08090"/>
      </linearGradient>
    </defs>

    {/* Chat bubble */}
    <ellipse cx="250" cy="145" rx="148" ry="105" fill="url(#lg-bubble)"/>
    <path d="M210 238 Q195 268 175 278 Q205 262 230 248 Z" fill="url(#lg-bubble)"/>
    <circle cx="202" cy="148" r="14" fill="white" opacity="0.95"/>
    <circle cx="250" cy="148" r="14" fill="white" opacity="0.95"/>
    <circle cx="298" cy="148" r="14" fill="white" opacity="0.95"/>

    {/* Center petal */}
    <path d="M250 290 C240 270 232 248 232 228 C232 210 240 200 250 200 C260 200 268 210 268 228 C268 248 260 270 250 290 Z"
      fill="url(#lg-petal)" opacity="0.95"/>
    {/* Inner-left */}
    <path d="M250 290 C235 278 215 262 205 244 C197 228 200 212 210 206 C220 200 232 208 236 224 C242 248 250 290 250 290 Z"
      fill="url(#lg-petal)" opacity="0.90"/>
    {/* Inner-right */}
    <path d="M250 290 C265 278 285 262 295 244 C303 228 300 212 290 206 C280 200 268 208 264 224 C258 248 250 290 250 290 Z"
      fill="url(#lg-petal)" opacity="0.90"/>
    {/* Outer-left */}
    <path d="M250 290 C228 282 196 270 178 252 C163 236 166 216 178 208 C190 200 206 210 210 228 C218 258 250 290 250 290 Z"
      fill="url(#lg-petal)" opacity="0.80"/>
    {/* Outer-right */}
    <path d="M250 290 C272 282 304 270 322 252 C337 236 334 216 322 208 C310 200 294 210 290 228 C282 258 250 290 250 290 Z"
      fill="url(#lg-petal)" opacity="0.80"/>
    {/* Far-left */}
    <path d="M250 290 C220 288 178 282 155 264 C136 248 140 226 155 218 C168 210 186 220 192 240 C202 268 250 290 250 290 Z"
      fill="url(#lg-petal)" opacity="0.65"/>
    {/* Far-right */}
    <path d="M250 290 C280 288 322 282 345 264 C364 248 360 226 345 218 C332 210 314 220 308 240 C298 268 250 290 250 290 Z"
      fill="url(#lg-petal)" opacity="0.65"/>

    {/* Waves */}
    <path d="M148 318 Q182 302 216 318 Q250 334 284 318 Q318 302 352 318"
      stroke="url(#lg-wave)" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.90"/>
    <path d="M160 344 Q194 328 228 344 Q262 360 296 344 Q330 328 364 344"
      stroke="url(#lg-wave)" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.65"/>
    <path d="M172 368 Q206 354 240 368 Q274 382 308 368 Q342 354 376 368"
      stroke="url(#lg-wave)" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.40"/>
  </svg>
)
