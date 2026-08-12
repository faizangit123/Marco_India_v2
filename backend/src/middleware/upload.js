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
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const limits = { fileSize: 5 * 1024 * 1024 };

export const uploadAvatar = multer({ storage: createStorage('avatars'), fileFilter, limits });
export const uploadGallery = multer({ storage: createStorage('gallery'), fileFilter, limits });
export const uploadTestimonial = multer({ storage: createStorage('testimonials'), fileFilter, limits });
