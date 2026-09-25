import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, FileText, Send, CheckCircle2, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Github, Linkedin } from '../common/BrandIcons';
import SectionHeading from '../common/SectionHeading';
import GlassCard from '../common/GlassCard';
import MagneticButton from '../common/MagneticButton';
import { personalInfo } from '../../data/portfolioData';

export default function Contact({ onHoverSound, onClickSound, onPlaySuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    if (onClickSound) onClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (onClickSound) onClickSound();
    setIsSubmitting(true);

    // Simulate sending network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onPlaySuccess) onPlaySuccess();

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#38bdf8', '#818cf8', '#c084fc', '#ffffff'],
        });
      } catch {
        // Confetti fallback
      }

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading
        badge="// 09. CONNECT & COLLABORATE"
        title="Initiate a Direct Transmission"
        subtitle="Whether you're hiring for a high-impact engineering role, building an enterprise microservice, or exploring AI applications."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Reach Cards */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" />
              Direct Communication
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              I am actively discussing full-time opportunities, senior engineering positions, and high-leverage software architectures.
            </p>

            <div className="space-y-3">
              {/* Email card with direct copy button */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-slate-400">Email Address</div>
                    <div className="text-xs sm:text-sm font-mono text-white truncate">
                      {personalInfo.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={onHoverSound}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors interactive-hover"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={onHoverSound}
                className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-400/40 flex items-center justify-between gap-3 transition-colors interactive-hover group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Professional Network</div>
                    <div className="text-xs sm:text-sm font-medium text-white group-hover:text-cyan-300">
                      LinkedIn Profile
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Connect →
                </span>
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={onHoverSound}
                className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-purple-400/40 flex items-center justify-between gap-3 transition-colors interactive-hover group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                    <Github size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Open Source Code</div>
                    <div className="text-xs sm:text-sm font-medium text-white group-hover:text-purple-300">
                      GitHub Repositories
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform">
                  View →
                </span>
              </a>

              {/* Resume download option */}
              <a
                href="/Shalini_Thummanapally_Resume.pdf"
                download="Shalini_Thummanapally_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={onHoverSound}
                className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-400/40 flex items-center justify-between gap-3 transition-colors interactive-hover group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                    <FileText size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Curriculum Vitae</div>
                    <div className="text-xs sm:text-sm font-medium text-white group-hover:text-emerald-300">
                      Download Official Resume
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Download ↓
                </span>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Futuristic Contact Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-8">
            <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-cyan-400" />
              Send a Secure Message
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-display font-bold text-white">
                  Transmission Delivered!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out. Shalini has received your notification and will reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input with floating label */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`block text-xs font-mono mb-1 transition-colors ${
                        focusedField === 'name' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`block text-xs font-mono mb-1 transition-colors ${
                        focusedField === 'email' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className={`block text-xs font-mono mb-1 transition-colors ${
                      focusedField === 'subject' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Senior Developer Role / Technical Project Discussion"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`block text-xs font-mono mb-1 transition-colors ${
                      focusedField === 'message' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    Message Payload *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell Shalini about your project, team, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  onHoverSound={onHoverSound}
                  onClickSound={onClickSound}
                  variant="primary"
                  className="w-full py-4 text-sm font-bold shadow-xl shadow-cyan-500/25 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Payload...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Send Transmission</span>
                      <Send size={16} />
                    </div>
                  )}
                </MagneticButton>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
