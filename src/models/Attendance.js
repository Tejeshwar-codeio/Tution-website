import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    sessionDate: Date,
    present: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Attendance', attendanceSchema);
