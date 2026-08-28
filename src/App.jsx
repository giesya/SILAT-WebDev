import { useEffect, useState } from 'react'
import Login from './Login.jsx'
import Beranda from './Beranda.jsx'
import Dashboard from './Dashboard.jsx'
import Pelaporan from './Admin/Pelaporan.jsx'

// Approval
import ApprovalIzinSIPISIKPI from './Admin/Approval/IzinSIPI-SIKPI.jsx'
import ApprovalIzinSIUPSIPR from './Admin/Approval/IzinSIUP-SIPR.jsx'
import ApprovalPenolakan from './Admin/Approval/Penolakan.jsx'
import ApprovalSPPPHPPPKA from './Admin/Approval/SPP-PHP-PPKA.jsx'
import ApprovalSPPPPSIPR from './Admin/Approval/SPP-PPP-SIPR.jsx'

// Data & Pusat
import KemenhubKapal from './Admin/Data & Pusat/KemenhubKapal.jsx'
import SIUPDanKapal from './Admin/Data & Pusat/SIUP-dan-Kapal.jsx'

// Layanan - Permohonan
import IUDaftarPendokSIUP from './Admin/Layanan/Permohonan/IU-DaftarPendokSIUP.jsx'
import IUDaftarPermohonan from './Admin/Layanan/Permohonan/IU-DaftarPermohonan.jsx'
import IUDaftarVerifikasi from './Admin/Layanan/Permohonan/IU-DaftarVerifikasi.jsx'
import IKDaftarPendokSIPISIKPI from './Admin/Layanan/Permohonan/IK-DaftarPendokSIPI-SIKPI.jsx'
import IKDaftarVerifikasi from './Admin/Layanan/Permohonan/IK-DaftarVerifikasi.jsx'
import IRApprovalSIPR from './Admin/Layanan/Permohonan/IR-ApprovalSIPR.jsx'
import IRDaftarPermohonan from './Admin/Layanan/Permohonan/IR-DaftarPermohonan.jsx'
import IRDaftarVerifikasi from './Admin/Layanan/Permohonan/IR-DaftarVerifikasi.jsx'
import IRDistribusiDokumen from './Admin/Layanan/Permohonan/IR-DistribusiDokumen.jsx'

// Layanan - Pencetakan
import IUDistribusiPencetakan from './Admin/Layanan/Pencetakan/IU-DistribusiPencetakan.jsx'
import IUDaftarPermohonanPencetakan from './Admin/Layanan/Pencetakan/IU-DaftarPermohonan.jsx'
import IUDaftarIzinUsaha from './Admin/Layanan/Pencetakan/IU-DaftarIzinUsaha.jsx'
import IKDistribusiPencetakan from './Admin/Layanan/Pencetakan/IK-DistribusiPencetakan.jsx'
import IKDaftarPermohonanPencetakan from './Admin/Layanan/Pencetakan/IK-DaftarPermohonan.jsx'
import IKDaftarIzinKapal from './Admin/Layanan/Pencetakan/IK-DaftarIzinKapal.jsx'
import IRDaftarPermohonanPencetakan from './Admin/Layanan/Pencetakan/IR-DaftarPermohonan.jsx'

// Layanan - Pembekuan & Pencabutan
import IUPembekuan from './Admin/Layanan/Pembekuan/IU-Pembekuan.jsx'
import IKPembekuan from './Admin/Layanan/Pembekuan/IK-Pembekuan.jsx'
import DaftarPembekuan from './Admin/Layanan/Pembekuan/DaftarPembekuan.jsx'
import IUPencabutan from './Admin/Layanan/Pencabutan/IU-Pencabutan.jsx'
import IKPencabutan from './Admin/Layanan/Pencabutan/IK-Pencabutan.jsx'
import DaftarPencabutanIzin from './Admin/Layanan/Pencabutan/DaftarPencabutanIzin.jsx'

// Layanan - Pungutan & Simulasi
import SPPPPPDaftarPermohonan from './Admin/Layanan/Pungutan/SPP-PPP/DaftarPermohonan.jsx'
import DaftarSPPPPP from './Admin/Layanan/Pungutan/SPP-PPP/DaftarSPP-PPP.jsx'
import SPPPHPDaftarPermohonan from './Admin/Layanan/Pungutan/SPP-PHP/DaftarPermohonan.jsx'
import DaftarSPPPHP from './Admin/Layanan/Pungutan/SPP-PHP/DaftarSPP-PHP.jsx'
import SPPPPKADaftarPermohonan from './Admin/Layanan/Pungutan/SPP-PPKA/DaftarPermohonan.jsx'
import DaftarSPPPPKA from './Admin/Layanan/Pungutan/SPP-PPKA/DaftarSPP-PPKA.jsx'
import SimulasiPPP from './Admin/Layanan/Pungutan/Simulasi/SimulasiPPP.jsx'
import SimulasiPHP from './Admin/Layanan/Pungutan/Simulasi/SimulasiPHP.jsx'
import SimulasiPPKA from './Admin/Layanan/Pungutan/Simulasi/SimulasiPPKA.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('silat_logged_in') === 'true'
  })
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/beranda')

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)

    const handleInternalNavigation = (event) => {
      const link = event.target.closest('a[href]')
      if (!link || link.target === '_blank' || link.origin !== window.location.origin) return

      const nextUrl = new URL(link.href)
      event.preventDefault()
      window.history.pushState({}, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
      setCurrentPath(nextUrl.pathname)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleInternalNavigation)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleInternalNavigation)
    }
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem('silat_logged_in', 'true')
    setIsLoggedIn(true)
    window.history.replaceState({}, '', '/beranda')
    setCurrentPath('/beranda')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('silat_logged_in')
    setIsLoggedIn(false)
    window.history.replaceState({}, '', '/')
    setCurrentPath('/')
  }

  if (!isLoggedIn) return <Login onLogin={handleLogin} />

  // Direct Pages
  if (currentPath === '/' || currentPath === '/beranda') {
    return <Beranda onLogout={handleLogout} />
  }
  if (currentPath === '/dashboard') {
    return <Dashboard onLogout={handleLogout} />
  }
  if (currentPath === '/pelaporan') {
    return <Pelaporan onLogout={handleLogout} />
  }

  // Approval Routes
  if (currentPath === '/approval/spp-ppp-sipr' || currentPath.includes('/approval/spp-ppp-sipr')) {
    return <ApprovalSPPPPSIPR onLogout={handleLogout} />
  }
  if (currentPath === '/approval/spp-php-ppka' || currentPath.includes('/approval/spp-php-ppka')) {
    return <ApprovalSPPPHPPPKA onLogout={handleLogout} />
  }
  if (currentPath === '/approval/izin-siup-sipr' || currentPath.includes('/approval/izin-siup-sipr')) {
    return <ApprovalIzinSIUPSIPR onLogout={handleLogout} />
  }
  if (currentPath === '/approval/izin-sipi-sikpi' || currentPath.includes('/approval/izin-sipi-sikpi')) {
    return <ApprovalIzinSIPISIKPI onLogout={handleLogout} />
  }
  if (currentPath === '/approval/penolakan' || currentPath.includes('/approval/penolakan')) {
    return <ApprovalPenolakan onLogout={handleLogout} />
  }

  // Data & Pusat Routes
  if (currentPath === '/data-pusat/siup-dan-kapal' || currentPath.includes('siup-dan-kapal')) {
    return <SIUPDanKapal onLogout={handleLogout} />
  }
  if (currentPath === '/data-pusat/kemenhub-kapal' || currentPath.includes('kemenhub-kapal')) {
    return <KemenhubKapal onLogout={handleLogout} />
  }

  // Layanan - Permohonan Routes
  if (currentPath.includes('pendok-siup') || currentPath.includes('daftar-pendek-siup')) {
    return <IUDaftarPendokSIUP onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/permohonan/iu/daftar-permohonan') {
    return <IUDaftarPermohonan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/permohonan/iu/daftar-verifikasi') {
    return <IUDaftarVerifikasi onLogout={handleLogout} />
  }
  if (currentPath.includes('pendok-sipi-sikpi') || currentPath.includes('daftar-pendek-sipi-sikpi')) {
    return <IKDaftarPendokSIPISIKPI onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/permohonan/ik/daftar-verifikasi') {
    return <IKDaftarVerifikasi onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/permohonan/ir/distribusi-dokumen') {
    return <IRDistribusiDokumen onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/permohonan/ir/approval-sipr') {
    return <IRApprovalSIPR onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/permohonan/ir/daftar-permohonan') {
    return <IRDaftarPermohonan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/permohonan/ir/daftar-verifikasi') {
    return <IRDaftarVerifikasi onLogout={handleLogout} />
  }

  // Layanan - Pungutan Routes
  if (currentPath === '/layanan/pungutan/spp-ppp/daftar-permohonan') {
    return <SPPPPPDaftarPermohonan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/spp-ppp/daftar-spp-ppp') {
    return <DaftarSPPPPP onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/spp-php/daftar-permohonan') {
    return <SPPPHPDaftarPermohonan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/spp-php/daftar-spp-php') {
    return <DaftarSPPPHP onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/spp-ppka/daftar-permohonan') {
    return <SPPPPKADaftarPermohonan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/spp-ppka/daftar-spp-ppka') {
    return <DaftarSPPPPKA onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/simulasi/ppp') {
    return <SimulasiPPP onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/simulasi/php') {
    return <SimulasiPHP onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pungutan/simulasi/ppka') {
    return <SimulasiPPKA onLogout={handleLogout} />
  }

  // Layanan - Pencetakan Routes
  if (currentPath === '/layanan/pencetakan/iu-distribusi') {
    return <IUDistribusiPencetakan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencetakan/iu-permohonan') {
    return <IUDaftarPermohonanPencetakan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencetakan/iu-daftar') {
    return <IUDaftarIzinUsaha onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencetakan/ik-distribusi') {
    return <IKDistribusiPencetakan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencetakan/ik-permohonan') {
    return <IKDaftarPermohonanPencetakan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencetakan/ik-daftar') {
    return <IKDaftarIzinKapal onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencetakan/ir-permohonan') {
    return <IRDaftarPermohonanPencetakan onLogout={handleLogout} />
  }

  // Layanan - Pembekuan Routes
  if (currentPath === '/layanan/pembekuan/iu') {
    return <IUPembekuan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pembekuan/ik') {
    return <IKPembekuan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pembekuan/daftar') {
    return <DaftarPembekuan onLogout={handleLogout} />
  }

  // Layanan - Pencabutan Routes
  if (currentPath === '/layanan/pencabutan/iu') {
    return <IUPencabutan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencabutan/ik') {
    return <IKPencabutan onLogout={handleLogout} />
  }
  if (currentPath === '/layanan/pencabutan/daftar') {
    return <DaftarPencabutanIzin onLogout={handleLogout} />
  }

  // Fallback to Beranda
  return <Beranda onLogout={handleLogout} />
}

export default App
