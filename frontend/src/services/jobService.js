import apiClient from './apiClient'

export const getJobs = async () => {
  const response = await apiClient.get('/jobs')

  if (!response?.data?.success) {
    throw new Error('Failed to fetch jobs')
  }

  return response.data.data ?? []
}

export const getJobById = async (jobId) => {
  const response = await apiClient.get(`/jobs/${jobId}`)

  if (!response?.data?.success) {
    throw new Error('Failed to fetch job details')
  }

  return response.data.data
}

export const createJob = async (payload) => {
  const response = await apiClient.post('/jobs', payload)

  if (!response?.data?.success) {
    throw new Error('Failed to create job')
  }

  return response.data.data
}

export const deleteJob = async (jobId) => {
  const response = await apiClient.delete(`/jobs/${jobId}`)

  if (!response?.data?.success) {
    throw new Error('Failed to delete job')
  }

  return response.data.data
}
