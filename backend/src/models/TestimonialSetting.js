import mongoose from 'mongoose';

const testimonialSettingSchema = new mongoose.Schema({
  active: { type: Boolean, default: true }
});

export default mongoose.model('TestimonialSetting', testimonialSettingSchema);
