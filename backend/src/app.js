import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import v1Routes from './routes/v1Routes.js';
import { env } from './config/env.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
  }),
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.use('/api/v1', v1Routes);

app.use(notFound);
app.use(errorHandler);

export default app;
