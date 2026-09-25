import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, Star, GitFork, Flame, Trophy, ExternalLink } from 'lucide-react';
import { Github } from '../common/BrandIcons';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import { githubActivityData, personalInfo } from '../../data/portfolioData';

export default function GitHubActivity({ onHoverSound }) {
  // Generate simulated authentic 52-week heatmap grid (7 rows x 52 columns)
  const weeks = 52;
  const daysPerWeek = 7;
  const gridCells = [];

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < daysPerWeek; d++) {
      // Deterministic pseudo-randomness for high activity aesthetic
      const seed = (w * 7 + d + 42) % 100;
      let level = 0;
      if (seed > 80) level = 4;
      else if (seed > 55) level = 3;
      else if (seed > 30) level = 2;
      else if (seed > 15) level = 1;

      gridCells.push({ week: w, day: d, level, commits: level * 3 });
    }
  }

  const levelColors = [
    'bg-slate-900/60 border border-white/5',
    'bg-cyan-950/80 border border-cyan-800/40',
    'bg-cyan-700/80 border border-cyan-600/50',
    'bg-cyan-500 border border-cyan-400/60 shadow-[0_0_6px_rgba(56,189,248,0.4)]',
    'bg-cyan-300 border border-white shadow-[0_0_8px_rgba(56,189,248,0.8)]',
  ];

  return (
    <section id="activity" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading
        badge="// 06. OPEN SOURCE VELOCITY"
        title="GitHub Activity & Contribution Matrix"
        subtitle="Consistent problem solving across enterprise repositories, automated CI/CD pipelines, and experimental AI sandboxes."
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitCommit size={20} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {githubActivityData.totalContributions}+
            </div>
            <div className="text-[11px] font-mono text-slate-400">Total Contributions</div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame size={20} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-display font-extrabold text-amber-300">
              {githubActivityData.streakDays} Days
            </div>
            <div className="text-[11px] font-mono text-slate-400">Active Coding Streak</div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Star size={20} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-display font-extrabold text-purple-300">
              230+
            </div>
            <div className="text-[11px] font-mono text-slate-400">Repository Stars</div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Trophy size={20} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-display font-extrabold text-emerald-300">
              Top 5%
            </div>
            <div className="text-[11px] font-mono text-slate-400">Engineering Consistency</div>
          </div>
        </GlassCard>
      </div>

      {/* Interactive Contribution Heatmap Box */}
      <GlassCard className="p-6 mb-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Github size={18} className="text-cyan-400" />
            <span className="font-display font-bold text-sm text-white">
              Annual Contribution Graph
            </span>
            <span className="text-xs font-mono text-slate-400">
              (@{githubActivityData.username})
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>Less</span>
            {levelColors.map((color, idx) => (
              <span key={idx} className={`w-3 h-3 rounded-sm ${color}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[720px] grid grid-rows-7 grid-flow-col gap-1.5">
            {gridCells.map((cell, idx) => (
              <div
                key={idx}
                title={`Week ${cell.week + 1}: ${cell.commits} contributions`}
                className={`w-3 h-3 rounded-sm transition-all hover:scale-125 ${levelColors[cell.level]} cursor-pointer`}
              />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Featured Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {githubActivityData.repositories.map((repo, idx) => (
          <GlassCard
            key={idx}
            onMouseEnter={onHoverSound}
            className="p-5 flex flex-col justify-between"
            tiltIntensity={6}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <a
                  href={`https://github.com/manohar-akuthota/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display font-bold text-sm text-cyan-300 hover:underline flex items-center gap-1.5 interactive-hover"
                >
                  <Github size={15} />
                  <span>{repo.name}</span>
                </a>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                  Public
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {repo.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: repo.langColor }}
                />
                <span>{repo.language}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-amber-400" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={13} className="text-cyan-400" />
                  {repo.forks}
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
