import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    const errors = err.errors.reduce((acc, curr) => {
      acc[curr.path[0]] = [curr.message];
      return acc;
    }, {});
    return res.status(400).json(errors);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'Field';
      return res.status(400).json({ [field]: ['This field must be unique.'] });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ detail: 'Not found.' });
    }
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ detail: 'Authentication required' });
  }

  res.status(500).json({ detail: 'Internal server error' });
};

export default errorHandler;
