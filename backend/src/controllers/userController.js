import { SignupSchema, LoginSchema } from '../dtos/user.dto.js';
import * as userService from '../services/userService.js';

// POST /auth/signup
export const signup = async (req, res, next) => {
  try {
    const userData = SignupSchema.parse(req.body); // Zod validation
    const user = await userService.signup(userData); // Service call
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// POST /auth/login
export const login = async (req, res, next) => {
  try {
    const credentials = LoginSchema.parse(req.body);
    const token = await userService.login(credentials);
    res.status(200).json({"token":token});
  } catch (error) {
    next(error);
  }
};

// GET /auth/me (requires token)
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id); // `req.user` from middleware
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
