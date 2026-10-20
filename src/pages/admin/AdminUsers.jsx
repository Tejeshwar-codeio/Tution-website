import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';
import GlassCard from '../../components/ui/GlassCard';

export default function AdminUsers() {
  const qc = useQueryClient();
  const { data: users = [] } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminApi.users,
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Users</h1>
      <div className="space-y-3">
        {users.map((u) => (
          <GlassCard key={u._id} hover={false} className="!py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-slate-500 text-sm">{u.email} · <span className="capitalize text-indigo-400">{u.role}</span></p>
              </div>
              {u.role !== 'admin' && (
                <button type="button" onClick={() => deleteMutation.mutate(u._id)} className="text-sm text-red-400">
                  Remove
                </button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
