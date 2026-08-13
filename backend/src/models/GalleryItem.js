import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('GalleryItem', galleryItemSchema);
