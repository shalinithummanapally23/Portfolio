import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Mail, FileText } from 'lucide-react';
import { Github, Linkedin } from '../common/BrandIcons';
import { personalInfo } from '../../data/portfolioData';

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  activeSection,
  onNavigate,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#050816]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold font-display text-gradient tracking-wider">
                MA.DEV
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4 my-auto">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.id);
                    onClose();
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className={`flex items-center justify-between text-2xl font-display font-semibold py-2 px-4 rounded-xl transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
                </motion.a>
              );
            })}
          </nav>

          {/* Bottom Action & Socials */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-black bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/20"
            >
              <span>Get in Touch</span>
              <ExternalLink size={16} />
            </a>

            <div className="flex items-center justify-center gap-6 text-slate-400 pt-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
