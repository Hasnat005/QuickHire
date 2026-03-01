import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f4f5fb] text-slate-900">
      <header className="border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
              Q
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">QuickHire</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/jobs" className={navLinkClass}>
              Find Jobs
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <button className="text-sm font-semibold text-indigo-600">Login</button>
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout