import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.q} className="glass rounded-xl overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between p-5 text-left"
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span className="font-medium text-slate-100">{item.q}</span>
            <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-slate-400 text-sm">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
