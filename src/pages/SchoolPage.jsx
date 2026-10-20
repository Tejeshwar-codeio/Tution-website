import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import SubjectCard from '../components/courses/SubjectCard';
import Button from '../components/ui/Button';
import { schoolBands } from '../data/schoolSubjects';
import { BRAND } from '../lib/constants';

export default function SchoolPage() {
  const [active, setActive] = useState(0);
  const band = schoolBands[active];

  return (
    <>
      <Helmet><title>School Programs — {BRAND}</title></Helmet>
      <section className="py-16 md:py-24 relative overflow-hidden">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="School Programs"
            title="Matric / CBSE / ICSE / NCERT"
            subtitle="Maths, Physics, Chemistry, Computer Science and more — with experienced faculty, individual care, and fast track exam preparation."
          />
          <div className="flex flex-wrap gap-2 mb-8">
            {schoolBands.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActive(i)}
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  active === i ? 'bg-indigo-600 text-white' : 'glass text-slate-300'
                }`}
              >
                {b.title}
              </button>
            ))}
          </div>
          <ul className="flex flex-wrap gap-3 mb-8">
            {band.benefits.map((b) => (
              <li key={b} className="text-sm text-emerald-400 glass px-3 py-1 rounded-full">✓ {b}</li>
            ))}
          </ul>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {band.subjects.map((s) => (
              <SubjectCard key={s.name} {...s} />
            ))}
          </div>
          <Button to="/contact">Book Free Demo for {band.title}</Button>
        </Container>
      </section>
    </>
  );
}
