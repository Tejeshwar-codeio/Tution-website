import { Router } from 'express';
import User from '../models/User.js';
import TestResult from '../models/TestResult.js';
import Attendance from '../models/Attendance.js';
import Assignment from '../models/Assignment.js';
import Notification from '../models/Notification.js';
import Course from '../models/Course.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/:id/progress', auth, async (req, res) => {
  const studentId = req.params.id;
  if (req.userRole === 'student' && req.userId !== studentId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const student = await User.findById(studentId).select('-passwordHash');
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const [testResults, attendance, assignments, notifications] = await Promise.all([
    TestResult.find({ studentId }).sort({ date: -1 }).limit(10),
    Attendance.find({ studentId }).sort({ sessionDate: -1 }).limit(20),
    Assignment.find({ studentIds: studentId }).sort({ dueDate: 1 }).limit(10),
    Notification.find({ userId: studentId }).sort({ scheduledAt: 1 }).limit(5),
  ]);

  const presentCount = attendance.filter((a) => a.present).length;
  const attendanceRate = attendance.length ? Math.round((presentCount / attendance.length) * 100) : 92;

  const courses = await Course.find({
    category: student.studentProfile?.branch ? 'engineering' : 'school',
  }).limit(4);

  res.json({
    student,
    testResults,
    attendance,
    attendanceRate,
    assignments,
    notifications,
    recommendedCourses: courses,
  });
});

export default router;
