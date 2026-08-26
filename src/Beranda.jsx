import { useEffect, useRef, useState } from 'react'

const izinData = { //Dummy filter options for demonstration purposes
  siup: [
    { owner: 'PT Laut Nusantara', person: 'Andi Rizky', npwp: '01.234.567.8-901.000', izin: 'SIUP-2024-00128', rev: '02', mulai: '12 Jan 2024', akhir: '12 Jan 2027' },
    { owner: 'CV Samudra Jaya', person: 'Dewi Lestari', npwp: '01.118.920.8-912.001', izin: 'SIUP-2024-00410', rev: '01', mulai: '05 Mei 2024', akhir: '05 Mei 2027' },
    { owner: 'PT Bahari Maju', person: 'Rizal Hidayat', npwp: '01.336.778.2-912.009', izin: 'SIUP-2024-00672', rev: '03', mulai: '02 Jul 2024', akhir: '02 Jul 2027' },
  ],
  sipi: [ 
    { owner: 'PT Samudra Sejahtera', person: 'Andi Rizky', npwp: '01.234.567.8-901.000', izin: 'SIPI-2024-00456', rev: '01', mulai: '08 Mar 2024', akhir: '08 Mar 2026' },
    { owner: 'CV Mina Bahari', person: 'Dewi Lestari', npwp: '01.201.998.7-902.011', izin: 'SIKPI-2024-00312', rev: '02', mulai: '12 Apr 2024', akhir: '12 Apr 2027' },
    { owner: 'CV Anamora', person: 'Yongky', npwp: '01.234.441.7-908.099', izin: 'SIKPI-2024-00777', rev: '03', mulai: '8 Apr 2024', akhir: '8 Juni 2026' },
  ],
}

const layananMenu = [
  { label: 'Permohonan', children: [
    { label: 'Izin Usaha', children: ['Daftar Pendok SIUP', 'Daftar Permohonan', 'Daftar Verifikasi'] },
    { label: 'Izin Kapal', children: ['Daftar Pendok SIPI/SIKPI', 'Daftar Verifikasi'] },
    { label: 'Izin Rumpon', children: ['Distribusi Dokumen', 'Approval SIPR', 'Daftar Permohonan', 'Daftar Verifikasi'] },
  ] },
  { label: 'Pungutan', children: [
    { label: 'SPP–PPP', children: ['Daftar Permohonan', 'Daftar SPP–PPP'] },
    { label: 'SPP–PHP', children: ['Daftar Permohonan', 'Daftar SPP–PHP'] },
    { label: 'SPP–PPKA', children: ['Daftar Permohonan', 'Daftar SPP–PPKA'] },
    { label: 'Pungutan Rumpon', children: ['Daftar SPP Rumpon', 'Daftar Permohonan'] },
    { label: 'Simulasi Pungutan', children: ['Simulasi PPP', 'Simulasi PHP', 'Simulasi PPKA'] },
  ] },
  { label: 'Perizinan & Dokumen', children: [
    { label: 'Pencetakan', children: [
      { label: 'Izin Usaha', children: ['Distribusi Pencetakan', 'Daftar Permohonan', 'Daftar Izin Usaha'] },
      { label: 'Izin Kapal', children: ['Distribusi Pencetakan', 'Daftar Permohonan', 'Daftar Izin Kapal'] },
      { label: 'Izin Rumpon', children: ['Daftar Pemilik', 'Daftar Permohonan'] },
    ] },
    { label: 'Pembekuan', children: ['Pembekuan Izin Usaha', 'Pembekuan Izin Kapal', 'Daftar Pembekuan'] },
    { label: 'Pencabutan', children: ['Pencabutan Izin Usaha', 'Pencabutan Izin Kapal', 'Daftar Pencabutan Izin'] },
  ] },
  { label: 'Data & Pusat', children: ['Daftar Izin Pusat', 'SIUP dan Kapal', 'Kemenhub Kapal'] },
]

const approvalMenu = ['Approval SPP–PPP/SIPR', 'Approval SPP–PHP/PPKA', 'Approval Izin SIUP/SIPR', 'Approval Izin SIPI/SIKPI', 'Approval Pencetakan']

const menuPath = (label) => label.includes('SIUP') ? '/dashboard/permohonan/izin-usaha/daftar-pendek-siup' : label.includes('SIPI/SIKPI') ? '/dashboard/permohonan/izin-kapal/daftar-pendek-sipi-sikpi' : '/beranda'

function MenuTree({ items, level = 0 }) {
  return items.map((item) => {
    const menuItem = typeof item === 'string' ? { label: item } : item
    if (menuItem.children) {
      return <div className={`menu-tree-group menu-tree-level-${level}`} key={menuItem.label}><p>{menuItem.label}</p><div className="menu-tree-children"><MenuTree items={menuItem.children} level={level + 1} /></div></div>
    }
    return <a className={`menu-tree-link menu-tree-level-${level}`} href={menuPath(menuItem.label)} key={`${menuItem.label}-${level}`}><span aria-hidden="true">›</span>{menuItem.label}</a>
  })
}

const documentDetails = { //Dummy filter options for demonstration purposes
  kkp: {
    title: 'Dokumen KKP',
    number: 'SIUP-2024-00128',
    issuer: 'Kementerian Kelautan dan Perikanan',
    type: 'Surat Izin Usaha Perikanan',
    filename: 'dokumen-kkp-siup-2024-00128.txt',
  },
  oss: {
    title: 'Dokumen OSS',
    number: 'SIUP-2024-00128',
    issuer: 'Online Single Submission',
    type: 'Nomor Induk Berusaha dan perizinan usaha',
    filename: 'dokumen-oss-siup-2024-00128.txt',
  },
}

function Beranda({ onLogout }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('siup')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'owner', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDocument, setSelectedDocument] = useState(null)
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

  const rows = izinData[activeTab]
  const filteredRows = rows.filter((row) => Object.values(row).join(' ').toLowerCase().includes(searchQuery.toLowerCase().trim()))
  const sortedRows = [...filteredRows].sort((firstRow, secondRow) => {
    const firstValue = String(firstRow[sortConfig.key]).toLowerCase()
    const secondValue = String(secondRow[sortConfig.key]).toLowerCase()
    const comparison = firstValue.localeCompare(secondValue, 'id', { numeric: true })
    return sortConfig.direction === 'asc' ? comparison : -comparison
  })
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = sortedRows.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1
  const endIndex = Math.min(safeCurrentPage * pageSize, sortedRows.length)
  const currentRows = sortedRows.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const renderSortIndicator = (key) => sortConfig.key === key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'

  const downloadDocument = () => {
    const detail = documentDetails[selectedDocument]
    const file = new Blob([`${detail.title}\nJenis: ${detail.type}\nNomor izin: ${detail.number}\nPenerbit: ${detail.issuer}`], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = detail.filename
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="beranda-page">
      <header ref={headerRef} className="topbar">
        <div className="topbar-inner">
          <a className="brand-row" href="/" aria-label="Kembali ke login SILAT">
            <img className="brand-logo" src="/SILAT NOBG.png" alt="Logo" />
          </a>

          <nav className="main-nav" aria-label="Menu utama">
            <a className="nav-direct active" href="/beranda">Beranda</a>
            <a className="nav-direct" href="/dashboard">Dashboard</a>
            {[['layanan', layananMenu], ['approval', approvalMenu]].map(([menuName, items]) => (
              <div className="nav-dropdown" key={menuName}>
                <button
                  className={`nav-direct nav-toggle ${openMenu === menuName ? 'open' : ''}`}
                  type="button"
                  aria-expanded={openMenu === menuName}
                  onClick={() => {
                    setOpenMenu((current) => current === menuName ? null : menuName)
                    setIsProfileOpen(false)
                  }}
                >
                  <span>{menuName === 'layanan' ? 'Layanan' : 'Approval'}</span>
                  <span className="dropdown-caret" aria-hidden="true">▾</span>
                </button>
                {openMenu === menuName && (
                  <div className={`approval-menu ${menuName === 'layanan' ? 'approval-menu-wide' : ''}`} role="menu"><MenuTree items={items} /></div>
                )}
              </div>
            ))}
            <a className="nav-direct" href="/beranda">Pelaporan</a>
          </nav>

          <div className="header-tools">
            <div className="profile-wrap">
              <button className="profile-toggle" type="button" aria-expanded={isProfileOpen} onClick={() => { setIsProfileOpen((value) => !value); setOpenMenu(null) }}>
                <span className="profile-meta">
                  <span className="profile-name">Andi Rizky</span>
                </span>
                <span className="dropdown-caret" aria-hidden="true">▾</span>
              </button>
              {isProfileOpen && (
                <div className="profile-menu" role="menu">
                  <a href="/beranda" className="profile-menu-item"><span className="menu-item-icon" aria-hidden="true">⚙</span><span>Pengaturan Akun</span></a>
                  <button type="button" className="logout-link profile-menu-item" onClick={onLogout}><span className="menu-item-icon" aria-hidden="true">↪</span><span>Logout</span></button>
                </div>
              )}
            </div>
            <button className="mobile-menu-toggle" type="button" aria-label="Buka menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((value) => !value)}>
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <a href="/beranda">Beranda</a>
          <a href="/dashboard">Dashboard</a>
          <div className="mobile-menu-section"><strong>Layanan</strong><MenuTree items={layananMenu} /></div>
          <div className="mobile-menu-section"><strong>Approval</strong><MenuTree items={approvalMenu} /></div>
          <a href="/beranda">Pelaporan</a>
        </div>
      </header>

      <main className="beranda-main">
        <section className="section-wrap" aria-labelledby="izin-aktif-title">
          <div className="section-head">
            <div>
              <h2 id="izin-aktif-title">Preview Izin Aktif</h2>
              <p>Lihat ringkasan izin usaha yang masih aktif.</p>
            </div>
            <div className="search-actions">
              <label className="search-box" aria-label="Cari izin aktif">
                <span aria-hidden="true">⌕</span>
                <input type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1) }} placeholder="Cari izin aktif..." />
              </label>
              <button className="search-button" type="button">Cari</button>
            </div>
          </div>

          <div className="tab-row" role="tablist" aria-label="Pilihan jenis izin">
            <button className={`izin-tab ${activeTab === 'siup' ? 'active' : ''}`} type="button" role="tab" aria-selected={activeTab === 'siup'} onClick={() => handleTabChange('siup')}>SIUP AKTIF</button>
            <button className={`izin-tab ${activeTab === 'sipi' ? 'active' : ''}`} type="button" role="tab" aria-selected={activeTab === 'sipi'} onClick={() => handleTabChange('sipi')}>SIPI/SIKPI AKTIF</button>
          </div>

          <div className="izin-panel" role="tabpanel">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {['owner', 'person', 'npwp', 'izin', 'rev', 'mulai', 'akhir'].map((key, index) => (
                      <th key={key}><button type="button" className="sort-button" onClick={() => handleSort(key)}>{['Nama Pemilik', 'Penanggung Jwb', 'NPWP', 'No. Izin Usaha', 'Rev', 'Mulai Berlaku', 'Akhir Berlaku'][index]} {renderSortIndicator(key)}</button></th>
                    ))}
                    <th>Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row) => (
                    <tr key={`${activeTab}-${row.izin}`}>
                      <td className="cell-bold">{row.owner}</td><td>{row.person}</td><td>{row.npwp}</td><td className="cell-bold">{row.izin}</td><td>{row.rev}</td><td>{row.mulai}</td><td>{row.akhir}</td>
                      <td><div className="preview-actions"><button type="button" className="document-button primary" onClick={() => setSelectedDocument('kkp')}>KKP</button><button type="button" className="document-button accent" onClick={() => setSelectedDocument('oss')}>OSS</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sortedRows.length === 0 && <p className="no-results">Data izin tidak ditemukan.</p>}
            <div className="table-pagination">
              <span className="table-summary">Menampilkan {startIndex} sampai {endIndex} dari {sortedRows.length} data</span>
              <div className="pagination-controls">
                <button type="button" className="pagination-btn" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>&lt; Sebelumnya</button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} className={`pagination-number ${page === safeCurrentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>)}
                <button type="button" className="pagination-btn" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>Selanjutnya &gt;</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand-block"><p className="footer-copy">© 2026 SILAT · Direktorat Jenderal Prikanan Tangkap</p><p className="footer-note-text">Lokasi Kantor</p></div>
          <div className="footer-contact-block"><h2>Hubungi Kami</h2><div className="footer-contact-list"><p><span>Email:</span> perizinan@kkp.go.id</p><p><span>Telepon:</span> +62-822-9999-4920 (Chat Only)</p><p><span>Alamat:</span> Gedung Mina Bahari II Lantai 8 - Direktorat Usaha Penangkapan Ikan - DJPT - KKP</p></div></div>
          <iframe className="map-frame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.63727467038!2d106.8334714!3d-6.1792829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f433a55e7e2d%3A0x858fa82e74cdebd!2sGMB%20II%20Kementerian%20Kelautan%20dan%20Perikanan!5e0!3m2!1sid!2sid!4v1787541586639!5m2!1sid!2sid" title="Lokasi Kantor" loading="lazy" />
        </div>
      </footer>

      {selectedDocument && (
        <div className="document-modal" role="dialog" aria-modal="true" aria-labelledby="document-modal-title" onClick={(event) => { if (event.target === event.currentTarget) setSelectedDocument(null) }}>
          <div className="document-dialog">
            <div className="document-header"><div><p className="document-label">Preview Dokumen</p><h2 id="document-modal-title">{documentDetails[selectedDocument].title}</h2></div><button type="button" onClick={() => setSelectedDocument(null)} aria-label="Tutup preview">×</button></div>
            <div className="document-preview"><div className="document-preview-card"><p className="document-label">Dokumen resmi</p><h3>{documentDetails[selectedDocument].type}</h3><dl className="document-grid"><div><dt>Nomor izin</dt><dd>{documentDetails[selectedDocument].number}</dd></div><div><dt>Penerbit</dt><dd>{documentDetails[selectedDocument].issuer}</dd></div></dl></div></div>
            <div className="document-actions"><button type="button" className="secondary-button" onClick={() => setSelectedDocument(null)}>Tutup</button><button type="button" className="primary-button small" onClick={downloadDocument}>Download Dokumen</button></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Beranda
