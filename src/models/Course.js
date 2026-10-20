import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, enum: ['school', 'engineering'], required: true },
    audience: [String],
    pricing: { type: Number, default: 0 },
    duration: String,
    syllabus: [String],
    description: String,
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
