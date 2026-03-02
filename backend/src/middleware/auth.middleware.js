import { AppError } from '../utils/AppError.js';
import { verifyJwtToken } from '../utils/jwt.js';

const getBearerToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return null;
  }

  return token;
};

export const verifyToken = (req, _res, next) => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return next(new AppError('Unauthorized', 401));
  }

  try {
    const payload = verifyJwtToken(token);
    req.user = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    return next();
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }
};

export const requireAdmin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Forbidden', 403));
  }

  return next();
};
