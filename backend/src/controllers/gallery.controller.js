import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const formatItem = (i) => ({
  id: i.id,
  title: i.title,
  description: i.description,
  image: i.image,
  category: i.category,
  location: i.location,
  is_featured: i.isFeatured,
  created_at: i.createdAt
});

export const publicList = async (req, res, next) => {
  try {
    let setting = await prisma.gallerySetting.findUnique({ where: { id: 1 } });
    if (!setting) setting = { active: true };

    if (!setting.active) {
      return res.json({ active: false, results: [] });
    }

    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      active: true,
      results: items.map(formatItem)
    });
  } catch (error) {
    next(error);
  }
};

export const adminList = async (req, res, next) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items.map(formatItem));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { title, description, category, location, is_featured } = req.body;
    if (!req.file) return res.status(400).json({ detail: 'Image is required' });

    const item = await prisma.galleryItem.create({
      data: {
        title,
        description,
        category,
        location,
        isFeatured: is_featured === 'true' || is_featured === true,
        image: `/uploads/gallery/${req.file.filename}`
      }
    });

    res.status(201).json(formatItem(item));
  } catch (error) {
    next(error);
  }
};

export const detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (req.method === 'GET') {
      const item = await prisma.galleryItem.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ detail: 'Not found.' });
      return res.json(formatItem(item));
    } else if (req.method === 'PATCH') {
      const data = { ...req.body };
      if (req.file) data.image = `/uploads/gallery/${req.file.filename}`;
      if (data.is_featured !== undefined) {
        data.isFeatured = data.is_featured === 'true' || data.is_featured === true;
        delete data.is_featured;
      }
      
      const item = await prisma.galleryItem.update({
        where: { id },
        data
      });
      return res.json(formatItem(item));
    } else if (req.method === 'DELETE') {
      await prisma.galleryItem.delete({ where: { id } });
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

export const settings = async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      let setting = await prisma.gallerySetting.findUnique({ where: { id: 1 } });
      if (!setting) setting = await prisma.gallerySetting.create({ data: { id: 1, active: true } });
      return res.json(setting);
    } else if (req.method === 'PATCH') {
      const { active } = req.body;
      const setting = await prisma.gallerySetting.upsert({
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
