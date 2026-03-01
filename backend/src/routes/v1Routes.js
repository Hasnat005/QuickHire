import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import jobRoutes from './jobRoutes.js';
import applicationRoutes from './applicationRoutes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/', jobRoutes);
router.use('/', applicationRoutes);

export default router;
