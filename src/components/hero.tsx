"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.3 }
    );
  }, []);

  const headline = "Big Stage Crafts";

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4 border-b border-zinc-900">
      <h1
        ref={headlineRef}
        className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider text-[#d4af37] mb-4 flex flex-wrap justify-center gap-x-4"
      >
        {headline.split(" ").map((word, i) => (
          <span key={i} className="word inline-block overflow-hidden">
            {word}
          </span>
        ))}
      </h1>
      <p className="text-zinc-400 text-lg md:text-xl max-w-2xl tracking-wide">
        Transforming Events with Sound, Light & Legacy Since 1954.
      </p>
    </section>
  );
}