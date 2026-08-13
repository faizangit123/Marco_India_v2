import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  status: { type: String, default: 'submitted', enum: ['submitted', 'under_review', 'in_progress', 'completed', 'cancelled'] },
  adminNotes: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
