import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'services', label: 'SERVICE' },
  { id: 'work', label: 'PROJECT' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({
  activeSection,
  soundEnabled,
  onToggleSound,
  onHoverSound,
  onClickSound,
  onLenisScroll,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (onClickSound) onClickSound();
    setMobileOpen(false);
    if (onLenisScroll) {
      onLenisScroll(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 px-6 sm:px-12 py-5 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-zinc-900 py-4'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollTo('home')}
          onMouseEnter={onHoverSound}
          className="text-lg sm:text-xl font-black font-display tracking-widest text-white uppercase hover:text-[#ccff00] transition-colors interactive-hover"
        >
          SHALINI
        </button>

        {/* Desktop Nav Links (Matching Reel: HOME ABOUT SERVICE PROJECT CONTACT) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              onMouseEnter={onHoverSound}
              className={`text-xs font-semibold tracking-wider transition-colors duration-200 interactive-hover ${
                activeSection === item.id
                  ? 'text-[#ccff00]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Audio Toggle, Resume & Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="/Shalini_Thummanapally_Resume.pdf"
            download="Shalini_Thummanapally_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onHoverSound}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40 hover:bg-emerald-400 text-emerald-300 hover:text-black text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm interactive-hover"
            title="Download Official Resume PDF"
          >
            <span>RESUME</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            onClick={onToggleSound}
            onMouseEnter={onHoverSound}
            className="p-2.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={16} className="text-[#ccff00]" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white transition-all"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Backdrop Blur */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="md:hidden mt-3 mx-4 p-5 rounded-3xl bg-zinc-950/95 border border-white/10 backdrop-blur-2xl flex flex-col gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-sm font-semibold tracking-wider py-3 px-3 rounded-2xl transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-[#ccff00]/10 text-[#ccff00] font-bold'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
                ) : (
                  <ArrowUpRight size={14} className="text-zinc-600" />
                )}
              </button>
            );
          })}

          {/* Mobile Resume Download Link */}
          <a
            href="/Shalini_Thummanapally_Resume.pdf"
            download="Shalini_Thummanapally_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="text-left text-sm font-semibold tracking-wider py-3 px-3 rounded-2xl transition-all flex items-center justify-between text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 mt-1"
          >
            <span>DOWNLOAD RESUME (PDF)</span>
            <ArrowUpRight size={14} className="text-emerald-400" />
          </a>
        </motion.div>
      )}
    </header>
  );
}
