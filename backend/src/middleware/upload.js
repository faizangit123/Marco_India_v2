import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'uploads', folder);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const isImageMime = file.mimetype && file.mimetype.startsWith('image/');
  const isImageExt = /\.(jpg|jpeg|png|webp|gif|svg|avif|heic|bmp|tiff)$/i.test(file.originalname);
  if (isImageMime || isImageExt) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WebP, GIF, SVG, AVIF, etc.) are allowed!'), false);
  }
};

const limits = { fileSize: 10 * 1024 * 1024 }; // 10MB limit

export const uploadAvatar = multer({ storage: createStorage('avatars'), fileFilter, limits });
export const uploadGallery = multer({ storage: createStorage('gallery'), fileFilter, limits });
export const uploadTestimonial = multer({ storage: createStorage('testimonials'), fileFilter, limits });
