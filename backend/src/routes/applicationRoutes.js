import { Router } from 'express';
import { body } from 'express-validator';
import { createApplicationHandler } from '../controllers/applicationController.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.post(
  '/',
  [
    body('job_id').trim().notEmpty().withMessage('job_id is required').isUUID().withMessage('job_id must be a valid uuid'),
    body('name').trim().notEmpty().withMessage('name is required'),
    body('email').trim().notEmpty().withMessage('email is required').isEmail().withMessage('email must be valid'),
    body('resume_link')
      .trim()
      .notEmpty()
      .withMessage('resume_link is required')
      .isURL({ require_protocol: true })
      .withMessage('resume_link must be a valid URL'),
    body('cover_note').optional().isString().withMessage('cover_note must be a string'),
  ],
  validateRequest,
  createApplicationHandler,
);

export default router;
