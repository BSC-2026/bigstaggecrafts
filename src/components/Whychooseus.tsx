"use client";

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

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-[#060606]">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4 text-center">
          Trusted Since 1954
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-14 text-center">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REASONS.map((reason, i) => (
            <div
              key={i}
              className="flex items-start gap-4 border border-zinc-800 rounded-sm p-5 hover:border-[#d4af37] transition-colors duration-300"
            >
              <span className="text-[#d4af37] text-xl leading-none mt-0.5">✓</span>
              <p className="text-zinc-200 text-base md:text-lg tracking-wide">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}