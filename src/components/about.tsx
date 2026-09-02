"use client";

export default function About() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-[#060606]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4">
          Since 1954
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-8">
          A Legacy of Excellence
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6">
          For over seven decades, we have stood as a symbol of trust, innovation, and excellence
          in the event production industry — pioneers of professional sound, lighting, stage, and
          event production services in South India, carrying forward a legacy through three
          generations of dedicated leadership.
        </p>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-12">
          With a modern event management team boasting 15+ years of specialised expertise, we have
          successfully executed over 1,000 events — from Filmfare events and celebrity parties to
          weddings, corporate conventions, and live concerts across South India.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#d4af37]">70+</p>
            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">Years of Legacy</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#d4af37]">1000+</p>
            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">Events Delivered</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#d4af37]">3</p>
            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">Generations</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#d4af37]">15+</p>
            <p className="text-zinc-500 text-sm uppercase tracking-wide mt-1">Years Modern Expertise</p>
          </div>
        </div>
      </div>
    </section>
  );
}