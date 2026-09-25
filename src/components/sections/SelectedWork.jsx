import { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, Cpu, Eye } from 'lucide-react';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const BarcodeSvg = ({ className = "h-5 w-auto text-zinc-400" }) => (
  <svg className={className} viewBox="0 0 120 28" fill="currentColor" aria-hidden="true">
    <rect x="0" y="0" width="3" height="28" />
    <rect x="5" y="0" width="1.5" height="28" />
    <rect x="8" y="0" width="4" height="28" />
    <rect x="14" y="0" width="2" height="28" />
    <rect x="18" y="0" width="1" height="28" />
    <rect x="21" y="0" width="5" height="28" />
    <rect x="28" y="0" width="2" height="28" />
    <rect x="32" y="0" width="1" height="28" />
    <rect x="35" y="0" width="3.5" height="28" />
    <rect x="41" y="0" width="4" height="28" />
    <rect x="47" y="0" width="2" height="28" />
    <rect x="51" y="0" width="1" height="28" />
    <rect x="54" y="0" width="4" height="28" />
    <rect x="60" y="0" width="2.5" height="28" />
    <rect x="65" y="0" width="5" height="28" />
    <rect x="72" y="0" width="1" height="28" />
    <rect x="75" y="0" width="3" height="28" />
    <rect x="80" y="0" width="2" height="28" />
    <rect x="84" y="0" width="4" height="28" />
    <rect x="90" y="0" width="1.5" height="28" />
    <rect x="94" y="0" width="3" height="28" />
    <rect x="99" y="0" width="2" height="28" />
    <rect x="103" y="0" width="4" height="28" />
    <rect x="110" y="0" width="2.5" height="28" />
    <rect x="115" y="0" width="4" height="28" />
  </svg>
);

const EditorialSeal = ({ className = "w-24 h-24" }) => (
  <div className={`relative flex items-center justify-center ${className} select-none pointer-events-none`}>
    <svg className="w-full h-full animate-[spin_50s_linear_infinite]" viewBox="0 0 120 120">
      <defs>
        <path id="sealPath" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="55" fill="none" stroke="#ccff00" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#ccff00" strokeWidth="0.75" opacity="0.5" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#ccff00" strokeWidth="0.5" opacity="0.25" />
      <text fill="#ccff00" fontSize="7.5" fontFamily="monospace" letterSpacing="2.2" opacity="0.8">
        <textPath href="#sealPath">
          • VERIFIED PRODUCTION ARCHITECTURE • SHALINI • 2026 •
        </textPath>
      </text>
    </svg>
    <div className="absolute flex flex-col items-center justify-center text-center">
      <span className="text-[10px] font-black font-mono text-[#ccff00] leading-none">TS</span>
      <span className="text-[6.5px] font-mono text-zinc-400 tracking-wider mt-0.5">ARCHIVE</span>
    </div>
  </div>
);

const ArchitecturalBlueprint = ({ blueprint, onOpenModal }) => {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <div className="relative z-10 h-[460px] sm:h-auto sm:aspect-[16/10] w-full rounded-xl sm:rounded-2xl border border-cyan-500/30 bg-[#050b14] mt-3 sm:mt-3.5 flex flex-col justify-between overflow-hidden shadow-inner select-none">
      {/* Blueprint Coordinate Grid Backdrop */}
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#00f0ff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Fixed CAD Top Header */}
      <div className="relative z-20 shrink-0 px-3 sm:px-4 py-2 border-b border-cyan-500/25 bg-[#050b14]/95 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2 truncate min-w-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff] shrink-0" />
          <span className="text-cyan-300 font-bold tracking-wider truncate text-xs sm:text-sm">
            {blueprint.title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onOpenModal && (
            <button
              onClick={onOpenModal}
              className="text-[9px] sm:text-[10px] font-mono text-cyan-400 hover:text-white border border-cyan-500/40 hover:border-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/60 flex items-center gap-1 cursor-pointer transition-colors"
              title="Open full-screen blueprint"
            >
              <Maximize2 size={10} />
              <span>EXPAND</span>
            </button>
          )}
          <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-[9px] hidden sm:inline">
            ● PRODUCTION LIVE
          </span>
        </div>
      </div>

      {/* Mobile Tier Selector Tabs (Screens < 768px for supreme mobile readability) */}
      <div className="md:hidden relative z-20 px-3 pt-2 pb-1 shrink-0">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-950/90 border border-cyan-500/25">
          {blueprint.tiers.map((tier, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTier(idx)}
              className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] font-mono font-bold transition-all text-center truncate cursor-pointer ${
                activeTier === idx
                  ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(0,240,255,0.45)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tier.tierLabel.split('//')[1]?.trim() || `TIER 0${idx + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Mobile View: Active Tier Display with Large, High-Contrast Readable Typography */}
      <div
        className="md:hidden relative z-10 flex-1 overflow-y-auto px-3 py-2 space-y-2.5"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,240,255,0.3) transparent' }}
      >
        {blueprint.tiers[activeTier] && (
          <div className="rounded-xl bg-zinc-950/90 border border-cyan-500/30 p-3 relative space-y-2.5">
            {/* Header of Active Tier */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold tracking-wider">
                {blueprint.tiers[activeTier].tierLabel}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-semibold">
                {blueprint.tiers[activeTier].badge}
              </span>
            </div>

            {/* Nodes with clear, readable fonts */}
            <div className="space-y-2.5">
              {blueprint.tiers[activeTier].nodes.map((node, nIdx) => (
                <div
                  key={nIdx}
                  className="p-2.5 rounded-lg bg-black/80 border border-zinc-800 hover:border-[#ccff00]/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {node.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#ccff00] font-bold shrink-0">
                      {node.port}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1.5">
                    {node.role}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {node.tech.map((tc, tcIdx) => (
                      <span
                        key={tcIdx}
                        className="text-[10px] font-mono text-zinc-300 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800"
                      >
                        {tc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Tier Navigation Footer */}
            <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800/80 text-[10px] font-mono">
              <button
                onClick={() => setActiveTier((prev) => Math.max(0, prev - 1))}
                disabled={activeTier === 0}
                className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 disabled:opacity-25 hover:text-white cursor-pointer transition-colors"
              >
                ← Prev
              </button>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => setActiveTier(dot)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      activeTier === dot
                        ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_#00f0ff]'
                        : 'bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    title={`Go to Tier 0${dot + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTier((prev) => Math.min(2, prev + 1))}
                disabled={activeTier === 2}
                className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 disabled:opacity-25 hover:text-white cursor-pointer transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Desktop View: Full 3-Tier Columns Side-by-Side with Scroll Safety */}
      <div
        className="hidden md:flex relative z-10 flex-1 overflow-y-auto p-3 sm:p-4 space-y-3"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,240,255,0.4) transparent' }}
      >
        <div className="grid grid-cols-3 gap-3 items-stretch w-full">
          {blueprint.tiers.map((tier, tIdx) => (
            <div
              key={tIdx}
              className="flex flex-col rounded-xl bg-zinc-950/85 border border-cyan-500/20 p-2.5 sm:p-3 relative group/tier hover:border-cyan-400/50 transition-colors"
            >
              {/* Tier Masthead Banner */}
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-zinc-800/80 text-[10px] font-mono">
                <span className="text-cyan-400 font-bold tracking-wider truncate">
                  {tier.tierLabel}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/50 text-cyan-300 shrink-0">
                  {tier.badge}
                </span>
              </div>

              {/* Nodes inside this tier */}
              <div className="space-y-2 flex-1 flex flex-col justify-center">
                {tier.nodes.map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className="p-2 rounded-lg bg-black/75 border border-white/10 hover:border-[#ccff00]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                      <span className="font-bold text-white group-hover/tier:text-cyan-200 truncate">
                        {node.name}
                      </span>
                      <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-zinc-900 border border-zinc-700 text-[#ccff00] shrink-0">
                        {node.port}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-zinc-400 leading-tight mt-1 line-clamp-2">
                      {node.role}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {node.tech.map((tc, tcIdx) => (
                        <span key={tcIdx} className="text-[8px] font-mono text-zinc-400 px-1 rounded bg-zinc-900/90 border border-zinc-800">
                          {tc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Inter-Tier Flow Connector Arrow */}
              {tIdx < 2 && (
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-[10px] text-cyan-300 font-bold shadow-[0_0_8px_#00f0ff80]">
                  ➔
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed CAD Bottom Title Block */}
      <div className="relative z-20 shrink-0 px-3 sm:px-4 py-1.5 border-t border-cyan-500/25 bg-[#050b14]/95 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] font-mono text-zinc-400">
        <div>
          <span className="text-zinc-500 block text-[7px] uppercase">DRAWING NO</span>
          <span className="text-cyan-300 font-bold text-[8px] sm:text-[9px]">{blueprint.drawingNo}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[7px] uppercase">PROTOCOL</span>
          <span className="text-zinc-300 font-semibold truncate block text-[8px] sm:text-[9px]">{blueprint.protocol}</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-zinc-500 block text-[7px] uppercase">ARCHITECT</span>
          <span className="text-zinc-200 font-semibold text-[8px] sm:text-[9px]">SHALINI THUMMANAPALLY</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[7px] uppercase">STATUS</span>
          <span className="text-emerald-400 font-bold text-[8px] sm:text-[9px]">100% OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
};

const categories = [
  { id: 'all', label: 'All Curated Spreads', count: '06' },
  { id: 'enterprise', label: 'Enterprise Java & GovTech', count: '03' },
  { id: 'ai', label: 'Autonomous AI & Vision', count: '02' },
  { id: 'commerce', label: 'Omnichannel Commerce', count: '01' },
];

const projects = [
  {
    number: '01',
    id: 'project-smartvote',
    category: 'enterprise',
    department: 'DEPARTMENT // SOVEREIGN GOVTECH & CRYPTOGRAPHIC SYSTEMS',
    title: 'SMARTVOTE BHARAT — SOVEREIGN E-VOTING SYSTEM',
    italicWord: 'SMARTVOTE',
    subtitle: 'Full-Stack Java 21 / Spring Boot 3.3 • React 18 • AI Facial Security',
    badge: 'ECI STANDARD • ARTICLE 324 COMPLIANT',
    image: '/assets/project_smartvote.jpg',
    liveDomain: 'smartvote-ai-frontend.onrender.com',
    demoUrl: 'https://smartvote-ai-frontend.onrender.com',
    githubUrl: 'https://github.com/shalinithummanapally23/SmartVote-AI',
    leadQuote: 'India’s sovereign national digital electoral portal engineered under ECI standards and Article 324, featuring ephemeral AI facial security, zero biometric retention, and tamper-evident SHA-256 ballot ledger sealing.',
    keyMetrics: [
      { val: '100%', label: 'ARTICLE 324 SECRECY', pct: 100 },
      { val: 'SHA-256', label: 'CRYPTOGRAPHIC SEAL', pct: 100 },
      { val: '0% Retained', label: 'EPHEMERAL FACIAL AI', pct: 100 },
    ],
    specs: {
      'Sovereign Core': 'Spring Boot 3.3 • Java 21',
      'Client Chamber': 'React 18 • Vite • Tailwind CSS',
      'Security & Liveness': 'face-api.js • 2FA Mobile OTP',
      'Constitutional Secrecy': 'Article 324 Decoupled Hash',
    },
    bullets: [
      'Engineered an ECI-standard digital electoral platform with multi-factor authentication (Aadhaar, EPIC Voter ID, Mobile OTP) and ephemeral AI facial liveness verification.',
      'Implemented Article 324 constitutional secret digital balloting with mathematical identity decoupling, preventing voter-ballot correlation while guaranteeing public verifiability.',
      'Constructed SHA-256 tamper-evident cryptographic ballot sealing with verifiable QR receipts, automated bilingual PDF certificate generation, and an independent public ledger verifier.',
      'Built a native bilingual accessibility engine supporting 7 Indian languages (English, Hindi, Telugu, Tamil, Kannada, Bengali, Marathi) with real-time text-to-speech voice narration.',
    ],
    tags: ['Java 21', 'Spring Boot 3.3', 'React 18', 'Vite', 'Spring Security', 'JWT', 'face-api.js', 'SHA-256', 'jsPDF', 'QR Code', 'MySQL', '7 Indian Languages'],
    blueprint: {
      title: 'SOVEREIGN CRYPTOGRAPHIC E-VOTING & AUDIT TOPOLOGY',
      drawingNo: 'MK-2026-ARCH-00',
      protocol: 'ARTICLE 324 DECOUPLED REST • SHA-256 SEAL • WEBSOCKET ALERTS',
      tiers: [
        {
          tierLabel: '01 // CITIZEN INGRESS & ACCESSIBILITY',
          badge: 'BALLOT CHAMBER',
          flowLabel: 'HTTPS / 2FA OTP',
          nodes: [
            { name: 'React 18 Voting Chamber', port: ':5173', role: 'Accessible digital ballot chamber with 7 Indian languages & Web Speech narration.', tech: ['React 18', 'Vite', 'Tailwind'] },
            { name: 'Ephemeral Facial Sentinel', port: 'CANVAS', role: 'In-browser anti-spoofing facial liveness verification with zero template storage.', tech: ['face-api.js', 'Webcam'] },
          ],
        },
        {
          tierLabel: '02 // SOVEREIGN ENGINE & SECURITY',
          badge: 'CORE ORCHESTRATION',
          flowLabel: 'SHA-256 HASH / JWT',
          nodes: [
            { name: 'Spring Boot 3.3 API', port: ':8080', role: 'Sovereign electoral API orchestrating 2FA OTP, EPIC verification & RBAC security.', tech: ['Spring Boot 3.3', 'Java 21'] },
            { name: 'Article 324 Decoupler', port: 'SECRECY', role: 'Cryptographically detaches citizen identity tokens from cast ballot payloads.', tech: ['SHA-256', 'Decoupled Token'] },
            { name: 'Real-Time Alert Dispatcher', port: 'EVENTS', role: 'Broadcasts official ECI notifications and constituency polling telemetry.', tech: ['STOMP', 'WebSocket'] },
          ],
        },
        {
          tierLabel: '03 // PUBLIC LEDGER & AUDIT TRAILS',
          badge: 'IMMUTABLE PERSISTENCE',
          nodes: [
            { name: 'National Electoral Roll DB', port: ':3306', role: 'Constituency voter registry, active candidate rolls & immutable ballot ledger.', tech: ['MySQL', 'Spring Data JPA'] },
            { name: 'Cryptographic Audit Trail', port: 'LEDGER', role: 'Tamper-evident system activity journal and verifiable SHA-256 receipt seals.', tech: ['Audit Logs', 'QR Seals'] },
          ],
        },
      ],
    },
  },
  {
    number: '02',
    id: 'project-01',
    category: 'ai',
    department: 'DEPARTMENT // APPLIED AI & AUTOMATION',
    title: 'AI JOB APPLICATION BOT & ATS PLATFORM',
    italicWord: 'AI',
    subtitle: 'Full-Stack Java / React 19 • Autonomous Agent Engine',
    badge: 'AUTONOMOUS AGENT ENGINE',
    image: '/assets/project_jobagent.jpg',
    liveDomain: 'manohar-ai-job-frontend.onrender.com',
    demoUrl: 'https://manohar-ai-job-frontend.onrender.com',
    githubUrl: 'https://github.com/shalinithummanapally23/ai-job-agent',
    leadQuote: 'An autonomous full-stack intelligence engine orchestrating private local LLMs with Playwright to achieve 99.4% ATS precision at zero token cost.',
    keyMetrics: [
      { val: '99.4%', label: 'ATS MATCH RATE', pct: 99 },
      { val: '0-Token', label: 'LOCAL INFERENCE', pct: 100 },
      { val: '100%', label: 'PLAYWRIGHT VERIFIED', pct: 100 },
    ],
    specs: {
      'Core Architecture': 'Spring Boot 3 • Java 21',
      'Client Interface': 'React 19 • Tailwind CSS',
      'Agent Engine': 'Ollama Llama 3 • Playwright',
      'Database & Cache': 'MySQL Cloud • Redis Queue',
    },
    bullets: [
      'Orchestrated end-to-end headless browser automation using Playwright with screenshot verification, cron scheduling, and dynamic form adaptation.',
      'Integrated local Ollama LLMs to generate context-aware cover letters and tailored resumes with semantic keyword matching.',
      'Architected Spring Boot REST endpoints managing job queues, application state history, and candidate credentials securely.',
    ],
    tags: ['Spring Boot 3', 'React 19', 'MySQL', 'Local Ollama Llama 3', 'Google Gemini', 'Playwright', 'ATS Matching', 'Render'],
    blueprint: {
      title: 'AUTONOMOUS RECRUITING & ATS INFERENCE TOPOLOGY',
      drawingNo: 'MK-2026-ARCH-01',
      protocol: 'HTTP/2 REST • LOCAL OLLAMA IPC • PLAYWRIGHT CDP',
      tiers: [
        {
          tierLabel: '01 // INGRESS & CLIENT',
          badge: 'PORTAL TIER',
          flowLabel: 'REST / JSON',
          nodes: [
            { name: 'React 19 Dashboard', port: ':3000', role: 'Candidate resume intake, real-time tailoring preview & job dispatch control.', tech: ['React 19', 'Tailwind'] },
            { name: 'Dossier JSON Parser', port: 'PIPE', role: 'Converts unstructured PDF resumes into structured semantic candidate profile.', tech: ['Apache Tika', 'Regex'] },
          ],
        },
        {
          tierLabel: '02 // ENGINE & CORE',
          badge: 'INTELLIGENCE',
          flowLabel: 'CDP / IPC',
          nodes: [
            { name: 'Spring Boot 3 Hub', port: ':8080', role: 'Application state manager, job queues & secure credential vault.', tech: ['Java 21', 'Spring Web'] },
            { name: 'Ollama Llama 3', port: ':11434', role: 'Private local LLM performing prompt tailoring at zero token cost.', tech: ['Llama 3', 'Local IPC'] },
            { name: 'Playwright Hub', port: 'CDP', role: 'Headless Chromium automation, dynamic input typing & screenshot OCR.', tech: ['Playwright', 'Chromium'] },
          ],
        },
        {
          tierLabel: '03 // PERSISTENCE & QUEUE',
          badge: 'LEDGER TIER',
          nodes: [
            { name: 'MySQL Cloud DB', port: ':3306', role: 'ACID transaction history, portal submission status & application logs.', tech: ['TiDB Cloud', 'MySQL'] },
            { name: 'Redis Task Queue', port: ':6379', role: 'In-memory cron scheduler & asynchronous execution queue.', tech: ['Redis', 'Spring Cache'] },
          ],
        },
      ],
    },
  },
  {
    number: '03',
    id: 'project-02',
    category: 'commerce',
    department: 'DEPARTMENT // OMNICHANNEL COMMERCE & FINTECH',
    title: 'MS MOBILES — OMNICHANNEL E-COMMERCE',
    italicWord: 'MOBILES',
    subtitle: 'Full-Stack Java / React 18 / Capacitor • Native Mobile & Web',
    badge: 'COMMERCE & STATUTORY FINTECH',
    image: '/assets/project_msmobiles.jpg',
    liveDomain: 'ms-mobiles-frontend.onrender.com',
    demoUrl: 'https://ms-mobiles-frontend.onrender.com/',
    githubUrl: 'https://github.com/shalinithummanapally23/Ecommerce',
    leadQuote: 'Enterprise smartphone retail ecosystem pairing modern capacitive mobile experiences with statutory Indian GST tax invoice computation.',
    keyMetrics: [
      { val: 'HSN 8517', label: 'STATUTORY TAX CODE', pct: 100 },
      { val: 'Capacitor 8', label: 'ANDROID & PWA', pct: 95 },
      { val: 'AWS Cloud', label: 'TIDB REPLICATION', pct: 98 },
    ],
    specs: {
      'Enterprise Core': 'Spring Boot 3 • Spring Security 6',
      'Client Platform': 'React 18 • Capacitor 8 Native',
      'Tax Computation': 'HSN 8517 • CGST/SGST 9%',
      'Cloud Storage': 'TiDB Cloud AWS • Cloudinary CDN',
    },
    bullets: [
      'Architected stateless JWT role-based security (USER / ADMIN) managing multi-variant catalog hierarchies and instant checkout sessions.',
      'Engineered automated PDF GST Tax Invoice generator adhering to statutory tax guidelines with Rupee number-to-words conversion.',
      'Packaged the storefront into a native Android app via Capacitor 8 with offline PWA caching and Cloudinary CDN optimization.',
    ],
    tags: ['Spring Boot 3', 'React 18', 'TiDB Cloud (AWS MySQL)', 'Spring Security 6', 'JWT', 'Capacitor 8', 'jsPDF', 'Cloudinary CDN'],
    blueprint: {
      title: 'OMNICHANNEL COMMERCE & STATUTORY FINTECH TOPOLOGY',
      drawingNo: 'MK-2026-ARCH-02',
      protocol: 'CAPACITOR 8 BRIDGE • SPRING SECURITY 6 • TIDB AWS',
      tiers: [
        {
          tierLabel: '01 // CLIENT TIER',
          badge: 'OMNICHANNEL',
          flowLabel: 'HTTPS / JWT',
          nodes: [
            { name: 'Capacitor 8 Mobile', port: 'ANDROID', role: 'Native Android smartphone application packaged via Capacitor runtime.', tech: ['Android SDK', 'Capacitor 8'] },
            { name: 'React 18 Web PWA', port: ':5173', role: 'High-speed desktop & mobile web storefront with offline service workers.', tech: ['React 18', 'Vite PWA'] },
          ],
        },
        {
          tierLabel: '02 // SERVICES & FINTECH',
          badge: 'MICROSERVICES',
          flowLabel: 'JDBC / CDN',
          nodes: [
            { name: 'Spring Security 6', port: ':8080', role: 'Stateless JWT auth filter chain with role-based access control (RBAC).', tech: ['JWT', 'BCrypt'] },
            { name: 'Statutory GST Engine', port: 'FINTECH', role: 'HSN 8517 statutory tax calculator (dual 9% CGST + 9% SGST breakdown).', tech: ['Indian Tax', 'Math'] },
            { name: 'jsPDF Invoice Core', port: 'PDF GEN', role: 'Automated statutory tax invoices with Rupee number-to-words currency.', tech: ['jsPDF', 'AutoTable'] },
          ],
        },
        {
          tierLabel: '03 // PERSISTENCE & CDN',
          badge: 'CLOUD DATA',
          nodes: [
            { name: 'TiDB Cloud (AWS)', port: ':4000', role: 'Distributed MySQL cluster providing ACID reliability across transactions.', tech: ['TiDB AWS', 'MySQL'] },
            { name: 'Cloudinary CDN', port: 'EDGE CDN', role: 'Edge asset delivery with automatic WebP/AVIF compression & caching.', tech: ['Cloudinary', 'Global CDN'] },
          ],
        },
      ],
    },
  },
  {
    number: '04',
    id: 'project-03',
    category: 'enterprise',
    department: 'DEPARTMENT // ENTERPRISE BANKING & DISTRIBUTED SYSTEMS',
    title: 'APEX TRUST — CORE BANKING PLATFORM',
    italicWord: 'TRUST',
    subtitle: 'Full-Stack Java 21 / Angular 19 • Enterprise Core Banking & Ledger',
    badge: 'ENTERPRISE BANKING ENGINE',
    image: '/assets/project_banking.jpg',
    liveDomain: 'apex-trust-frontend.onrender.com',
    demoUrl: 'https://apex-trust-frontend.onrender.com/',
    githubUrl: 'https://github.com/shalinithummanapally23/BankingApplication',
    leadQuote: 'Mission-critical FinTech banking platform built with dual-entry ledger precision, BCrypt encryption, and 4-tier Role-Based Access Control.',
    keyMetrics: [
      { val: '99.98%', label: 'API AVAILABILITY', pct: 99 },
      { val: '4 Tiers', label: 'RBAC SECURITY', pct: 100 },
      { val: 'ACID', label: 'DUAL-ENTRY LEDGER', pct: 100 },
    ],
    specs: {
      'Banking Core': 'Spring Boot 3 • Java 21',
      'Operations UI': 'Angular 19 • Glassmorphism',
      'Access Control': '4-Tier RBAC • BCrypt • JWT',
      'Database Schema': 'Liquibase • TiDB Serverless',
    },
    bullets: [
      'Engineered multi-tier Role-Based Access Control across 4 user tiers (Admin, Branch Manager, Teller, Customer) with audit trail logging.',
      'Built real-time transaction engine managing branch-level customer onboarding, account approval workflows, and inter-account fund transfers.',
      'Designed glassmorphic operations dashboard featuring live financial volume charts and holographic vault verification.',
    ],
    tags: ['Spring Boot 3 (Java 21)', 'Angular 19', 'TiDB Serverless', 'Liquibase', 'Docker', 'JWT / RBAC', 'Render'],
    blueprint: {
      title: 'MISSION-CRITICAL CORE BANKING & DUAL-ENTRY LEDGER',
      drawingNo: 'MK-2026-ARCH-03',
      protocol: 'ANGULAR 19 HTTP • SPRING BOOT 3 (JAVA 21) • LIQUIBASE',
      tiers: [
        {
          tierLabel: '01 // CLIENT & GUARDS',
          badge: 'PRESENTATION',
          flowLabel: 'HTTP REST',
          nodes: [
            { name: 'Angular 19 Portal', port: ':4200', role: 'Glassmorphic operations terminal featuring live volume monitoring.', tech: ['Angular 19', 'TypeScript'] },
            { name: '4-Tier RBAC Guard', port: 'AUTH', role: 'Permission interceptor enforcing Admin, Manager, Teller & Customer roles.', tech: ['Guards', 'JWT Interceptor'] },
          ],
        },
        {
          tierLabel: '02 // BANKING ENGINE',
          badge: 'CORE TRANSACTION',
          flowLabel: 'ACID JPA',
          nodes: [
            { name: 'Spring Boot 3 API', port: ':8080', role: 'Central banking orchestration API with Java 21 virtual threads.', tech: ['Spring Boot 3', 'Java 21'] },
            { name: 'Dual-Entry Ledger', port: 'ACID ENGINE', role: 'Double-entry bookkeeping engine with strict mathematical parity.', tech: ['Spring Data', 'JTA'] },
            { name: 'BCrypt Security Vault', port: 'CRYPTO', role: 'Cryptographic hash salting and tamper-evident audit journal trails.', tech: ['BCrypt 12', 'Security'] },
          ],
        },
        {
          tierLabel: '03 // DATABASE & DDL',
          badge: 'PERSISTENCE',
          nodes: [
            { name: 'TiDB Serverless', port: ':4000', role: 'Distributed serverless SQL database with automated multi-zone replication.', tech: ['TiDB Serverless', 'SQL'] },
            { name: 'Liquibase Manager', port: 'MIGRATIONS', role: 'Automated database changelog version control & zero-downtime rollouts.', tech: ['Liquibase', 'DDL XML'] },
          ],
        },
      ],
    },
  },
  {
    number: '05',
    id: 'project-04',
    category: 'enterprise',
    department: 'DEPARTMENT // TELECOM BACKEND & KAFKA EVENT CLUSTERS',
    title: 'PRODUCTION CPaaS MICROSERVICES',
    italicWord: 'CPaaS',
    subtitle: 'Event-Driven Communications Platform (Keyanna Technologies)',
    badge: 'TELECOM & EVENT-DRIVEN CLUSTER',
    image: '/assets/project_cpaas.jpg',
    demoUrl: 'https://github.com/shalinithummanapally23',
    githubUrl: 'https://github.com/shalinithummanapally23',
    leadQuote: 'High-throughput Communications Platform as a Service backend streaming real-time SMS & WhatsApp events across Kafka clusters.',
    keyMetrics: [
      { val: '45.8K/s', label: 'KAFKA THROUGHPUT', pct: 96 },
      { val: '< 12ms', label: 'GATEWAY DISPATCH', pct: 98 },
      { val: '99.99%', label: 'CARRIER SLA', pct: 100 },
    ],
    specs: {
      'Organization': 'Keyanna Technologies',
      'Architecture': 'Spring Boot Microservices',
      'Event Stream': 'Apache Kafka Event Bus',
      'Throughput SLA': 'Sub-12ms Latency • 99.99% Up',
    },
    bullets: [
      'Engineered production microservices handling high-volume SMS and WhatsApp communication dispatches with sub-12ms response times.',
      'Integrated Apache Kafka for fault-tolerant, event-driven messaging between distributed services, preventing message loss.',
      'Implemented secure token authorization flows with Spring Security and JWT-based authentication.',
    ],
    tags: ['Java', 'Spring Boot', 'Apache Kafka', 'JWT', 'Microservices', 'Spring Security', 'REST APIs'],
    blueprint: {
      title: 'EVENT-DRIVEN CPaaS MESSAGE DISPATCH CLUSTER',
      drawingNo: 'MK-2026-ARCH-04',
      protocol: 'REST INGRESS • APACHE KAFKA CLUSTER • TELCO SMPP',
      tiers: [
        {
          tierLabel: '01 // INGRESS GATEWAY',
          badge: 'TELECOM API',
          flowLabel: 'KAFKA PRODUCER',
          nodes: [
            { name: 'REST Dispatch API', port: ':8080', role: 'High-throughput ingress accepting SMS & WhatsApp requests in under 12ms.', tech: ['Spring Web', 'Netty'] },
            { name: 'Quota & Token Filter', port: 'SECURITY', role: 'Stateless JWT auth and Redis token-bucket rate limiter per tenant.', tech: ['Redis Token', 'JWT'] },
          ],
        },
        {
          tierLabel: '02 // BROKER CLUSTER',
          badge: 'EVENT STREAM',
          flowLabel: 'SMPP / REST',
          nodes: [
            { name: 'Apache Kafka Broker', port: ':9092', role: 'Clustered topic partitions delivering 45.8K msg/sec with zero packet loss.', tech: ['Apache Kafka', 'Zookeeper'] },
            { name: 'Consumer Daemons', port: 'THREAD POOL', role: 'Multi-threaded worker groups dynamically pulling and routing dispatches.', tech: ['Spring Kafka', 'Threads'] },
          ],
        },
        {
          tierLabel: '03 // CARRIERS & SLA',
          badge: 'TELCO TRUNKS',
          nodes: [
            { name: 'Tier-1 SMPP Trunk', port: 'SMPP 3.4', role: 'Direct telecom carrier SMS gateway connectivity with retry fallbacks.', tech: ['SMPP Protocol', 'Telco'] },
            { name: 'WhatsApp Meta API', port: 'GRAPH API', role: 'Enterprise WhatsApp Business Cloud API with real-time delivery webhooks.', tech: ['Meta API', '99.99% SLA'] },
          ],
        },
      ],
    },
  },
  {
    number: '06',
    id: 'project-05',
    category: 'ai',
    department: 'DEPARTMENT // EDGE COMPUTER VISION & SAFETY AI',
    title: 'DRIVER DROWSINESS DETECTION',
    italicWord: 'DROWSINESS',
    subtitle: 'Real-Time Computer Vision AI Safety Platform (Python / OpenCV)',
    badge: 'EDGE VISION & AI SAFETY',
    image: '/assets/project_drowsiness.jpg',
    demoUrl: 'https://github.com/shalinithummanapally23/Drowsiness_Detection',
    githubUrl: 'https://github.com/shalinithummanapally23/Drowsiness_Detection',
    leadQuote: 'Real-time edge computer vision safety system tracking 68 ocular facial landmarks to compute Eye Aspect Ratio and prevent micro-sleep.',
    keyMetrics: [
      { val: '68 Points', label: 'FACIAL LANDMARK MESH', pct: 100 },
      { val: '60 FPS', label: 'REAL-TIME VISION', pct: 95 },
      { val: '98.7%', label: 'FATIGUE DETECTION', pct: 98 },
    ],
    specs: {
      'Vision Pipeline': 'OpenCV • Python • Dlib',
      'Landmark Tracking': '68-Point Facial Mesh',
      'Sampling Rate': '60 FPS Real-Time Feed',
      'Accuracy Score': '98.7% Fatigue Detection',
    },
    bullets: [
      'Tracked 68 facial landmarks via Dlib shape predictor to dynamically compute Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR).',
      'Implemented instant acoustic alert triggers and visual warnings whenever ocular closure exceeds safety thresholds.',
      'Optimized for low-latency embedded automotive edge hardware, operating consistently at 60 FPS.',
    ],
    tags: ['Python', 'OpenCV', 'Dlib', 'Computer Vision', 'Deep Learning', 'AI Safety', 'NumPy'],
    blueprint: {
      title: 'REAL-TIME EDGE COMPUTER VISION & OCULAR FATIGUE TOPOLOGY',
      drawingNo: 'MK-2026-ARCH-05',
      protocol: 'OPENCV 60 FPS • DLIB 68 LANDMARKS • ACOUSTIC ALARM',
      tiers: [
        {
          tierLabel: '01 // VIDEO INGESTION',
          badge: 'OPTICAL SENSOR',
          flowLabel: '60 FPS STREAM',
          nodes: [
            { name: 'Cabin Webcam Feed', port: '60 FPS', role: 'Automotive optical sensor streaming real-time driver cabin video.', tech: ['UVC Camera', '1080P'] },
            { name: 'OpenCV Normalizer', port: 'BUFFER', role: 'Frame matrix scaling, grayscale conversion & histogram equalization.', tech: ['OpenCV', 'Python'] },
          ],
        },
        {
          tierLabel: '02 // VISION AI MESH',
          badge: 'AI PIPELINE',
          flowLabel: 'MATH VECTORS',
          nodes: [
            { name: 'Dlib 68-Point Mesh', port: 'FACIAL MESH', role: 'Pre-trained shape predictor extracting 68 2D ocular & facial landmark points.', tech: ['Dlib C++', 'NumPy'] },
            { name: 'EAR & MAR Calculus', port: 'VECTOR MATH', role: 'Dynamic Eye Aspect Ratio and Mouth Aspect Ratio geometry calculations.', tech: ['Euclidean Math', 'NumPy'] },
            { name: 'Fatigue Gate Filter', port: 'TEMPORAL', role: 'Temporal rolling filter evaluating consecutive frames below 0.25 threshold.', tech: ['State Gate', 'EAR < 0.25'] },
          ],
        },
        {
          tierLabel: '03 // SAFETY ACTUATION',
          badge: 'ALARM SYSTEM',
          nodes: [
            { name: 'Acoustic Buzzer', port: 'AUDIO ALARM', role: 'Instant audio alarm sounder triggering emergency acoustic alert.', tech: ['PyAudio', 'GPIO Buzzer'] },
            { name: 'Visual Console HUD', port: 'HUD WARN', role: 'High-contrast cockpit visual alert displaying driver fatigue warnings.', tech: ['OpenCV GUI', 'HUD'] },
          ],
        },
      ],
    },
  },
];

export default function SelectedWork({ onHoverSound, onClickSound }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePlateView, setActivePlateView] = useState({}); // { [number]: 'photo' | 'blueprint' }
  const [inspectIndex, setInspectIndex] = useState(null); // null or index 0..4
  const [inspectView, setInspectView] = useState('photo'); // 'photo' | 'blueprint'

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const togglePlateView = (number, view) => {
    if (onClickSound) onClickSound();
    setActivePlateView((prev) => ({ ...prev, [number]: view }));
  };

  const openInspectionModal = (index, view = 'photo') => {
    if (onClickSound) onClickSound();
    setInspectIndex(index);
    setInspectView(view);
  };

  const closeInspectionModal = useCallback(() => {
    if (onClickSound) onClickSound();
    setInspectIndex(null);
  }, [onClickSound]);

  const nextInspect = useCallback(() => {
    if (onClickSound) onClickSound();
    setInspectIndex((prev) => (prev === null ? 0 : (prev + 1) % projects.length));
  }, [onClickSound]);

  const prevInspect = useCallback(() => {
    if (onClickSound) onClickSound();
    setInspectIndex((prev) => (prev === null ? 0 : (prev - 1 + projects.length) % projects.length));
  }, [onClickSound]);

  // Handle keyboard events for inspection modal
  useEffect(() => {
    if (inspectIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeInspectionModal();
      if (e.key === 'ArrowRight') nextInspect();
      if (e.key === 'ArrowLeft') prevInspect();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [inspectIndex, closeInspectionModal, nextInspect, prevInspect]);

  const activeInspectProject = inspectIndex !== null ? projects[inspectIndex] : null;

  return (
    <section
      id="work"
      className="relative w-full min-h-screen bg-black text-white pt-24 pb-16 sm:py-28 px-4 sm:px-12 select-none overflow-hidden scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Magazine Masthead Section Header */}
        <div className="border-b border-zinc-800 pb-10 sm:pb-14 mb-10 sm:mb-14">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-zinc-300 font-bold">EDITORIAL ARCHIVE</span>
              <span>//</span>
              <span>VOL. 2026</span>
            </div>
            <div className="hidden sm:block">
              CURATED PRODUCTION SYSTEMS • 05 EDITIONS
            </div>
            <div>
              ISSN 2026-TS
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mt-4">
            {/* Left: Section Title */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase leading-none">
                SELECTED{' '}
                <span className="font-serif-italic font-normal lowercase text-zinc-300">
                  work
                </span>
              </h2>
            </div>

            {/* Right: Narrative + Read More Button */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3 sm:gap-4">
              <p className="text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed text-left lg:text-right">
                A curated editorial catalogue of production microservices, full-stack ecosystems, and autonomous artificial intelligence engines engineered by Shalini Thummanapally.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/shalinithummanapally23"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={onHoverSound}
                  onClick={onClickSound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] text-black font-semibold text-xs sm:text-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>View Full Index on GitHub</span>
                  <ArrowUpRight size={15} />
                </a>

                <button
                  onClick={() => openInspectionModal(0)}
                  onMouseEnter={onHoverSound}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs hover:border-[#ccff00] hover:text-white transition-all cursor-pointer"
                >
                  <Eye size={13} className="text-[#ccff00]" />
                  <span>Inspect Spreads [⤢]</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Department Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mr-2 hidden sm:inline-block">
            EDITORIAL DEPARTMENTS:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (onClickSound) onClickSound();
                }}
                onMouseEnter={onHoverSound}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20 scale-105'
                    : 'bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-black text-[#ccff00]' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Magazine Folio Quick-Bar (Table of Contents Jump Strip) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-12 sm:mb-16 border-b border-zinc-900/90 text-[11px] font-mono scrollbar-none">
          <span className="text-zinc-600 uppercase tracking-wider shrink-0 mr-1">
            FOLIO INDEX:
          </span>
          {projects.map((proj, pIdx) => (
            <a
              key={proj.number}
              href={`#${proj.id}`}
              onMouseEnter={onHoverSound}
              onClick={onClickSound}
              className="px-2.5 py-1 rounded-md bg-zinc-950/90 border border-zinc-900 hover:border-[#ccff00]/50 text-zinc-400 hover:text-[#ccff00] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span className="text-[#ccff00] font-bold">0{pIdx + 1}</span>
              <span>{proj.title.split('—')[0].split('&')[0].trim()}</span>
            </a>
          ))}
        </div>

        {/* Magazine Editorial Spreads */}
        <div className="space-y-16 sm:space-y-24">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const currentPlateView = activePlateView[project.number] || 'photo';
            const globalIndex = projects.findIndex((p) => p.number === project.number);

            return (
              <div key={project.number} id={project.id} className="scroll-mt-24">
                {/* Inter-Spread Divider (Between Projects) */}
                {idx > 0 && (
                  <div className="relative flex items-center justify-center my-14 sm:my-24">
                    <div className="w-full border-t border-zinc-900" />
                    <div className="absolute px-4 bg-black flex items-center gap-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                      <span className="text-zinc-700">+</span>
                      <span>SPREAD ARCHIVE 2026</span>
                      <span>•</span>
                      <span>FOLIO {project.number}</span>
                      <span className="text-zinc-700">+</span>
                    </div>
                  </div>
                )}

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Magazine Visual Plate Card */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? 'order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <div className="relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 bg-[#0a0a0d] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group overflow-hidden">
                      {/* Ghost Folio Number Watermark in Background */}
                      <span className="absolute -bottom-6 -right-2 text-[100px] sm:text-[140px] font-black font-display text-white/[0.03] select-none pointer-events-none leading-none z-0">
                        {project.number}
                      </span>

                      {/* Tactile Magazine Paper Texture */}
                      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-2xl sm:rounded-3xl" />

                      {/* Magazine Print Registration Crosshairs */}
                      <span className="absolute top-1.5 left-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none group-hover:text-[#ccff00] transition-colors z-10">+</span>
                      <span className="absolute top-1.5 right-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none group-hover:text-[#ccff00] transition-colors z-10">+</span>
                      <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none group-hover:text-[#ccff00] transition-colors z-10">+</span>
                      <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-zinc-600 select-none pointer-events-none group-hover:text-[#ccff00] transition-colors z-10">+</span>

                      {/* Top Editorial Plate Header */}
                      <div className="relative z-10 flex items-center justify-between px-2 pb-2.5 sm:pb-3 border-b border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span className="text-[#ccff00] font-bold">VOL. 2026</span>
                          <span className="text-zinc-600">//</span>
                          <span>PLATE {project.number}</span>
                        </div>

                        {/* Dual-Plate View Toggle: Photo Spec vs. System Blueprint */}
                        <div className="flex items-center bg-zinc-950 p-0.5 rounded-full border border-zinc-800">
                          <button
                            onClick={() => togglePlateView(project.number, 'photo')}
                            onMouseEnter={onHoverSound}
                            className={`px-2.5 py-1 rounded-full text-[9px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                              currentPlateView === 'photo'
                                ? 'bg-[#ccff00] text-black font-bold'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            <Eye size={10} />
                            <span>PHOTO</span>
                          </button>
                          <button
                            onClick={() => togglePlateView(project.number, 'blueprint')}
                            onMouseEnter={onHoverSound}
                            className={`px-2.5 py-1 rounded-full text-[9px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                              currentPlateView === 'blueprint'
                                ? 'bg-[#ccff00] text-black font-bold'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            <Cpu size={10} />
                            <span>BLUEPRINT</span>
                          </button>
                        </div>

                        <div className="hidden sm:flex items-center gap-2">
                          <span className="text-zinc-500">CURATED</span>
                          <span className="text-white font-bold">{project.number} / 05</span>
                        </div>
                      </div>

                      {/* Plate Content: Either Photo Showcase OR Architectural Blueprint */}
                      {currentPlateView === 'photo' ? (
                        <div className="relative z-10 aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-zinc-950 mt-3 sm:mt-3.5 shadow-inner">
                          {/* High-Resolution Enhanced Photograph */}
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03] brightness-[0.98]"
                            loading="lazy"
                          />

                          {/* Glossy Magazine Paper Sheen Reflection */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

                          {/* Top Badge Overlay */}
                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/85 border border-white/15 backdrop-blur-md shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-mono font-bold text-white tracking-wider">
                              {project.badge}
                            </span>
                          </div>

                          {/* Inspect Viewfinder Button (Enlarge Modal) */}
                          <button
                            onClick={() => openInspectionModal(globalIndex, 'photo')}
                            onMouseEnter={onHoverSound}
                            title="Inspect high-resolution magazine spread"
                            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 hover:bg-[#ccff00] text-zinc-300 hover:text-black border border-white/15 backdrop-blur-md text-[10px] font-mono transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                          >
                            <Maximize2 size={11} />
                            <span className="hidden sm:inline">INSPECT</span>
                          </button>

                          {/* Bottom Magazine Inset Caption & Barcode */}
                          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex items-end justify-between gap-4 pointer-events-none">
                            <div className="min-w-0">
                              <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-wider block">
                                FIG. {project.number} // ARCHITECTURAL SPEC
                              </span>
                              <p className="text-xs sm:text-sm font-serif-italic text-zinc-200 truncate">
                                {project.subtitle}
                              </p>
                            </div>
                            <div className="shrink-0 hidden sm:flex flex-col items-end">
                              <BarcodeSvg className="h-5 w-auto text-zinc-400" />
                              <span className="text-[8px] font-mono text-zinc-500 mt-0.5 tracking-tighter">
                                CATALOGUE #{project.number}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Architectural System Blueprint View (True 3-Tier Flowchart) */
                        <ArchitecturalBlueprint
                          blueprint={project.blueprint}
                          onOpenModal={() => openInspectionModal(globalIndex, 'blueprint')}
                        />
                      )}

                      {/* Bottom Editorial Colophon Strip */}
                      <div className="relative z-10 flex items-center justify-between px-2 pt-3 sm:pt-3.5 border-t border-white/10 text-[10px] font-mono text-zinc-500 mt-3 sm:mt-3.5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="text-zinc-300">CLOUD PRODUCTION VERIFIED</span>
                        </div>
                        <div className="text-zinc-500 uppercase hidden sm:block">
                          CURATED ARCHIVE 2026 • FOLIO {project.number}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Magazine Editorial Narrative (Article Column) */}
                  <div
                    className={`lg:col-span-5 space-y-4 sm:space-y-5 ${
                      isEven ? 'order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    {/* Article Issue Header Bar */}
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-zinc-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-[#ccff00]">
                          N° {project.number}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                          FEATURE STORY
                        </span>
                      </div>

                      {project.liveDomain && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-300 group max-w-full"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          <span className="truncate">{project.liveDomain}</span>
                          <ArrowUpRight size={13} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </div>

                    {/* Editorial Article Headline */}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight uppercase leading-tight text-white">
                      {project.italicWord ? (
                        <>
                          {project.title.split(project.italicWord)[0]}
                          <span className="font-serif-italic font-normal lowercase text-[#ccff00]">
                            {project.italicWord}
                          </span>
                          {project.title.split(project.italicWord)[1]}
                        </>
                      ) : (
                        project.title
                      )}
                    </h3>

                    {/* Editorial Pull-Quote with Verification Seal */}
                    <div className="relative flex items-center justify-between gap-4">
                      <div className="border-l-2 border-[#ccff00] pl-4 py-1 italic font-serif text-zinc-300 text-sm sm:text-base leading-relaxed flex-1">
                        "{project.leadQuote}"
                      </div>
                      <div className="shrink-0 hidden xl:block">
                        <EditorialSeal className="w-16 h-16 opacity-70" />
                      </div>
                    </div>

                    {/* Editorial Big Stat Scorecard (Magazine Review Metric Bar) */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-zinc-950/90 border border-white/10 my-1 text-center">
                      {project.keyMetrics.map((km, kmIdx) => (
                        <div key={kmIdx} className="space-y-1">
                          <span className="text-base sm:text-lg font-black font-display text-[#ccff00] tracking-tight block leading-none">
                            {km.val}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter block truncate">
                            {km.label}
                          </span>
                          {/* Micro Gauge Bar */}
                          <div className="w-12 mx-auto h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#ccff00]"
                              style={{ width: `${km.pct || 90}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technical Spec Sheet Grid */}
                    <div className="grid grid-cols-2 gap-2.5 p-3 sm:p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-[11px] font-mono">
                      {Object.entries(project.specs).map(([key, val], sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                            {key}
                          </span>
                          <span className="text-zinc-200 font-semibold block truncate">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Numbered Engineering Highlights */}
                    <div className="space-y-2 pt-1">
                      {project.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          <span className="text-[11px] font-mono font-bold text-[#ccff00] mt-0.5 shrink-0">
                            0{bIdx + 1}
                          </span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:border-[#ccff00]/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Magazine Action Buttons */}
                    <div className="flex items-center gap-2.5 sm:gap-3 pt-3">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={onHoverSound}
                        onClick={onClickSound}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] text-black text-xs sm:text-sm font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <span>Explore Live Build</span>
                        <ArrowUpRight size={14} />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={onHoverSound}
                        onClick={onClickSound}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium hover:bg-zinc-800 hover:text-white transition-all duration-300 cursor-pointer"
                      >
                        <GithubIcon size={14} />
                        <span>Technical Repository</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Magazine Spread Lightbox Inspection Modal */}
      {activeInspectProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-fadeIn"
          onClick={closeInspectionModal}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0b0c10] border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Editorial Masthead Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-zinc-950/80">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#ccff00]">
                  SPREAD {activeInspectProject.number} / 05
                </span>
                <span className="text-zinc-600 hidden sm:inline">//</span>
                <span className="text-xs font-mono text-zinc-300 hidden sm:inline uppercase truncate max-w-xs md:max-w-md">
                  {activeInspectProject.title}
                </span>
              </div>

              {/* View Mode Switcher & Controls */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1 p-0.5 rounded-full bg-black/80 border border-white/15">
                  <button
                    onClick={() => { if (onClickSound) onClickSound(); setInspectView('photo'); }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      inspectView === 'photo'
                        ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.4)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    PHOTO
                  </button>
                  <button
                    onClick={() => { if (onClickSound) onClickSound(); setInspectView('blueprint'); }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      inspectView === 'blueprint'
                        ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    BLUEPRINT
                  </button>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={prevInspect}
                    onMouseEnter={onHoverSound}
                    className="p-1.5 rounded-full bg-zinc-900 hover:bg-[#ccff00] text-zinc-300 hover:text-black transition-colors cursor-pointer"
                    title="Previous Spread (←)"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextInspect}
                    onMouseEnter={onHoverSound}
                    className="p-1.5 rounded-full bg-zinc-900 hover:bg-[#ccff00] text-zinc-300 hover:text-black transition-colors cursor-pointer"
                    title="Next Spread (→)"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={closeInspectionModal}
                    onMouseEnter={onHoverSound}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 border border-zinc-800 transition-colors cursor-pointer text-xs font-mono"
                    title="Close (Esc)"
                  >
                    <X size={14} />
                    <span className="hidden sm:inline">ESC</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body: Large Photographic Plate or Blueprint + Specs */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {inspectView === 'blueprint' ? (
                <div className="w-full">
                  <ArchitecturalBlueprint blueprint={activeInspectProject.blueprint} />
                </div>
              ) : (
                <div className="relative aspect-[16/9] w-full max-h-[58vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                  <img
                    src={activeInspectProject.image}
                    alt={activeInspectProject.title}
                    className="w-full h-full object-contain object-center bg-black"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono text-[#ccff00]">
                    FIG. {activeInspectProject.number} // HIGH-RES WORKSTATION CAPTURE
                  </div>
                </div>
              )}

              {/* Modal Metadata & Direct Action Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-zinc-800">
                <div>
                  <h4 className="text-xl font-bold font-display uppercase text-white">
                    {activeInspectProject.title}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {activeInspectProject.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={activeInspectProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={onHoverSound}
                    onClick={onClickSound}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#ccff00] text-black text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>Launch Live Build</span>
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={activeInspectProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={onHoverSound}
                    onClick={onClickSound}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono hover:text-white transition-colors cursor-pointer"
                  >
                    <GithubIcon size={13} />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Bottom Keyboard Navigation Ticker */}
            <div className="px-4 sm:px-6 py-2.5 bg-zinc-950 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span>PRESS [←] PREVIOUS</span>
                <span>•</span>
                <span>[→] NEXT</span>
                <span>•</span>
                <span>[ESC] CLOSE</span>
              </div>
              <div className="text-zinc-400">
                SHALINI THUMMANAPALLY ARCHIVE // 2026 EDITION
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

