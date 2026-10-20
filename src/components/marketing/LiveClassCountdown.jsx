import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

function getTimeLeft(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function LiveClassCountdown({ scheduledAt, title }) {
  const [left, setLeft] = useState(() => getTimeLeft(scheduledAt));

  useEffect(() => {
    const t = setInterval(() => setLeft(getTimeLeft(scheduledAt)), 1000);
    return () => clearInterval(t);
  }, [scheduledAt]);

  if (!left) return null;

  const parts = [
    { label: 'Days', value: left.days },
    { label: 'Hrs', value: left.hours },
    { label: 'Min', value: left.minutes },
    { label: 'Sec', value: left.seconds },
  ];

  return (
    <div className="glass rounded-2xl p-6 border-cyan-500/20">
      <div className="flex items-center gap-2 text-cyan-400 mb-2">
        <Clock className="h-5 w-5" />
        <span className="text-sm font-medium">Next Live Class</span>
      </div>
      {title && <p className="text-slate-100 font-medium mb-4">{title}</p>}
      <div className="grid grid-cols-4 gap-3">
        {parts.map((p) => (
          <div key={p.label} className="text-center bg-white/5 rounded-xl py-3">
            <span className="font-heading text-2xl font-bold text-gradient">{String(p.value).padStart(2, '0')}</span>
            <p className="text-slate-500 text-xs mt-1">{p.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
