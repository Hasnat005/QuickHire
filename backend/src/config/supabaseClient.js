import { createClient } from '@supabase/supabase-js';
import { env, validateServerEnv } from './env.js';
import { AppError } from '../utils/AppError.js';

validateServerEnv();

const supabaseUrl = env.supabaseUrl;
const supabaseServiceRoleKey = env.supabaseServiceRoleKey;

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const runSupabaseOperation = async (operation, context = 'Supabase operation') => {
  try {
    const result = await operation(supabase);

    if (result?.error) {
      throw new AppError(
        `${context} failed due to a Supabase connection or configuration issue.`,
        503,
      );
    }

    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      `${context} failed due to a Supabase connection or configuration issue.`,
      503,
    );
  }
};
