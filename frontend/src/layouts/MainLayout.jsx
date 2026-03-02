import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-lg font-semibold leading-none transition-colors ${isActive ? 'text-[#5f6b82]' : 'text-[#5f6b82] hover:text-[#2f3b56]'}`

function MainLayout() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const mainClassName = isLandingPage
    ? 'w-full py-0'
    : 'mx-auto w-full max-w-[1536px] px-6 py-8 md:px-8 md:py-10 lg:px-10'

  return (
    <div className="min-h-screen bg-[#f4f5fb] text-slate-900">
      <header className="bg-[#f4f5fb]">
        <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between px-6 py-4 md:px-8 lg:px-10">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-[#4f46e5]">
                <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white" />
                <span className="absolute left-[21px] top-[19px] h-[6px] w-[6px] rounded-full bg-white" />
              </div>
              <span className="text-2xl font-bold leading-none tracking-tight text-[#243251]">QuickHire</span>
            </div>

            <nav className="hidden items-center gap-10 md:flex">
              <NavLink to="/jobs" className={navLinkClass}>
                Find Jobs
              </NavLink>
              <NavLink to="/companies" className={navLinkClass}>
                Browse Companies
              </NavLink>
            </nav>
          </div>

          <div className="hidden items-center md:flex">
            <button className="px-8 text-lg font-semibold leading-none text-[#4f46e5]">Login</button>
            <div className="h-12 w-px bg-[#d6d9e4]" />
            <button className="ml-4 h-14 bg-[#4f46e5] px-9 text-lg font-semibold leading-none text-white">
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <main className={mainClassName}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout