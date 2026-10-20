import { Users, Calendar, BookOpen, IndianRupee } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const icons = { Users, Calendar, BookOpen, IndianRupee };

export default function AnalyticsCards({ data }) {
  const cards = [
    { label: 'Total Students', value: data?.totalStudents ?? 0, icon: 'Users', color: 'text-indigo-400' },
    { label: 'Bookings This Week', value: data?.bookingsThisWeek ?? 0, icon: 'Calendar', color: 'text-cyan-400' },
    { label: 'Active Courses', value: data?.activeCourses ?? 0, icon: 'BookOpen', color: 'text-emerald-400' },
    { label: 'Revenue (MTD)', value: `₹${(data?.revenuePlaceholder ?? 0).toLocaleString('en-IN')}`, icon: 'IndianRupee', color: 'text-violet-400' },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = icons[c.icon];
        return (
          <GlassCard key={c.label} hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{c.label}</p>
                <p className="font-heading text-2xl font-bold text-slate-100 mt-1">{c.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${c.color} opacity-80`} />
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
