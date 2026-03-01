function EmptyState({ onClearFilters }) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <h3 className="text-2xl font-semibold text-slate-800">No jobs match your filters</h3>
      <p className="mt-3 text-base text-slate-500">
        Try changing your search keyword, category, or location to find more opportunities.
      </p>
      <button
        onClick={onClearFilters}
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Clear filters
      </button>
    </section>
  )
}

export default EmptyState
