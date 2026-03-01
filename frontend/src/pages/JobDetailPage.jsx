import { Link, useParams } from 'react-router-dom'
import JobDetailSkeleton from '../components/JobDetailSkeleton'
import { useJobDetail } from '../hooks/useJobDetail'
import { usePageTitle } from '../hooks/usePageTitle'

function JobDetailPage() {
  const { id } = useParams()
  const { job, loading, error } = useJobDetail(id)

  usePageTitle(job?.title ? `${job.title}` : 'Job Detail')

  if (loading) {
    return <JobDetailSkeleton />
  }

  if (error || !job) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-xl font-semibold text-red-700">Unable to load job</h2>
        <p className="mt-2 text-red-600">{error || 'Job not found.'}</p>
        <Link
          to="/jobs"
          className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to jobs
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
        ← Back to listings
      </Link>

      <section className="rounded-3xl border border-[#d9dcf0] bg-[#f0f2ff] px-6 py-8 md:px-10 md:py-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Featured opportunity</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#243251] md:text-5xl">
          {job.title}
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          {job.company} • {job.location}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full border border-indigo-400 bg-white px-4 py-1.5 text-sm font-semibold text-indigo-600">
            {job.category}
          </span>
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-600">Full Time</span>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-[#243251]">Job Description</h2>
        <p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-600">{job.description}</p>

        <div className="mt-8">
          <button className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700">
            Apply Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default JobDetailPage
