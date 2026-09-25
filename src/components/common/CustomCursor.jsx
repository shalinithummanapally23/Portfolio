import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    ) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Smooth lerp for ring on desktop
    const tick = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive = target && target.closest('button, a, input, textarea, [role="button"], .interactive-hover');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Sleek Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/60 transition-[width,height,opacity,background-color] duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-12 h-12 -mt-6 -ml-6 bg-cyan-400/15 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            : 'w-8 h-8 -mt-4 -ml-4 bg-transparent'
        }`}
      />

      {/* Center Sharp Core */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 -mt-1 -ml-1 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00] transition-opacity duration-150 will-change-transform ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  );
}
