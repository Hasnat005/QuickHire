import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import v1Routes from './routes/v1Routes.js';
import { env } from './config/env.js';
import { AppError } from './utils/AppError.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.disable('x-powered-by');

const normalizeOrigin = (origin) => origin.trim().replace(/\/$/, '');

const staticAllowedOrigins = new Set(env.corsOrigins.map(normalizeOrigin));

const isAllowedVercelPreviewOrigin = (origin) => {
  if (!env.corsAllowVercelPreview) {
    return false;
  }

  try {
    const parsed = new URL(origin);
    const hostname = parsed.hostname.toLowerCase();

    if (parsed.protocol !== 'https:' || !hostname.endsWith('.vercel.app')) {
      return false;
    }

    if (!env.corsVercelProject) {
      return true;
    }

    const project = env.corsVercelProject.toLowerCase();
    return hostname === `${project}.vercel.app` || hostname.startsWith(`${project}-`);
  } catch {
    return false;
  }
};

const corsOptionsDelegate = (req, callback) => {
  const requestOrigin = req.header('Origin');

  if (!requestOrigin) {
    callback(null, { origin: true });
    return;
  }

  const normalizedRequestOrigin = normalizeOrigin(requestOrigin);
  const isAllowed =
    staticAllowedOrigins.has(normalizedRequestOrigin) || isAllowedVercelPreviewOrigin(normalizedRequestOrigin);

  if (!isAllowed) {
    callback(new AppError(`CORS origin not allowed: ${requestOrigin}`, 403));
    return;
  }

  callback(null, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
  });
};

app.use(cors(corsOptionsDelegate));
app.options(/.*/, cors(corsOptionsDelegate));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(['/api', '/api/v1'], v1Routes);

app.use(notFound);
app.use(errorHandler);

export default app;
