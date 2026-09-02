'use client';
import React from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import WhyChooseUs from '@/components/Whychooseus';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060606] text-white">
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />

        {/* Next to build, in this order: Projects, Rentals, Packages, Contact */}
        <div className="py-20 text-center text-zinc-600 text-sm tracking-widest uppercase">
          [ More sections coming next ]
        </div>
      </div>
    </main>
  );
}