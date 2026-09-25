import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { terminalShowcaseData } from '../../data/portfolioData';

export default function TerminalShowcase({ onHoverSound, onClickSound }) {
  const [activeTab, setActiveTab] = useState(terminalShowcaseData.defaultTab);
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [typedCommand, setTypedCommand] = useState('');
  const [commandOutput, setCommandOutput] = useState('');
  const [autoCmdIndex, setAutoCmdIndex] = useState(0);

  const [cliHistory, setCliHistory] = useState([
    { type: 'input', text: 'shalini --status' },
    { type: 'output', text: 'STATUS: READY // Java Spring Boot + React + REST APIs' },
    { type: 'input', text: 'curl -s https://api.shalini.dev/v1/availability' },
    { type: 'output', text: '{ "available": true, "roles": ["Java Enterprise Backend", "React Frontend", "Full-Stack"] }' },
  ]);

  const currentFile = terminalShowcaseData.files.find((f) => f.name === activeTab) || terminalShowcaseData.files[0];

  // Natural Human Typing Simulator for Auto-Prompt Bar
  useEffect(() => {
    const commandsToType = [
      { cmd: 'git status', out: 'On branch main. Working tree clean. Zero vulnerabilities detected.' },
      { cmd: 'mvn clean compile spring-boot:run', out: 'Started CoreApplication in 1.482 seconds (process running at port 8080)' },
      { cmd: 'python vision_pipeline.py --fps=30', out: 'Loaded 68-point Dlib shape predictor. Video inference pipeline active.' },
      { cmd: 'ollama run llama3:latest', out: 'Model weights initialized in 128ms. Autonomous agent prompt ready.' },
    ];

    const currentTarget = commandsToType[autoCmdIndex];
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      if (!isDeleting) {
        if (charIdx <= currentTarget.cmd.length) {
          setTypedCommand(currentTarget.cmd.slice(0, charIdx));
          charIdx++;
          // Natural human variance in typing speed
          const delay = 50 + Math.random() * 60;
          timeoutId = setTimeout(tick, delay);
        } else {
          setCommandOutput(currentTarget.out);
          timeoutId = setTimeout(() => {
            isDeleting = true;
            tick();
          }, 3200); // Read output pause
        }
      } else {
        if (charIdx > 0) {
          charIdx--;
          setTypedCommand(currentTarget.cmd.slice(0, charIdx));
          setCommandOutput('');
          timeoutId = setTimeout(tick, 25);
        } else {
          isDeleting = false;
          setAutoCmdIndex((prev) => (prev + 1) % commandsToType.length);
        }
      }
    };

    timeoutId = setTimeout(tick, 800);
    return () => clearTimeout(timeoutId);
  }, [autoCmdIndex]);

  const handleCopy = () => {
    if (onClickSound) onClickSound();
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    if (onClickSound) onClickSound();
    const newHistory = [...cliHistory, { type: 'input', text: cmd }];

    if (cmd === 'clear') {
      setCliHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      newHistory.push({
        type: 'output',
        text: 'Available commands: skills, projects, contact, clear, motto, architecture, whoami',
      });
    } else if (cmd === 'skills') {
      newHistory.push({
        type: 'output',
        text: 'Java 17+, Spring Boot 3, Hibernate JPA, React 19, MySQL, Python, OpenCV, Ollama, Playwright, Tailwind',
      });
    } else if (cmd === 'projects') {
      newHistory.push({
        type: 'output',
        text: '1. SmartVote Bharat (E-Voting)  2. AI Job Application Bot  3. APEX TRUST Banking  4. MS Mobiles Omnichannel',
      });
    } else if (cmd === 'architecture') {
      newHistory.push({
        type: 'output',
        text: 'Pattern: Hexagonal Microservices + Reactive Clients + Edge Inference (ACID + Sub-120ms Latency)',
      });
    } else if (cmd === 'contact') {
      newHistory.push({
        type: 'output',
        text: 'Email: shalinithummanapally@gmail.com | Phone: +91 9391585557 | Resume: /Shalini_Thummanapally_Resume.pdf',
      });
    } else {
      newHistory.push({
        type: 'output',
        text: `zsh: command not found: ${cmd}. Type 'help' for authorized commands.`,
      });
    }

    setCliHistory(newHistory);
    setInputVal('');
  };

  return (
    <section id="code" className="relative py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        badge="// 05. LIVE CODE TERMINAL"
        title="Production Source Code & CLI"
        subtitle="Real code implementation snippets with natural typing cadence, syntax highlighting, and interactive terminal execution."
      />

      <div className="relative rounded-2xl bg-[#060a1c] border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 overflow-hidden">
        {/* Specular Terminal Light Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent pointer-events-none" />

        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080d24] border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 font-mono text-xs text-slate-400 hidden sm:inline">
              shalini@workstation: ~/production-source
            </span>
          </div>

          {/* File Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {terminalShowcaseData.files.map((file) => (
              <button
                key={file.name}
                onClick={() => {
                  if (onClickSound) onClickSound();
                  setActiveTab(file.name);
                }}
                onMouseEnter={onHoverSound}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors interactive-hover ${
                  activeTab === file.name
                    ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-semibold shadow-sm'
                    : 'bg-white/5 border border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {file.name}
              </button>
            ))}

            <button
              onClick={handleCopy}
              onMouseEnter={onHoverSound}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors ml-2 interactive-hover"
              title="Copy snippet"
              aria-label="Copy Code"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-6 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto max-h-[380px] bg-[#050817]/95 leading-relaxed relative z-10">
          <pre className="text-cyan-100">
            <code>{currentFile.content}</code>
          </pre>
        </div>

        {/* Natural Automated Typing Simulation Strip */}
        <div className="px-6 py-2.5 bg-[#070c22] border-t border-white/5 font-mono text-xs flex items-center justify-between text-slate-400 relative z-10">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-emerald-400 font-bold">~</span>
            <span className="text-cyan-300">{typedCommand}</span>
            <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
            {commandOutput && (
              <span className="text-slate-400 ml-3 text-[11px] truncate hidden md:inline">
                → {commandOutput}
              </span>
            )}
          </div>
          <span className="text-[10px] text-cyan-400/60 font-mono hidden sm:inline">
            AUTONOMOUS CADENCE
          </span>
        </div>

        {/* Interactive Shell Input */}
        <div className="p-4 bg-[#040714] border-t border-white/10 font-mono text-xs relative z-10">
          <div className="space-y-1 mb-2 max-h-24 overflow-y-auto">
            {cliHistory.map((item, idx) => (
              <div key={idx} className={item.type === 'input' ? 'text-cyan-300' : 'text-slate-400'}>
                {item.type === 'input' ? `$ ${item.text}` : item.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Try: skills, projects, architecture, contact, clear..."
              className="flex-1 bg-transparent border-none outline-none text-cyan-300 placeholder:text-slate-600 font-mono text-xs"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] flex items-center gap-1 hover:bg-cyan-500/30 interactive-hover"
            >
              <span>Execute</span>
              <CornerDownLeft size={11} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
