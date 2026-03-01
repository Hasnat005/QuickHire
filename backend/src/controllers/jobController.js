import { sendSuccess } from '../utils/apiResponse.js';
import { createJob, deleteJobById, getAllJobs, getJobById } from '../services/jobService.js';

export const getJobs = async (_req, res, next) => {
  try {
    const jobs = await getAllJobs();
    return sendSuccess(res, jobs);
  } catch (error) {
    return next(error);
  }
};

export const getJob = async (req, res, next) => {
  try {
    const job = await getJobById(req.params.id);
    return sendSuccess(res, job);
  } catch (error) {
    return next(error);
  }
};

export const createJobHandler = async (req, res, next) => {
  try {
    const job = await createJob(req.body);
    return sendSuccess(res, job, 201);
  } catch (error) {
    return next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const deletedJob = await deleteJobById(req.params.id);
    return sendSuccess(res, deletedJob);
  } catch (error) {
    return next(error);
  }
};
