import { verifyToken, checkRole } from '../services/authService.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(403).json({ message: 'Unauthorized' });
    const allowed = checkRole(req.user.role, roles);
    if (!allowed) return res.status(403).json({ message: 'Access denied' });
    next();
  };
};
