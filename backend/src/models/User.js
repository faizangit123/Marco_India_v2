import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: null },
  googleId: { type: String, default: '' },
  password: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  isStaff: { type: Boolean, default: false },
  dateJoined: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
