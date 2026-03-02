import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import jobRoutes from './jobRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);

export default router;
