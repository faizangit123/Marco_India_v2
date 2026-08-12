export const admin = (req, res, next) => {
  if (!req.user || !req.user.isStaff) {
    return res.status(403).json({ detail: 'You do not have permission to perform this action.' });
  }
  next();
};
