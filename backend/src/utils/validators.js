import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().optional().default(""),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const changePasswordSchema = z.object({
  old_password: z.string(),
  new_password: z.string().min(8)
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email()
});

export const passwordResetConfirmSchema = z.object({
  token: z.string(),
  new_password: z.string().min(8)
});

export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[0-9\s-]+$/, "Invalid phone number"),
  service_type: z.string()
});

export const commentSchema = z.object({
  page: z.string(),
  text: z.string().min(3)
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  service_type: z.string(),
  message: z.string().min(10)
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().optional().default(""),
  company: z.string().optional().default(""),
  text: z.string().min(3),
  rating: z.coerce.number().min(1).max(5).default(5)
});

export const galleryItemSchema = z.object({
  title: z.string(),
  description: z.string().optional().default(""),
  category: z.string(),
  location: z.string().optional().default("")
});
