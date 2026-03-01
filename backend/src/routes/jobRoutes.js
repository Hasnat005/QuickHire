import { Router } from 'express';
import { body, param } from 'express-validator';
import { createJobHandler, deleteJob, getJob, getJobs } from '../controllers/jobController.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.get('/jobs', getJobs);

router.get('/jobs/:id', [param('id').isUUID().withMessage('Invalid job id')], validateRequest, getJob);

router.post(
  '/jobs',
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
  '/jobs/:id',
  [param('id').isUUID().withMessage('Invalid job id')],
  validateRequest,
  deleteJob,
);

export default router;
