import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedAdminRoute({ children }) {
  const { token, isAdmin } = useAuth()

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedAdminRoute
