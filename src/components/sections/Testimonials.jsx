import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { testimonialsData } from '../../data/portfolioData';

export default function Testimonials({ onHoverSound }) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless infinite loop
  const duplicatedList = [...testimonialsData, ...testimonialsData];

  return (
    <section id="testimonials" className="relative py-24 px-6 overflow-hidden">
      <SectionHeading
        badge="// 08. ENDORSEMENTS"
        title="What Collaborators & Mentors Say"
        subtitle="Feedback from engineering leads and academic leadership on technical execution and collaborative drive."
      />

      {/* Infinite Scrolling Track */}
      <div
        className="relative w-full overflow-hidden mt-8 py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right gradient masks for smooth fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
          className="flex gap-6 w-max"
        >
          {duplicatedList.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => {
                if (onHoverSound) onHoverSound();
              }}
              className="w-[340px] sm:w-[420px] p-6 rounded-2xl bg-[#090f26]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer"
            >
              <div>
                <Quote size={28} className="text-cyan-400/60 mb-4" />
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {item.author}
                  </h4>
                  <p className="text-xs font-mono text-cyan-300">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
