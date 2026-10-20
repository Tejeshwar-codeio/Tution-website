import { Router } from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import DemoBooking from '../models/DemoBooking.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(auth, requireRole('admin'));

router.get('/analytics', async (req, res) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const [totalStudents, bookingsThisWeek, activeCourses, pendingBookings] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    DemoBooking.countDocuments({ createdAt: { $gte: weekAgo } }),
    Course.countDocuments(),
    DemoBooking.countDocuments({ status: 'pending' }),
  ]);

  res.json({
    totalStudents,
    bookingsThisWeek,
    activeCourses,
    pendingBookings,
    revenuePlaceholder: 248500,
  });
});

router.get('/users', async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
});

router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
