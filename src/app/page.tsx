'use client';
import React from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import WhyChooseUs from '@/components/Whychooseus';
import IntroSequence from '@/components/IntroSequence';
import Leadership from '@/components/Leadership';
import MediaGallery from '@/components/MediaGallery';
import ContactSection from '@/components/Contact';
import Inventory from '@/components/Inventory';
import Packages from '@/components/Package';
import Reveal from '@/components/Reveal';
import ScrollSection from '@/components/ScrollSection';
//import footer from '@/components/Footer';

import { useState } from 'react';
import Footer from '@/components/Footer';


export default function Home() {
  

  return (
    <main className="min-h-screen bg-ink text-platinum">
      <IntroSequence />
      <Navbar />
      <div className="relative z-10">
        <div id="home"><Hero  /></div>
        {/* ...rest unchanged */}
       <ScrollSection><div id="legacy"><About /></div></ScrollSection>
        <ScrollSection><Leadership/></ScrollSection>
       <ScrollSection> <div id="services"><Services /></div></ScrollSection>
       <ScrollSection> <div id="experience"><WhyChooseUs /></div></ScrollSection>
        {/* <div id="past"><PastClients/></div><*/}
        <ScrollSection><div id="gallery"><MediaGallery/></div></ScrollSection>
        <ScrollSection> <div id="inventory"><Inventory/></div></ScrollSection>
        <ScrollSection><div id="package"><Packages/></div></ScrollSection>
        <ScrollSection> <div id="contact"><ContactSection/></div></ScrollSection>
       {/* <ScrollSection> <div id="footer"><Footer/></div></ScrollSection>*/}
       
      </div>
    </main>
  );
}