import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    testName: String,
    score: Number,
    maxScore: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('TestResult', testResultSchema);
