import apiClient from './apiClient'

export const loginAdmin = async (payload) => {
  const response = await apiClient.post('/auth/login', payload)

  if (!response?.data?.success) {
    throw new Error(response?.data?.error?.message || 'Login failed')
  }

  return response.data.data
}

export const signupAdmin = async (payload) => {
  const response = await apiClient.post('/auth/signup', payload)

  if (!response?.data?.success) {
    throw new Error(response?.data?.error?.message || 'Signup failed')
  }

  return response.data.data
}
