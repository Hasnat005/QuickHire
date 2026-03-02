import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const navLinkClass = ({ isActive }) =>
  `text-lg font-semibold leading-none transition-colors ${isActive ? 'text-[#5f6b82]' : 'text-[#5f6b82] hover:text-[#2f3b56]'}`

function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin, logout } = useAuth()
  const isLandingPage = location.pathname === '/'
  const mainClassName = isLandingPage
    ? 'w-full py-0'
    : 'mx-auto w-full max-w-[1536px] px-6 py-8 md:px-8 md:py-10 lg:px-10'

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f4f5fb] text-slate-900">
      <header className="bg-[#f4f5fb]">
        <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between px-6 py-4 md:px-8 lg:px-10">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3" aria-label="Go to homepage">
              <div className="relative h-10 w-10 rounded-full bg-[#4f46e5]">
                <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white" />
                <span className="absolute left-[21px] top-[19px] h-[6px] w-[6px] rounded-full bg-white" />
              </div>
              <span className="text-2xl font-bold leading-none tracking-tight text-[#243251]">QuickHire</span>
            </Link>

            <nav className="hidden items-center gap-10 md:flex">
              <NavLink to="/jobs" className={navLinkClass}>
                Find Jobs
              </NavLink>
              <NavLink to="/jobs" className={navLinkClass}>
                Browse Companies
              </NavLink>
            </nav>
          </div>

          {isAdmin ? (
            <>
              <div className="flex items-center gap-3 md:hidden">
                <Link
                  to="/admin"
                  className="inline-flex h-9 items-center rounded-md border border-indigo-200 px-3 text-sm font-semibold leading-none text-indigo-600"
                >
                  Add Job
                </Link>
                <button
                  onClick={handleLogout}
                  className="h-9 rounded-md bg-[#4f46e5] px-4 text-sm font-semibold leading-none text-white"
                >
                  Logout
                </button>
              </div>
              <div className="hidden items-center gap-4 md:flex">
                <Link
                  to="/admin"
                  className="inline-flex h-11 items-center rounded-md border border-indigo-200 px-5 text-lg font-semibold leading-none text-indigo-600"
                >
                  Add Job
                </Link>
                <button
                  onClick={handleLogout}
                  className="h-11 rounded-md bg-[#4f46e5] px-6 text-lg font-semibold leading-none text-white"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 md:hidden">
                <Link to="/admin/login" className="text-sm font-semibold leading-none text-[#4f46e5]">
                  Login
                </Link>
                <Link
                  to="/admin/signup"
                  className="inline-flex h-9 items-center rounded-md bg-[#4f46e5] px-4 text-sm font-semibold leading-none text-white"
                >
                  Signup
                </Link>
              </div>
              <div className="hidden items-center gap-4 md:flex">
                <Link to="/admin/login" className="px-2 text-lg font-semibold leading-none text-[#4f46e5]">
                  Login
                </Link>
                <Link
                  to="/admin/signup"
                  className="inline-flex h-11 items-center rounded-md bg-[#4f46e5] px-6 text-lg font-semibold leading-none text-white"
                >
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>
      </header>
      <main className={mainClassName}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout