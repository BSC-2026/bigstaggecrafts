"use client";

const SERVICES = [
  "Professional Sound Reinforcement Systems",
  "Architectural & Intelligent Lighting Solutions",
  "LED Video Walls & Display Systems",
  "Stage Design & Fabrication",
  "Trussing & Rigging Solutions",
  "Concert & Festival Production",
  "Corporate Event Management",
  "Wedding Production & Entertainment Solutions",
  "Exhibition & Trade Show Setup",
  "Live Streaming & Hybrid Event Solutions",
  "DJ & Performance Stage Setup",
  "Power Distribution & Event Infrastructure",
];

export default function Services() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4 text-center">
          What We Do
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-14 text-center">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="border border-zinc-800 rounded-sm p-6 hover:border-[#d4af37] transition-colors duration-300"
            >
              <p className="text-[#d4af37] text-sm mb-2">{String(i + 1).padStart(2, "0")}</p>
              <p className="text-zinc-200 text-base md:text-lg tracking-wide">{service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}