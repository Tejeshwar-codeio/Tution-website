import { Navigate } from 'react-router-dom';
import { useAuth } from '../app/AuthProvider';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role;
  if (roles && !roles.includes(role)) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'parent') return <Navigate to="/parent" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
