import mongoose from 'mongoose';

const gallerySettingSchema = new mongoose.Schema({
  active: { type: Boolean, default: true }
});

export default mongoose.model('GallerySetting', gallerySettingSchema);
