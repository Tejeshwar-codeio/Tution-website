import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

export default function SubjectCard({ name, description }) {
  return (
    <GlassCard className="!p-5">
      <Badge color="violet" className="mb-3">{name}</Badge>
      <p className="text-slate-400 text-sm">{description}</p>
    </GlassCard>
  );
}
