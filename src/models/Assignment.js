import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    dueDate: Date,
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    submissionUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model('Assignment', assignmentSchema);
