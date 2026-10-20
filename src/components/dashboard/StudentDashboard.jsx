import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAuth } from '../../app/AuthProvider';
import { studentsApi } from '../../lib/api';
import Container from '../ui/Container';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import LiveClassCountdown from '../marketing/LiveClassCountdown';

export default function StudentDashboard() {
  const { user } = useAuth();
  const id = user?._id || user?.id;

  const { data, isLoading } = useQuery({
    queryKey: ['progress', id],
    queryFn: () => studentsApi.progress(id),
    enabled: !!id,
  });

  const chartData = data?.testResults?.map((t, i) => ({
    name: `Test ${data.testResults.length - i}`,
    score: Math.round((t.score / t.maxScore) * 100),
  })).reverse() || [];

  const liveNotif = data?.notifications?.find((n) => n.type === 'live_class');

  return (
    <div className="py-8">
      <Container>
        <h1 className="font-heading text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-slate-400 mb-8">Your learning command center</p>

        {isLoading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {liveNotif && (
                <LiveClassCountdown scheduledAt={liveNotif.scheduledAt} title={liveNotif.title} />
              )}
              <GlassCard hover={false}>
                <h2 className="font-heading font-semibold mb-4">Test Score Trend</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                      <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                      <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#22d3ee' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
              <GlassCard hover={false}>
                <h2 className="font-heading font-semibold mb-4">Assignments</h2>
                {data?.assignments?.length ? (
                  <ul className="space-y-3">
                    {data.assignments.map((a) => (
                      <li key={a._id} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-slate-200">{a.title}</span>
                        <Badge color="cyan">Due {new Date(a.dueDate).toLocaleDateString()}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 text-sm">No pending assignments</p>
                )}
              </GlassCard>
            </div>
            <div className="space-y-6">
              <GlassCard hover={false}>
                <p className="text-slate-400 text-sm">Attendance Rate</p>
                <p className="font-heading text-4xl font-bold text-gradient mt-1">{data?.attendanceRate ?? 0}%</p>
              </GlassCard>
              <GlassCard hover={false}>
                <h2 className="font-heading font-semibold mb-3">Recommended for You</h2>
                <p className="text-slate-500 text-xs mb-3">
                  Based on your branch: {user?.studentProfile?.branch || 'CSE'}
                </p>
                {data?.recommendedCourses?.map((c) => (
                  <Link key={c._id} to={`/courses/${c.slug}`} className="block py-2 text-indigo-400 hover:text-indigo-300 text-sm">
                    {c.title} →
                  </Link>
                ))}
              </GlassCard>
              <Button to="/contact" variant="outline" className="w-full">Book Extra Demo</Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
