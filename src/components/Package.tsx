"use client";

interface Package {
  name: string;
  includes: string;
  price: string;
}

const PACKAGES: Package[] = [
  { name: "Wedding Package", includes: "Sound + Lighting + DJ Setup", price: "₹25,000" },
  { name: "Corporate Package", includes: "PA System + Stage Lights", price: "₹50,000" },
  { name: "Concert Package", includes: "Line Array + LED Wall + Lighting", price: "₹1,50,000" },
  { name: "Premium Production Package", includes: "Complete Event Solution", price: "Custom Quote" },
];

export default function Packages() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-zinc-900 bg-[#060606]">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#d4af37] uppercase tracking-widest text-sm mb-4 text-center">
          Bundled Pricing
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-14 text-center">
          Package Deals
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col border border-zinc-800 p-6 transition-colors duration-300 hover:border-[#d4af37]"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{pkg.name}</p>
              <p className="mb-6 flex-1 text-sm text-zinc-500">{pkg.includes}</p>
              <p className="text-xl font-extrabold text-[#d4af37]">{pkg.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}