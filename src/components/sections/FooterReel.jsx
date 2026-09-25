import { motion } from 'framer-motion';

export default function FooterReel({ onHoverSound, onClickSound }) {
  const scrollTo = (id) => {
    if (onClickSound) onClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-black text-white pt-16 sm:pt-20 pb-8 px-4 sm:px-12 select-none overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12 sm:space-y-16">
        {/* Top Header Strip (Matching Reel Frame 12) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pb-10 sm:pb-12 border-b border-zinc-900">
          <div>
            <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
              Connect with me
            </span>
            <a
              href="mailto:shalinithummanapally@gmail.com"
              onMouseEnter={onHoverSound}
              className="text-lg sm:text-2xl md:text-3xl font-bold text-white hover:text-[#ccff00] transition-colors font-mono break-all sm:break-normal"
            >
              shalinithummanapally@gmail.com
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <span className="block text-base font-bold text-white">Let's build something</span>
              <span className="block text-xs text-zinc-400">Junior Java Developer open for high-impact opportunities.</span>
            </div>

            <button
              onClick={() => scrollTo('contact')}
              onMouseEnter={onHoverSound}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-[#ccff00] text-black text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:scale-105 shrink-0"
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Links and Socials (Matching Reel Frame 12) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs sm:text-sm text-zinc-400">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Services</button>
            <button onClick={() => scrollTo('work')} className="hover:text-white transition-colors">Projects</button>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="mailto:shalinithummanapally@gmail.com" className="hover:text-white transition-colors">Email</a>
            <a href="/Shalini_Thummanapally_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Resume</a>
          </div>
        </div>

        {/* Massive Glowing Aurora Brand Display (Matching Reel Frame 12) */}
        <div className="relative w-full pt-16 pb-10 flex flex-col items-center justify-center overflow-hidden">
          {/* Emerald Curved Aurora Glow Image Background */}
          <div className="absolute inset-x-0 bottom-0 h-72 sm:h-96 pointer-events-none opacity-90 overflow-hidden flex justify-center items-end">
            <img
              src="/assets/footer_aurora.jpg"
              alt="Aurora Horizon Glow"
              className="w-full max-w-6xl h-full object-cover object-bottom filter contrast-125 saturate-150 mix-blend-screen"
            />
          </div>

          {/* Huge Luminous Name: SHALINI */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10 text-[16vw] sm:text-[17vw] md:text-[18vw] font-black uppercase font-display tracking-tight leading-none text-white drop-shadow-[0_0_35px_rgba(16,185,129,0.5)] select-none text-center"
          >
            SHALINI
          </motion.h1>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <span>© 2026 Shalini Thummanapally. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms and conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
