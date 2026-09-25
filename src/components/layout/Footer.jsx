import { useState, useEffect } from 'react';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../common/BrandIcons';
import { personalInfo } from '../../data/portfolioData';

export default function Footer({ onHoverSound, onClickSound }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (onClickSound) onClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050816]/90 backdrop-blur-xl z-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Col 1: Brand & Narrative */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center font-display font-bold text-white text-xs shadow-md shadow-cyan-500/20">
                TS
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Thummanapally Shalini
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Java Spring Boot Developer, React Developer, and AI Enthusiast. Dedicated to crafting resilient enterprise microservices, modern intuitive user interfaces, and autonomous intelligent systems.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Hyderabad, India: {currentTime || 'IST'}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Explore Portfolio
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              {['about', 'skills', 'experience', 'projects', 'code', 'contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onMouseEnter={onHoverSound}
                    onClick={() => {
                      if (onClickSound) onClickSound();
                    }}
                    className="hover:text-cyan-400 transition-colors capitalize interactive-hover"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Socials & Direct Connect */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Connect Directly
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={onHoverSound}
                className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors interactive-hover"
              >
                <Github size={16} />
                <span>GitHub Profile</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={onHoverSound}
                className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors interactive-hover"
              >
                <Linkedin size={16} />
                <span>LinkedIn Network</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                onMouseEnter={onHoverSound}
                className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors interactive-hover"
              >
                <Mail size={16} />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Shalini Thummanapally. Built with React, Three.js & Tailwind CSS.</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={onHoverSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors interactive-hover"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
