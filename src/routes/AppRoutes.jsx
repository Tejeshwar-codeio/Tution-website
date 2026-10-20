import { Routes, Route } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage';
import SchoolPage from '../pages/SchoolPage';
import EngineeringPage from '../pages/EngineeringPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import ProjectsPage from '../pages/ProjectsPage';
import MentorsPage from '../pages/MentorsPage';
import ResultsPage from '../pages/ResultsPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminOverview from '../pages/admin/AdminOverview';
import AdminBookings from '../pages/admin/AdminBookings';
import AdminCourses from '../pages/admin/AdminCourses';
import AdminUsers from '../pages/admin/AdminUsers';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="school" element={<SchoolPage />} />
        <Route path="engineering" element={<EngineeringPage />} />
        <Route path="courses/:slug" element={<CourseDetailPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="mentors" element={<MentorsPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute roles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="parent"
          element={
            <ProtectedRoute roles={['parent', 'admin']}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
}
