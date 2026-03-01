import { useEffect, useState } from 'react'
import { getJobs } from '../services/jobService'

export const useJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadJobs = async () => {
      try {
        const data = await getJobs()

        if (isMounted) {
          setJobs(data)
          setError('')
        }
      } catch (_error) {
        if (isMounted) {
          setError('Unable to load jobs right now. Please try again shortly.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadJobs()

    return () => {
      isMounted = false
    }
  }, [])

  return { jobs, loading, error }
}
