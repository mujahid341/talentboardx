import { logError } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logError(err);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  return res.status(status).json({
    success: false,
    message,
  });
};
