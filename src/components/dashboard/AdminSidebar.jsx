import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Calendar, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '../../app/AuthProvider';
import { BRAND } from '../../lib/constants';

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/bookings', label: 'Demo Bookings', icon: Calendar },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 shrink-0 glass border-r border-white/10 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8 px-2">
        <GraduationCap className="h-6 w-6 text-indigo-400" />
        <span className="font-heading font-bold text-sm">{BRAND}</span>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <button type="button" onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-red-400 text-sm">
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </aside>
  );
}
