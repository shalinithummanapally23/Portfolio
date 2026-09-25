import { GraduationCap, Briefcase, Sparkles } from 'lucide-react';

const techBadges = [
  'Java', 'Spring Boot', 'Spring Security', 'JWT', 'REST APIs', 'Hibernate',
  'React.js', 'MySQL', 'Python', 'Bootstrap', 'HTML5', 'CSS3',
  'Git & GitHub', 'VS Code', 'IntelliJ', 'Postman', 'DSA',
];

export default function Intro({ onHoverSound }) {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-black text-white pt-24 pb-16 sm:py-24 px-4 sm:px-12 select-none overflow-hidden scroll-mt-16"
    >
      {/* Subtle Atmosphere Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header: Intro in Chrome Gradient */}
        <div className="w-full flex justify-start sm:justify-end mb-12 sm:mb-16">
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight font-display bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent">
            Intro
          </h2>
        </div>

        {/* Split Grid: Studio 3D Portrait on Left, Glass Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Character Stage seamlessly on pure black */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[min(260px,75vw)] sm:w-[360px] md:w-[420px] aspect-[3/4] flex items-end justify-center">
              {/* Static 3D Studio Portrait directly on Pure Black */}
              <img
                src="/assets/shalini_about.png"
                alt="Thummanapally Shalini - Junior Java Developer"
                className="w-full h-full object-contain object-bottom filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                loading="eager"
              />

              {/* Floating Pill Badge at Bottom */}
              <div className="absolute -bottom-3 z-20 px-3.5 py-1.5 rounded-full bg-zinc-950/95 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-2 max-w-[95%]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse shrink-0" />
                <span className="text-[11px] sm:text-xs font-mono font-bold text-white truncate">Jr. Java Developer @ Talent Lad</span>
              </div>
            </div>
          </div>

          {/* Right: Sleek Dark 3D Glass Card */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-10 rounded-3xl bg-[#0c0c0e]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              {/* Card Specular Light */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ccff00]/10 transition-colors duration-500" />

              <p className="text-sm sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-normal">
                Hey, I'm <span className="text-white font-bold">Thummanapally Shalini</span>. A Computer Science undergraduate from Bharath Institute of Higher Education and Research University with strong expertise in Java, Spring Boot, Data Structures, and full-stack software development.
              </p>

              <p className="text-sm sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-normal mt-4">
                Experienced as a <strong className="text-white font-semibold">Java Full Stack & Spring Boot Development Intern at Talent Lad (AICTE)</strong>, engineering backend RESTful services, integrating MySQL databases, and building robust business logic.
              </p>

              <p className="text-sm sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-normal mt-4">
                I combine solid programming fundamentals (<strong className="text-white font-semibold">Java</strong>, <strong className="text-white font-semibold">Python</strong>, <strong className="text-white font-semibold">Spring Boot</strong>, <strong className="text-white font-semibold">React.js</strong>, <strong className="text-[#ccff00] font-semibold">MySQL</strong>) with practical experience in frontend engineering at Codesoft Company and certifications in Big Data Analytics and Machine Learning.
              </p>

              {/* Education & Background Footnote */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-[#ccff00] shrink-0" />
                  <span>Talent Lad (AICTE)</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-cyan-400 shrink-0" />
                  <span>B.Tech CSE • 91.4% Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-400 shrink-0" />
                  <span>Hyderabad, Telangana</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Row Tech Stack Badges */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-zinc-900">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-5xl mx-auto">
            {techBadges.map((badge, idx) => (
              <span
                key={idx}
                onMouseEnter={onHoverSound}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-sm font-mono bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#ccff00] hover:bg-zinc-900 transition-all duration-300 cursor-default shadow-md"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
