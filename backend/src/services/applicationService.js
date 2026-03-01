import { runSupabaseOperation } from '../config/supabaseClient.js';
import { AppError } from '../utils/AppError.js';

const APPLICATIONS_TABLE = 'applications';
const JOBS_TABLE = 'jobs';

const ensureJobExists = async (jobId) => {
  const { data } = await runSupabaseOperation(
    (supabase) => supabase.from(JOBS_TABLE).select('id').eq('id', jobId).maybeSingle(),
    'Check job exists',
  );

  if (!data) {
    throw new AppError('Job not found', 404);
  }
};

export const createApplication = async (applicationPayload) => {
  await ensureJobExists(applicationPayload.job_id);

  const { data } = await runSupabaseOperation(
    (supabase) => supabase.from(APPLICATIONS_TABLE).insert([applicationPayload]).select('*').single(),
    'Create application',
  );

  return data;
};
