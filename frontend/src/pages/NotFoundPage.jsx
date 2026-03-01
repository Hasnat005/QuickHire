import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Page not found</h2>
      <p className="mt-3 text-slate-600">The page you requested does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Back to home
      </Link>
    </section>
  )
}

export default NotFoundPage