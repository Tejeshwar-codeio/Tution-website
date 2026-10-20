import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { testimonials } from '../../data/testimonials';
import { tabContent } from '../../lib/motionVariants';

const tabs = [
  { id: 'parents', label: 'Parents' },
  { id: 'school', label: 'School Students' },
  { id: 'engineering', label: 'Engineering Students' },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState('parents');
  const items = testimonials[active];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              active === t.id ? 'bg-indigo-600 text-white' : 'glass text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={tabContent}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid md:grid-cols-2 gap-6"
        >
          {items.map((item) => (
            <GlassCard key={item.name}>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 italic mb-4">&ldquo;{item.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-slate-100">{item.name}</p>
                <p className="text-slate-400 text-sm">{item.role}</p>
                <p className="text-cyan-400 text-sm mt-1">{item.university}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </AnimatePresence>
      <p className="text-center text-slate-500 text-sm mt-6">
        Video testimonials available on request — book a demo to hear success stories live.
      </p>
    </div>
  );
}
