import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Fuse from 'fuse.js';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import CourseFilter from '../components/courses/CourseFilter';
import SubjectCard from '../components/courses/SubjectCard';
import Button from '../components/ui/Button';
import { engineeringTopics, engineeringBenefits } from '../data/engineeringSubjects';
import { BRAND } from '../lib/constants';

const categories = ['core', 'language', 'web', 'advanced', 'career'];

export default function EngineeringPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = engineeringTopics;
    if (filter !== 'all') list = list.filter((t) => t.category === filter);
    if (search.trim()) {
      const fuse = new Fuse(list, { keys: ['name', 'description'] });
      return fuse.search(search).map((r) => r.item);
    }
    return list;
  }, [filter, search]);

  return (
    <>
      <Helmet><title>Engineering Programs — {BRAND}</title></Helmet>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Higher Education"
            title="BE / Diploma / Arts & Science"
            subtitle="Mechanical Sciences, Electronics, Computer Sciences — with video lectures, semester coaching, and project consultancy."
          />
          <ul className="flex flex-wrap gap-3 mb-8">
            {engineeringBenefits.map((b) => (
              <li key={b} className="text-sm text-cyan-400 glass px-3 py-1 rounded-full">✓ {b}</li>
            ))}
          </ul>
          <input
            type="search"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mb-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
          />
          <CourseFilter categories={categories} active={filter} onChange={setFilter} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {filtered.map((t) => (
              <SubjectCard key={t.name} name={t.name} description={t.description} />
            ))}
          </div>
          <Button to="/contact">Book Engineering Demo</Button>
        </Container>
      </section>
    </>
  );
}
