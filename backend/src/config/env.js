import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

export const validateServerEnv = () => {
  const requiredVariables = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
  const missingVariables = requiredVariables.filter((variableName) => !process.env[variableName]);

  if (missingVariables.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
  }
};
