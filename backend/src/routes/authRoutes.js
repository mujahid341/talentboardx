import express from 'express';
import { signup, login, getCurrentUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser); // ✅ Protected route

export default router;
