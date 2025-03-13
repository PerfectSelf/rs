import { Router } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/auth-controller';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

// Register route with validation
router.post('/register', [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('company').notEmpty().withMessage('Company name is required'),
], authController.register);

// Login route with validation
router.post('/login', [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], authController.login);

// Get current user route (protected)
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router; 