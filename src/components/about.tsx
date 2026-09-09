"use client";

import { useEffect, useRef, useState } from "react";

function Counter({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const progress = Math.min(
        (time - startTime) / duration,
        1
      );

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, end, duration]);

  return (
    <p
      ref={ref}
      className="text-3xl md:text-4xl font-bold text-[#d4af37] tabular-nums"
    >
      {count}
      {suffix}
    </p>
  );
}

export default function About() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-cream text-cream-ink">
      <div className="max-w-4xl mx-auto text-center">

        <p className="font-display mb-14 text-center text-3xl font-semibold tracking-wide md:text-5xl">
          Since 1954
        </p>

        <h2 className="font-display mb-14 text-center text-3xl font-semibold tracking-wide md:text-5xl">
          A Legacy of Excellence
        </h2>

        <p className="mt-4 font-display text-lg tracking-wide">
          For over seven decades, we have stood as a symbol of trust, innovation, and excellence
          in the event production industry — pioneers of professional sound, lighting, stage, and
          event production services in South India, carrying forward a legacy through three
          generations of dedicated leadership.
        </p>

        <p className="mt-4 font-display text-lg tracking-wide">
          With a modern event management team boasting 15+ years of specialised expertise, we have
          successfully executed over 1,000 events — from Filmfare events and celebrity parties to
          weddings, corporate conventions, and live concerts across South India.
        </p>

        {/* =========================
            ANIMATED COUNTERS
        ========================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">

          {/* YEARS */}
          <div>
            <Counter end={70} suffix="+" />

            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">
              Years of Legacy
            </p>
          </div>

          {/* EVENTS */}
          <div>
            <Counter end={1000} suffix="+" />

            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">
              Events Delivered
            </p>
          </div>

          {/* GENERATIONS */}
          <div>
            <Counter end={3} />

            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">
              Generations
            </p>
          </div>

          {/* EXPERTISE */}
          <div>
            <Counter end={15} suffix="+" />

            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">
              Years Modern Expertise
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}