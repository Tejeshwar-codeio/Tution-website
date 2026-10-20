import mongoose from 'mongoose';

const demoBookingSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: String,
    courseInterest: String,
    preferredDate: Date,
    preferredTime: String,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    notes: String,
    assignedTutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
  },
  { timestamps: true }
);

export default mongoose.model('DemoBooking', demoBookingSchema);
