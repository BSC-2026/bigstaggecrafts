"use client";

import { useEffect, useRef,useState } from "react";

const REASONS = [
  "Industry Legacy Since 1954",
  "Three Generations of Expertise",
  "15+ Years of Modern Event Production Experience",
  "State-of-the-Art Sound & Lighting Equipment",
  "Experienced Technical Crew & Event Specialists",
  "End-to-End Event Solutions",
  "Proven Track Record Across South India",
  "Commitment to Safety, Reliability & Quality",
];

const CLIENT_LOGOS = [
  {
    name: "SRM University",
    src: "/logos/srm.jpeg",
    description:
      "One of the biggest cultural fest Milan in 2017&18 and their college events from 2015 till now.",
  },
  {
    name: "PSBB Schools",
    src: "/logos/psbb.jpeg",
    description:
      "50+ years of their anniversary events at Kamra Memorial Hall.",
  },
  {
    name: "Sathyabama University",
    src: "/logos/sits.jpeg",
    description:
      "Done college events and fests.",
  },
  {
    name: "BNI",
    src: "/logos/bni.jpeg",
    description:
      "A member of BNI.",
  },
  {
    name: "Lady Andal",
    src: "/logos/school.jpeg",
    description:
      "Lady Andal School events and other programs in Lady Andal Auditorium from 2005 to present.",
  },
  {
    name: "Rotary Club",
    src: "/logos/rotary.jpeg",
    description:
      "A member of Rotary Club.",
  },
];

export default function WhyChooseUs() {
  const trackRef = useRef<HTMLDivElement>(null);
const SelectedClientRef=useRef<number | null>(null)
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

const selectedClientRef = useRef<number | null>(null);

useEffect(() => {
  selectedClientRef.current = selectedClient;
}, [selectedClient]);

 useEffect(() => {
  let animationFrame = 0;
  let position = 0;

  const speed = 0.6;

 function animate() {
  const track = trackRef.current;

  if (!track) {
    animationFrame = requestAnimationFrame(animate);
    return;
  }

  // Pause marquee when a client is selected
  if (selectedClientRef.current !== null) {
    animationFrame = requestAnimationFrame(animate);
    return;
  }

  position -= speed;

    const resetPoint = track.scrollWidth / 2;

    if (Math.abs(position) >= resetPoint) {
      position = 0;
    }

    track.style.transform = `translate3d(${position}px, 0, 0)`;

    animationFrame = requestAnimationFrame(animate);
  }

  animationFrame = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationFrame);
  };
}, []);

  return (
    <section className="bg-cream font-display overflow-hidden">

      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <div className="py-24 px-6 md:px-16">

        <div className="max-w-5xl mx-auto">

          <p className="text-[#8a6f20] uppercase tracking-widest text-sm mb-4 text-center">
            Trusted Since 1954
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-14 text-center text-[#111111]">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {REASONS.map((reason, i) => (
              <div
                key={i}
                className="
                  flex
                  items-start
                  gap-4
                  border
                  border-black/15
                  rounded-sm
                  p-5
                  hover:border-[#d4af37]
                  transition-colors
                  duration-300
                "
              >

                <span className="text-[#a88924] text-xl leading-none mt-0.5">
                  ✓
                </span>

                <p className="text-[#222222] text-base md:text-lg tracking-wide">
                  {reason}
                </p>

              </div>
            ))}

          </div>

        </div>
      </div>


      {/* =========================
          PAST CLIENTS
      ========================= */}

      <div className="pb-20">

        <div className="w-full h-px bg-black/10 mb-16" />

        <div className="text-center mb-10 px-6">

          <p className="text-[#8a6f20] uppercase tracking-[0.3em] text-xs mb-3">
            Our Network
          </p>

          <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.15em] text-[#111111]">
            Past Clients &amp; Associations
          </h3>

        </div>


        {/* =========================
            INFINITE CAROUSEL
        ========================= */}

        <div className="relative w-full overflow-hidden">

          {/* Left fade */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              bottom-0
              w-24
              md:w-40
              z-10
              bg-gradient-to-r
              from-[#f5f0df]
              to-transparent
            "
          />

          {/* Right fade */}
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              bottom-0
              w-24
              md:w-40
              z-10
              bg-gradient-to-l
              from-[#f5f0df]
              to-transparent
            "
          />


          {/* Moving track */}
          <div
            ref={trackRef}
            className="
              flex
              items-center
              w-max
              gap-10
              md:gap-16
              px-5
            "
            style={{
              willChange: "transform",
            }}
          >

            {logos.map((logo, index) => (

              <div
  key={`${logo.name}-${index}`}
  onClick={() =>
    setSelectedClient(selectedClient === index ? null : index)
  }
  className="
    relative
    flex-shrink-0
    w-[150px]
    md:w-[190px]
    cursor-pointer
    select-none
  "
>
  {/* Logo */}
  <div
    className="
      flex
      items-center
      justify-center
      w-full
      h-[90px]
      md:h-[105px]
      border
      border-black/10
      bg-[#f8f3e3]
      rounded-sm
      transition-all
      duration-300
      hover:border-[#d4af37]/60
    "
  >
    <div className="flex flex-col items-center justify-center gap-2 px-4">
      <img
        src={logo.src}
        alt={logo.name}
        draggable={false}
        className="
          max-w-[115px]
          md:max-w-[145px]
          max-h-[60px]
          md:max-h-[70px]
          w-auto
          h-auto
          object-contain
        "
      />

      <p className="text-[9px] md:text-[10px] text-black/60 text-center uppercase tracking-wider">
        {logo.name}
      </p>
    </div>
  </div>

  {/* Description */}
  {selectedClient === index && (
    <div
      className="
        absolute
        left-1/2
        top-full
        z-50
        mt-3
        w-[220px]
        -translate-x-1/2
        border
        border-[#d4af37]/50
        bg-[#f8f3e3]
        p-4
        shadow-xl
      "
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] mb-2">
        {logo.name}
      </p>

      <p className="text-xs leading-relaxed text-black/70">
        {logo.description}
      </p>
    </div>
  )}
</div>
            ))}

          </div>

        </div>


        {/* Other associations */}

        <p className="text-center text-black/45 text-xs md:text-sm tracking-widest mt-10 px-6">
          AUDIO LAUNCHES&nbsp;&nbsp; · &nbsp;&nbsp;
          HINDUSTAN UNIVERSITY&nbsp;&nbsp; · &nbsp;&nbsp;
          FILMFARE AWARDS&nbsp;&nbsp; · &nbsp;&nbsp;
          BEHINDWOODS SHOWS&nbsp;&nbsp; · &nbsp;&nbsp;
          SUPER SINGER&nbsp;&nbsp; · &nbsp;&nbsp;
          AND MANY MORE
        </p>

      </div>

    </section>
  );
}