import Comment from '../models/Comment.js';

export const listCreate = async (req, res, next) => {
  try {
    if (req.method === 'GET') {
      const { page } = req.query;
      const where = { isVisible: true };
      if (page) where.page = page;

      const comments = await Comment.find(where).sort({ createdAt: -1 }).populate('userId');

      return res.json(comments.map(c => ({
        id: c.id,
        user_name: c.userId?.name,
        user_avatar: c.userId?.avatar,
        page: c.page,
        text: c.text,
        created_at: c.createdAt
      })));
    } else if (req.method === 'POST') {
      if (!req.user) return res.status(401).json({ detail: 'Authentication required' });
      
      const { page, text } = req.body;
      let comment = await Comment.create({
        page,
        text,
        userId: req.user.id
      });
      comment = await comment.populate('userId');

      res.status(201).json({
        id: comment.id,
        user_name: comment.userId?.name,
        user_avatar: comment.userId?.avatar,
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
    const comments = await Comment.find().sort({ createdAt: -1 }).populate('userId');

    res.json(comments.map(c => ({
      id: c.id,
      user_name: c.userId?.name,
      user_email: c.userId?.email,
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
      const comment = await Comment.findByIdAndUpdate(
        id,
        { isVisible: is_visible },
        { new: true }
      ).populate('userId');
      
      return res.json({
        id: comment.id,
        user_name: comment.userId?.name,
        user_email: comment.userId?.email,
        page: comment.page,
        text: comment.text,
        is_visible: comment.isVisible,
        created_at: comment.createdAt
      });
    } else if (req.method === 'DELETE') {
      await Comment.findByIdAndDelete(id);
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};
