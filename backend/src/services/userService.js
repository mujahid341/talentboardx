import { userRepository } from '../repositories/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup logic
export const signup = async (data) => {
  const existing = await userRepository.findUserByEmail(data.email);
  if (existing) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userRepository.createUser({
    ...data,
    password: hashedPassword,
  });

  // Return only selected info (no password)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

// Login logic
export const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

// Get current user by ID
export const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) throw new Error('User not found');

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
