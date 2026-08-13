import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  page: { type: String, required: true, index: true },
  text: { type: String, required: true },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
