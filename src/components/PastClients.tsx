"use client";

import { useEffect, useRef, useState } from "react";

interface Logo {
  name: string;
  src: string;
  // Shown in the description panel when this logo is clicked — replace
  // with the real relationship/context for each one.
  description: string;
}

// PRIORITY: your top clients + active association memberships — the ones
// that get full logo treatment in the orbiting ring.
const PRIORITY_LOGOS: Logo[] = [
  {
    name: "SRM University",
    src: "/logos/srm.jpeg",
    description: "One of the biggest cultural fest Milan in 2017&18 and there collage events from 2015 till now.",
  },
  {
    name: "PSBB Schools",
    src: "/logos/psbb.jpeg",
    description: "50+ years of their anniversery events at kamran memorial hall.",
  },
  {
    name: "Sathyabama University",
    src: "/logos/sits.jpeg",
    description: "Done collage events and fest .",
  },
  {
    name: "BNI",
    src: "/logos/bni.jpeg",
    description: "A member of BNI",
  },
  {
    name: "Lady Andal",
    src: "/logos/school.jpeg",
    description: "Lady Andal School events and other programs in Lady Andal Auditoriam 2005 to present.",
  },
  {
    name: "Rotary Club",
    src: "/logos/rotary.jpeg",
    description: "A member of Rotary Club.",
  },
  
   {
    name: "Officer Training Academy",
    src: "/logos/airforce.jpeg",
    description: "Managed and organised some events.",
  }

];



// OTHERS: everything else — a lighter, static mention rather than a full
// logo, no animation.
const OTHER_MENTIONS = [
  "Audio Launches",
  "Hindustan University",
  "Lady Andal School",
  "Filmfare Awards",
  "Behindwoods Shows",
  "Super Singer",
  "and many more",
];

const LOGO_WIDTH = 170; // bumped up from 140
const ORBIT_HEIGHT = 300; // bumped up from 240 to give the bigger logos room
const ROTATION_SPEED = 0.006; // radians per frame — bigger = faster spin
const HOVER_SCALE_BOOST = 1.18; // how much a hovered logo pops
const HOVER_EASE = 0.15; // how quickly the pop eases in/out (0–1, higher = snappier)

export default function ClientLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const angleRef = useRef(0);
  const rafRef = useRef(0);
  const orbitRef = useRef({ rx: 260, ry: 90 });
  const hoveredIndexRef = useRef<number | null>(null);
  const boostRef = useRef<number[]>(PRIORITY_LOGOS.map(() => 1));

  const [selected, setSelected] = useState<Logo | null>(null);

  // Measure the container so the orbit radius scales with the screen.
  useEffect(() => {
    function measure() {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      orbitRef.current = {
        rx: width * 0.42,
        ry: Math.min(110, height * 0.32),
      };
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const n = PRIORITY_LOGOS.length;

    function tick() {
      // Rotation never pauses — runs continuously regardless of hover/click.
      angleRef.current += ROTATION_SPEED;
      if (angleRef.current > Math.PI * 2) angleRef.current -= Math.PI * 2;

      const { rx, ry } = orbitRef.current;

      for (let i = 0; i < n; i++) {
        const el = logoRefs.current[i];
        if (!el) continue;

        const angle = angleRef.current + (i * Math.PI * 2) / n;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;

        const depth = (Math.sin(angle) + 1) / 2;
        const baseScale = 0.8 + depth * 0.4;
        const z = Math.round(depth * 100);

        // Ease the hover-pop toward its target each frame instead of
        // snapping instantly, so it reads as smooth rather than jumpy.
        const target = hoveredIndexRef.current === i ? HOVER_SCALE_BOOST : 1;
        boostRef.current[i] += (target - boostRef.current[i]) * HOVER_EASE;

        const scale = baseScale * boostRef.current[i];

        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        el.style.zIndex = `${hoveredIndexRef.current === i ? 200 : z}`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4 text-center">
          Trusted By
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-14 text-center">
          Clients &amp; Associations
        </h2>

        {/* Priority logos — orbits continuously, never pauses. Hover pops a
            logo forward smoothly; click opens its description below. */}
        <div ref={containerRef} className="relative w-full mb-6" style={{ height: ORBIT_HEIGHT }}>
          {PRIORITY_LOGOS.map((logo, i) => (
            <div
              key={logo.name}
              ref={(el) => {
                logoRefs.current[i] = el;
              }}
              className="group absolute left-1/2 top-1/2 flex items-center justify-center cursor-pointer"
              style={{ width: LOGO_WIDTH, willChange: "transform" }}
              onMouseEnter={() => (hoveredIndexRef.current = i)}
              onMouseLeave={() => (hoveredIndexRef.current = null)}
              onClick={() => setSelected(selected?.name === logo.name ? null : logo)}
            >
              <img src={logo.src} alt={logo.name} className="max-h-24 w-auto object-contain" />

              {/* Hover tooltip — a child of this same element, so it rides
                  along with the orbit's transform automatically. Pure CSS
                  group-hover, no extra JS state needed. Click still opens
                  the persistent panel below for a longer read. */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-48 -translate-x-1/2 border border-[#d4af37]/40 bg-black/90 px-3 py-2 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#d4af37]">
                  {logo.name}
                </p>
                <p className="text-[11px] leading-snug text-zinc-400 line-clamp-2">
                  {logo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Description panel — smooth expand/collapse via max-height + opacity,
            since height:auto can't be transitioned directly. */}
        <div
          className={`transition-all duration-300 ease-out overflow-hidden ${
            selected ? "max-h-48 opacity-100 mb-10" : "max-h-0 opacity-0"
          }`}
        >
          {selected && (
            <div className="max-w-md mx-auto text-center border border-[#d4af37]/40 bg-black/40 px-6 py-5">
              <div className="flex items-center justify-center gap-3 mb-2">
                <img src={selected.src} alt="" className="h-8 w-auto object-contain" />
                <h3 className="text-lg font-bold text-[#d4af37] uppercase tracking-wide">
                  {selected.name}
                </h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{selected.description}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-3 text-xs text-zinc-500 hover:text-white uppercase tracking-widest"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Others — a lighter static mention, no logos, no animation */}
        <p className="text-center text-zinc-500 text-sm leading-relaxed max-w-3xl mx-auto tracking-wide">
          {OTHER_MENTIONS.join("  ·  ")}
        </p>
      </div>
    </section>
  );
}