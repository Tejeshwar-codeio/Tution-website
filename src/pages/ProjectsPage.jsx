import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';
import { BRAND } from '../lib/constants';

export default function ProjectsPage() {
  const [difficulty, setDifficulty] = useState('all');
  const filtered = useMemo(
    () => (difficulty === 'all' ? projects : projects.filter((p) => p.difficulty === difficulty)),
    [difficulty]
  );

  return (
    <>
      <Helmet><title>Projects — {BRAND}</title></Helmet>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Project Showcase"
            subtitle="Industry-grade projects with tech stacks, difficulty levels, and deployment-ready code."
          />
          <div className="flex gap-2 mb-8">
            {['all', 'Intermediate', 'Advanced'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-full text-sm ${
                  difficulty === d ? 'bg-indigo-600 text-white' : 'glass text-slate-300'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
