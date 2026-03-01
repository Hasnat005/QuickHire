function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-8 w-3/5 rounded bg-slate-200" />
      <div className="mt-3 h-6 w-2/5 rounded bg-slate-200" />
      <div className="mt-2 h-5 w-1/3 rounded bg-slate-200" />
      <div className="mt-5 h-16 rounded bg-slate-200" />
      <div className="mt-5 flex gap-2">
        <div className="h-8 w-24 rounded-full bg-slate-200" />
        <div className="h-8 w-28 rounded-full bg-slate-200" />
      </div>
    </div>
  )
}

export default JobCardSkeleton
