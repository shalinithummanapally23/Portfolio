import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Zap, Shield, Bot, Layers, Sparkles, Terminal, Code2 } from 'lucide-react';
import { Github } from '../common/BrandIcons';
import GlassCard from '../common/GlassCard';
import SectionHeading from '../common/SectionHeading';
import MagneticButton from '../common/MagneticButton';
import { projectsData } from '../../data/portfolioData';

export default function WebSlingerProfile({ onSelectProject, onHoverSound, onClickSound }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHoveringWeb, setIsHoveringWeb] = useState(false);

  const activeProject = projectsData[activeProjectIndex];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 40, y: y * 40 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHoveringWeb(false);
  };

  const switchProject = (idx) => {
    if (onClickSound) onClickSound();
    setActiveProjectIndex(idx);
  };

  return (
    <section
      id="webslinger"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden select-none"
    >
      <SectionHeading
        badge="// SPIDER-VERSE PROFILE ENGINE"
        title="Multiverse Developer Architecture"
        subtitle="Like Spider-Man pulling high-speed objects with precision web lines, Manohar anchors distributed backends and autonomous AI agents together."
      />

      {/* Giant Layered Backdrop Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5 z-0 font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-white uppercase whitespace-nowrap overflow-hidden">
        SPRING BOOT // REACT // AI
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
        {/* Left Column: Stylized Spider-Verse Character Avatar */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          {/* Comic Frame Container */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
            className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/20 group"
          >
            {/* Halftone Comic Dots Pattern Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 z-10 mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            />

            {/* Comic Header Bar */}
            <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/60 text-[11px] font-mono text-cyan-300 font-bold tracking-wider shadow-lg">
                MANOHAR AKUTHOTA // EARTH-1610
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 backdrop-blur-md border border-purple-400/60 text-[10px] font-mono text-purple-300 font-bold">
                THWIP! ACTIVE
              </span>
            </div>

            {/* Character Image */}
            <img
              src="/assets/spiderverse_developer.jpg"
              alt="Manohar Akuthota - Spider-Verse Developer Avatar"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Subtle Vignette & Neon Rim Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Zap size={13} className="animate-pulse" />
                JAVA CORE + AI VISION
              </span>
              <span className="text-purple-300 font-semibold">TENSION: 100% OK</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Web-Suspended Interactive Project Card */}
        <div className="lg:col-span-6 relative flex flex-col justify-center">
          {/* Dynamic SVG Spiderweb Grapple Lines connecting character to card */}
          <div className="relative w-full">
            {/* Suspended Project Card reacting to mouse tension */}
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 0.9, x: 30, rotate: 2 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mouseOffset.x * 0.3,
                y: mouseOffset.y * 0.3,
                rotate: mouseOffset.x * 0.08,
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 200,
              }}
              className="relative z-20"
            >
              <GlassCard
                onMouseEnter={() => {
                  setIsHoveringWeb(true);
                  if (onHoverSound) onHoverSound();
                }}
                onMouseLeave={() => setIsHoveringWeb(false)}
                className="p-6 md:p-8 border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/20"
                tiltIntensity={12}
              >
                {/* Spiderweb Web Anchor Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/30">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    SLINGSHOT TARGET: {activeProject.category}
                  </span>

                  <div className="text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                    0{activeProjectIndex + 1} / 0{projectsData.length}
                  </div>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-300 font-mono mb-4">
                  {activeProject.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6">
                  {activeProject.description}
                </p>

                {/* Animated Metric Gauge */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">KEY METRIC</span>
                    <span className="text-lg font-display font-extrabold text-gradient">
                      {activeProject.stats[0].value}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">PERFORMANCE</span>
                    <span className="text-lg font-display font-extrabold text-gradient-purple">
                      {activeProject.stats[1].value}
                    </span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {activeProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <MagneticButton
                    onClick={() => {
                      if (onClickSound) onClickSound();
                      onSelectProject(activeProject);
                    }}
                    onHoverSound={onHoverSound}
                    variant="primary"
                    className="px-5 py-2.5 text-xs font-bold"
                  >
                    <span>Inspect Architecture</span>
                    <ArrowUpRight size={14} />
                  </MagneticButton>

                  <div className="flex items-center gap-2">
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={onHoverSound}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors interactive-hover"
                      title="View Code Repository"
                      aria-label="View Source Code"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Web Slingshot Project Switcher */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {projectsData.map((p, idx) => {
                const isActive = activeProjectIndex === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => switchProject(idx)}
                    onMouseEnter={onHoverSound}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 interactive-hover flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400 scale-105'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>🕸️</span>
                    <span className="hidden sm:inline">{p.title}</span>
                    <span className="sm:hidden">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
