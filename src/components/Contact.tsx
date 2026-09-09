"use client";

import { useState } from "react";

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append(
      "subject",
      "New Enquiry — Big Stage Crafts Website"
    );

    try {
      const res = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="bg-[#060606] text-white font-display"
    >
      {/* =========================
          CONTACT FORM
      ========================= */}
      <div className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-4xl">

          <p className="mb-4 text-center text-sm uppercase tracking-widest text-[#d4af37]">
            Get In Touch
          </p>

          <h2 className="mb-14 text-center text-3xl font-extrabold uppercase tracking-wide md:text-5xl">
            Plan Your Event With Us
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-6">

            <div className="grid gap-6 md:grid-cols-2">

              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="border border-zinc-700 bg-transparent px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#d4af37]"
              />

              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                className="border border-zinc-700 bg-transparent px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#d4af37]"
              />

            </div>

            <textarea
              name="message"
              required
              rows={5}
              placeholder="What can we help you with?"
              className="resize-none border border-zinc-700 bg-transparent px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#d4af37]"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-4 justify-self-center border border-[#d4af37] px-10 py-3 text-sm uppercase tracking-widest text-[#d4af37] transition-colors duration-300 hover:bg-[#d4af37] hover:text-black disabled:opacity-50"
            >
              {status === "sending"
                ? "Sending..."
                : "Send Enquiry"}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-green-500">
                Thank you — we&apos;ll get back to you shortly.
              </p>
            )}

            {status === "error" && (
              <p className="text-center text-sm text-red-500">
                Something went wrong — please try again or call us directly.
              </p>
            )}

          </form>
        </div>
      </div>

      {/* =========================
          CREAM FOOTER
      ========================= */}
      <footer className="bg-[#f8f3e3] px-6 py-14 text-[#111111] font-display md:px-16">

        <div className="mx-auto max-w-6xl">

          {/* =========================
              FOOTER TOP
          ========================= */}
          <div className="grid gap-10 md:grid-cols-4">

            {/* OFFICE + ADDRESS */}
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-black/45">
                Office
              </p>

              <p className="text-sm leading-relaxed">
                53/2, Burkit Road,
                <br />
                T. Nagar,
                <br />
                Chennai 600017
              </p>
            </div>


            {/* CONTACT */}
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-black/45">
                Contact
              </p>

              <div className="flex flex-col gap-1 text-sm leading-relaxed">

                <a
                  href="tel:+918680841111"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  8680841111
                </a>

                <a
                  href="mailto:bigstagecrafts@gmail.com"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  bigstagecrafts@gmail.com
                </a>

                <a
                  href="https://bigstagecrafts.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  bigstagecrafts.in
                </a>

              </div>
            </div>


            {/* SITEMAP */}
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-black/45">
                Sitemap
              </p>

              <div className="flex flex-col gap-1 text-sm">

                <a
                  href="#services"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Services
                </a>

                <a
                  href="#inventory"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Inventory
                </a>

                <a
                  href="#gallery"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Gallery
                </a>

                <a
                  href="#contact"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Contact
                </a>

              </div>
            </div>


            {/* BSC */}
            <div className="flex items-start justify-start md:justify-end">

              <p className="font-display text-4xl tracking-[0.12em]">
                BSC
              </p>

            </div>

          </div>


          {/* =========================
              SOCIALS — BOTTOM CENTER
          ========================= */}
          <div className="mt-12 border-t border-black/10 pt-8">

            <p className="mb-5 text-center text-[10px] uppercase tracking-[0.25em] text-black/45">
              Follow Us
            </p>

            <div className="flex justify-center gap-8">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/bigstagecraftsbsc?stkn=MTdlZ2k4dXk3cnhsNg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-all duration-300 hover:scale-110 hover:text-[#d4af37]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
              </a>


              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1JkKLREm78/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-all duration-300 hover:scale-110 hover:text-[#d4af37]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.8V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8v3h2.6v8h2.9Z" />
                </svg>
              </a>


              {/* WhatsApp */}
              <a
                href="https://wa.me/8680841111"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-all duration-300 hover:scale-110 hover:text-[#d4af37]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12l-.3.5.1.5-3 .8-.5-.3a8 8 0 1 1-3.2-13.5Zm-3.3 3.5c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.4 4 .6.3 1.1.4 1.5.5.6.1 1.1.1 1.5-.1.5-.2 1.5-.7 1.7-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.7-.4l-1.5-.7c-.4-.1-.6-.2-.8.2l-.6.8c-.2.2-.4.3-.7.1-1.1-.5-1.9-1-2.7-2-.2-.3-.5-.6-.7-.9-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.4.1-.7l-.7-1.7c-.2-.4-.4-.4-.7-.4Z" />
                </svg>
              </a>

            </div>
          </div>


          {/* =========================
              COPYRIGHT
          ========================= */}
          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.16em] text-black/40">
            © {new Date().getFullYear()} Big Stage Crafts
          </p>

        </div>
      </footer>
    </section>
  );
}