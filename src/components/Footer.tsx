// src/components/Footer.tsx
"use client";

const SITEMAP = [
  { label: "Services", href: "#services" },
  { label: "Inventory", href: "#inventory" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-cream text-cream-ink px-6 py-14 md:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cream-ink/50">Office</p>
          <p className="text-sm leading-relaxed">Chennai, Tamil Nadu<br />South India</p>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cream-ink/50">Contact</p>
          <p className="text-sm leading-relaxed">+91 86808 41111<br />info@bigstagecrafts.com</p>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cream-ink/50">Sitemap</p>
          <div className="flex flex-col gap-1 text-sm">
            {SITEMAP.map((s) => (
              <a key={s.href} href={s.href} className="hover:underline">{s.label}</a>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-start md:justify-end">
          <p className="font-display text-4xl tracking-[0.12em]">BSC</p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-[11px] uppercase tracking-[0.16em] text-cream-ink/45">
        © {new Date().getFullYear()} Big Stage Crafts
      </p>
    </footer>
  );
}