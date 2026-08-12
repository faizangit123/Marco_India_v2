import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    let setting = await prisma.testimonialSetting.findUnique({ where: { id: 1 } });
    if (!setting) setting = { active: true };

    if (!setting.active) {
      return res.json({ active: false, results: [] });
    }

    const items = await prisma.testimonial.findMany({
      where: { isActive: true, rating: { gte: 4 } },
      orderBy: { createdAt: 'desc' }
    });

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

    const item = await prisma.testimonial.create({ data });
    res.status(201).json(formatTestimonial(item));
  } catch (error) {
    next(error);
  }
};

export const listAll = async (req, res, next) => {
  try {
    const items = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(items.map(formatTestimonial));
  } catch (error) {
    next(error);
  }
};

export const detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.method === 'GET') {
      const item = await prisma.testimonial.findUnique({ where: { id } });
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
      
      const item = await prisma.testimonial.update({
        where: { id },
        data
      });
      return res.json(formatTestimonial(item));
    } else if (req.method === 'DELETE') {
      await prisma.testimonial.delete({ where: { id } });
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

export const settings = async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      let setting = await prisma.testimonialSetting.findUnique({ where: { id: 1 } });
      if (!setting) setting = await prisma.testimonialSetting.create({ data: { id: 1, active: true } });
      return res.json(setting);
    } else if (req.method === 'PATCH') {
      const { active } = req.body;
      const setting = await prisma.testimonialSetting.upsert({
        where: { id: 1 },
        update: { active },
        create: { id: 1, active }
      });
      return res.json(setting);
    }
  } catch (error) {
    next(error);
  }
};
