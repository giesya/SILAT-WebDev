import { useEffect, useRef, useState } from 'react'

//Dummy data for demonstration purposes
const applications = [
  {
    id: 'siup',
    applicant: 'Badan Hukum',
    owner: 'PT Laut Nusantara',
    date: '12 Jan 2024',
    time: '09:14 WIB',
    type: 'SIUP',
    verifier: 'Siti Rahmawati',
    stage: 'Tahap 3 dari 5',
    status: 'Verifikasi teknis',
  },
  {
    id: 'sipi',
    applicant: 'Perorangan',
    owner: 'KM. Sinar Bahari',
    date: '08 Mar 2024',
    time: '14:26 WIB',
    type: 'SIPI/SIKPI',
    verifier: 'Budi Santoso',
    stage: 'Tahap 2 dari 4',
    status: 'Pemeriksaan dokumen',
  },
]

const positionDetails = {
  siup: {
    title: 'PT Laut Nusantara · SIUP',
    steps: [
      ['Pengajuan diterima', '12 Jan 2024 · 09:14 WIB'],
      ['Verifikasi administrasi', '15 Jan 2024 · 13:42 WIB'],
      ['Verifikasi teknis', '18 Jan 2024 · 10:08 WIB'],
    ],
  },
  sipi: {
    title: 'KM. Sinar Bahari · SIPI/SIKPI',
    steps: [
      ['Pengajuan diterima', '08 Mar 2024 · 14:26 WIB'],
      ['Pemeriksaan dokumen', '11 Mar 2024 · 08:55 WIB'],
    ],
  },
}

const layananMenu = [
  { label: 'Permohonan', children: [{ label: 'Izin Usaha', children: ['Daftar Pendek SIUP', 'Daftar Permohonan', 'Daftar Verifikasi'] }, { label: 'Izin Kapal', children: ['Daftar Pendek SIPI/SIKPI', 'Daftar Verifikasi'] }, { label: 'Izin Rumpon', children: ['Distribusi Dokumen', 'Approval SIPR', 'Daftar Permohonan', 'Daftar Verifikasi'] }] },
  { label: 'Pungutan', children: [{ label: 'SPP–PPP', children: ['Daftar Permohonan', 'Daftar SPP–PPP'] }, { label: 'SPP–PHP', children: ['Daftar Permohonan', 'Daftar SPP–PHP'] }, { label: 'SPP–PPKA', children: ['Daftar Permohonan', 'Daftar SPP–PPKA'] }, { label: 'Pungutan Rumpon', children: ['Daftar SPP Rumpon', 'Daftar Permohonan'] }, { label: 'Simulasi Pungutan', children: ['Simulasi PPP', 'Simulasi PHP', 'Simulasi PPKA'] }] },
  { label: 'Perizinan & Dokumen', children: [{ label: 'Pencetakan', children: [{ label: 'Izin Usaha', children: ['Distribusi Pencetakan', 'Daftar Permohonan', 'Daftar Izin Usaha'] }, { label: 'Izin Kapal', children: ['Distribusi Pencetakan', 'Daftar Permohonan', 'Daftar Izin Kapal'] }, { label: 'Izin Rumpon', children: ['Daftar Pemilik', 'Daftar Permohonan'] }] }, { label: 'Pembekuan', children: ['Pembekuan Izin Usaha', 'Pembekuan Izin Kapal', 'Daftar Pembekuan'] }, { label: 'Pencabutan', children: ['Pencabutan Izin Usaha', 'Pencabutan Izin Kapal', 'Daftar Pencabutan Izin'] }] },
  { label: 'Data & Pusat', children: ['Daftar Izin Pusat', 'SIUP dan Kapal', 'Kemenhub Kapal'] },
]

const approvalMenu = ['Approval SPP–PPP/SIPR', 'Approval SPP–PHP/PPKA', 'Approval Izin SIUP/SIPR', 'Approval Izin SIPI/SIKPI', 'Approval Pencetakan']

const menuPath = (label) => label.includes('SIUP') ? '/dashboard/permohonan/izin-usaha/daftar-pendek-siup' : label.includes('SIPI/SIKPI') ? '/dashboard/permohonan/izin-kapal/daftar-pendek-sipi-sikpi' : '/dashboard'

function MenuTree({ items, level = 0 }) {
  return items.map((item) => {
    const menuItem = typeof item === 'string' ? { label: item } : item
    if (menuItem.children) return <div className={`menu-tree-group menu-tree-level-${level}`} key={menuItem.label}><p>{menuItem.label}</p><div className="menu-tree-children"><MenuTree items={menuItem.children} level={level + 1} /></div></div>
    return <a className={`menu-tree-link menu-tree-level-${level}`} href={menuPath(menuItem.label)} key={`${menuItem.label}-${level}`}><span aria-hidden="true">›</span>{menuItem.label}</a>
  })
}

function Dashboard({ onLogout }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'owner', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const headerRef = useRef(null)
  const pageSize = 2

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setOpenMenu(null)
        setIsProfileOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setSelectedApplication(null)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const filteredApplications = applications.filter((application) => (
    Object.values(application).join(' ').toLowerCase().includes(searchQuery.toLowerCase().trim())
  ))

  const sortedApplications = [...filteredApplications].sort((firstApplication, secondApplication) => {
    const firstValue = String(firstApplication[sortConfig.key]).toLowerCase()
    const secondValue = String(secondApplication[sortConfig.key]).toLowerCase()
    const comparison = firstValue.localeCompare(secondValue, 'id', { numeric: true })
    return sortConfig.direction === 'asc' ? comparison : -comparison
  })

  const totalPages = Math.max(1, Math.ceil(sortedApplications.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const currentApplications = sortedApplications.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize)
  const startIndex = sortedApplications.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1
  const endIndex = Math.min(safeCurrentPage * pageSize, sortedApplications.length)

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortIndicator = (key) => sortConfig.key === key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'

  return (
    <div className="beranda-page">
      <header ref={headerRef} className="topbar">
        <div className="topbar-inner">
          <a className="brand-row" href="/" aria-label="Kembali ke login SILAT">
            <img className="brand-logo" src="/SILAT NOBG.png" alt="Logo SILAT" />
          </a>

          <nav className="main-nav" aria-label="Menu utama">
            <a className="nav-direct" href="/beranda">Beranda</a>
            <a className="nav-direct active" href="/dashboard" aria-current="page">Dashboard</a>
            <div className="nav-dropdown">
              <button className={`nav-direct nav-toggle ${openMenu === 'layanan' ? 'open' : ''}`} type="button" aria-expanded={openMenu === 'layanan'} onClick={() => { setOpenMenu((current) => current === 'layanan' ? null : 'layanan'); setIsProfileOpen(false) }}>
                <span>Layanan</span><span className="dropdown-caret" aria-hidden="true">▾</span>
              </button>
              {openMenu === 'layanan' && <div className="approval-menu approval-menu-wide" role="menu"><MenuTree items={layananMenu} /></div>}
            </div>
            <div className="nav-dropdown">
              <button className={`nav-direct nav-toggle ${openMenu === 'approval' ? 'open' : ''}`} type="button" aria-expanded={openMenu === 'approval'} onClick={() => { setOpenMenu((current) => current === 'approval' ? null : 'approval'); setIsProfileOpen(false) }}>
                <span>Approval</span><span className="dropdown-caret" aria-hidden="true">▾</span>
              </button>
              {openMenu === 'approval' && <div className="approval-menu" role="menu"><MenuTree items={approvalMenu} /></div>}
            </div>
            <a className="nav-direct" href="/beranda">Pelaporan</a>
          </nav>

          <div className="header-tools">
            <div className="profile-wrap">
              <button className="profile-toggle" type="button" aria-expanded={isProfileOpen} onClick={() => { setIsProfileOpen((value) => !value); setOpenMenu(null) }}>
                <span className="profile-meta"><span className="profile-name">Andi Rizky</span><span className="profile-role">Pemohon</span></span>
                <span className="dropdown-caret" aria-hidden="true">▾</span>
              </button>
              {isProfileOpen && <div className="profile-menu" role="menu"><a href="/beranda" className="profile-menu-item"><span className="menu-item-icon" aria-hidden="true">⚙</span><span>Pengaturan Akun</span></a><button type="button" className="logout-link profile-menu-item" onClick={onLogout}><span className="menu-item-icon" aria-hidden="true">↪</span><span>Logout</span></button></div>}
            </div>
            <button className="mobile-menu-toggle" type="button" aria-label="Buka menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((value) => !value)}><span aria-hidden="true">☰</span></button>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <a href="/dashboard">Dashboard</a>
          <a href="/beranda">Beranda</a>
          <div className="mobile-menu-section"><strong>Layanan</strong><MenuTree items={layananMenu} /></div>
          <div className="mobile-menu-section"><strong>Approval</strong><MenuTree items={approvalMenu} /></div>
          <a href="/beranda">Pelaporan</a>

        </div>
      </header>

      <main className="beranda-main">

        <section className="dashboard-panel" aria-labelledby="table-title">
          <div className="dashboard-panel-header">
            <div><h2 id="table-title">Daftar Permohonan</h2><p>Informasi terbaru proses perizinan Anda.</p></div>
            <label className="search-box" aria-label="Cari permohonan"><span aria-hidden="true">⌕</span><input type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1) }} placeholder="Cari permohonan..." /></label>
          </div>

          <div className="table-wrap">
            <table className="dashboard-table">
              <thead><tr>{[['applicant', 'Perorangan / Badan Hukum'], ['owner', 'Nama Kapal / Nama Pemilik'], ['date', 'Tgl. Pengajuan Permohonan'], ['type', 'Jenis Izin'], ['verifier', 'Verifikator'], ['stage', 'Posisi Permohonan']].map(([key, label]) => <th key={key}><button type="button" className="sort-button" onClick={() => handleSort(key)}>{label} {sortIndicator(key)}</button></th>)}</tr></thead>
              <tbody>
                {currentApplications.map((application) => <tr key={application.id}><td>{application.applicant}</td><td>{application.owner}</td><td>{application.date}<small>{application.time}</small></td><td><span className="application-badge">{application.type}</span></td><td>{application.verifier}</td><td><button className="position-button" type="button" onClick={() => setSelectedApplication(application.id)}><strong>{application.stage}</strong><small>{application.status} · Lihat detail</small></button></td></tr>)}
              </tbody>
            </table>
          </div>
          {sortedApplications.length === 0 && <p className="no-results">Data permohonan tidak ditemukan.</p>}
          <div className="table-pagination"><span className="table-summary">Menampilkan {startIndex} sampai {endIndex} dari {sortedApplications.length} data</span><div className="pagination-controls"><button type="button" className="pagination-btn" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>&lt; Sebelumnya</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} className={`pagination-number ${page === safeCurrentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>)}<button type="button" className="pagination-btn" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>Selanjutnya &gt;</button></div></div>
        </section>
      </main>

      {selectedApplication && <div className="document-modal" role="dialog" aria-modal="true" aria-labelledby="position-modal-title" onClick={(event) => { if (event.target === event.currentTarget) setSelectedApplication(null) }}><div className="document-dialog"><div className="document-header"><div><p className="document-label">Detail tahapan</p><h2 id="position-modal-title">Riwayat Permohonan</h2></div><button type="button" onClick={() => setSelectedApplication(null)} aria-label="Tutup detail">×</button></div><div className="document-preview"><p className="document-label">{positionDetails[selectedApplication].title}</p><div className="application-timeline">{positionDetails[selectedApplication].steps.map(([title, date], index) => <div className="timeline-item" key={title}><span className="timeline-dot" aria-hidden="true" /><p><strong>{title}</strong>{index === positionDetails[selectedApplication].steps.length - 1 && <span> (Posisi saat ini)</span>}</p><small>{date}</small></div>)}</div></div><div className="document-actions"><button type="button" className="secondary-button" onClick={() => setSelectedApplication(null)}>Tutup</button></div></div></div>}
    </div>
  )
}

export default Dashboard
