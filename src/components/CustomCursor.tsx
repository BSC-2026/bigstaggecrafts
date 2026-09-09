"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    // Only takes over on devices with an actual mouse — touch devices keep
    // their native tap behavior untouched.
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("custom-cursor-active");

    function handleMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", handleMove);

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Add data-cursor-hover to any custom element you want the cursor to
      // react to beyond plain links/buttons (e.g. a gallery tile).
      hovering.current = !!target.closest("a, button, [data-cursor-hover]");
    }
    window.addEventListener("mouseover", handleOver);

    let raf = 0;
    function tick() {
      // The dot tracks the cursor instantly; the ring eases in behind it
      // for a soft trailing feel instead of two things moving in lockstep.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        const scale = hovering.current ? 1.8 : 1;
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-[#d4af37] transition-transform duration-150 ease-out"
      />
      <style jsx global>{`
        .custom-cursor-active,
        .custom-cursor-active * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}