import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Cpu, Shield, Bot, Layers, Sparkles, Vote } from 'lucide-react';
import { Github } from '../common/BrandIcons';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import ProjectCubeCanvas from '../3d/ProjectCubeCanvas';
import { projectsData } from '../../data/portfolioData';

const projectIcons = {
  'smartvote-ai': Vote,
  'ai-job-bot': Bot,
  'driver-drowsiness': Shield,
  'banking-application': Layers,
};

export default function Projects({ onSelectProject, onHoverSound, onClickSound }) {
  const [isFlyingThrough, setIsFlyingThrough] = useState(false);

  const handleSelect = (project) => {
    if (onClickSound) onClickSound();
    setIsFlyingThrough(true);
    setTimeout(() => {
      onSelectProject(project);
      setIsFlyingThrough(false);
    }, 450);
  };

  return (
    <section id="projects" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading
        badge="// 04. 3D PROJECT SHOWCASE"
        title="Floating Holographic Project Cubes"
        subtitle="Each cube represents a core engineering system. Hover to flip the 3D glass cube; click to fly through the camera into the architecture."
      />

      {/* Interactive 3D Project Cubes Stage */}
      <div className="mb-12 rounded-3xl bg-slate-950/60 border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 overflow-hidden">
        <ProjectCubeCanvas
          projects={projectsData}
          onSelectProject={handleSelect}
          isFlyingThrough={isFlyingThrough}
        />
      </div>

      {/* Grid of 3D Perspective Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, idx) => {
          const IconComp = projectIcons[project.id] || Cpu;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 * idx }}
              className="flex"
            >
              <GlassCard
                onMouseEnter={onHoverSound}
                className="flex flex-col justify-between p-6 h-full group border border-white/10 hover:border-cyan-400/40"
                tiltIntensity={10}
              >
                {/* Project Header Banner Preview */}
                <div className="relative mb-6">
                  <div
                    className={`w-full h-44 rounded-xl bg-gradient-to-tr ${project.imageGradient} p-4 flex flex-col justify-between border border-white/10 relative overflow-hidden group-hover:border-cyan-400/40 transition-colors`}
                  >
                    <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-black/40 backdrop-blur-md border border-white/10 text-cyan-300">
                        {project.category}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-cyan-400 group-hover:rotate-12 transition-transform">
                        <IconComp size={16} />
                      </div>
                    </div>

                    <div className="relative z-10 bg-black/40 backdrop-blur-md p-2.5 rounded-lg border border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-300">Metric</span>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {project.stats[0].value} ({project.stats[0].label})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-500/30 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleSelect(project)}
                        onMouseEnter={onHoverSound}
                        className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors interactive-hover"
                      >
                        <span>Fly-Through Architecture</span>
                        <ArrowUpRight size={14} />
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={onHoverSound}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors interactive-hover"
                          title="View Source Code"
                          aria-label={`Source code for ${project.title}`}
                        >
                          <Github size={14} />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={onHoverSound}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors interactive-hover"
                          title="View Live Demo"
                          aria-label={`Demo for ${project.title}`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
