import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, CornerDownLeft, MessageCircle } from 'lucide-react';
import { defaultGreeting, suggestedPrompts, getAIResponse } from '../../data/aiResponses';

export default function FloatingAIAssistant({ onHoverSound, onClickSound }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'greeting',
      sender: 'ai',
      text: defaultGreeting,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    if (onClickSound) onClickSound();

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic assistant typewriter delay
    setTimeout(() => {
      const reply = getAIResponse(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      if (onClickSound) onClickSound();
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Holographic Orb Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer"
            onClick={() => {
              if (onClickSound) onClickSound();
              setIsOpen(true);
            }}
            onMouseEnter={onHoverSound}
          >
            {/* Ambient Pulsing Aura */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-60 blur-lg animate-pulse" />

            {/* Glowing Orb Button */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0b122e] to-[#151c42] border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-2xl shadow-cyan-500/50">
              <Bot size={26} className="animate-bounce-subtle" />

              {/* Status Dot */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050816] animate-pulse" />
            </div>

            {/* Floating Greeting Pill */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs font-medium text-slate-200 shadow-xl pointer-events-none hidden sm:block">
              <span>Ask Shalini's AI ⚡</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Chat Drawer Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="w-[90vw] sm:w-[380px] h-[520px] rounded-3xl bg-[#080d22]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden text-slate-100"
          >
            {/* Chat Header */}
            <div className="p-4 bg-[#0c1435] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Shalini AI Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300">
                    Online & Ready
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onClickSound) onClickSound();
                  setIsOpen(false);
                }}
                onMouseEnter={onHoverSound}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors interactive-hover"
                aria-label="Close AI Assistant"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={13} />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-900/80 border border-white/10 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={13} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Bot size={13} />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-200" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggested Prompt Chips */}
            <div className="p-2.5 bg-slate-950/60 border-t border-white/5 overflow-x-auto flex gap-1.5">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  onMouseEnter={onHoverSound}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors flex-shrink-0 interactive-hover"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#0a0f26] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Spring Boot, AI, or experience..."
                className="flex-1 bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                onMouseEnter={onHoverSound}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all interactive-hover"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
