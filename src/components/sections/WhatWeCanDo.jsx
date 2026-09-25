import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

const servicesData = [
  {
    number: '01',
    title: 'JAVA BACKEND & CPaaS MICROSERVICES',
    bullets: ['Spring Boot Microservices', 'Apache Kafka Event Streams', 'Spring Security & JWT Auth', 'Scalable REST APIs'],
    description:
      'I build production-grade CPaaS (Communications Platform as a Service) backend microservices with Java and Spring Boot, implementing secure JWT authorization and event-driven Apache Kafka messaging.',
  },
  {
    number: '02',
    title: 'FULL-STACK WEB DEVELOPMENT',
    bullets: ['React & Modern Vite', 'Angular & TypeScript', 'Tailwind CSS Styling', 'Node.js & Express Backends'],
    description:
      'I engineer responsive, mobile-friendly full-stack applications combining intuitive, fluid frontends with robust server-side business logic and secure API integrations.',
  },
  {
    number: '03',
    title: 'DATABASE ARCHITECTURE & SCHEMAS',
    bullets: ['MySQL Relational Databases', 'MongoDB NoSQL Storage', 'Data Integrity & Constraints', 'Query Optimization'],
    description:
      'I design and maintain robust relational and NoSQL database schemas, ensuring strict data consistency across user accounts, transactions, and real-time communication logs.',
  },
  {
    number: '04',
    title: 'AI SYSTEMS & CAREER INTELLIGENCE',
    bullets: ['Computer Science (AI) Foundation', 'Autonomous Job Discovery', 'AI Resume Tailoring', 'Python & FastAPI'],
    description:
      'Applying my B.Tech Computer Science (Artificial Intelligence) background, I develop intelligent career portals like JobAgent.ai, automated scrapers, and dynamic ATS optimization tools.',
  },
  {
    number: '05',
    title: 'API TESTING & CLOUD DEPLOYMENT',
    bullets: ['Postman API Test Suites', 'Git & GitHub Collaboration', 'Docker Containerization', 'Cloud Hosting (Render)'],
    description:
      'I design validated REST endpoints, conduct thorough API testing with Postman, manage team repositories on GitHub, and deliver continuous deployments on Render.',
  },
];

export default function WhatWeCanDo({ onHoverSound, onClickSound }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-black text-white pt-24 pb-16 sm:py-24 px-4 sm:px-12 select-none scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Right-Aligned Header (Matching Reel Frame 6) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-end mb-16 sm:mb-20"
        >
          <div className="text-right">
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display text-white tracking-tight uppercase leading-none">
              WHAT WE
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent tracking-tight uppercase leading-none mt-1">
              CAN DO
            </span>
          </div>
        </motion.div>

        {/* Interactive Accordion Rows (Matching Reel Frame 7 & 8) */}
        <div className="w-full border-t border-zinc-800">
          {servicesData.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.number}
                onMouseEnter={() => {
                  setActiveIdx(idx);
                  if (onHoverSound) onHoverSound();
                }}
                onClick={() => {
                  setActiveIdx(idx);
                  if (onClickSound) onClickSound();
                }}
                className={`w-full transition-all duration-300 cursor-pointer border-b border-zinc-800/80 ${
                  isActive
                    ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10'
                    : 'bg-transparent text-white hover:bg-zinc-950'
                }`}
              >
                {/* Collapsed Header Bar */}
                <div className="flex items-center justify-between py-5 sm:py-8 px-4 sm:px-8">
                  <div className="flex items-center gap-4 sm:gap-10 min-w-0 pr-2">
                    <span
                      className={`text-sm sm:text-xl font-mono font-bold shrink-0 ${
                        isActive ? 'text-black' : 'text-zinc-500'
                      }`}
                    >
                      {item.number}
                    </span>
                    <h3
                      className={`text-base sm:text-2xl md:text-3xl font-black font-display tracking-tight uppercase leading-tight ${
                        isActive ? 'text-black' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <ArrowDownRight
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${
                      isActive ? 'rotate-0 text-black stroke-[2.5]' : '-rotate-45 text-zinc-500'
                    }`}
                  />
                </div>

                {/* Expanded Details on Active (Matching Reel Frame 8) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="px-4 sm:px-8 pb-8 pt-2"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pl-8 sm:pl-14">
                        {/* Bullets List */}
                        <div className="md:col-span-5 space-y-2">
                          {item.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-black/90">
                              <span className="w-1.5 h-1.5 rounded-sm bg-black" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        {/* Description Text */}
                        <div className="md:col-span-7">
                          <p className="text-sm sm:text-base font-normal text-black/80 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
