import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import { NAV_LINKS } from '../../lib/constants';

export default function MobileDrawer({ onClose, dashLink }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 glass border-l border-white/10 p-6"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="font-heading font-bold">Menu</span>
          <button type="button" onClick={onClose} className="p-2 glass rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `text-lg py-2 ${isActive ? 'text-indigo-400' : 'text-slate-300'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to={dashLink} onClick={onClose} className="text-slate-400 py-2">
            Dashboard / Login
          </NavLink>
          <Button to="/contact" onClick={onClose} className="mt-4">
            Book Free Demo
          </Button>
        </div>
      </motion.aside>
    </>
  );
}
