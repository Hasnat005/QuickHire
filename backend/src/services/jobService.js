import { runSupabaseOperation } from '../config/supabaseClient.js';
import { AppError } from '../utils/AppError.js';

const JOBS_TABLE = 'jobs';

export const getAllJobs = async () => {
  const { data } = await runSupabaseOperation(
    (supabase) => supabase.from(JOBS_TABLE).select('*').order('created_at', { ascending: false }),
    'Fetch jobs',
  );

  return data ?? [];
};

export const getJobById = async (jobId) => {
  const { data } = await runSupabaseOperation(
    (supabase) => supabase.from(JOBS_TABLE).select('*').eq('id', jobId).maybeSingle(),
    'Fetch job by id',
  );

  if (!data) {
    throw new AppError('Job not found', 404);
  }

  return data;
};

export const createJob = async (jobPayload) => {
  const { data } = await runSupabaseOperation(
    (supabase) => supabase.from(JOBS_TABLE).insert([jobPayload]).select('*').single(),
    'Create job',
  );

  return data;
};

export const deleteJobById = async (jobId) => {
  const { data } = await runSupabaseOperation(
    (supabase) => supabase.from(JOBS_TABLE).delete().eq('id', jobId).select('*').maybeSingle(),
    'Delete job',
  );

  if (!data) {
    throw new AppError('Job not found', 404);
  }

  return data;
};
