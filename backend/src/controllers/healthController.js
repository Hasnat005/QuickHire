import { getHealthStatus } from '../services/healthService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getHealth = (_req, res) => {
  const health = getHealthStatus();
  return sendSuccess(res, health);
};
