import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Database, Layout, Server, Wrench } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import { skillsData } from '../../data/portfolioData';

const categoryIcons = {
  All: Sparkles,
  Backend: Server,
  Frontend: Layout,
  Database: Database,
  'AI & Data': Cpu,
  'Tools & DevOps': Wrench,
};

export default function Skills({ onHoverSound, onClickSound }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skillsData.skills
    : skillsData.skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading
        badge="// 02. TECHNICAL ARSENAL"
        title="Floating Skill Orbs & Proficiencies"
        subtitle="Each capability is forged through real-world system architecture, high-frequency debugging, and production deployments."
      />

      {/* Category Tabs Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {skillsData.categories.map((cat) => {
          const Icon = categoryIcons[cat] || Sparkles;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => {
                if (onClickSound) onClickSound();
                setActiveCategory(cat);
              }}
              onMouseEnter={onHoverSound}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 interactive-hover ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40 scale-105'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-white' : 'text-cyan-400'} />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Skill Orbs Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -6, scale: 1.05 }}
              onMouseEnter={onHoverSound}
              className="group relative"
            >
              <div className="relative p-4 rounded-2xl bg-[#0b112c]/70 backdrop-blur-xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 flex flex-col items-center text-center shadow-lg group-hover:shadow-cyan-500/20">
                {/* Floating Orb Icon */}
                <div className="relative w-14 h-14 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <span className="relative z-10">{skill.icon}</span>
                  {/* Subtle pulsing background glow */}
                  <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Skill Name */}
                <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h4>

                {/* Category & Highlight */}
                <span className="text-[10px] font-mono text-slate-400 mt-1 line-clamp-1">
                  {skill.highlight}
                </span>

                {/* Proficiency Bar with Glow */}
                <div className="w-full mt-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                    <span>Proficiency</span>
                    <span className="text-cyan-300 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
