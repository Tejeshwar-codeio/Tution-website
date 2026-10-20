import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    grade: String,
    board: String,
    branch: String,
    subjects: [String],
  },
  { _id: false }
);

const parentProfileSchema = new mongoose.Schema(
  {
    linkedStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    phone: String,
    role: { type: String, enum: ['student', 'parent', 'admin'], required: true },
    studentProfile: studentProfileSchema,
    parentProfile: parentProfileSchema,
    avatarUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
