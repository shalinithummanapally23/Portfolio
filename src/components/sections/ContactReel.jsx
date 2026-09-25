import { useState } from 'react';
import { Mail, Phone, CheckCircle2, Send } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactReel({ onHoverSound, onClickSound, onPlaySuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onClickSound) onClickSound();
    setSubmitting(true);

    // Form submission triggers direct email to Shalini's official inbox
    const subject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Shalini,\n\nYou have received a new inquiry from your Portfolio website:\n\n` +
      `From: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Subject: ${formData.subject || 'N/A'}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `----------------------------------------\n` +
      `Sent via Shalini Thummanapally Portfolio`
    );

    window.location.href = `mailto:shalinithummanapally@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      if (onPlaySuccess) onPlaySuccess();
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black text-white pt-24 pb-16 sm:py-24 px-4 sm:px-12 select-none overflow-hidden scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Socials (Matching Reel Frame 11) */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight">
                Get in touch
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-2 sm:mt-3 leading-relaxed">
                Have a software project, enterprise opportunity, or engineering collaboration in mind? Let’s connect and create something exceptional.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-5 sm:space-y-6">
              <div>
                <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Email:
                </span>
                <a
                  href="mailto:shalinithummanapally@gmail.com"
                  onMouseEnter={onHoverSound}
                  className="text-base sm:text-xl font-medium text-white hover:text-[#ccff00] transition-colors font-mono break-all sm:break-normal"
                >
                  shalinithummanapally@gmail.com
                </a>
              </div>

              <div>
                <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Phone:
                </span>
                <a
                  href="tel:+919391585557"
                  onMouseEnter={onHoverSound}
                  className="text-lg sm:text-xl font-medium text-white hover:text-[#ccff00] transition-colors font-mono"
                >
                  +91 9391585557
                </a>
              </div>

              <div>
                <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Location:
                </span>
                <span className="text-lg sm:text-xl font-medium text-white">
                  Hyderabad, Telangana, India
                </span>
              </div>

              <div>
                <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
                  Connect & Profiles:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:shalinithummanapally@gmail.com"
                    onMouseEnter={onHoverSound}
                    className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#ccff00] transition-all duration-300"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>

                  <a
                    href="/Shalini_Thummanapally_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Shalini_Thummanapally_Resume.pdf"
                    onMouseEnter={onHoverSound}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all duration-300"
                    aria-label="Download Official Resume PDF"
                  >
                    <span>Resume (PDF) ↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Matching Reel Frame 11) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] text-base sm:text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] text-base sm:text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] text-base sm:text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] text-base sm:text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write something..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] text-sm transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || submitted}
                onMouseEnter={onHoverSound}
                className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-[#ccff00] text-black font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : submitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
