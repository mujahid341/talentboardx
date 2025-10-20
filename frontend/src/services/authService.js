import api from '../utils/api';

export const authService = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const token = data?.token;
    if (!token) throw new Error('Invalid login response');

    // Fetch current user using the token
    const meRes = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = meRes?.data?.data;
    if (!user) throw new Error('Failed to fetch user profile');

    return { user: { ...user, token } };
  },

  register: async (userData) => {
    // Backend expects confirmPassword for validation
    await api.post('/auth/signup', userData);

    // Auto-login after successful signup
    const { email, password } = userData;
    const result = await authService.login(email, password);
    return result;
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    const token = localStorage.getItem('token');
    const user = data?.data;
    if (!user || !token) throw new Error('Not authenticated');
    return { user: { ...user, token } };
  },
};
