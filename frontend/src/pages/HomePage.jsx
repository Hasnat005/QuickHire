import SectionHeader from '../components/SectionHeader'
import { API_BASE_URL } from '../utils/env'

function HomePage() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <SectionHeader
        title="Frontend setup complete"
        subtitle="React + Vite + Tailwind + Router + Axios are configured with a clean architecture."
      />

      <div className="mt-6 rounded-lg bg-slate-100 p-4 text-sm text-slate-700">
        <p>
          API base URL: <span className="font-medium">{API_BASE_URL}</span>
        </p>
      </div>
    </section>
  )
}

export default HomePage