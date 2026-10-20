import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import MentorCard from '../components/mentors/MentorCard';
import { tutorsApi } from '../lib/api';
import { BRAND } from '../lib/constants';

export default function MentorsPage() {
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ['tutors'],
    queryFn: tutorsApi.list,
  });

  return (
    <>
      <Helmet><title>Mentors — {BRAND}</title></Helmet>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Meet Our Expert Mentors"
            subtitle="Qualified faculty with proven track records in board exams, engineering subjects, and placements."
          />
          {isLoading ? (
            <p className="text-slate-400">Loading mentors...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((m) => (
                <MentorCard key={m._id} mentor={m} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
