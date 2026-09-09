"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  // When true, animates each direct child individually with a stagger
  // instead of the whole block as one unit — use this by wrapping directly
  // around a grid (e.g. the Services cards div), not around a whole section
  // component, since it only reaches its own direct children.
  stagger?: boolean;
  className?: string;
}

export default function Reveal({ children, stagger = false, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return; // leave content visible at its natural state, no animation

    const targets = stagger ? Array.from(el.children) : [el];

    gsap.set(targets, { y: 40, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
        });
      },
    });

    return () => trigger.kill();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}