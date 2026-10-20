import { Router } from 'express';
import { z } from 'zod';
import DemoBooking from '../models/DemoBooking.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

const bookingSchema = z.object({
  studentName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  role: z.string().optional(),
  courseInterest: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

router.post('/demo', async (req, res) => {
  try {
    const data = bookingSchema.parse(req.body);
    const booking = await DemoBooking.create({
      ...data,
      preferredDate: data.preferredDate ? new Date(data.preferredDate) : undefined,
    });
    res.status(201).json(booking);
  } catch (e) {
    if (e.name === 'ZodError') return res.status(400).json({ message: e.issues[0].message });
    res.status(500).json({ message: e.message });
  }
});

router.get('/demo', auth, requireRole('admin'), async (req, res) => {
  const bookings = await DemoBooking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

router.patch('/demo/:id', auth, requireRole('admin'), async (req, res) => {
  const { status, notes, assignedTutorId } = req.body;
  const booking = await DemoBooking.findByIdAndUpdate(
    req.params.id,
    { status, notes, assignedTutorId },
    { new: true }
  );
  res.json(booking);
});

export default router;
