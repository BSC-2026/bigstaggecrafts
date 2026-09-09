"use client";

import { useEffect, useRef, useState } from "react";

interface InventoryItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  items: InventoryItem[];
}

const CATEGORIES: Category[] = [
  {
    id: "audio-jbl",
    name: "Professional Audio",
    items: [
      {
        name: "JBL VRX 932 Line Array Speaker System",
        description: "High-power concert-grade audio",
        price: "₹12,000/day",
        image: "/inventory/audioimg/jblvrx.jpg",
      },
      {
        name: "RCF Evox 12 Column Array Speaker System (Pair)",
        description: "High-power concert-grade audio",
        price: "₹4,000/day",
        image: "/inventory/audioimg/evox 12.png",
      },
      {
        name: 'Dual 18" Subwoofer',
        description: "Deep bass reinforcement",
        price: "₹8,000/day",
        image: "/inventory/audioimg/dolby_18.webp",
      },
      {
        name: 'Dual 12" Subwoofer',
        description: "Deep bass reinforcement",
        price: "₹4,000/day",
        image: "/inventory/audioimg/dual12subwoofer.jpg",
      },
      {
        name: "JBL PRX Pair",
        description: "Professional monitors",
        price: "₹3,000/day",
        image: "/inventory/audioimg/JBL_PRX415_1.png",
      },
      {
        name: "RCF ST 12 Pair",
        description: "Professional monitors",
        price: "₹3,000/day",
        image: "/inventory/audioimg/rcfst12pair.jpg",
      },
      {
        name: "Digital Mixing Console",
        description: "UI 16-channel professional mixer",
        price: "₹2,000/day",
        image: "/inventory/audioimg/ui16.jpg",
      },
      {
        name: "Digital Mixing Console",
        description: "32-channel professional mixer",
        price: "₹2,000/day",
        image: "/inventory/audioimg/digital-mixer-17.jpg",
      },
    ],
  },
  {
    id: "trussing",
    name: "Stage Trussing",
    items: [
      {
        name: "Box Truss",
        description: "60 x 40",
        price: "₹40,000/day",
        image: "/inventory/stagetrusting/boxtruss.jpg",
      },
      {
        name: "Goal Post Truss",
        description: "60 x 20",
        price: "₹20,000/day",
        image: "/inventory/stagetrusting/image-1.jpg ",
      },
    ],
  },
  {
    id: "lighting",
    name: "Stage Lighting",
    items: [
      {
        name: "Moving Head Beam 230W",
        description: "Sharp aerial beam effects",
        price: "₹2,500/day",
        image: "/inventory/lights/movingheadbeam.jpeg",
      },
      {
        name: "Moving Head Wash 19x15W",
        description: "RGBW wash lighting",
        price: "₹3,000/day",
        image: "/inventory/lights/movingheadwash.jpg",
      },
      {
        name: "LED Par RGBW",
        description: "Stage colour wash fixture",
        price: "₹500/day",
        image: "/inventory/lights/ledpar.jpeg",
      },
      {
        name: "Follow Spot 1200W",
        description: "Long-distance spotlight",
        price: "₹2,500/day",
        image: "/inventory/lights/followup.webp",
      },
    ],
  },
  {
    id: "effects",
    name: "Effects & Special Equipment",
    items: [
      {
        name: "Cold Spark Machine",
        description: "Indoor-safe spark effect",
        price: "₹5,000/day",
        image: "/inventory/effects/cold.webp",
      },
      {
        name: "Low Fog Machine",
        description: "Dancing-on-clouds effect",
        price: "₹5,000/day",
        image: "/inventory/effects/lowfog.webp",
      },
      {
        name: "Haze Machine",
        description: "Beam enhancement effect",
        price: "₹2,500/day",
        image: "/inventory/effects/MK-F14.jpg",
      },
      {
        name: "Confetti Launcher",
        description: "Event celebration effect",
        price: "₹4,500/day",
        image: "/inventory/effects/launcher.jpg",
      },
    ],
  },
  {
    id: "led-video",
    name: "LED Video Solutions",
    items: [
      {
        name: "P3 Indoor LED Wall",
        description: "High-resolution display",
        price: "₹120/sq.ft",
        image: "/inventory/ledvideosolutions/p3.jpg",
      },
      {
        name: "P4 Outdoor LED Wall",
        description: "Weatherproof display",
        price: "₹150/sq.ft",
        image: "/inventory/ledvideosolutions/p4.jpg",
      },
    ],
  },
];

/* =========================
   ANIMATED COUNTER
========================= */

function Counter({
  end,
  suffix = "",
  duration = 1600,
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

export default function Inventory() {
  const [openId, setOpenId] = useState<string | null>(
    CATEGORIES[0].id
  );

  return (
    <section
      id="inventory"
      className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-[#0a0a0a]"
    >
      <div className="max-w-5xl mx-auto">

        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4 text-center">
          Rental Inventory
        </p>

        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-4 text-center">
          Equipment &amp; Pricing
        </h2>

        {/* =========================
            EQUIPMENT COUNTER
        ========================= */}

        <div className="mb-10 mt-8 text-center">
          <Counter end={20} suffix="+" />

          <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">
            Equipment Available
          </p>
        </div>

        <div className="flex flex-col">
          {CATEGORIES.map((cat) => {
            const isOpen = openId === cat.id;

            return (
              <div
                key={cat.id}
                className="border-b border-zinc-800"
              >
                <button
                  className="group flex w-full items-center justify-between py-6 text-left md:py-8"
                  onClick={() =>
                    setOpenId(isOpen ? null : cat.id)
                  }
                >
                  <span className="text-xl font-extrabold uppercase tracking-wide text-zinc-300 transition-colors duration-300 group-hover:text-[#d4af37] md:text-3xl">
                    {cat.name}
                  </span>

                  <span
                    className={`text-2xl text-[#d4af37] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen
                      ? "max-h-[800px] pb-8 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {cat.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 border border-zinc-800 p-4 transition-colors duration-300 hover:border-[#d4af37]/50"
                      >
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-zinc-900 text-xs text-zinc-600">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            "IMG"
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white md:text-base">
                            {item.name}
                          </p>

                          <p className="text-xs text-zinc-500 md:text-sm">
                            {item.description}
                          </p>
                        </div>

                        <p className="whitespace-nowrap text-sm font-bold text-[#d4af37] md:text-base">
                          {item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}