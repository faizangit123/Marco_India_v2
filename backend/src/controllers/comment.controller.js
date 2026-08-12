import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listCreate = async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      const { page } = req.query;
      const where = { isVisible: true };
      if (page) where.page = page;

      const comments = await prisma.comment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { user: true }
      });

      return res.json(comments.map(c => ({
        id: c.id,
        user_name: c.user.name,
        user_avatar: c.user.avatar,
        page: c.page,
        text: c.text,
        created_at: c.createdAt
      })));
    } else if (req.method === 'POST') {
      if (!req.user) return res.status(401).json({ detail: 'Authentication required' });
      
      const { page, text } = req.body;
      const comment = await prisma.comment.create({
        data: {
          page,
          text,
          userId: req.user.id
        },
        include: { user: true }
      });

      res.status(201).json({
        id: comment.id,
        user_name: comment.user.name,
        user_avatar: comment.user.avatar,
        page: comment.page,
        text: comment.text,
        created_at: comment.createdAt
      });
    }
  } catch (error) {
    next(error);
  }
};

export const listAll = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });

    res.json(comments.map(c => ({
      id: c.id,
      user_name: c.user.name,
      user_email: c.user.email,
      page: c.page,
      text: c.text,
      is_visible: c.isVisible,
      created_at: c.createdAt
    })));
  } catch (error) {
    next(error);
  }
};

export const detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.method === 'PATCH') {
      const { is_visible } = req.body;
      const comment = await prisma.comment.update({
        where: { id },
        data: { isVisible: is_visible },
        include: { user: true }
      });
      return res.json({
        id: comment.id,
        user_name: comment.user.name,
        user_email: comment.user.email,
        page: comment.page,
        text: comment.text,
        is_visible: comment.isVisible,
        created_at: comment.createdAt
      });
    } else if (req.method === 'DELETE') {
      await prisma.comment.delete({ where: { id } });
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};
