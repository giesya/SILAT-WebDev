import { useState, useEffect, useRef } from 'react'
import {
  FileText,
  CreditCard,
  FileCheck2,
  Database,
  Ship,
  MapPin,
  Printer,
  Clock,
  Ban,
  Calculator,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  Menu,
  X,
  Building2,
  CheckCircle2,
  XCircle,
  FileMinus,
  Sparkles,
  BarChart3,
  Home,
  LayoutDashboard,
  Layers,
  ShieldCheck
} from 'lucide-react'

const LAYANAN_SECTIONS = [
  {
    category: 'Permohonan',
    icon: FileText,
    groups: [
      {
        title: 'Izin Usaha (SIUP)',
        links: [
          { label: 'Daftar Pendok SIUP', href: '/layanan/permohonan/iu/pendok-siup' },
          { label: 'Daftar Permohonan', href: '/layanan/permohonan/iu/daftar-permohonan' },
          { label: 'Daftar Verifikasi', href: '/layanan/permohonan/iu/daftar-verifikasi' },
        ],
      },
      {
        title: 'Izin Kapal (SIPI / SIKPI)',
        links: [
          { label: 'Daftar Pendok SIPI / SIKPI', href: '/layanan/permohonan/ik/pendok-sipi-sikpi' },
          { label: 'Daftar Verifikasi', href: '/layanan/permohonan/ik/daftar-verifikasi' },
        ],
      },
      {
        title: 'Izin Rumpon (SIPR)',
        links: [
          { label: 'Distribusi Dokumen', href: '/layanan/permohonan/ir/distribusi-dokumen' },
          { label: 'Approval SIPR', href: '/layanan/permohonan/ir/approval-sipr' },
          { label: 'Daftar Permohonan', href: '/layanan/permohonan/ir/daftar-permohonan' },
          { label: 'Daftar Verifikasi', href: '/layanan/permohonan/ir/daftar-verifikasi' },
        ],
      },
    ],
  },
  {
    category: 'Pungutan',
    icon: CreditCard,
    groups: [
      {
        title: 'SPP–PPP (Pungutan Pengusahaan)',
        links: [
          { label: 'Daftar Permohonan', href: '/layanan/pungutan/spp-ppp/daftar-permohonan' },
          { label: 'Daftar SPP–PPP', href: '/layanan/pungutan/spp-ppp/daftar-spp-ppp' },
        ],
      },
      {
        title: 'SPP–PHP (Hasil Perikanan)',
        links: [
          { label: 'Daftar Permohonan', href: '/layanan/pungutan/spp-php/daftar-permohonan' },
          { label: 'Daftar SPP–PHP', href: '/layanan/pungutan/spp-php/daftar-spp-php' },
        ],
      },
      {
        title: 'SPP–PPKA (Kapal Asing)',
        links: [
          { label: 'Daftar Permohonan', href: '/layanan/pungutan/spp-ppka/daftar-permohonan' },
          { label: 'Daftar SPP–PPKA', href: '/layanan/pungutan/spp-ppka/daftar-spp-ppka' },
        ],
      },
      {
        title: 'Simulasi Tarif PNBP',
        links: [
          { label: 'Simulasi Tarif PPP', href: '/layanan/pungutan/simulasi/ppp' },
          { label: 'Simulasi Tarif PHP', href: '/layanan/pungutan/simulasi/php' },
          { label: 'Simulasi Tarif PPKA', href: '/layanan/pungutan/simulasi/ppka' },
        ],
      },
    ],
  },
  {
    category: 'Perizinan & Dokumen',
    icon: FileCheck2,
    groups: [
      {
        title: 'Pencetakan Izin Usaha',
        links: [
          { label: 'Distribusi Pencetakan', href: '/layanan/pencetakan/iu-distribusi' },
          { label: 'Daftar Permohonan', href: '/layanan/pencetakan/iu-permohonan' },
          { label: 'Daftar Izin Usaha', href: '/layanan/pencetakan/iu-daftar' },
        ],
      },
      {
        title: 'Pencetakan Izin Kapal',
        links: [
          { label: 'Distribusi Pencetakan', href: '/layanan/pencetakan/ik-distribusi' },
          { label: 'Daftar Permohonan', href: '/layanan/pencetakan/ik-permohonan' },
          { label: 'Daftar Izin Kapal', href: '/layanan/pencetakan/ik-daftar' },
        ],
      },
      {
        title: 'Pencetakan Izin Rumpon',
        links: [
          { label: 'Daftar Permohonan', href: '/layanan/pencetakan/ir-permohonan' },
        ],
      },
      {
        title: 'Pembekuan & Pencabutan',
        links: [
          { label: 'Pembekuan Izin Usaha', href: '/layanan/pembekuan/iu' },
          { label: 'Pembekuan Izin Kapal', href: '/layanan/pembekuan/ik' },
          { label: 'Daftar Pembekuan', href: '/layanan/pembekuan/daftar' },
          { label: 'Pencabutan Izin Usaha', href: '/layanan/pencabutan/iu' },
          { label: 'Pencabutan Izin Kapal', href: '/layanan/pencabutan/ik' },
          { label: 'Daftar Pencabutan Izin', href: '/layanan/pencabutan/daftar' },
        ],
      },
    ],
  },
  {
    category: 'Data & Pusat',
    icon: Database,
    groups: [
      {
        title: 'Pusat Data Perizinan',
        links: [
          { label: 'Data SIUP dan Kapal', href: '/data-pusat/siup-dan-kapal' },
          { label: 'Data Kapal Kemenhub (Hubla)', href: '/data-pusat/kemenhub-kapal' },
        ],
      },
    ],
  },
]

const APPROVAL_LINKS = [
  { label: 'Approval SPP–PPP & SIPR', href: '/approval/spp-ppp-sipr' },
  { label: 'Approval SPP–PHP & SPP–PPKA', href: '/approval/spp-php-ppka' },
  { label: 'Approval Izin SIUP & SIPR', href: '/approval/izin-siup-sipr' },
  { label: 'Approval Izin SIPI & SIKPI', href: '/approval/izin-sipi-sikpi' },
  { label: 'Daftar Penolakan Permohonan', href: '/approval/penolakan' },
]

export default function Navbar({ currentPath = '/beranda', onLogout }) {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)

  const navRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null)
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Close drawer on path change
  useEffect(() => {
    setIsMobileDrawerOpen(false)
    setOpenDropdown(null)
    setIsProfileOpen(false)
  }, [currentPath])

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
    setIsProfileOpen(false)
  }

  const isLayananActive = currentPath.startsWith('/layanan') || currentPath.startsWith('/data-pusat')
  const isApprovalActive = currentPath.startsWith('/approval')

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(31,78,120,0.1)] shadow-xs relative" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo - Returns to /beranda */}
          <a href="/beranda" className="flex items-center group shrink-0 py-1" title="Kembali ke Beranda">
            <img
              src="/SILAT NOBG.png"
              alt="Logo SILAT KKP"
              className="h-10 sm:h-11 w-auto object-contain hover:scale-105 transition-transform drop-shadow-xs"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* Beranda */}
            <a
              href="/beranda"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentPath === '/' || currentPath === '/beranda'
                  ? 'bg-[rgba(0,90,156,0.08)] text-[var(--color-primary)]'
                  : 'text-slate-600 hover:text-[var(--color-primary)] hover:bg-[rgba(0,90,156,0.05)]'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Beranda</span>
            </a>

            {/* Dashboard */}
            <a
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentPath === '/dashboard'
                  ? 'bg-[rgba(0,90,156,0.08)] text-[var(--color-primary)]'
                  : 'text-slate-600 hover:text-[var(--color-primary)] hover:bg-[rgba(0,90,156,0.05)]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </a>

            {/* Dropdown: Layanan */}
            <div className="nav-dropdown-wrapper">
              <button
                type="button"
                onClick={() => toggleDropdown('layanan')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isLayananActive || openDropdown === 'layanan'
                    ? 'bg-[rgba(0,90,156,0.08)] text-[var(--color-primary)]'
                    : 'text-slate-600 hover:text-[var(--color-primary)] hover:bg-[rgba(0,90,156,0.05)]'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Layanan</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                    openDropdown === 'layanan' ? 'rotate-180' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Layanan Mega-Menu */}
              {openDropdown === 'layanan' && (
                <div className="mega-menu mega-menu-layanan">
                  <div className="mega-menu-grid">
                    {LAYANAN_SECTIONS.map((sec, idx) => {
                      const CategoryIcon = sec.icon
                      return (
                        <div key={idx} className="mega-menu-category">
                          <div className="category-header">
                            <CategoryIcon className="w-4 h-4 shrink-0 text-[var(--color-primary)]" />
                            <h4 className="category-title">{sec.category}</h4>
                          </div>

                          <div className="category-groups">
                            {sec.groups.map((grp, gIdx) => (
                              <div key={gIdx} className="menu-subgroup">
                                <h5 className="subgroup-title">{grp.title}</h5>
                                <ul className="subgroup-list">
                                  {grp.links.map((lnk, lIdx) => {
                                    const active = currentPath === lnk.href
                                    return (
                                      <li key={lIdx}>
                                        <a
                                          href={lnk.href}
                                          className={`subgroup-link !flex !flex-row !items-center !gap-1.5 ${active ? 'active' : ''}`}
                                        >
                                          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                                          <span className="leading-tight text-left">{lnk.label}</span>
                                        </a>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown: Approval */}
            <div className="nav-dropdown-wrapper">
              <button
                type="button"
                onClick={() => toggleDropdown('approval')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isApprovalActive || openDropdown === 'approval'
                    ? 'bg-[rgba(0,90,156,0.08)] text-[var(--color-primary)]'
                    : 'text-slate-600 hover:text-[var(--color-primary)] hover:bg-[rgba(0,90,156,0.05)]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Approval</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                    openDropdown === 'approval' ? 'rotate-180' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Approval Menu */}
              {openDropdown === 'approval' && (
                <div className="mega-menu mega-menu-approval">
                  <div className="category-header">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-[var(--color-primary)]" />
                    <h4 className="category-title">Approval</h4>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    {APPROVAL_LINKS.map((lnk, idx) => {
                      const active = currentPath === lnk.href
                      return (
                        <a
                          key={idx}
                          href={lnk.href}
                          className={`subgroup-link !flex !flex-row !items-center !gap-2 !py-2 !px-3 ${active ? 'active' : ''}`}
                        >
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                          <span className="font-semibold text-slate-800 text-xs">{lnk.label}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Pelaporan */}
            <a
              href="/pelaporan"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentPath === '/pelaporan'
                  ? 'bg-[rgba(0,90,156,0.08)] text-[var(--color-primary)]'
                  : 'text-slate-600 hover:text-[var(--color-primary)] hover:bg-[rgba(0,90,156,0.05)]'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Pelaporan</span>
            </a>
          </nav>

          {/* Right Action: User Profile & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* User Profile Pill */}
            <div className="profile-wrap">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen((prev) => !prev)
                  setOpenDropdown(null)
                }}
                className="profile-toggle"
                aria-label="Menu Pengguna"
              >
                <div className="profile-avatar">
                  <User className="w-4 h-4 shrink-0" />
                </div>
                <div className="profile-meta">
                  <span className="profile-name">Admin KKP</span>
                  <span className="profile-role">DJPT Pusat</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <p className="profile-menu-name">Administrator Silat</p>
                    <p className="profile-menu-email">admin.perizinan@kkp.go.id</p>
                  </div>
                  <div className="profile-menu-divider" />
                  <a href="/beranda" className="profile-menu-item">
                    <Home className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Halaman Utama</span>
                  </a>
                  <a href="/dashboard" className="profile-menu-item">
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Status Verifikasi</span>
                  </a>
                  <div className="profile-menu-divider" />
                  <button
                    type="button"
                    onClick={onLogout}
                    className="profile-menu-item logout-button text-rose-600 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="mobile-menu-toggle"
              aria-label="Buka Menu Navigasi"
            >
              <Menu className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <a
                href="/beranda"
                className="mobile-drawer-brand"
                onClick={() => setIsMobileDrawerOpen(false)}
                title="Kembali ke Beranda"
              >
                <img
                  src="/SILAT NOBG.png"
                  alt="Logo SILAT KKP"
                  className="h-8 w-auto object-contain"
                />
              </a>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="drawer-close-btn cursor-pointer"
                aria-label="Tutup Menu"
              >
                <X className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="mobile-drawer-body">
              {/* User badge */}
              <div className="mobile-user-card">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  <User className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Admin KKP (DJPT)</p>
                  <p className="text-[11px] text-slate-400">admin.perizinan@kkp.go.id</p>
                </div>
              </div>

              {/* Navigation Links List */}
              <div className="mobile-nav-links">
                <a
                  href="/beranda"
                  className={`mobile-nav-item ${currentPath === '/beranda' ? 'active' : ''}`}
                >
                  <Home className="w-4 h-4 shrink-0" />
                  <span>Beranda</span>
                </a>

                <a
                  href="/dashboard"
                  className={`mobile-nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Dashboard</span>
                </a>

                {/* Layanan Accordion */}
                <div className="mobile-accordion">
                  <button
                    type="button"
                    onClick={() => setMobileAccordion((prev) => (prev === 'layanan' ? null : 'layanan'))}
                    className={`mobile-accordion-btn ${isLayananActive ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 shrink-0" />
                      <span>Layanan Perizinan</span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        mobileAccordion === 'layanan' ? 'rotate-180 text-[var(--color-primary)]' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {mobileAccordion === 'layanan' && (
                    <div className="mobile-accordion-content">
                      {LAYANAN_SECTIONS.map((sec, sIdx) => {
                        const IconComponent = sec.icon
                        return (
                          <div key={sIdx} className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)]">
                              <IconComponent className="w-3.5 h-3.5 shrink-0" />
                              <span>{sec.category}</span>
                            </div>
                            {sec.groups.map((grp, gIdx) => (
                              <div key={gIdx} className="mobile-grp">
                                <h6 className="mobile-grp-title">{grp.title}</h6>
                                {grp.links.map((lnk, lIdx) => (
                                  <a
                                    key={lIdx}
                                    href={lnk.href}
                                    className={`mobile-sublink ${currentPath === lnk.href ? 'active' : ''}`}
                                  >
                                    {lnk.label}
                                  </a>
                                ))}
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Approval Accordion */}
                <div className="mobile-accordion">
                  <button
                    type="button"
                    onClick={() => setMobileAccordion((prev) => (prev === 'approval' ? null : 'approval'))}
                    className={`mobile-accordion-btn ${isApprovalActive ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Approval & Verifikasi</span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        mobileAccordion === 'approval' ? 'rotate-180 text-[var(--color-primary)]' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {mobileAccordion === 'approval' && (
                    <div className="mobile-accordion-content">
                      {APPROVAL_LINKS.map((lnk, idx) => (
                        <a
                          key={idx}
                          href={lnk.href}
                          className={`mobile-sublink ${currentPath === lnk.href ? 'active' : ''}`}
                        >
                          {lnk.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="/pelaporan"
                  className={`mobile-nav-item ${currentPath === '/pelaporan' ? 'active' : ''}`}
                >
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>Pelaporan</span>
                </a>
              </div>

              {/* Logout Footer */}
              <div className="mobile-drawer-footer">
                <button
                  type="button"
                  onClick={onLogout}
                  className="mobile-logout-btn flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Keluar dari Aplikasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
