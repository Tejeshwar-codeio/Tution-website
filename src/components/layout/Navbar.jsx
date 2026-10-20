import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { useAuth } from '../../app/AuthProvider';
import MobileDrawer from './MobileDrawer';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const dashLink = user?.role === 'admin' ? '/admin' : user?.role === 'parent' ? '/parent' : user ? '/dashboard' : '/login';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-glow">
              <GraduationCap className="h-5 w-5 text-white" />
            </span>
            <span className="hidden sm:inline text-slate-100">{BRAND}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button to="/contact" variant="primary" className="hidden sm:inline-flex !py-2 !px-4 text-sm">
              Book Free Demo
            </Button>
            <Link to={dashLink} className="hidden md:inline text-sm text-slate-400 hover:text-white px-2">
              {user ? 'Dashboard' : 'Login'}
            </Link>
            <button type="button" className="lg:hidden p-2 glass rounded-lg" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </Container>
      <AnimatePresence>
        {open && <MobileDrawer onClose={() => setOpen(false)} dashLink={dashLink} />}
      </AnimatePresence>
    </header>
  );
}
