import { sendSuccess } from '../utils/apiResponse.js';
import { createApplication } from '../services/applicationService.js';

export const createApplicationHandler = async (req, res, next) => {
  try {
    const application = await createApplication(req.body);
    return sendSuccess(res, application, 201);
  } catch (error) {
    return next(error);
  }
};
