import apiClient from './apiClient'

export const submitApplication = async (payload) => {
  const response = await apiClient.post('/applications', payload)

  if (!response?.data?.success) {
    throw new Error('Application submission failed')
  }

  return response.data.data
}
