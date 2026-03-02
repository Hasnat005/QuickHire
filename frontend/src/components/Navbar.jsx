import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import companyLogo from '../../assets/bg/logo.png'

const navLinkClass = ({ isActive }) =>
  `text-lg font-semibold leading-none transition-colors ${isActive ? 'text-[#5f6b82]' : 'text-[#5f6b82] hover:text-[#2f3b56]'}`

function Navbar({ isAuthenticated, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuContainerRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const handleViewportChange = (event) => {
      if (event.matches) {
        setIsMobileMenuOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleViewportChange)

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange)
    }
  }, [])

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!isMobileMenuOpen || !menuContainerRef.current) {
        return
      }

      if (!menuContainerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    document.addEventListener('keydown', handleEscapePress)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleEscapePress)
    }
  }, [isMobileMenuOpen])

  const primaryNavItems = useMemo(
    () => [
      { to: '/jobs', label: 'Find Jobs' },
      { to: '/jobs', label: 'Browse Companies' },
    ],
    [],
  )

  const accountItems = useMemo(() => {
    if (isAuthenticated) {
      return [
        { type: 'link', to: '/admin', label: 'Add Job' },
        { type: 'button', label: 'Logout', onClick: onLogout },
      ]
    }

    return [
      { type: 'link', to: '/admin/login', label: 'Login' },
      { type: 'link', to: '/admin/signup', label: 'Signup' },
    ]
  }, [isAuthenticated, onLogout])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((currentState) => !currentState)
  }

  return (
    <header className="relative bg-[#f4f5fb]">
      <div
        ref={menuContainerRef}
        className="relative mx-auto flex w-full max-w-[1536px] items-center justify-between px-6 py-4 md:px-8 lg:px-10"
      >
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3" aria-label="Go to homepage" onClick={closeMobileMenu}>
            <img src={companyLogo} alt="QuickHire logo" className="h-11 w-11 object-contain" />
            <span className="text-2xl font-bold leading-none tracking-tight text-[#243251]">QuickHire</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {primaryNavItems.map((item) => (
              <NavLink key={item.label} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-slate-300 text-slate-700 transition-colors hover:border-slate-400 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="quickhire-mobile-menu"
          onClick={toggleMobileMenu}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {isMobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M5 7h14M5 12h14M5 17h9" />}
          </svg>
        </button>

        {isAuthenticated ? (
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/admin"
              className="inline-flex h-11 items-center rounded-md border border-indigo-200 px-5 text-lg font-semibold leading-none text-indigo-600"
            >
              Add Job
            </Link>
            <button
              onClick={onLogout}
              className="h-11 rounded-md bg-[#4f46e5] px-6 text-lg font-semibold leading-none text-white"
            >
              Logout
            </button>
          </div>
        ) : (
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
        )}

        <nav
          id="quickhire-mobile-menu"
          aria-label="Mobile"
          className={`absolute right-6 top-[calc(100%-4px)] z-50 w-3/4 max-w-xs origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'pointer-events-auto translate-y-3 scale-100 opacity-100'
              : 'pointer-events-none translate-y-1 scale-95 opacity-0'
          }`}
        >
          <ul className="space-y-1 p-3">
            {primaryNavItems.map((item) => (
              <li key={`mobile-${item.label}`}>
                <NavLink
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            <li className="my-2 border-t border-slate-200" />

            {accountItems.map((item) => (
              <li key={`mobile-account-${item.label}`}>
                {item.type === 'link' ? (
                  <Link
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      item.label === 'Signup'
                        ? 'bg-[#4f46e5] text-white hover:bg-[#443ad8]'
                        : item.label === 'Add Job'
                          ? 'text-indigo-700 hover:bg-indigo-50'
                          : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu()
                      item.onClick()
                    }}
                    className="block w-full rounded-md bg-[#4f46e5] px-3 py-2 text-left text-sm font-semibold text-white transition-colors hover:bg-[#443ad8]"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar