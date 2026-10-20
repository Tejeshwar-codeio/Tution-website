import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import AnalyticsCards from '../../components/dashboard/AnalyticsCards';
import { adminApi, bookingsApi } from '../../lib/api';
import GlassCard from '../../components/ui/GlassCard';
import { BRAND } from '../../lib/constants';

export default function AdminOverview() {
  const { data: analytics } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: adminApi.analytics,
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['demo-bookings'],
    queryFn: bookingsApi.listDemo,
  });

  const pending = bookings.filter((b) => b.status === 'pending').slice(0, 5);

  return (
    <>
      <Helmet><title>Admin — {BRAND}</title></Helmet>
      <h1 className="font-heading text-3xl font-bold mb-8">Admin Overview</h1>
      <AnalyticsCards data={analytics} />
      <GlassCard className="mt-8" hover={false}>
        <h2 className="font-heading font-semibold mb-4">Pending Demo Bookings</h2>
        {pending.length ? (
          <ul className="space-y-2">
            {pending.map((b) => (
              <li key={b._id} className="flex justify-between text-sm py-2 border-b border-white/5">
                <span>{b.studentName} — {b.courseInterest || 'General'}</span>
                <span className="text-amber-400">{b.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm">No pending bookings</p>
        )}
      </GlassCard>
    </>
  );
}
