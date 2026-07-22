"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
