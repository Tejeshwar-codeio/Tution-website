import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import TestimonialSlider from '../components/testimonials/TestimonialSlider';
import StatsCounter from '../components/home/StatsCounter';
import { universities } from '../data/testimonials';
import { BRAND } from '../lib/constants';

export default function ResultsPage() {
  return (
    <>
      <Helmet><title>Results & Testimonials — {BRAND}</title></Helmet>
      <StatsCounter />
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Results & Testimonials"
            subtitle="Real outcomes from students and parents who trusted ScoreMax Institute."
          />
          <TestimonialSlider />
          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-4">Our students study at leading institutions</p>
            <div className="flex flex-wrap justify-center gap-3">
              {universities.map((u) => (
                <span key={u} className="glass px-5 py-2 rounded-full text-slate-300 font-medium">{u}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
