import api from '../utils/api';

// Mock users for demo
const mockUsers = {
  'jobseeker@demo.com': {
    email: 'jobseeker@demo.com',
    password: 'password123',
    name: 'John Doe',
    role: 'jobseeker',
    token: 'mock-token-jobseeker',
  },
  'employer@demo.com': {
    email: 'employer@demo.com',
    password: 'password123',
    name: 'Shravan Kumar',
    role: 'employer',
    token: 'mock-token-employer',
  },
  'admin@demo.com': {
    email: 'admin@demo.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
    token: 'mock-token-admin',
  },
};

export const authService = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers[email];
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  },

  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = {
      ...userData,
      token: `mock-token-${Date.now()}`,
    };
    
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  },

  forgotPassword: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Password reset email sent' };
  },

  resetPassword: async (token, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Password reset successful' };
  },

  getCurrentUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return { user: JSON.parse(storedUser) };
    }
    throw new Error('Not authenticated');
  },
};
