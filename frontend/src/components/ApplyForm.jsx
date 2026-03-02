import { useState } from 'react'
import { submitApplication } from '../services/applicationService'

const initialFormState = {
  name: '',
  email: '',
  resumeLink: '',
  coverNote: '',
}

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const isValidHttpUrl = (value) => {
  try {
    const parsedUrl = new URL(value)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}

function ApplyForm({ jobId }) {
  const [formValues, setFormValues] = useState(initialFormState)
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const validateForm = () => {
    const errors = {}

    if (!formValues.name.trim()) {
      errors.name = 'Name is required.'
    }

    if (!formValues.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!isValidEmail(formValues.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!formValues.resumeLink.trim()) {
      errors.resumeLink = 'Resume link is required.'
    } else if (!isValidHttpUrl(formValues.resumeLink.trim())) {
      errors.resumeLink = 'Please enter a valid URL, including http:// or https://'
    }

    return errors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))

    setSuccessMessage('')
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSuccessMessage('')

    try {
      await submitApplication({
        job_id: jobId,
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        resume_link: formValues.resumeLink.trim(),
        cover_note: formValues.coverNote.trim(),
      })

      setSuccessMessage('Application submitted successfully. We will contact you soon.')
      setFormValues(initialFormState)
      setFieldErrors({})
    } catch {
      setSubmitError('Unable to submit application right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-[#243251]">Apply for this role</h2>
      <p className="mt-2 text-slate-500">Complete the form below to submit your application.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          />
          {fieldErrors.name ? <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          />
          {fieldErrors.email ? <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="resumeLink" className="mb-1 block text-sm font-semibold text-slate-700">
            Resume link
          </label>
          <input
            id="resumeLink"
            name="resumeLink"
            type="url"
            value={formValues.resumeLink}
            onChange={handleChange}
            placeholder="https://example.com/resume"
            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          />
          {fieldErrors.resumeLink ? (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.resumeLink}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="coverNote" className="mb-1 block text-sm font-semibold text-slate-700">
            Cover note
          </label>
          <textarea
            id="coverNote"
            name="coverNote"
            value={formValues.coverNote}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us why you're a great fit"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          />
        </div>

        {submitError ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p> : null}
        {successMessage ? (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{successMessage}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Submitting...' : 'Apply Now'}
        </button>
      </form>
    </section>
  )
}

export default ApplyForm
