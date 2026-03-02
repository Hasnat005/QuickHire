import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

export const generateToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    env.jwtSecret,
    { expiresIn: ONE_DAY_IN_SECONDS },
  );
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};
