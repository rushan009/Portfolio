import AdminPage from './pages/AdminPage.jsx'
import MainPage from './pages/MainPage.jsx'

function App() {
  const currentPath = window.location.pathname
  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin/')

  return isAdminRoute ? <AdminPage /> : <MainPage />
}

export default App
