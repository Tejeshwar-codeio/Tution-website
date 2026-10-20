import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qualifications: [String],
    subjects: [String],
    branches: [String],
    experienceYears: Number,
    rating: { type: Number, default: 4.8 },
    bio: String,
    imageUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model('Tutor', tutorSchema);
