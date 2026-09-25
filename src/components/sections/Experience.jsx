import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import { experienceData } from '../../data/portfolioData';

export default function Experience({ onHoverSound, onClickSound }) {
  const [expandedId, setExpandedId] = useState('exp-1');

  const toggleExpand = (id) => {
    if (onClickSound) onClickSound();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="relative py-24 px-6 max-w-5xl mx-auto">
      <SectionHeading
        badge="// 03. CAREER MILESTONES"
        title="Experience & Technical Leadership"
        subtitle="A journey spanning higher education mentorship, enterprise backend architecture, and autonomous AI automation."
      />

      <div className="relative mt-16">
        {/* Animated Central Glowing Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 opacity-60 shadow-[0_0_12px_#38bdf8]" />

        <div className="space-y-12">
          {experienceData.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Marker */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#050816] border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 * idx }}
                  >
                    <GlassCard
                      onMouseEnter={onHoverSound}
                      className="p-6 cursor-pointer"
                      onClick={() => toggleExpand(exp.id)}
                    >
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 mb-2">
                            {exp.badge}
                          </span>
                          <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                            {exp.role}
                          </h3>
                          <h4 className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
                            {exp.organization}
                          </h4>
                        </div>

                        <button
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:text-white transition-transform"
                          aria-label="Toggle details"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-cyan-400' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Period & Location */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-3 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-cyan-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-indigo-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Expandable Key Highlights */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-white/10 space-y-2.5"
                          >
                            <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider block font-semibold">
                              Key Outcomes & Responsibilities:
                            </span>
                            <ul className="space-y-2">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                  <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Tech Tags */}
                            <div className="pt-3 flex flex-wrap gap-1.5">
                              {exp.tech.map((t, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
