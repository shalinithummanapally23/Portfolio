import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderGit2, Layers, Server, Clock, Award, RotateCcw } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { achievementsData } from '../../data/portfolioData';

const achievementIcons = {
  FolderGit2: FolderGit2,
  Layers: Layers,
  Server: Server,
  Clock: Clock,
};

function CounterItem({ target, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const duration = 1600;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl sm:text-5xl font-display font-black text-gradient">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Achievements({ onHoverSound }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (idx) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="achievements" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading
        badge="// 07. IMPACT METRICS"
        title="Quantified Accomplishments & Growth"
        subtitle="Tangible outcomes delivered through disciplined architecture, continuous learning, and obsessive execution."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievementsData.map((item, idx) => {
          const IconComp = achievementIcons[item.icon] || Award;
          const isFlipped = !!flippedCards[idx];

          return (
            <div
              key={idx}
              className="perspective-1000 h-72 cursor-pointer group"
              onClick={() => toggleFlip(idx)}
              onMouseEnter={() => {
                if (onHoverSound) onHoverSound();
              }}
            >
              <div
                className={`relative w-full h-full duration-500 preserve-3d rounded-2xl transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden rounded-2xl p-6 bg-[#0b122e]/80 backdrop-blur-xl border border-white/10 flex flex-col justify-between shadow-xl group-hover:border-cyan-400/40 group-hover:shadow-cyan-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <IconComp size={22} />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <CounterItem target={item.target} />
                    <h3 className="text-base font-display font-bold text-white mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 pt-3 border-t border-white/5">
                    <span>Click to flip card</span>
                    <RotateCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 bg-gradient-to-br from-[#0c163b] to-[#120a2e] border border-purple-500/40 flex flex-col justify-between text-slate-200 shadow-xl">
                  <div>
                    <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2">
                      Deep Dive
                    </div>
                    <h4 className="text-base font-display font-bold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-purple-300 flex items-center justify-between">
                    <span>Active Engagement</span>
                    <span>100% Verified</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
