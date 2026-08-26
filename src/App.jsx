import { useEffect, useState } from 'react'
import Login from './Login.jsx'
import Beranda from './Beranda.jsx'
import Dashboard from './Dashboard.jsx'
import IUDaftarPendokSIUP from './Layanan/Permohonan/IU-DaftarPendokSIUP.jsx'
import IUDaftarPermohonan from './Layanan/Permohonan/IU-DaftarPermohonan.jsx'
import IUDaftarVerifikasi from './Layanan/Permohonan/IU-DaftarVerifikasi.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    const handleInternalNavigation = (event) => {
      const link = event.target.closest('a[href]')
      if (!link || link.target === '_blank' || link.origin !== window.location.origin) return

      const nextUrl = new URL(link.href)
      event.preventDefault()
      window.history.pushState({}, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
      setCurrentPath(nextUrl.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleInternalNavigation)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleInternalNavigation)
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    window.history.replaceState({}, '', '/beranda')
    setCurrentPath('/beranda')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    window.history.replaceState({}, '', '/')
    setCurrentPath('/')
  }

  if (!isLoggedIn) return <Login onLogin={handleLogin} />

  if (currentPath === '/dashboard/permohonan/izin-usaha/daftar-pendek-siup') {
    return <IUDaftarPendokSIUP onLogout={handleLogout} />
  }

  if (currentPath === '/dashboard/permohonan/izin-usaha/daftar-permohonan') {
    return <IUDaftarPermohonan onLogout={handleLogout} />
  }

  if (currentPath === '/dashboard/permohonan/izin-usaha/daftar-verifikasi') {
    return <IUDaftarVerifikasi onLogout={handleLogout} />
  }

  if (currentPath.startsWith('/dashboard')) {
    return <Dashboard onLogout={handleLogout} />
  }

  return <Beranda onLogout={handleLogout} />
}

export default App
