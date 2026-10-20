import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User.js';
import { auth, attachUser } from '../middleware/auth.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  role: z.enum(['student', 'parent', 'admin']).default('student'),
  grade: z.string().optional(),
  board: z.string().optional(),
  branch: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  );
}

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: data.email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      phone: data.phone,
      role: data.role,
      studentProfile:
        data.role === 'student'
          ? { grade: data.grade, board: data.board, branch: data.branch, subjects: [] }
          : undefined,
      parentProfile: data.role === 'parent' ? { linkedStudentIds: [] } : undefined,
    });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, studentProfile: user.studentProfile },
    });
  } catch (e) {
    if (e.name === 'ZodError') return res.status(400).json({ message: e.issues[0].message });
    res.status(500).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentProfile: user.studentProfile,
        parentProfile: user.parentProfile,
      },
    });
  } catch (e) {
    if (e.name === 'ZodError') return res.status(400).json({ message: e.issues[0].message });
    res.status(500).json({ message: e.message });
  }
});

router.get('/me', auth, attachUser, (req, res) => {
  res.json({ user: req.user });
});

export default router;
