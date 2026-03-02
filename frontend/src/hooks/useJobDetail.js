import { useEffect, useState } from 'react'
import { getJobById } from '../services/jobService'

export const useJobDetail = (jobId) => {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!jobId) {
      setLoading(false)
      setError('Invalid job id.')
      return
    }

    let isMounted = true

    const loadJob = async () => {
      try {
        const data = await getJobById(jobId)

        if (isMounted) {
          setJob(data)
          setError('')
        }
      } catch {
        if (isMounted) {
          setError('We could not load this job right now. Please try again.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadJob()

    return () => {
      isMounted = false
    }
  }, [jobId])

  return { job, loading, error }
}
