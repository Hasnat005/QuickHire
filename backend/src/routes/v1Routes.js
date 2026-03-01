import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import jobRoutes from './jobRoutes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/', jobRoutes);

export default router;
