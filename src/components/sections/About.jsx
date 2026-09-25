import { motion } from 'framer-motion';
import { Server, Layout, Database, ShieldCheck, Cpu, Award, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import { aboutData } from '../../data/portfolioData';

const pillarIcons = {
  Server: Server,
  Layout: Layout,
  Database: Database,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
};

const techPills = [
  { name: 'Java 17+', color: 'text-amber-300 border-amber-500/30' },
  { name: 'Spring Boot 3', color: 'text-emerald-300 border-emerald-500/30' },
  { name: 'React.js', color: 'text-cyan-300 border-cyan-500/30' },
  { name: 'MySQL', color: 'text-blue-300 border-blue-500/30' },
  { name: 'REST APIs', color: 'text-indigo-300 border-indigo-500/30' },
  { name: 'JWT Security', color: 'text-rose-300 border-rose-500/30' },
  { name: 'Hibernate ORM', color: 'text-teal-300 border-teal-500/30' },
  { name: 'AI & Ollama', color: 'text-purple-300 border-purple-500/30' },
];

export default function About({ onHoverSound }) {
  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading
        badge="// 01. NARRATIVE & PHILOSOPHY"
        title="Engineering Precision Meets Business Acumen"
        subtitle="Bridging high-throughput backend architecture with fluid frontend design and autonomous AI agents."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Avatar Hologram with Glowing Rotating Ring */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Rotating Glowing Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-3 rounded-full border border-purple-500/40 animate-spin-reverse-slow pointer-events-none" />
            
            {/* Ambient Background Radial Glow */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-xl animate-pulse" />

            {/* Circular Profile Container */}
            <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-2xl shadow-cyan-500/30">
              <div className="w-full h-full rounded-full bg-[#050816] relative overflow-hidden group">
                <img
                  src="/assets/shalini_executive.jpg"
                  alt="Thummanapally Shalini - Junior Java Developer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating Orbital Badges */}
            <div className="absolute -top-2 right-4 px-3 py-1 rounded-xl bg-slate-950/90 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 shadow-lg shadow-cyan-500/20">
              ⚡ Spring Boot
            </div>
            <div className="absolute -bottom-2 left-4 px-3 py-1 rounded-xl bg-slate-950/90 border border-purple-400/40 text-[11px] font-mono text-purple-300 shadow-lg shadow-purple-500/20">
              🧠 Local LLMs & Vision
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-8">
            {aboutData.stats.slice(0, 2).map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                <div className="text-xl font-display font-extrabold text-gradient">
                  {item.value}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Story & Core Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
            {aboutData.story.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Core Proficiencies Pills */}
          <div className="pt-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              Core Technical Competencies:
            </span>
            <div className="flex flex-wrap gap-2">
              {techPills.map((pill, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 border ${pill.color} transition-all hover:scale-105 interactive-hover`}
                >
                  {pill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Pillars Grid with 3D Tilt Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {aboutData.corePillars.slice(0, 4).map((pillar, idx) => {
              const IconComp = pillarIcons[pillar.icon] || Server;
              return (
                <GlassCard
                  key={idx}
                  onMouseEnter={onHoverSound}
                  className="p-4"
                  tiltIntensity={8}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
                      <IconComp size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white mb-1">
                        {pillar.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
