import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import JobCard from '../components/JobCard'
import JobCardSkeleton from '../components/JobCardSkeleton'
import { useJobs } from '../hooks/useJobs'
import { usePageTitle } from '../hooks/usePageTitle'

const normalizeText = (value) => (value || '').toLowerCase().trim()

function JobListingsPage() {
  usePageTitle('Job Listings')

  const [searchParams] = useSearchParams()
  const { jobs, loading, error } = useJobs()
  const [searchText, setSearchText] = useState(() => searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'all')
  const [selectedLocation, setSelectedLocation] = useState(() => searchParams.get('location') || 'all')

  useEffect(() => {
    setSearchText(searchParams.get('q') || '')
    setSelectedCategory(searchParams.get('category') || 'all')
    setSelectedLocation(searchParams.get('location') || 'all')
  }, [searchParams])

  const categoryOptions = useMemo(() => {
    const categories = jobs.map((job) => job.category).filter(Boolean)
    return [...new Set(categories)].sort((a, b) => a.localeCompare(b))
  }, [jobs])

  const locationOptions = useMemo(() => {
    const locations = jobs.map((job) => job.location).filter(Boolean)
    return [...new Set(locations)].sort((a, b) => a.localeCompare(b))
  }, [jobs])

  const filteredJobs = useMemo(() => {
    const normalizedSearch = normalizeText(searchText)

    return jobs.filter((job) => {
      const matchesSearch =
        normalizeText(job.title).includes(normalizedSearch) ||
        normalizeText(job.company).includes(normalizedSearch)
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation

      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [jobs, searchText, selectedCategory, selectedLocation])

  const clearFilters = () => {
    setSearchText('')
    setSelectedCategory('all')
    setSelectedLocation('all')
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-[#d9dcf0] bg-[#f0f2ff] px-6 py-10 md:px-10">
        <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-[#243251] md:text-6xl">
          Discover more than <span className="text-[#2a9cf4]">5000+ Jobs</span>
        </h2>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-500">
          Explore curated opportunities, filter by category and location, and find the perfect role for your next career move.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4 md:items-center">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by title or company"
            className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          >
            <option value="all">All categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          >
            <option value="all">All locations</option>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <button
            onClick={clearFilters}
            className="h-12 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {error ? (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</section>
      ) : null}

      {loading ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </section>
      ) : filteredJobs.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-[#243251]">Latest jobs open</h3>
            <p className="text-sm font-medium text-slate-500">{filteredJobs.length} results</p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default JobListingsPage
