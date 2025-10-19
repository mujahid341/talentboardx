import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
const EXPIRES_IN = '1d';

// Password Hashing
export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

// Password Comparison
export const comparePassword = async (input, storedHash) => {
  return await bcrypt.compare(input, storedHash);
};

// Token Creation
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

// Token Verification
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// Role Guard Utility
export const checkRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};
