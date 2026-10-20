import { Router } from 'express';
import Tutor from '../models/Tutor.js';

const router = Router();

router.get('/', async (req, res) => {
  const tutors = await Tutor.find().sort({ rating: -1 });
  res.json(tutors);
});

export default router;
