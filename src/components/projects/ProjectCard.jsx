import { Code2, ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ProjectCard({ project }) {
  return (
    <GlassCard className="overflow-hidden !p-0">
      <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
        <span className="font-heading text-2xl font-bold text-white/90">{project.title}</span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading font-semibold text-lg">{project.title}</h3>
          <Badge color={project.difficulty === 'Advanced' ? 'violet' : 'cyan'}>{project.difficulty}</Badge>
        </div>
        <p className="text-slate-400 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button href="https://github.com" variant="ghost" className="!py-2 !px-3 text-sm">
            <Code2 className="h-4 w-4" /> GitHub
          </Button>
          <Button href="#" variant="outline" className="!py-2 !px-3 text-sm">
            <ExternalLink className="h-4 w-4" /> Live Demo
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
