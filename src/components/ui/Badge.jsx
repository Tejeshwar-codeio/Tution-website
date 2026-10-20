const colors = {
  default: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30',
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30',
  violet: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
};

export default function Badge({ children, color = 'default', className = '' }) {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
