import dotenv from 'dotenv';

dotenv.config();

const parseCsv = (value) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  corsOrigins: parseCsv(process.env.CORS_ORIGIN || 'http://localhost:5173'),
  corsAllowVercelPreview: process.env.CORS_ALLOW_VERCEL_PREVIEW === 'true',
  corsVercelProject: process.env.CORS_VERCEL_PROJECT || '',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  jwtSecret: process.env.JWT_SECRET,
};

export const validateServerEnv = () => {
  const requiredVariables = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'JWT_SECRET'];
  const missingVariables = requiredVariables.filter((variableName) => !process.env[variableName]);

  if (missingVariables.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
  }
};
