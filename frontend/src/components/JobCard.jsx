const categoryStyleMap = {
  design: 'bg-emerald-50 text-emerald-600',
  engineering: 'bg-indigo-50 text-indigo-600',
  technology: 'bg-cyan-50 text-cyan-600',
  marketing: 'bg-amber-50 text-amber-600',
  business: 'bg-violet-50 text-violet-600',
  finance: 'bg-sky-50 text-sky-600',
  sales: 'bg-orange-50 text-orange-600',
}

const getCategoryClasses = (category) => {
  const normalizedCategory = category?.toLowerCase() || ''
  return categoryStyleMap[normalizedCategory] || 'bg-slate-100 text-slate-600'
}

function JobCard({ job }) {
  const previewText =
    job.description?.length > 120 ? `${job.description.slice(0, 120).trim()}...` : job.description

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-800">{job.title}</h3>
          <p className="mt-2 text-xl text-slate-600">{job.company}</p>
          <p className="mt-1 text-base text-slate-500">{job.location}</p>
        </div>
        <span className="rounded-full border border-indigo-400 px-3 py-1 text-sm font-semibold text-indigo-600">
          Full Time
        </span>
      </div>

      <p className="mt-4 text-base leading-7 text-slate-500">{previewText}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getCategoryClasses(job.category)}`}
        >
          {job.category}
        </span>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">Remote Friendly</span>
      </div>
    </article>
  )
}

export default JobCard
