import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Database, Server, Smartphone, Layers, ArrowRight } from 'lucide-react';
import { Github } from '../common/BrandIcons';

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onHoverSound,
  onClickSound,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop Blur & Cinematic Depth Warp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030614]/90 backdrop-blur-3xl"
          />

          {/* Modal Container with Fly-Through Camera Push-In */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280, mass: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090e24] border border-cyan-400/30 shadow-2xl shadow-cyan-950/80 z-10 my-auto text-slate-100"
          >
            {/* Top Glowing Header Banner */}
            <div className={`relative p-6 sm:p-8 rounded-t-3xl bg-gradient-to-r ${project.imageGradient} border-b border-white/10 overflow-hidden`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 border border-white/15 text-cyan-300 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    CAMERA FLY-THROUGH // {project.category}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-medium">
                    {project.tagline}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (onClickSound) onClickSound();
                    onClose();
                  }}
                  onMouseEnter={onHoverSound}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-colors interactive-hover"
                  aria-label="Close modal and fly backward"
                  title="Close and fly backward"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6 relative z-10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={onHoverSound}
                  onClick={() => onClickSound && onClickSound()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all interactive-hover"
                >
                  <Github size={15} />
                  <span>Source Code</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={onHoverSound}
                  onClick={() => onClickSound && onClickSound()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-indigo-500 text-black shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all interactive-hover"
                >
                  <span>Interactive Preview</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col justify-center items-center text-center shadow-inner"
                  >
                    <span className="text-xl sm:text-2xl font-display font-extrabold text-gradient">
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-400 font-mono mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Project Narrative */}
              <div>
                <h4 className="text-base font-display font-bold text-white mb-2 flex items-center gap-2">
                  <Layers size={18} className="text-cyan-400" />
                  Overview & Architecture Intent
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Interactive Architecture Flow Diagram */}
              <div>
                <h4 className="text-base font-display font-bold text-white mb-3 flex items-center gap-2">
                  <Cpu size={18} className="text-purple-400" />
                  Volumetric Architecture Pipeline
                </h4>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/25 space-y-4 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                      <div className="text-xs font-mono text-cyan-400 mb-1 flex items-center justify-center gap-1.5">
                        <Smartphone size={14} />
                        Client / Interface
                      </div>
                      <div className="text-xs font-medium text-slate-200">{project.architecture.client}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                      <div className="text-xs font-mono text-indigo-400 mb-1 flex items-center justify-center gap-1.5">
                        <Server size={14} />
                        Core / Gateway
                      </div>
                      <div className="text-xs font-medium text-slate-200">{project.architecture.gateway}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
                      <div className="text-xs font-mono text-purple-400 mb-1 flex items-center justify-center gap-1.5">
                        <Database size={14} />
                        Persistence / Inference
                      </div>
                      <div className="text-xs font-medium text-slate-200">{project.architecture.storage}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      API & Data Execution Sequence:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                      {project.architecture.flow.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ArrowRight size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Features */}
              <div>
                <h4 className="text-base font-display font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  Verified Production Resiliency
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-300 leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
