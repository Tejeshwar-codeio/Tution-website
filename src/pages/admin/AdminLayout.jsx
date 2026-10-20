import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/dashboard/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
