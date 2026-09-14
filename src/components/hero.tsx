"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  play?: boolean;
}

function BSCMark() {
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!markRef.current) return;

    gsap.set(markRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 12,
    });

    const timer = gsap.delayedCall(4, () => {
      gsap.to(markRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
      });
    });

    return () => {
      timer.kill();
      if (markRef.current) {
        gsap.killTweensOf(markRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={markRef}
      aria-hidden="true"
      className="
        font-display
        text-gold-hi
        font-semibold
        tracking-[0.08em]
        text-2xl
        md:text-4xl
        lg:text-5xl
        whitespace-nowrap
      "
    >
      BIG STAGE CRAFTS
    </div>
  );
}

export default function Hero({ play = true }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!play || hasPlayed.current || !contentRef.current) return;

    hasPlayed.current = true;

    const elements =
      contentRef.current.querySelectorAll(".hero-detail");

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
    <section
      className="
        relative
        h-screen
        flex
        items-center
        justify-center
        px-6
        md:px-10
        lg:px-14
        border-b
        border-zinc-900
        overflow-hidden
      "
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          opacity-40
        "
      >
        <source src="/Videos/HERO.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#060606]/50" />

      {/* Main content */}
      <div
        ref={contentRef}
        className="
          relative
          z-10
          w-full
          max-w-[1400px]
          grid
          grid-cols-1
          md:grid-cols-[1fr_auto_1fr]
          items-center
          gap-10
          lg:gap-16
        "
      >
        {/* LEFT SIDE */}
        <div className="hero-detail text-left max-w-sm">
          <div
            className="
              text-gold
              text-xs
              md:text-sm
              font-semibold
              tracking-[0.3em]
              mb-5
            "
          >
            WELCOME · SINCE 1954
          </div>

          <p
            className="
              text-zinc-200
              text-display
              md:text-sm
              leading-relaxed
              mb-7
              font-display
            "
          >
            WE TURN IDEAS INTO EXPERIENCES.
From intimate gatherings to large-scale celebrations, we plan, produce and execute events with precision — bringing every detail together from concept to completion.
          </p>
        </div>

        {/* CENTER — BSC */}
        <div className="flex justify-center items-center">
          <BSCMark />
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-detail text-right max-w-sm ml-auto">
          <p
            className="
              text-zinc-300
              text-sm
              md:text-base
              leading-relaxed
              mb-7
              font-display
            "
          >
           WE CREATE EVENTS THAT PEOPLE REMEMBER.
Corporate events, college fests, concerts, launches, award shows and special occasions — from the first idea to the final applause, we make every moment count.
          </p>

          <button
  onClick={() => {
    const target = document.querySelector("#contact");

    if (target && window.lenisInstance) {
      window.lenisInstance.scrollTo(target as HTMLElement, {
        offset: -80,
      });
    } else if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  }}
  className="
    border
    border-gold
    px-7
    py-3
    text-gold
    text-xs
    font-semibold
    tracking-[0.25em]
    uppercase
    hover:bg-gold
    hover:text-black
    transition-all
    duration-300
  "
>
  Connect +
</button>
        </div>
      </div>
    </section>
  );
}