import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.post(
  '/signup',
  [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('email').trim().notEmpty().withMessage('email is required').isEmail().withMessage('email must be valid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
  ],
  validateRequest,
  register,
);

router.post(
  '/login',
  [
    body('email').trim().notEmpty().withMessage('email is required').isEmail().withMessage('email must be valid'),
    body('password').notEmpty().withMessage('password is required'),
  ],
  validateRequest,
  login,
);

export default router;
