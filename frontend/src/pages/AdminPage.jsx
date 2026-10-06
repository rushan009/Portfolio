import { useEffect, useState } from 'react'
import AdminLogin from '../component/AdminLogin.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import { currentAdminService } from '../service/loginService.js'

function AdminPage() {
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    currentAdminService()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsCheckingSession(false))
  }, [])

  if (isCheckingSession) {
    return null
  }

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAuthenticated(true)} />
}

export default AdminPage
