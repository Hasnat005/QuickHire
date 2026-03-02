import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePageTitle } from '../hooks/usePageTitle'
import { loginAdmin } from '../services/authService'

function AdminLoginPage() {
  usePageTitle('Admin Login')

  const navigate = useNavigate()
  const { login, isAdmin } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }

    try {
      setSubmitting(true)
      setError('')

      const authData = await loginAdmin({
        email: email.trim(),
        password,
      })

      login(authData)
      navigate('/admin', { replace: true })
    } catch {
      setError('Invalid credentials or unauthorized access.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-[#243251]">Admin Login</h1>
      <p className="mt-2 text-sm text-slate-500">Sign in with your admin account to manage jobs.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="admin-email" className="mb-1 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500"
            placeholder="admin@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="mb-1 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Need an admin account?{' '}
        <Link to="/admin/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Signup
        </Link>
      </p>
    </div>
  )
}

export default AdminLoginPage
