import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from '../../lib/api';
import GlassCard from '../../components/ui/GlassCard';

export default function AdminBookings() {
  const qc = useQueryClient();
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['demo-bookings'],
    queryFn: bookingsApi.listDemo,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => bookingsApi.updateDemo(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['demo-bookings'] }),
  });

  if (isLoading) return <p className="text-slate-400">Loading...</p>;

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Demo Bookings</h1>
      <div className="space-y-4">
        {bookings.map((b) => (
          <GlassCard key={b._id} hover={false}>
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-100">{b.studentName}</p>
                <p className="text-slate-400 text-sm">{b.email} · {b.phone}</p>
                <p className="text-slate-500 text-sm mt-1">{b.courseInterest} · {b.preferredTime}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                  b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>{b.status}</span>
                {b.status === 'pending' && (
                  <>
                    <button type="button" onClick={() => mutation.mutate({ id: b._id, status: 'confirmed' })} className="text-sm px-3 py-1 bg-indigo-600 rounded-lg">Confirm</button>
                    <button type="button" onClick={() => mutation.mutate({ id: b._id, status: 'cancelled' })} className="text-sm px-3 py-1 glass rounded-lg">Cancel</button>
                  </>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
