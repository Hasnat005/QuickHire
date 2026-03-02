import { Router } from 'express';
import { body, param } from 'express-validator';
import { createJobHandler, deleteJob, getJob, getJobs } from '../controllers/jobController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { requireAdmin, verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getJobs);

router.get('/:id', [param('id').isUUID().withMessage('Invalid job id')], validateRequest, getJob);

router.post(
  '/',
  verifyToken,
  requireAdmin,
  [
    body('title').trim().notEmpty().withMessage('title is required'),
    body('company').trim().notEmpty().withMessage('company is required'),
    body('location').trim().notEmpty().withMessage('location is required'),
    body('category').trim().notEmpty().withMessage('category is required'),
    body('description').trim().notEmpty().withMessage('description is required'),
  ],
  validateRequest,
  createJobHandler,
);

router.delete(
  '/:id',
  verifyToken,
  requireAdmin,
  [param('id').isUUID().withMessage('Invalid job id')],
  validateRequest,
  deleteJob,
);

export default router;
