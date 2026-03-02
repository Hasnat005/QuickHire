import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminPage from './pages/AdminPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminSignupPage from './pages/AdminSignupPage'
import HomePage from './pages/HomePage'
import JobDetailPage from './pages/JobDetailPage'
import JobListingsPage from './pages/JobListingsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobListingsPage />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route path="admin/signup" element={<AdminSignupPage />} />
        <Route
          path="admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default App
