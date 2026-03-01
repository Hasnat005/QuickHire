import apiClient from './apiClient'

export const getJobs = async () => {
  const response = await apiClient.get('/jobs')

  if (!response?.data?.success) {
    throw new Error('Failed to fetch jobs')
  }

  return response.data.data ?? []
}
