"use client";

import { useEffect, useRef } from "react";

interface MediaItem {
  type: "photos" | "videos";
  src: string;
  poster?: string;
}

// Your existing media — unchanged
const MEDIA: MediaItem[] = [
    { type: "videos", src: "/Videos/5.mp4" },
  { type: "photos", src: "/Photos/1.jpeg" },
  { type: "photos", src: "/Photos/2.jpeg" },
  { type: "videos", src: "/Videos/1.mp4" },
  { type: "photos", src: "/Photos/3.jpeg" },
  { type: "photos", src: "/Photos/4.jpeg" },
  { type: "videos", src: "/Videos/2.mp4" },
  { type: "photos", src: "/Photos/5.jpeg" },
  { type: "photos", src: "/Photos/8.jpeg" },
  { type: "videos", src: "/Videos/4.mp4" },
  { type: "photos", src: "/Photos/7.jpeg" },
  { type: "photos", src: "/Photos/6.jpeg" },
  { type: "videos", src: "/Videos/3.mp4" },
  { type: "photos", src: "/Photos/9.jpeg" },
  { type: "photos", src: "/Photos/10.jpeg" },
  { type: "photos", src: "/Photos/11.jpeg" },
];

const COLUMN_GAP = 18;

// Different speeds create the depth/parallax effect
const COLUMN_SPEEDS = [0.55, 0.8, 0.6];

export default function InfiniteMediaScroll() {
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const offsetsRef = useRef([0, 0, 0]);

  const pausedRef = useRef(false);

  const rafRef = useRef(0);

  /*
   * Split the media into 3 columns.
   */
  const columns: MediaItem[][] = [[], [], []];

  MEDIA.forEach((item, index) => {
    columns[index % 3].push(item);
  });

  /*
   * Infinite scrolling animation
   */
  useEffect(() => {
    let lastTime = performance.now();

    function tick(currentTime: number) {
      const delta = Math.min(currentTime - lastTime, 32);

      lastTime = currentTime;

      if (!pausedRef.current) {
        columnRefs.current.forEach((column, index) => {
          if (!column) return;

          const speed = COLUMN_SPEEDS[index];

          /*
           * Column 1 and 3 move upward.
           * Column 2 moves downward.
           */
          const direction = index === 1 ? 1 : -1;

          offsetsRef.current[index] +=
            speed * direction * (delta / 16.67);

          /*
           * Because the content is duplicated,
           * wrap when one complete set has passed.
           */
          const halfHeight = column.scrollHeight / 2;

          if (
            direction === -1 &&
            offsetsRef.current[index] <= -halfHeight
          ) {
            offsetsRef.current[index] += halfHeight;
          }

          if (
            direction === 1 &&
            offsetsRef.current[index] >= 0
          ) {
            offsetsRef.current[index] -= halfHeight;
          }

          column.style.transform = `translate3d(0, ${offsetsRef.current[index]}px, 0)`;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /*
   * Start video when mouse enters
   */
  function handleTileEnter(
    columnIndex: number,
    itemIndex: number,
    item: MediaItem
  ) {
    if (item.type !== "videos") return;

    // Stop the infinite scrolling
    pausedRef.current = true;

    /*
     * IMPORTANT:
     * Use itemIndex instead of originalIndex.
     *
     * This gives every duplicated video its own ref.
     */
    const key = `${columnIndex}-${itemIndex}`;

    const video = videoRefs.current[key];

    if (video) {
      video.currentTime = 0;

      video
        .play()
        .catch(() => {
          // Ignore browser playback errors
        });
    }
  }

  /*
   * Pause video when mouse leaves
   */
  function handleTileLeave(
    columnIndex: number,
    itemIndex: number,
    item: MediaItem
  ) {
    if (item.type !== "videos") return;

    const key = `${columnIndex}-${itemIndex}`;

    const video = videoRefs.current[key];

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    // Resume infinite scrolling
    pausedRef.current = false;
  }

  return (
    <section className="py-24 bg-[#0a0a0a] border-b border-zinc-900 overflow-hidden">

      {/* SECTION TITLE */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 mb-14">

        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4 text-center">
          Our Work
        </p>

        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide text-center">
          Moments We&apos;ve Crafted
        </h2>

      </div>


      {/* GALLERY */}
      <div
        className="
          relative
          w-full
          max-w-[1500px]
          mx-auto
          px-4 md:px-8
          overflow-hidden
        "
        style={{
          height: "650px",

          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            items-start
          "
          style={{
            gap: `${COLUMN_GAP}px`,
          }}
        >

          {columns.map((column, columnIndex) => {

            /*
             * Duplicate each column so the movement
             * can loop continuously without a visible gap.
             */
            const displayItems = [...column, ...column];

            return (
              <div
                key={columnIndex}
                className="relative overflow-hidden"
                style={{
                  height: "900px",
                }}
              >

                <div
                  ref={(el) => {
                    columnRefs.current[columnIndex] = el;
                  }}
                  className="flex flex-col gap-[18px]"
                  style={{
                    willChange: "transform",
                  }}
                >

                  {displayItems.map((item, itemIndex) => {

                    /*
                     * Original item index.
                     *
                     * Used only to identify the original media item.
                     */
                    const originalIndex =
                      itemIndex % column.length;

                    /*
                     * IMPORTANT:
                     *
                     * itemIndex is used here instead of originalIndex.
                     *
                     * Since every column is duplicated,
                     * the first and second copies now have
                     * different video refs.
                     */
                    const videoKey =
                      `${columnIndex}-${itemIndex}`;

                    /*
                     * Slightly different sizes create
                     * the editorial / masonry feeling.
                     */
                    const isLarge =
                      (itemIndex + columnIndex) % 4 === 0;

                    return (
                      <div
                        key={`${columnIndex}-${itemIndex}`}
                        className="
                          group
                          relative
                          w-full
                          overflow-hidden
                          bg-zinc-900
                          rounded-sm
                        "
                        style={{
                          height: isLarge ? 300 : 240,
                        }}

                        /*
                         * Start video on hover
                         */
                        onMouseEnter={() =>
                          handleTileEnter(
                            columnIndex,
                            itemIndex,
                            item
                          )
                        }

                        /*
                         * Stop video when cursor leaves
                         */
                        onMouseLeave={() =>
                          handleTileLeave(
                            columnIndex,
                            itemIndex,
                            item
                          )
                        }
                      >

                        {item.type === "photos" ? (

                          /* PHOTO */
                          <img
                            src={item.src}
                            alt=""
                            draggable={false}
                            className="
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-700
                              ease-out
                              group-hover:scale-[1.04]
                            "
                          />

                        ) : (

                          /* VIDEO */
                          <video
                            ref={(el) => {
                              videoRefs.current[videoKey] = el;
                            }}
                            src={item.src}
                            poster={item.poster}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-700
                              ease-out
                              group-hover:scale-[1.04]
                            "
                          />

                        )}

                        {/* SUBTLE OVERLAY */}
                        <div
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-black/0
                            group-hover:bg-black/10
                            transition-colors
                            duration-500
                          "
                        />

                      </div>
                    );
                  })}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}