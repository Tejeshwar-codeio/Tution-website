import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import Tutor from '../src/models/Tutor.js';
import Course from '../src/models/Course.js';
import TestResult from '../src/models/TestResult.js';
import Attendance from '../src/models/Attendance.js';
import Assignment from '../src/models/Assignment.js';
import Notification from '../src/models/Notification.js';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/scoremax';

const courses = [
  { title: 'Matric Coaching', slug: 'matric', category: 'school', audience: ['Matric'], duration: '12 months', pricing: 12000, featured: true, description: 'Tamil Nadu state board — Maths, Physics, Chemistry & Computer Science.', syllabus: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'] },
  { title: 'CBSE Board Prep', slug: 'cbse', category: 'school', audience: ['CBSE'], duration: '10 months', pricing: 15000, featured: true, description: 'NCERT-aligned CBSE coaching with fast track exam preparation.', syllabus: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'] },
  { title: 'ICSE Programme', slug: 'icse', category: 'school', audience: ['ICSE'], duration: '10 months', pricing: 15000, featured: true, description: 'Comprehensive ICSE syllabus with individual care and step-by-step guidance.', syllabus: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'] },
  { title: 'NCERT Foundation', slug: 'ncert', category: 'school', audience: ['NCERT'], duration: '12 months', pricing: 14000, featured: true, description: 'NCERT curriculum coaching for school students.', syllabus: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'] },
  { title: 'BE — Computer Sciences', slug: 'be-cse', category: 'engineering', audience: ['CSE'], duration: '6 months', pricing: 18000, featured: true, description: 'Semester coaching with video lectures for CSE subjects.', syllabus: ['DSA', 'DBMS', 'OS', 'Computer Networks'] },
  { title: 'BE — Mechanical Sciences', slug: 'be-mechanical', category: 'engineering', audience: ['Mechanical'], duration: '6 months', pricing: 16000, featured: true, description: 'Mechanical engineering semester subjects with lab support.', syllabus: ['Thermodynamics', 'Strength of Materials', 'Manufacturing', 'Design'] },
  { title: 'Project Consultancy', slug: 'project-consultancy', category: 'engineering', audience: ['CSE', 'ECE', 'Mechanical'], duration: '3 months', pricing: 8000, featured: true, description: 'End-to-end engineering project guidance and viva preparation.', syllabus: ['Topic Selection', 'Implementation', 'Documentation', 'Viva Prep'] },
];

const tutors = [
  { name: 'Prof. Ramesh Kumar', qualifications: ['M.Sc Physics', '15+ yrs teaching'], subjects: ['Physics', 'Mathematics'], branches: ['school'], experienceYears: 15, rating: 4.9, bio: 'Experienced faculty from reputed institutions — board exam specialist.' },
  { name: 'Dr. Senthil Murugan', qualifications: ['M.Tech CSE', 'Anna University'], subjects: ['DSA', 'DBMS', 'Networks'], branches: ['CSE'], experienceYears: 10, rating: 4.85, bio: 'Engineering coach with video lecture library and project consultancy expertise.' },
  { name: 'Ms. Kavitha N.', qualifications: ['M.Sc Chemistry'], subjects: ['Chemistry', 'Biology'], branches: ['school'], experienceYears: 12, rating: 4.8, bio: 'Individual care and step-by-step guidance for Matric, CBSE & ICSE students.' },
];

async function seed() {
  await mongoose.connect(uri);
  console.log('Connected for seeding');

  await Promise.all([
    User.deleteMany({}),
    Tutor.deleteMany({}),
    Course.deleteMany({}),
    TestResult.deleteMany({}),
    Attendance.deleteMany({}),
    Assignment.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash('password123', 12);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@scoremax.in',
    passwordHash,
    role: 'admin',
    phone: '919876543210',
  });

  const student = await User.create({
    name: 'Arjun Patel',
    email: 'student@scoremax.in',
    passwordHash,
    role: 'student',
    phone: '919876543211',
    studentProfile: { grade: '12', board: 'CBSE', branch: 'CSE', subjects: ['Physics', 'Mathematics'] },
  });

  const parent = await User.create({
    name: 'Mrs. Patel',
    email: 'parent@scoremax.in',
    passwordHash,
    role: 'parent',
    phone: '919876543212',
    parentProfile: { linkedStudentIds: [student._id] },
  });

  await Tutor.insertMany(tutors);
  const createdCourses = await Course.insertMany(courses);

  const liveClass = new Date();
  liveClass.setDate(liveClass.getDate() + 2);
  liveClass.setHours(18, 0, 0, 0);

  await Notification.create({
    userId: student._id,
    type: 'live_class',
    title: 'Upcoming Live Class: Physics — Optics',
    body: 'Join your mentor for an interactive problem-solving session.',
    scheduledAt: liveClass,
  });

  await TestResult.insertMany([
    { studentId: student._id, courseId: createdCourses[4]._id, testName: 'Weekly Assessment 4', score: 42, maxScore: 50, date: new Date() },
    { studentId: student._id, courseId: createdCourses[4]._id, testName: 'Weekly Assessment 3', score: 38, maxScore: 50, date: new Date(Date.now() - 7 * 86400000) },
    { studentId: student._id, courseId: createdCourses[4]._id, testName: 'Weekly Assessment 2', score: 35, maxScore: 50, date: new Date(Date.now() - 14 * 86400000) },
  ]);

  for (let i = 0; i < 8; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i * 3);
    await Attendance.create({
      studentId: student._id,
      courseId: createdCourses[4]._id,
      sessionDate: d,
      present: i !== 2,
    });
  }

  await Assignment.create({
    courseId: createdCourses[6]._id,
    title: 'IoT-Based Smart Monitoring System',
    dueDate: new Date(Date.now() + 5 * 86400000),
    studentIds: [student._id],
  });

  console.log('Seed complete!');
  console.log('Admin: admin@scoremax.in / password123');
  console.log('Student: student@scoremax.in / password123');
  console.log('Parent: parent@scoremax.in / password123');
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
