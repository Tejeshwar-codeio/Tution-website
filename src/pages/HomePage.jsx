import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import HeroSection from '../components/home/HeroSection';
import StatsCounter from '../components/home/StatsCounter';
import CourseGrid from '../components/courses/CourseGrid';
import FeatureCard from '../components/marketing/FeatureCard';
import ProjectCard from '../components/projects/ProjectCard';
import TestimonialSlider from '../components/testimonials/TestimonialSlider';
import DemoCTA from '../components/marketing/DemoCTA';
import { schoolCategories, collegeCategories } from '../data/categories';
import { features } from '../data/features';
import { projects } from '../data/projects';
import { universities } from '../data/testimonials';
import { staggerContainer, fadeInUp, viewportOnce } from '../lib/motionVariants';
import { BRAND } from '../lib/constants';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{BRAND} — School & Engineering Coaching</title>
      </Helmet>
      <HeroSection />
      <StatsCounter />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Programs" title="Our Curriculums" subtitle="Matric, CBSE, ICSE, NCERT and higher education — all under one roof" />
          <h3 className="font-heading text-xl text-emerald-400 mb-4">School Boards</h3>
          <CourseGrid items={schoolCategories} />
          <h3 className="font-heading text-xl text-amber-400 mb-4 mt-12">Higher Education</h3>
          <CourseGrid items={collegeCategories} columns={4} />
        </Container>
      </section>

      <section className="py-20 bg-slate-900/50">
        <Container>
          <SectionHeading eyebrow="Why ScoreMax" title="Unique Features" subtitle="What makes ScoreMax Institute the right choice for your learning journey" />
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Portfolio" title="Project Showcase" subtitle="Engineering project consultancy — real builds for your academic success" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-slate-900/50">
        <Container>
          <SectionHeading eyebrow="Success Stories" title="What Students & Parents Say" />
          <TestimonialSlider />
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {universities.map((u) => (
              <span key={u} className="glass px-4 py-2 rounded-full text-slate-400 text-sm">{u}</span>
            ))}
          </div>
        </Container>
      </section>

      <DemoCTA />
    </>
  );
}
