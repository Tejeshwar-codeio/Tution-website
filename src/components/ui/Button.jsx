import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow',
  secondary: 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-500/30',
  ghost: 'bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10',
  outline: 'border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10',
};

export default function Button({ children, variant = 'primary', to, href, className = '', ...props }) {
  const base = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${variants[variant]} ${className}`;

  if (to) return <Link to={to} className={base}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={base}>{children}</a>;
  return <button className={base} {...props}>{children}</button>;
}
