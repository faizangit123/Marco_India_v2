import Testimonial from '../models/Testimonial.js';
import TestimonialSetting from '../models/TestimonialSetting.js';

const formatTestimonial = (t) => ({
  id: t.id,
  name: t.name,
  role: t.role,
  company: t.company,
  text: t.text,
  rating: t.rating,
  avatar: t.avatar,
  is_active: t.isActive,
  created_at: t.createdAt
});

export const publicList = async (req, res, next) => {
  try {
    let setting = await TestimonialSetting.findOne();
    if (!setting) setting = { active: true };

    if (!setting.active) {
      return res.json({ active: false, results: [] });
    }

    const items = await Testimonial.find({ isActive: true, rating: { $gte: 4 } }).sort({ createdAt: -1 });

    res.json({
      active: true,
      results: items.map(formatTestimonial)
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { name, role, company, text, rating, is_active } = req.body;
    const data = {
      name,
      role: role || "",
      company: company || "",
      text,
      rating: parseInt(rating) || 5,
      isActive: is_active === 'true' || is_active === true || is_active === undefined,
    };
    if (req.file) data.avatar = `/uploads/testimonials/${req.file.filename}`;

    const item = await Testimonial.create(data);
    res.status(201).json(formatTestimonial(item));
  } catch (error) {
    next(error);
  }
};

export const listAll = async (req, res, next) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items.map(formatTestimonial));
  } catch (error) {
    next(error);
  }
};

export const detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.method === 'GET') {
      const item = await Testimonial.findById(id);
      if (!item) return res.status(404).json({ detail: 'Not found.' });
      return res.json(formatTestimonial(item));
    } else if (req.method === 'PATCH') {
      const data = { ...req.body };
      if (req.file) data.avatar = `/uploads/testimonials/${req.file.filename}`;
      if (data.is_active !== undefined) {
        data.isActive = data.is_active === 'true' || data.is_active === true;
        delete data.is_active;
      }
      if (data.rating) data.rating = parseInt(data.rating);
      
      const item = await Testimonial.findByIdAndUpdate(id, data, { new: true });
      return res.json(formatTestimonial(item));
    } else if (req.method === 'DELETE') {
      await Testimonial.findByIdAndDelete(id);
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

export const settings = async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      let setting = await TestimonialSetting.findOne();
      if (!setting) setting = await TestimonialSetting.create({ active: true });
      return res.json(setting);
    } else if (req.method === 'PATCH') {
      const { active } = req.body;
      const setting = await TestimonialSetting.findOneAndUpdate(
        {},
        { active },
        { upsert: true, new: true }
      );
      return res.json(setting);
    }
  } catch (error) {
    next(error);
  }
};
