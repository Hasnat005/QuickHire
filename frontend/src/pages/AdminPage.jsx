import { useEffect, useMemo, useState } from 'react'
import { createJob, deleteJob, getJobs } from '../services/jobService'
import { usePageTitle } from '../hooks/usePageTitle'

const initialFormValues = {
  title: '',
  company: '',
  location: '',
  category: '',
  description: '',
}

function AdminPage() {
  usePageTitle('Admin')

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [formValues, setFormValues] = useState(initialFormValues)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formError, setFormError] = useState('')

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime()
      const dateB = new Date(b.created_at || 0).getTime()
      return dateB - dateA
    })
  }, [jobs])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const data = await getJobs()
      setJobs(data)
      setFetchError('')
    } catch {
      setFetchError('Unable to load jobs. Please refresh and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const validateForm = () => {
    const errors = {}

    if (!formValues.title.trim()) {
      errors.title = 'Title is required.'
    }
    if (!formValues.company.trim()) {
      errors.company = 'Company is required.'
    }
    if (!formValues.location.trim()) {
      errors.location = 'Location is required.'
    }
    if (!formValues.category.trim()) {
      errors.category = 'Category is required.'
    }
    if (!formValues.description.trim()) {
      errors.description = 'Description is required.'
    }

    return errors
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
    setFormError('')
    setFormMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    try {
      setSubmitting(true)
      setFormError('')
      setFormMessage('')

      const createdJob = await createJob({
        title: formValues.title.trim(),
        company: formValues.company.trim(),
        location: formValues.location.trim(),
        category: formValues.category.trim(),
        description: formValues.description.trim(),
      })

      setJobs((currentJobs) => [createdJob, ...currentJobs])
      setFormValues(initialFormValues)
      setFieldErrors({})
      setFormMessage('Job created successfully.')
    } catch {
      setFormError('Unable to create job. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (jobId) => {
    try {
      setDeletingId(jobId)
      await deleteJob(jobId)
      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId))
    } catch {
      setFormError('Unable to delete job right now. Please try again.')
    } finally {
      setDeletingId('')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="text-2xl font-bold tracking-tight text-[#243251]">Add New Job</h2>
        <p className="mt-2 text-sm text-slate-500">Create a job listing visible on the public jobs page.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500"
              placeholder="Senior Product Designer"
            />
            {fieldErrors.title ? <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p> : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="mb-1 block text-sm font-semibold text-slate-700">
                Company
              </label>
              <input
                id="company"
                name="company"
                value={formValues.company}
                onChange={handleInputChange}
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500"
                placeholder="Acme Inc"
              />
              {fieldErrors.company ? <p className="mt-1 text-sm text-red-600">{fieldErrors.company}</p> : null}
            </div>

            <div>
              <label htmlFor="location" className="mb-1 block text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500"
                placeholder="Berlin, Germany"
              />
              {fieldErrors.location ? <p className="mt-1 text-sm text-red-600">{fieldErrors.location}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500"
              placeholder="Design"
            />
            {fieldErrors.category ? <p className="mt-1 text-sm text-red-600">{fieldErrors.category}</p> : null}
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formValues.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-500"
              placeholder="Describe responsibilities, requirements, and benefits."
            />
            {fieldErrors.description ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
            ) : null}
          </div>

          {formError ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p> : null}
          {formMessage ? (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{formMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Creating...' : 'Add Job'}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#243251]">All Jobs</h2>
          <span className="text-sm font-medium text-slate-500">{sortedJobs.length} total</span>
        </div>

        {fetchError ? <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{fetchError}</p> : null}

        {loading ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : sortedJobs.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            No jobs found. Add your first job using the form.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {sortedJobs.map((job) => (
              <article
                key={job.id}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {job.company} • {job.location} • {job.category}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(job.id)}
                  disabled={deletingId === job.id}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {deletingId === job.id ? 'Deleting...' : 'Delete'}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AdminPage