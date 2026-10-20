import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Container from '../components/ui/Container';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { coursesApi } from '../lib/api';
import { BRAND } from '../lib/constants';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesApi.get(slug),
  });

  if (isLoading) {
    return (
      <Container className="py-24">
        <p className="text-slate-400">Loading course...</p>
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-heading text-2xl mb-4">Course not found</h1>
        <Button to="/">Back Home</Button>
      </Container>
    );
  }

  return (
    <>
      <Helmet><title>{course.title} — {BRAND}</title></Helmet>
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Badge color="cyan" className="mb-4 capitalize">{course.category}</Badge>
              <h1 className="font-heading text-4xl font-bold text-slate-100 mb-4">{course.title}</h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{course.description}</p>
              <h2 className="font-heading text-xl font-semibold mb-4">Syllabus</h2>
              <ul className="space-y-2">
                {course.syllabus?.map((item, i) => (
                  <li key={item} className="flex gap-3 text-slate-300">
                    <span className="text-indigo-400 font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <GlassCard className="sticky top-24" hover={false}>
                <p className="text-slate-400 text-sm">Duration</p>
                <p className="text-slate-100 font-medium mb-4">{course.duration}</p>
                <p className="text-slate-400 text-sm">Pricing</p>
                <p className="font-heading text-3xl font-bold text-gradient mb-6">
                  ₹{course.pricing?.toLocaleString('en-IN')}
                </p>
                <Button to="/contact" className="w-full mb-3">Book Free Demo</Button>
                <Button to="/contact" variant="outline" className="w-full">Enroll Now</Button>
                <Link to="/mentors" className="block text-center text-sm text-indigo-400 mt-4 hover:underline">
                  Meet our mentors →
                </Link>
              </GlassCard>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
