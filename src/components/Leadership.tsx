"use client";

import { useEffect, useRef, useState } from "react";

interface LeaderProfile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  imageSide: "left" | "right";
}

const LEADERS: LeaderProfile[] = [
  {
    name: "Mr.A S Gopalakrishnan",
    title: "Founder",
    bio: "Our founder Mr. A S Gopalakrishnan (Gopi Iyer), is one of the most renowned technical experts in the field of stage art & design in India. Having worked with over hundreds of top companies and events in the country and thousands of prestigious events, he has set the benchmark of the Indian events market to its high standards.",
    photo: "/Photos/Founder.jpeg",
    imageSide: "left",
  },
  {
    name: "Mr. G Srinivasan",
    title: "Managing Director",
    bio: "With close to 4 decades of extensive experience, Mr. G Srinivasan (Seena), has been the core strength of BSC enabling the company to spread its wings across the country. He is also the Chief technology Officer who has watched closely and mastered the changes and upgrades of the technical equipments and requirements since the 1980s till date.",
    photo: "/Photos/ManagingDirector.jpeg",
    imageSide: "right",
  },
];

function LeaderReveal({
  leader,
}: {
  leader: LeaderProfile;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const fromLeft = leader.imageSide === "left";

  return (
    <div
      ref={ref}
      className={`
        leader-reveal
        ${fromLeft ? "reveal-left" : "reveal-right"}
        ${visible ? "is-visible" : ""}
      `}
    >
      {/* GOLD REVEAL EDGE */}
      <div className="reveal-edge" />

      {/* CONTENT */}
      <div
        className={`
          flex flex-col md:flex-row
          items-center
          gap-10 md:gap-16
          w-full
          ${fromLeft ? "" : "md:flex-row-reverse"}
        `}
      >
        {/* PHOTO */}
        <div className="photo-wrap w-full max-w-xs mx-auto md:mx-0 flex-shrink-0">
          <div className="border border-[#d4af37]/70 p-1">
            <img
              src={leader.photo}
              alt={leader.name}
              className="w-full aspect-[4/5] object-cover grayscale-[15%]"
            />
          </div>
        </div>

        {/* TEXT */}
        <div
          className={`
            leader-info
            flex-1
            text-center
            md:text-left
            ${fromLeft ? "" : "md:text-right"}
          `}
        >
          <p className="leader-title text-[#d4af37] uppercase tracking-widest text-sm mb-2">
            {leader.title}
          </p>

          <h3 className="leader-name text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
            {leader.name}
          </h3>

          <div
            className={`
              gold-line
              ${fromLeft ? "md:mr-auto" : "md:ml-auto"}
            `}
          />

          <p className="leader-bio mt-5 max-w-md text-base leading-relaxed text-muted font-display">
            {leader.bio}
          </p>
        </div>
      </div>

      <style jsx>{`
        .leader-reveal {
          position: relative;
          overflow: hidden;
          opacity: 0;
          filter: blur(8px);
        }

        /*
         * FOUNDER
         * Content comes from LEFT
         */
        .reveal-left {
          transform: translateX(-120px);
        }

        /*
         * MANAGING DIRECTOR
         * Content comes from RIGHT
         */
        .reveal-right {
          transform: translateX(120px);
        }

        .leader-reveal.is-visible {
          animation: contentReveal 1.15s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .reveal-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #d4af37;
          box-shadow:
            0 0 8px rgba(212, 175, 55, 0.9),
            0 0 20px rgba(212, 175, 55, 0.6),
            0 0 40px rgba(212, 175, 55, 0.25);

          z-index: 20;

          opacity: 0;
        }

        .reveal-left .reveal-edge {
          left: 0;
        }

        .reveal-right .reveal-edge {
          right: 0;
        }

        .is-visible .reveal-edge {
          animation: edgeReveal 1.15s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .photo-wrap {
          opacity: 0;
          transform: scale(0.94);
        }

        .is-visible .photo-wrap {
          animation: photoReveal 1s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;

          animation-delay: 0.15s;
        }

        .leader-info {
          opacity: 0;
        }

        .is-visible .leader-info {
          animation: infoReveal 0.9s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;

          animation-delay: 0.35s;
        }

        .leader-title {
          opacity: 0;
          transform: translateY(15px);
        }

        .is-visible .leader-title {
          animation: textUp 0.6s ease-out forwards;
          animation-delay: 0.55s;
        }

        .leader-name {
          opacity: 0;
          transform: translateY(20px);
        }

        .is-visible .leader-name {
          animation: textUp 0.7s ease-out forwards;
          animation-delay: 0.65s;
        }

        .gold-line {
          width: 0;
          height: 1px;
          background: #d4af37;
          margin-top: 18px;
        }

        .is-visible .gold-line {
          animation: lineGrow 0.7s ease-out forwards;
          animation-delay: 0.8s;
        }

        .leader-bio {
          opacity: 0;
          transform: translateY(20px);
        }

        .is-visible .leader-bio {
          animation: textUp 0.8s ease-out forwards;
          animation-delay: 0.9s;
        }

        /*
         * Main horizontal movement
         */
        @keyframes contentReveal {
          0% {
            opacity: 0;
            filter: blur(8px);
          }

          25% {
            opacity: 1;
          }

          70% {
            filter: blur(1px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
          }
        }

        /*
         * Gold scanning edge
         */
        @keyframes edgeReveal {
          0% {
            opacity: 0;
            transform: translateX(0);
          }

          15% {
            opacity: 1;
          }

          70% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(
              ${fromLeft ? "calc(100% - 2px)" : "calc(-100% + 2px)"}
            );
          }
        }

        /*
         * Photo
         */
        @keyframes photoReveal {
          0% {
            opacity: 0;
            transform: scale(0.94);
            filter: grayscale(100%);
          }

          60% {
            opacity: 1;
            filter: grayscale(45%);
          }

          100% {
            opacity: 1;
            transform: scale(1);
            filter: grayscale(15%);
          }
        }

        /*
         * Text block
         */
        @keyframes infoReveal {
          0% {
            opacity: 0;
            transform: translateX(
              ${fromLeft ? "35px" : "-35px"}
            );
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes textUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineGrow {
          0% {
            width: 0;
          }

          100% {
            width: 70px;
          }
        }

        @media (max-width: 768px) {
          .leader-reveal {
            transform: translateX(0);
          }

          .reveal-left,
          .reveal-right {
            transform: translateY(50px);
          }

          .leader-reveal.is-visible {
            animation: mobileReveal 1s
              cubic-bezier(0.16, 1, 0.3, 1)
              forwards;
          }

          .reveal-left .reveal-edge,
          .reveal-right .reveal-edge {
            left: 0;
            right: auto;
          }

          .is-visible .reveal-edge {
            animation: mobileEdge 1s ease-out forwards;
          }

          .gold-line {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @keyframes mobileReveal {
          from {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes mobileEdge {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }

          20% {
            opacity: 1;
          }

          to {
            opacity: 0;
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}

export default function Leadership() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">

        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4 text-center">
          Leadership
        </p>

        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-16 text-center">
          The People Behind Big Stage Crafts
        </h2>

        <div className="flex flex-col gap-28">
          {LEADERS.map((leader) => (
            <LeaderReveal
              key={leader.name}
              leader={leader}
            />
          ))}
        </div>

      </div>
    </section>
  );
}