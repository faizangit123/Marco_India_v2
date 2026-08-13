import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  serviceType: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'new', enum: ['new', 'read', 'replied', 'archived'] },
  adminNotes: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('ContactMessage', contactMessageSchema);
