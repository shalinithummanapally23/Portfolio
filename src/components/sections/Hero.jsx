import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';

export default function Hero({ onHoverSound, onClickSound }) {
  const scrollTo = (id) => {
    if (onClickSound) onClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] min-h-[580px] max-h-[1080px] bg-black overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-12 select-none"
    >
      {/* 3D Volumetric Studio Center Atmosphere with Gray Spotlight for Hair Separation */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_42%,rgba(170,175,185,0.25)_0%,rgba(100,105,115,0.12)_35%,rgba(204,255,0,0.03)_60%,transparent_75%)]" />

      {/* Cyber Grid Depth Atmosphere */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="w-full" />

      {/* 3D Center Stage: Pure Typography + 3D Portrait Layered over TF */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        {/* Layer 1: Background Chrome PORTFOLIO Text */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full text-center pointer-events-none -mt-40 sm:-mt-20 md:-mt-20"
        >
          <h1 className="text-[17vw] sm:text-[15vw] font-black uppercase tracking-wider sm:tracking-normal leading-none font-display bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            PORTFOLIO
          </h1>
        </motion.div>

        {/* Layer 2: Dedicated Soft Studio Gray Backlight behind Head for Hair Definition */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-15 w-[min(380px,86vw)] sm:w-[500px] h-[50vh] sm:h-[55vh] pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(180,185,195,0.32)_0%,rgba(110,115,125,0.16)_40%,transparent_70%)]" />

        {/* Layer 3: Foreground Executive 3D Portrait Layered over TF (Static, Stable, High-Dimension) */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center items-end w-full"
        >
          <div className="relative w-[min(350px,82vw)] sm:w-[440px] md:w-[500px] lg:w-[560px] h-[52vh] sm:h-[65vh] md:h-[72vh] max-h-[680px]">
            <img
              src="/assets/shalini_hero.png"
              alt="Thummanapally Shalini - Junior Java Developer"
              className="w-full h-full object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
            />
            {/* Smooth Vignette Melting into Pure Black Floor */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Info & Action Strip */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
        {/* Left: Role Title */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight font-display">
              Junior Java Developer
            </span>
          </div>
          <span className="text-xs sm:text-sm text-zinc-400 font-mono mt-0.5">
            Spring Boot • REST APIs • React.js • MySQL
          </span>
        </motion.div>

        {/* Right: Contact & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-end"
        >
          <a
            href="/Shalini_Thummanapally_Resume.pdf"
            download="Shalini_Thummanapally_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onHoverSound}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40 hover:bg-emerald-400 text-emerald-300 hover:text-black text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 interactive-hover shadow-lg"
          >
            <FileText size={15} />
            <span>Resume (PDF) ↓</span>
          </a>

          <button
            onClick={() => scrollTo('work')}
            onMouseEnter={onHoverSound}
            className="w-10 h-10 rounded-full border border-zinc-700 hover:border-[#ccff00] bg-zinc-900/60 hover:bg-[#ccff00] text-white hover:text-black flex items-center justify-center transition-all duration-300 group interactive-hover shadow-lg"
            aria-label="View Projects"
          >
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={onHoverSound}
            className="px-5 sm:px-6 py-2.5 rounded-full border border-zinc-700 hover:border-[#ccff00] bg-zinc-950/80 hover:bg-[#ccff00] text-zinc-200 hover:text-black text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 interactive-hover shadow-lg"
          >
            Contact
          </button>
        </motion.div>
      </div>
    </section>
  );
}
