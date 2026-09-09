"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  play?: boolean;
}

function KineticMark() {
  return (
    <div
      aria-hidden="true"
      className="kinetic grid grid-cols-2 font-display text-6xl md:text-8xl lg:text-9xl font-semibold tracking-[0.08em] text-gold-hi"
    >
      <span className="cell">B</span>
      <span className="cell">S</span>
      <span className="cell">C</span>
      <span className="cell text-gold">·</span>

      <style jsx>{`
        .kinetic {
          animation: spinGrid 8s cubic-bezier(0.65,0,0.35,1) infinite;
        }

        .kinetic .cell {
          display: flex;
          height: 1.12em;
          width: 1.12em;
          align-items: center;
          justify-content: center;
          animation: unspin 8s cubic-bezier(0.65,0,0.35,1) infinite;
        }

        @keyframes spinGrid {
          0%,18% {
            transform: rotate(0deg);
          }

          25%,43% {
            transform: rotate(90deg);
          }

          50%,68% {
            transform: rotate(180deg);
          }

          75%,93% {
            transform: rotate(270deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes unspin {
          0%,18% {
            transform: rotate(0deg);
          }

          25%,43% {
            transform: rotate(-90deg);
          }

          50%,68% {
            transform: rotate(-180deg);
          }

          75%,93% {
            transform: rotate(-270deg);
          }

          100% {
            transform: rotate(-360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .kinetic,
          .kinetic .cell {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function Hero({ play = true }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!play || hasPlayed.current || !contentRef.current) return;

    hasPlayed.current = true;

    const elements = contentRef.current.querySelectorAll(".hero-detail");

    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      }
    );
  }, [play]);

  return (
    <section className="relative h-screen flex items-center justify-center px-6 md:px-10 lg:px-14 border-b border-zinc-900 overflow-hidden">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/Videos/HERO.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#060606]/50" />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 lg:gap-16"
      >

        {/* LEFT SIDE */}
        <div className="hero-detail text-left max-w-sm">

          <div className="text-gold text-xs md:text-sm font-semibold tracking-[0.3em] mb-5">
            WELCOME · SINCE 1954
          </div>

          <p className="text-zinc-200 text-base md:text-lg leading-relaxed font-display">
            We’re a creative content and production house
            that moves at the speed of your ambition. From
            idea to load-out and beyond. Where speed
            meets craftsmanship.
          </p>

        </div>


        {/* CENTER — KINETIC BSC */}
        <div className="flex justify-center items-center">
          <KineticMark />
        </div>


        {/* RIGHT SIDE */}
        <div className="hero-detail text-right max-w-sm ml-auto">

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-7 font-display">
            We craft formats that stick — from an 8-second cue
            to a full-scale concert. Same-day edits to feature-
            length nights, we deliver at every scale.
          </p>

          <button
            className="
              border border-gold
              px-7 py-3
              text-gold
              text-xs
              font-semibold
              tracking-[0.25em]
              uppercase
              hover:bg-gold
              hover:text-black
              transition-all duration-300
            "
          >
            Connect +
          </button>

        </div>

      </div>
    </section>
  );
}