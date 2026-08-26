import { useEffect, useRef, useState } from 'react'

const applications = [
  { name: 'Budi Santoso', status: 'Baru', verifier: 'Dimas', date: '2024-01-12', displayDate: '12 Jan 2024' },
  { name: 'PT Bahari Jaya', status: 'Penggantian', verifier: 'Sara', date: '2024-02-05', displayDate: '05 Feb 2024' },
  { name: 'Siti Aminah', status: 'Perpanjangan', verifier: 'Tiara', date: '2024-03-18', displayDate: '18 Mar 2024' },
  { name: 'CV Samudra Makmur', status: 'Perubahan', verifier: 'Windi', date: '2024-04-22', displayDate: '22 Apr 2024' },
]

const rejectedApplications = [
  { name: 'Siti Aminah', status: 'Perubahan', verifier: 'Tiara', date: '2024-03-18', displayDate: '18 Mar 2024' },
  { name: 'CV Samudra Makmur', status: 'Perluasan', verifier: 'Windi', date: '2024-04-22', displayDate: '22 Apr 2024' },
]

const menu = ['Daftar Pendok SIUP', 'Daftar Permohonan', 'Daftar Verifikasi']

function IUHeader({ onLogout, activePath }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)
  useEffect(() => {
    const close = (event) => { if (!headerRef.current?.contains(event.target)) { setIsProfileOpen(false); setIsMobileMenuOpen(false) } }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  return <header ref={headerRef} className="topbar"><div className="topbar-inner"><a className="brand-row" href="/" aria-label="Kembali ke login SILAT"><img className="brand-logo" src="/SILAT NOBG.png" alt="Logo SILAT" /></a><nav className="main-nav" aria-label="Menu utama"><a className="nav-direct" href="/beranda">Beranda</a><a className="nav-direct" href="/dashboard">Dashboard</a><a className={`nav-direct ${activePath ? 'active' : ''}`} href="/dashboard/permohonan/izin-usaha/daftar-permohonan">Layanan</a><a className="nav-direct" href="/dashboard">Approval</a><a className="nav-direct" href="/beranda">Pelaporan</a></nav><div className="header-tools"><div className="profile-wrap"><button className="profile-toggle" type="button" aria-expanded={isProfileOpen} onClick={() => setIsProfileOpen((value) => !value)}><span className="profile-meta"><span className="profile-name">Andi Rizky</span></span><span className="dropdown-caret">▾</span></button>{isProfileOpen && <div className="profile-menu"><a href="/beranda" className="profile-menu-item"><span className="menu-item-icon">⚙</span>Pengaturan Akun</a><button type="button" className="logout-link profile-menu-item" onClick={onLogout}><span className="menu-item-icon">↪</span>Logout</button></div>}</div><button className="mobile-menu-toggle" type="button" aria-label="Buka menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((value) => !value)}>☰</button></div></div><div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'}`}><a href="/dashboard">Dashboard</a><a href="/beranda">Beranda</a>{menu.map((item) => <a href="/dashboard/permohonan/izin-usaha/daftar-permohonan" key={item}>{item}</a>)}</div></header>
}

function IUFilterPage({ onLogout, verificationMode = false }) {
  const [query, setQuery] = useState({ applicant: '', status: '', verifier: '', start: '', end: '' })
  const [activeResult, setActiveResult] = useState('permohonan')
  const sourceApplications = verificationMode && activeResult === 'penolakan' ? rejectedApplications : applications
  const [results, setResults] = useState(sourceApplications)
  const update = (field, value) => setQuery((current) => ({ ...current, [field]: value }))
  const search = (event) => { event.preventDefault(); setResults(sourceApplications.filter((item) => item.name.toLowerCase().includes(query.applicant.toLowerCase().trim()) && (!query.status || item.status === query.status) && (!query.verifier || item.verifier === query.verifier) && (!query.start || item.date >= query.start) && (!query.end || item.date <= query.end))) }
  const reset = () => { setQuery({ applicant: '', status: '', verifier: '', start: '', end: '' }); setResults(sourceApplications) }
  const changeResult = (result) => { setActiveResult(result); setResults(result === 'penolakan' ? rejectedApplications : applications) }
  return <div className="beranda-page"><IUHeader onLogout={onLogout} activePath /><main className="beranda-main"><div className="dashboard-heading"><p className="eyebrow">Permohonan · Izin Usaha</p><h1>{verificationMode ? 'Daftar Verifikasi' : 'Daftar Permohonan'}</h1><p>Cari dan pantau daftar permohonan Surat Izin Usaha Perikanan berdasarkan kriteria yang Anda pilih.</p></div><section className="dashboard-panel search-panel"><div className="dashboard-panel-header"><h2>{verificationMode ? 'Pencarian Verifikasi' : 'Pencarian Permohonan'}</h2></div><form className="application-search-form" onSubmit={search}><div className="field"><label htmlFor="applicant">Nama Pemohon</label><input id="applicant" className="field-input" value={query.applicant} onChange={(event) => update('applicant', event.target.value)} placeholder="Masukkan nama pemohon" /></div><div className="field"><label htmlFor="status">Status Permohonan</label><select id="status" className="field-input" value={query.status} onChange={(event) => update('status', event.target.value)}><option value="">Semua status</option>{['Baru', 'Penggantian', 'Pengurangan', 'Perluasan', 'Perpanjangan', 'Perubahan', 'Update PIT'].map((item) => <option key={item}>{item}</option>)}</select></div><div className="field"><label htmlFor="verifier">Verifikator</label><select id="verifier" className="field-input" value={query.verifier} onChange={(event) => update('verifier', event.target.value)}><option value="">Semua verifikator</option>{['Dimas', 'Sara', 'Tiara', 'Windi'].map((item) => <option key={item}>{item}</option>)}</select></div><div className="field"><label htmlFor="date-start">Tanggal Permohonan</label><div className="date-range"><input id="date-start" className="field-input" type="date" value={query.start} onChange={(event) => update('start', event.target.value)} /><span>s/d</span><input className="field-input" type="date" value={query.end} onChange={(event) => update('end', event.target.value)} /></div></div><div className="form-actions"><button className="primary-button" type="submit">Cari</button><button className="secondary-button" type="button" onClick={reset}>Hapus</button></div></form></section><section className="dashboard-panel results-panel"><div className="dashboard-panel-header"><div><h2>Hasil Pencarian</h2><p>Menampilkan {results.length} data {verificationMode && activeResult === 'penolakan' ? 'penolakan' : 'permohonan'}</p></div>{verificationMode && <div className="tab-row"><button className={`izin-tab ${activeResult === 'permohonan' ? 'active' : ''}`} type="button" onClick={() => changeResult('permohonan')}>Daftar Permohonan</button><button className={`izin-tab ${activeResult === 'penolakan' ? 'active' : ''}`} type="button" onClick={() => changeResult('penolakan')}>Daftar Penolakan</button></div>}</div><div className="table-wrap"><table className="dashboard-table"><thead><tr>{['Nama Pemohon', 'Jenis Permohonan', 'Status Permohonan', 'Verifikator', 'Tanggal Permohonan', 'Aksi'].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{results.map((item) => <tr key={item.name}><td>{item.name}</td><td>SIUP</td><td><span className="application-badge">{item.status}</span></td><td>{item.verifier}</td><td>{item.displayDate}</td><td><button className="document-button primary" type="button">Lihat</button></td></tr>)}</tbody></table></div>{results.length === 0 && <p className="no-results">Data permohonan tidak ditemukan.</p>}</section></main></div>
}

export default IUFilterPage
