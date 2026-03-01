import { Router } from 'express';
import { query } from 'express-validator';
import { getHealth } from '../controllers/healthController.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.get('/health', [query('check').optional().isString(), validateRequest], getHealth);

export default router;
