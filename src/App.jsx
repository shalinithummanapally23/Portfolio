import { useState } from 'react';
import { motion } from 'framer-motion';

// Hooks
import { useLenisScroll } from './hooks/useLenisScroll';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useScrollSpy } from './hooks/useScrollSpy';

// Common UI
import CustomCursor from './components/common/CustomCursor';

// Layout
import Navbar from './components/layout/Navbar';

// Sections (Matching Instagram Reel @lema.web)
import Hero from './components/sections/Hero';
import Intro from './components/sections/Intro';
import WhatWeCanDo from './components/sections/WhatWeCanDo';
import SelectedWork from './components/sections/SelectedWork';
import ContactReel from './components/sections/ContactReel';
import FooterReel from './components/sections/FooterReel';

const sectionIds = ['home', 'about', 'services', 'work', 'contact'];

export default function App() {
  // Lenis Luxury Inertial Smooth Scrolling
  const { scrollTo } = useLenisScroll();

  // Procedural Sound Effects
  const { soundEnabled, toggleSound, playHover, playClick, playSuccess } = useSoundEffects();

  // Scroll Spy for Navbar active state
  const { activeSection } = useScrollSpy(sectionIds);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black overflow-x-hidden font-sans">
      {/* Custom Sleek Magnetic Cursor */}
      <CustomCursor />

      {/* Minimalist Fixed Header */}
      <Navbar
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onHoverSound={playHover}
        onClickSound={playClick}
        onLenisScroll={scrollTo}
      />

      {/* Main Flow Matching the Reel */}
      <main className="relative z-10">
        {/* 1. Hero: PORTFOLIO with Shalini in Suit Cutout & Software Developer Subtitle */}
        <Hero onHoverSound={playHover} onClickSound={playClick} />

        {/* 2. Intro: Shalini in Suit & Bio Glass Card & Tech Stack Badges */}
        <Intro onHoverSound={playHover} />

        {/* 3. Services: WHAT WE CAN DO with Neon Lime Expanding Accordion */}
        <WhatWeCanDo onHoverSound={playHover} onClickSound={playClick} />

        {/* 4. Projects: SELECTED work with Alternating Cards & Live Demo / GitHub CTAs */}
        <SelectedWork onHoverSound={playHover} onClickSound={playClick} />

        {/* 5. Contact: Get in touch Form & Direct Coordinates */}
        <ContactReel
          onHoverSound={playHover}
          onClickSound={playClick}
          onPlaySuccess={playSuccess}
        />
      </main>

      {/* 6. Footer: SHALINI Illuminated by Emerald Horizon Aurora Glow */}
      <FooterReel onHoverSound={playHover} onClickSound={playClick} />
    </div>
  );
}
