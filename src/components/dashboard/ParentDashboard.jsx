import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../../app/AuthProvider';
import { studentsApi } from '../../lib/api';
import { WHATSAPP } from '../../lib/constants';
import Container from '../ui/Container';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ParentDashboard() {
  const { user } = useAuth();
  const linked = user?.parentProfile?.linkedStudentIds?.[0];
  const studentId = linked?._id || linked || linked?.toString?.();
  const [selectedId] = useState(studentId);

  const { data, isLoading } = useQuery({
    queryKey: ['parent-progress', selectedId],
    queryFn: () => studentsApi.progress(selectedId),
    enabled: !!selectedId,
  });

  return (
    <div className="py-8">
      <Container>
        <h1 className="font-heading text-3xl font-bold mb-2">Parent Dashboard</h1>
        <p className="text-slate-400 mb-8">Track your child&apos;s academic progress</p>

        {isLoading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard hover={false} className="md:col-span-2">
              <h2 className="font-heading font-semibold mb-4">Weekly Summary — {data?.student?.name}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-slate-500 text-sm">Attendance</p>
                  <p className="text-2xl font-bold text-emerald-400">{data?.attendanceRate}%</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Latest Test</p>
                  <p className="text-2xl font-bold text-indigo-400">
                    {data?.testResults?.[0]
                      ? `${data.testResults[0].score}/${data.testResults[0].maxScore}`
                      : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Grade / Board</p>
                  <p className="text-lg text-slate-200">
                    {data?.student?.studentProfile?.grade} · {data?.student?.studentProfile?.board}
                  </p>
                </div>
              </div>
            </GlassCard>
            <GlassCard hover={false}>
              <h2 className="font-heading font-semibold mb-4">Recent Tests</h2>
              <ul className="space-y-2">
                {data?.testResults?.slice(0, 5).map((t) => (
                  <li key={t._id} className="flex justify-between text-sm">
                    <span className="text-slate-300">{t.testName}</span>
                    <Badge color="cyan">{t.score}/{t.maxScore}</Badge>
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard hover={false} className="md:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-100">Questions for the mentor?</h3>
                  <p className="text-slate-400 text-sm">Reach out directly via WhatsApp</p>
                </div>
                <Button href={`https://wa.me/${WHATSAPP}`} variant="secondary">
                  <MessageCircle className="h-4 w-4" /> Message Mentor
                </Button>
              </div>
            </GlassCard>
          </div>
        )}
      </Container>
    </div>
  );
}
