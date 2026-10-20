import { Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

export default function MentorCard({ mentor }) {
  return (
    <GlassCard>
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center font-heading font-bold text-xl text-white shrink-0">
          {mentor.name?.charAt(0)}
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-slate-100">{mentor.name}</h3>
          <div className="flex items-center gap-1 text-amber-400 text-sm mt-1">
            <Star className="h-4 w-4 fill-current" />
            <span>{mentor.rating}</span>
            <span className="text-slate-500">· {mentor.experienceYears}+ yrs</span>
          </div>
        </div>
      </div>
      <p className="text-slate-400 text-sm mt-4 leading-relaxed">{mentor.bio}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {mentor.subjects?.slice(0, 4).map((s) => (
          <Badge key={s} color="cyan">{s}</Badge>
        ))}
      </div>
      <ul className="mt-3 text-slate-500 text-xs">
        {mentor.qualifications?.map((q) => (
          <li key={q}>• {q}</li>
        ))}
      </ul>
    </GlassCard>
  );
}
