import { verifyToken } from '../services/authService.js';
import { createError } from '../utils/customError.js'; // optional, if you're using a centralized error handler

//  Authenticate Middleware – Verifies JWT and attaches decoded user info to req.user
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Token missing.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Decode and verify token (should return { id, role, email } from authService)
    const decoded = verifyToken(token);

    if (!decoded?.id) {
      return res.status(400).json({ message: 'Invalid token payload.' });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error('[AUTH ERROR]', err.message);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

//  Authorize Middleware – Checks user role against allowed roles
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: 'Forbidden: insufficient permission.' });
    }

    next(); // Role allowed → move to controller
  };
};
