import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'; // can override from .env

//Password Hashing
export const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

// Password Comparison
export const comparePassword = async (input, storedHash) => {
  return await bcrypt.compare(input, storedHash);
};

// Token Creation
export const generateToken = (user) => {
  // Ensure we always include id, role, and email for backend usage
  const payload = {
    id: user.id || user._id,
    role: user.role,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

// Token Verification
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Return a normalized object (useful for postedBy, role checks, etc.)
    return {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email || null,
    };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Role Guard Utility
export const checkRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};
