import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'

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
      <Navbar isAuthenticated={isAdmin} onLogout={handleLogout} />
      <main className={mainClassName}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout