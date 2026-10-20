import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: String,
    title: String,
    body: String,
    read: { type: Boolean, default: false },
    scheduledAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
