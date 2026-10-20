import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesApi, adminApi } from '../../lib/api';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

export default function AdminCourses() {
  const qc = useQueryClient();
  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesApi.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteCourse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['courses'] }),
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Courses</h1>
      <div className="space-y-4">
        {courses.map((c) => (
          <GlassCard key={c._id} hover={false}>
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-slate-500 text-sm">{c.slug} · {c.category} · ₹{c.pricing}</p>
              </div>
              <div className="flex gap-2">
                <Button to={`/courses/${c.slug}`} variant="ghost" className="!py-2 !px-3 text-sm">View</Button>
                <button
                  type="button"
                  onClick={() => deleteMutation.mutate(c._id)}
                  className="text-sm text-red-400 hover:text-red-300 px-3"
                >
                  Delete
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
