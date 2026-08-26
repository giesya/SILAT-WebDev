import { useEffect, useRef, useState } from 'react'

const applications = [ //Dummy data for demonstration purposes
  { name: 'Budi Santoso', status: 'Baru', verifier: 'Dimas', date: '2024-01-12', displayDate: '12 Jan 2024' },
  { name: 'PT Bahari Jaya', status: 'Penggantian', verifier: 'Sara', date: '2024-02-05', displayDate: '05 Feb 2024' },
  { name: 'Siti Aminah', status: 'Perpanjangan', verifier: 'Tiara', date: '2024-03-18', displayDate: '18 Mar 2024' },
  { name: 'CV Samudra Makmur', status: 'Perubahan', verifier: 'Windi', date: '2024-04-22', displayDate: '22 Apr 2024' },
]

const filters = [ //Dummy filter options for demonstration purposes
  { id: 'status', label: 'Status Permohonan', options: ['', 'Baru', 'Penggantian', 'Pengurangan', 'Perluasan', 'Perpanjangan', 'Perubahan', 'Update PIT'] },
  { id: 'verifier', label: 'Verifikator', options: ['', 'Dimas', 'Sara', 'Tiara', 'Windi'] },
]

const layananMenu = [
  { label: 'Permohonan', children: [{ label: 'Izin Usaha', children: ['Daftar Pendek SIUP', 'Daftar Permohonan', 'Daftar Verifikasi'] }, { label: 'Izin Kapal', children: ['Daftar Pendek SIPI/SIKPI', 'Daftar Verifikasi'] }, { label: 'Izin Rumpon', children: ['Distribusi Dokumen', 'Approval SIPR', 'Daftar Permohonan', 'Daftar Verifikasi'] }] },
  { label: 'Pungutan', children: [{ label: 'SPP–PPP', children: ['Daftar Permohonan', 'Daftar SPP–PPP'] }, { label: 'SPP–PHP', children: ['Daftar Permohonan', 'Daftar SPP–PHP'] }, { label: 'SPP–PPKA', children: ['Daftar Permohonan', 'Daftar SPP–PPKA'] }, { label: 'Pungutan Rumpon', children: ['Daftar SPP Rumpon', 'Daftar Permohonan'] }, { label: 'Simulasi Pungutan', children: ['Simulasi PPP', 'Simulasi PHP', 'Simulasi PPKA'] }] },
  { label: 'Perizinan & Dokumen', children: [{ label: 'Pencetakan', children: [{ label: 'Izin Usaha', children: ['Distribusi Pencetakan', 'Daftar Permohonan', 'Daftar Izin Usaha'] }, { label: 'Izin Kapal', children: ['Distribusi Pencetakan', 'Daftar Permohonan', 'Daftar Izin Kapal'] }] }, { label: 'Pembekuan', children: ['Pembekuan Izin Usaha', 'Pembekuan Izin Kapal', 'Daftar Pembekuan'] }, { label: 'Pencabutan', children: ['Pencabutan Izin Usaha', 'Pencabutan Izin Kapal', 'Daftar Pencabutan Izin'] }] },
  { label: 'Data & Pusat', children: ['Daftar Izin Pusat', 'SIUP dan Kapal', 'Kemenhub Kapal'] },
]

const menuPath = (label) => label.includes('SIUP') ? '/dashboard/permohonan/izin-usaha/daftar-pendok-siup' : label.includes('SIPI/SIKPI') ? '/dashboard/permohonan/izin-kapal/daftar-pendek-sipi-sikpi' : '/dashboard'

function MenuTree({ items, level = 0 }) {
  return items.map((item) => {
    const menuItem = typeof item === 'string' ? { label: item } : item
    if (menuItem.children) return <div className={`menu-tree-group menu-tree-level-${level}`} key={menuItem.label}><p>{menuItem.label}</p><div className="menu-tree-children"><MenuTree items={menuItem.children} level={level + 1} /></div></div>
    return <a className={`menu-tree-link menu-tree-level-${level}`} href={menuPath(menuItem.label)} key={`${menuItem.label}-${level}`}><span aria-hidden="true">›</span>{menuItem.label}</a>
  })
}

function IUDaftarPendokSIUP({ onLogout }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('baru')
  const [formValues, setFormValues] = useState({ applicant: '', status: '', verifier: '', start: '', end: '' })
  const [results, setResults] = useState(applications)
  const headerRef = useRef(null)

  useEffect(() => {
    const closeMenus = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setOpenMenu(null)
        setIsProfileOpen(false)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', closeMenus)
    return () => document.removeEventListener('mousedown', closeMenus)
  }, [])

  const updateField = (field, value) => setFormValues((current) => ({ ...current, [field]: value }))

  const handleSearch = (event) => {
    event.preventDefault()
    const { applicant, status, verifier, start, end } = formValues
    setResults(applications.filter((application) => (
      application.name.toLowerCase().includes(applicant.toLowerCase().trim()) &&
      (!status || application.status === status) &&
      (!verifier || application.verifier === verifier) &&
      (!start || application.date >= start) &&
      (!end || application.date <= end)
    )))
    document.getElementById('hasil-pencarian')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const resetSearch = () => {
    setFormValues({ applicant: '', status: '', verifier: '', start: '', end: '' })
    setResults(applications)
  }

  return (
    <div className="beranda-page">
      <header ref={headerRef} className="topbar">
        <div className="topbar-inner">
          <a className="brand-row" href="/" aria-label="Kembali ke login SILAT"><img className="brand-logo" src="/SILAT NOBG.png" alt="Logo SILAT" /></a>
          <nav className="main-nav" aria-label="Menu utama">
            <a className="nav-direct" href="/beranda">Beranda</a>
            <a className="nav-direct" href="/dashboard">Dashboard</a>
            <div className="nav-dropdown">
              <button className={`nav-direct nav-toggle ${openMenu === 'layanan' ? 'open' : ''}`} type="button" aria-expanded={openMenu === 'layanan'} onClick={() => { setOpenMenu((current) => current === 'layanan' ? null : 'layanan'); setIsProfileOpen(false) }}>
                <span>Layanan</span><span className="dropdown-caret" aria-hidden="true">▾</span>
              </button>
              {openMenu === 'layanan' && <div className="approval-menu approval-menu-wide" role="menu"><MenuTree items={layananMenu} /></div>}
            </div>
            <a className="nav-direct" href="/dashboard">Approval</a>
            <a className="nav-direct" href="/beranda">Pelaporan</a>
          </nav>
          <div className="header-tools">
            <div className="profile-wrap">
              <button className="profile-toggle" type="button" aria-expanded={isProfileOpen} onClick={() => setIsProfileOpen((value) => !value)}><span className="profile-meta"><span className="profile-name">Andi Rizky</span></span><span className="dropdown-caret" aria-hidden="true">▾</span></button>
              {isProfileOpen && <div className="profile-menu" role="menu"><a href="/beranda" className="profile-menu-item"><span className="menu-item-icon" aria-hidden="true">⚙</span><span>Pengaturan Akun</span></a><button type="button" className="logout-link profile-menu-item" onClick={onLogout}><span className="menu-item-icon" aria-hidden="true">↪</span><span>Logout</span></button></div>}
            </div>
            <button className="mobile-menu-toggle" type="button" aria-label="Buka menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((value) => !value)}><span aria-hidden="true">☰</span></button>
          </div>
        </div>
        <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'}`}><a href="/dashboard">Dashboard</a><a href="/beranda">Beranda</a><div className="mobile-menu-section"><strong>Layanan</strong><MenuTree items={layananMenu} /></div><a href="/dashboard/permohonan/izin-usaha/daftar-pendok-siup">Daftar Pendek SIUP</a></div>
      </header>

      <main className="beranda-main">
        <div className="dashboard-heading"><p className="eyebrow">Permohonan · Izin Usaha</p><h1>Daftar Pendok SIUP</h1><p>Cari dan pantau daftar permohonan Surat Izin Usaha Perikanan berdasarkan kriteria yang Anda pilih.</p></div>
        <section className="dashboard-panel search-panel" aria-labelledby="search-title">
          <div className="dashboard-panel-header"><div><h2 id="search-title">Pencarian Permohonan</h2><div className="tab-row" role="tablist"><button className={`izin-tab ${activeTab === 'baru' ? 'active' : ''}`} type="button" role="tab" aria-selected={activeTab === 'baru'} onClick={() => setActiveTab('baru')}>Baru</button><button className={`izin-tab ${activeTab === 'daftar' ? 'active' : ''}`} type="button" role="tab" aria-selected={activeTab === 'daftar'} onClick={() => setActiveTab('daftar')}>Daftar</button></div></div></div>
          <form className="application-search-form" onSubmit={handleSearch}>
            <div className="field"><label htmlFor="applicant">Nama Pemohon</label><input id="applicant" className="field-input" value={formValues.applicant} onChange={(event) => updateField('applicant', event.target.value)} placeholder="Masukkan nama pemohon" /></div>
            <div className="field"><label htmlFor="application-type">Jenis Permohonan</label><select id="application-type" className="field-input"><option>SIUP</option></select></div>
            {filters.map(({ id, label, options }) => <div className="field" key={id}><label htmlFor={id}>{label}</label><select id={id} className="field-input" value={formValues[id]} onChange={(event) => updateField(id, event.target.value)}><option value="">Semua {label.toLowerCase()}</option>{options.slice(1).map((option) => <option value={option} key={option}>{option}</option>)}</select></div>)}
            <div className="field"><label htmlFor="date-start">Tanggal Permohonan</label><div className="date-range"><input id="date-start" className="field-input" type="date" value={formValues.start} onChange={(event) => updateField('start', event.target.value)} /><span>s/d</span><input id="date-end" className="field-input" type="date" value={formValues.end} onChange={(event) => updateField('end', event.target.value)} /></div></div>
            <div className="form-actions"><button className="primary-button" type="submit">Cari</button><button className="secondary-button" type="button" onClick={resetSearch}>Hapus</button></div>
          </form>
        </section>

        <section id="hasil-pencarian" className="dashboard-panel results-panel" aria-labelledby="result-title"><div className="dashboard-panel-header"><div><h2 id="result-title">Hasil Pencarian</h2><p>Menampilkan {results.length} data permohonan</p></div><span className="application-badge">Data {activeTab === 'baru' ? 'Baru' : 'Daftar'}</span></div><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>Nama Pemohon</th><th>Jenis Permohonan</th><th>Status Permohonan</th><th>Verifikator</th><th>Tanggal Permohonan</th><th>Aksi</th></tr></thead><tbody>{results.map((application) => <tr key={application.name}><td>{application.name}</td><td>SIUP</td><td><span className="application-badge">{application.status}</span></td><td>{application.verifier}</td><td>{application.displayDate}</td><td><button className="document-button primary" type="button">Lihat</button></td></tr>)}</tbody></table></div>{results.length === 0 && <p className="no-results">Data permohonan tidak ditemukan.</p>}</section>
      </main>
    </div>
  )
}

export default IUDaftarPendokSIUP
