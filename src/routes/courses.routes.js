import { Router } from 'express';
import Course from '../models/Course.js';
import { auth, requireRole } from '../middleware/auth.js';
import { z } from 'zod';

const router = Router();

router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.audience) filter.audience = req.query.audience;
  const courses = await Course.find(filter).sort({ featured: -1, title: 1 });
  res.json(courses);
});

router.get('/:slug', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

const courseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.enum(['school', 'engineering']),
  audience: z.array(z.string()).optional(),
  pricing: z.number().optional(),
  duration: z.string().optional(),
  syllabus: z.array(z.string()).optional(),
  description: z.string().optional(),
  featured: z.boolean().optional(),
});

router.post('/', auth, requireRole('admin'), async (req, res) => {
  const data = courseSchema.parse(req.body);
  const course = await Course.create(data);
  res.status(201).json(course);
});

router.put('/:id', auth, requireRole('admin'), async (req, res) => {
  const data = courseSchema.partial().parse(req.body);
  const course = await Course.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(course);
});

router.delete('/:id', auth, requireRole('admin'), async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
