import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const replies = {
  demo: 'Book a free demo on our Contact page — we confirm within 24 hours!',
  courses: 'We offer Matric, CBSE, ICSE, NCERT coaching and BE/Diploma/Arts & Science programmes.',
  fees: 'Fees vary by program. Book a demo for a personalized quote.',
  default: 'Thanks for reaching out! Book a free demo or WhatsApp us for quick answers.',
};

const quickReplies = ['Book a demo', 'Courses offered', 'Fee structure'];

function getReply(text) {
  const t = text.toLowerCase();
  if (t.includes('demo')) return replies.demo;
  if (t.includes('course') || t.includes('program')) return replies.courses;
  if (t.includes('fee') || t.includes('price')) return replies.fees;
  return replies.default;
}

export default function AIChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m ScoreMax Assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const send = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: 'user', text }, { from: 'bot', text: getReply(text) }]);
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-glow hover:bg-indigo-500 transition-all"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] glass rounded-2xl shadow-glow flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 bg-indigo-600/20">
              <p className="font-heading font-semibold">ScoreMax Assistant</p>
              <p className="text-xs text-slate-400">AI-powered · Demo booking help</p>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm p-3 rounded-xl max-w-[85%] ${
                    m.from === 'user' ? 'ml-auto bg-indigo-600 text-white' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-2 flex flex-wrap gap-1 border-t border-white/10">
              {quickReplies.map((q) => (
                <button key={q} type="button" onClick={() => send(q)} className="text-xs px-2 py-1 rounded-full glass text-cyan-400">
                  {q}
                </button>
              ))}
            </div>
            <div className="p-3 flex gap-2 border-t border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Ask anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none"
              />
              <button type="button" onClick={() => send(input)} className="p-2 bg-indigo-600 rounded-lg">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <Link to="/contact" className="text-center text-xs text-indigo-400 py-2 hover:underline">
              Book Free Demo →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
