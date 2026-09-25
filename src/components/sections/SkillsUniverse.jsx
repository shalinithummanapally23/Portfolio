import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, Sparkles, X, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import SkillsSolarCanvas from '../3d/SkillsSolarCanvas';
import GlassCard from '../common/GlassCard';

export default function SkillsUniverse({ onHoverSound, onClickSound }) {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handlePlanetSelect = (planet) => {
    if (onClickSound) onClickSound();
    setSelectedPlanet(planet);
  };

  return (
    <section id="solar-skills" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <SectionHeading
        badge="// 3D SKILLS UNIVERSE"
        title="Orbital Architecture Solar System"
        subtitle="At the core burns enterprise Java, anchoring orbiting technological planets that power high-concurrency microservices, AI inference, and reactive interfaces."
      />

      <div className="relative rounded-3xl bg-slate-950/60 border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 overflow-hidden">
        {/* Three.js 3D Solar Canvas */}
        <SkillsSolarCanvas onSelectPlanet={handlePlanetSelect} />

        {/* Selected Planet Details Drawer / Panel */}
        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="absolute top-4 right-4 bottom-4 w-80 sm:w-96 z-20 p-6 rounded-2xl bg-[#090f26]/95 backdrop-blur-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-950/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-[0_0_10px]"
                      style={{
                        backgroundColor: `#${selectedPlanet.color.toString(16).padStart(6, '0')}`,
                        boxShadow: `0 0 12px #${selectedPlanet.color.toString(16).padStart(6, '0')}`,
                      }}
                    />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      PLANETARY SPECIFICATION
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedPlanet(null)}
                    onMouseEnter={onHoverSound}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors interactive-hover"
                  >
                    <X size={16} />
                  </button>
                </div>

                <h3 className="text-2xl font-display font-extrabold text-white mb-2">
                  {selectedPlanet.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {selectedPlanet.description}
                </p>

                {/* Proficiency Gauge */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Gravitational Mastery</span>
                    <span className="text-cyan-400 font-bold text-sm">
                      {selectedPlanet.proficiency}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                      style={{ width: selectedPlanet.proficiency }}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span>Orbital Distance</span>
                    <span className="text-slate-200">{selectedPlanet.distance} AU</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span>Atmospheric Ring</span>
                    <span className="text-slate-200">{selectedPlanet.hasRing ? 'Yes (Active)' : 'None'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Core Tether</span>
                    <span className="text-cyan-300 font-bold">Java 17+ Core</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlanet(null)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all interactive-hover"
              >
                Close Planet Telemetry
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
