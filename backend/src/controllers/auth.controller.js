import { sendSuccess } from '../utils/apiResponse.js';
import { loginAdmin, registerAdmin } from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const authData = await registerAdmin(req.body);
    return sendSuccess(res, authData, 201, 'Admin account created');
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const authData = await loginAdmin(req.body);
    return sendSuccess(res, authData, 200, 'Login successful');
  } catch (error) {
    return next(error);
  }
};
