import { useState, useMemo, useRef, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import {
  Ship,
  Search,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Building2,
  X,
  Lock
} from 'lucide-react'

const SAMPLE_VESSELS = [
  {
    id: 1,
    vesselName: 'KM. Sinar Laut 08',
    licenseNo: 'SIPI-01.26.11.00456',
    siupNo: 'SIUP-01.26.31.00192',
    companyName: 'PT Samudra Sejahtera Mandiri',
    companyAddress: 'Jl. Pelabuhan Benoa No. 12, Denpasar Selatan, Bali',
    revisionNo: 'REV-02',
    siupIssueDate: '2024-03-15',
    vesselStatus: 'Aktif / Berlaku',
    gearType: 'Pukat Cincin Pelagis Besar dengan Satu Kapal',
    signDate: '2025-01-15',
    licenseIssueDate: '2025-01-16',
    licenseValidDate: '2026-01-16',
  },
  {
    id: 2,
    vesselName: 'KM. Mina Bahari 01',
    licenseNo: 'SIKPI-01.26.22.00312',
    siupNo: 'SIUP-01.25.12.00084',
    companyName: 'CV Mina Bahari Utama',
    companyAddress: 'Jl. Dermaga Muara Baru No. 88, Penjaringan, Jakarta Utara',
    revisionNo: 'REV-00',
    siupIssueDate: '2023-08-20',
    vesselStatus: 'Aktif / Berlaku',
    gearType: 'Kapal Pengangkut Ikan antar Pelabuhan Pangkalan',
    signDate: '2025-02-02',
    licenseIssueDate: '2025-02-03',
    licenseValidDate: '2026-02-03',
  },
  {
    id: 3,
    vesselName: 'KM. Pasifik Jaya 09',
    licenseNo: 'SIPI-01.25.33.00789',
    siupNo: 'SIUP-01.26.51.00012',
    companyName: 'Koperasi Nelayan Pasifik Raya',
    companyAddress: 'Jl. Samudra Belawan No. 88, Medan, Sumatera Utara',
    revisionNo: 'REV-01',
    siupIssueDate: '2024-01-10',
    vesselStatus: 'Dalam Peringatan SP-2',
    gearType: 'Rawai Tuna',
    signDate: '2024-11-20',
    licenseIssueDate: '2024-11-21',
    licenseValidDate: '2025-11-21',
  },
  {
    id: 4,
    vesselName: 'KM. Berkah Laut 03',
    licenseNo: 'SIPI-01.26.44.00119',
    siupNo: 'SIUP-01.24.15.00045',
    companyName: 'KUB Nelayan Makmur',
    companyAddress: 'Jl. Dermaga Cilacap No. 18, Cilacap Selatan, Jawa Tengah',
    revisionNo: 'REV-00',
    siupIssueDate: '2024-05-12',
    vesselStatus: 'Aktif / Berlaku',
    gearType: 'Bagan Berperahu Teri',
    signDate: '2025-02-10',
    licenseIssueDate: '2025-02-11',
    licenseValidDate: '2026-02-11',
  },
  {
    id: 5,
    vesselName: 'KM. Artha Bahari 05',
    licenseNo: 'SIKPI-01.24.55.00210',
    siupNo: 'SIUP-01.25.72.00062',
    companyName: 'PT Lautan Artha Pasifik',
    companyAddress: 'Jl. Yos Sudarso No. 101, Semarang, Jawa Tengah',
    revisionNo: 'REV-01',
    siupIssueDate: '2023-09-30',
    vesselStatus: 'Dalam Peringatan SP-1',
    gearType: 'Kapal Pengangkut Ikan di Laut Lepas',
    signDate: '2024-12-14',
    licenseIssueDate: '2024-12-15',
    licenseValidDate: '2025-12-15',
  },
  {
    id: 6,
    vesselName: 'KM. Bintang Samudra 02',
    licenseNo: 'SIPI-01.25.66.00645',
    siupNo: 'SIUP-01.26.71.00027',
    companyName: 'Haji Bambang Setiawan',
    companyAddress: 'Jl. Raya Paotere No. 09, Makassar, Sulawesi Selatan',
    revisionNo: 'REV-00',
    siupIssueDate: '2025-01-22',
    vesselStatus: 'Aktif / Berlaku',
    gearType: 'Huhate Mekanis',
    signDate: '2024-10-18',
    licenseIssueDate: '2024-10-19',
    licenseValidDate: '2025-10-19',
  },
]

export default function IKPembekuan({ onLogout }) {
  // Form input states
  const [vesselName, setVesselName] = useState('')
  const [licenseNo, setLicenseNo] = useState('')
  const [siupNo, setSiupNo] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [revisionNo, setRevisionNo] = useState('')
  const [siupIssueDate, setSiupIssueDate] = useState('')
  const [vesselStatus, setVesselStatus] = useState('')
  const [gearType, setGearType] = useState('')
  const [signDate, setSignDate] = useState('')
  const [licenseIssueDate, setLicenseIssueDate] = useState('')
  const [licenseValidDate, setLicenseValidDate] = useState('')
  const [freezeDate, setFreezeDate] = useState(new Date().toISOString().split('T')[0])
  const [freezeReason, setFreezeReason] = useState('')

  // Search autocomplete states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)

  // Confirmation & toast states
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [toast, setToast] = useState(null)

  // Filter matching vessels based on search query
  const filteredVessels = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SAMPLE_VESSELS
    return SAMPLE_VESSELS.filter(
      (item) =>
        item.vesselName.toLowerCase().includes(q) ||
        item.licenseNo.toLowerCase().includes(q) ||
        item.companyName.toLowerCase().includes(q) ||
        item.siupNo.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Handle select vessel from search dropdown
  const handleSelectVessel = (item) => {
    setVesselName(item.vesselName)
    setSearchQuery(item.vesselName)
    setLicenseNo(item.licenseNo)
    setSiupNo(item.siupNo)
    setCompanyName(item.companyName)
    setCompanyAddress(item.companyAddress)
    setRevisionNo(item.revisionNo)
    setSiupIssueDate(item.siupIssueDate)
    setVesselStatus(item.vesselStatus)
    setGearType(item.gearType)
    setSignDate(item.signDate)
    setLicenseIssueDate(item.licenseIssueDate)
    setLicenseValidDate(item.licenseValidDate)
    setIsDropdownOpen(false)
  }

  // Handle outside click to close autocomplete
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!vesselName.trim() || !freezeDate || !freezeReason.trim()) {
      alert('Mohon lengkapi seluruh kolom bertanda bintang (*)')
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmFreeze = () => {
    setShowConfirmModal(false)
    setVesselStatus('Dibekukan')
    setToast({
      type: 'success',
      message: `Izin kapal ${vesselName} (${licenseNo || 'SIPI/SIKPI'}) milik ${companyName || 'Perusahaan'} berhasil DIBEKUKAN pada tanggal ${freezeDate}.`,
    })
  }

  const handleResetForm = () => {
    setVesselName('')
    setSearchQuery('')
    setLicenseNo('')
    setSiupNo('')
    setCompanyName('')
    setCompanyAddress('')
    setRevisionNo('')
    setSiupIssueDate('')
    setVesselStatus('')
    setGearType('')
    setSignDate('')
    setLicenseIssueDate('')
    setLicenseValidDate('')
    setFreezeDate(new Date().toISOString().split('T')[0])
    setFreezeReason('')
    setToast(null)
  }

  const breadcrumbs = [
    { label: 'Pembekuan & Pencabutan' },
    { label: 'Pembekuan Izin Kapal' },
  ]

  return (
    <Layout
      currentPath="/layanan/pembekuan/ik"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Pembekuan Izin Kapal"
    >
      {/* Toast Notification */}
      {toast && (
        <div className="mb-6 rounded-2xl bg-emerald-600 text-white p-4 shadow-lg text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Form Container - Full Width Symmetrical Grid */}
      <section className="w-full bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 md:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">
                Formulir Pembekuan Izin Kapal (SIPI / SIKPI)
              </h2>
              <p className="text-xs text-[var(--color-muted)]">
                Cari nama kapal atau nomor izin kapal untuk mengisi seluruh data perizinan secara otomatis.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            Reset Form
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Nama Kapal (Left) & Nomor Izin Kapal (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Nama Kapal (Input text with search & autocomplete) */}
            <div className="relative" ref={searchRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Kapal <span className="text-slate-400 font-normal">(Ketik untuk mencari & auto-fill)</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setVesselName(e.target.value)
                    setIsDropdownOpen(true)
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Ketik nama kapal atau nomor SIPI/SIKPI..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Autocomplete Dropdown List */}
              {isDropdownOpen && filteredVessels.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-[rgba(31,78,120,0.15)] shadow-xl z-30 max-h-64 overflow-y-auto divide-y divide-slate-100">
                  <div className="p-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Pilih Kapal dari Database ({filteredVessels.length} ditemukan)
                  </div>
                  {filteredVessels.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => handleSelectVessel(v)}
                      className="p-3 hover:bg-blue-50/70 cursor-pointer transition flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800">{v.vesselName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {v.licenseNo} · {v.companyName}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-700 border-slate-200">
                        {v.vesselStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Nomor Izin Kapal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor Izin Kapal
              </label>
              <input
                type="text"
                value={licenseNo}
                onChange={(e) => setLicenseNo(e.target.value)}
                placeholder="Contoh: SIPI-01.26.11.00456"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-bold text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 2: Nomor Izin Usaha (Left) & Nama Perusahaan (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 3. Nomor Izin Usaha */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor Izin Usaha
              </label>
              <input
                type="text"
                value={siupNo}
                onChange={(e) => setSiupNo(e.target.value)}
                placeholder="Contoh: SIUP-01.26.31.00192"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 4. Nama Perusahaan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Perusahaan
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nama pemilik / perusahaan berbadan hukum..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 3: Alamat Perusahaan (Left) & Nomor Revisi SIUP (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 5. Alamat Perusahaan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Perusahaan
              </label>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Masukkan alamat domisili perusahaan..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 6. Nomor Revisi SIUP */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor Revisi SIUP
              </label>
              <input
                type="text"
                value={revisionNo}
                onChange={(e) => setRevisionNo(e.target.value)}
                placeholder="Contoh: REV-02 / REV-00"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 4: Tanggal Terbit SIUP (Left) & Status Izin Kapal (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 7. Tanggal Terbit SIUP */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Terbit SIUP
              </label>
              <input
                type="date"
                value={siupIssueDate}
                onChange={(e) => setSiupIssueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 8. Status Izin Kapal (Auto Generate Text) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Status Izin Kapal <span className="text-slate-400 font-normal">(Auto Generate)</span>
              </label>
              <input
                type="text"
                value={vesselStatus}
                onChange={(e) => setVesselStatus(e.target.value)}
                placeholder="Status izin kapal akan terisi otomatis..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 5: Alat Tangkap (Left) & Tanggal Tanda Tangan (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 9. Alat Tangkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alat Tangkap
              </label>
              <input
                type="text"
                value={gearType}
                onChange={(e) => setGearType(e.target.value)}
                placeholder="Jenis alat penangkapan / pengangkutan ikan..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 10. Tanggal Tanda Tangan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Tanda Tangan
              </label>
              <input
                type="date"
                value={signDate}
                onChange={(e) => setSignDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 6: Tanggal Terbit Izin Kapal (Left) & Tanggal Berlaku Izin Kapal (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 11. Tanggal Terbit Izin Kapal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Terbit Izin Kapal
              </label>
              <input
                type="date"
                value={licenseIssueDate}
                onChange={(e) => setLicenseIssueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 12. Tanggal Berlaku Izin Kapal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Berlaku Izin Kapal
              </label>
              <input
                type="date"
                value={licenseValidDate}
                onChange={(e) => setLicenseValidDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 7: Tanggal Pembekuan * (Left) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 13. Tanggal Pembekuan * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Pembekuan <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="date"
                value={freezeDate}
                onChange={(e) => setFreezeDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 8: Keterangan Pembekuan * (Full Width Textarea) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Keterangan Pembekuan <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows="4"
              value={freezeReason}
              onChange={(e) => setFreezeReason(e.target.value)}
              placeholder="Masukkan dasar penetapan pembekuan izin kapal, nomor surat peringatan (SP-1 / SP-2 / SP-3), atau pelanggaran daerah penangkapan ikan/operasional..."
              className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Row 9: Button Aksi di Pojok Kanan Bawah */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Beku Kapal</span>
            </button>
          </div>
        </form>
      </section>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-amber-600 border-b pb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--color-text)]">
                  Konfirmasi Pembekuan Izin Kapal
                </h3>
                <p className="text-xs text-[var(--color-muted)]">Tindakan ini memerlukan verifikasi</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 p-4 bg-amber-50/60 border border-amber-200/50 rounded-xl">
              <p>
                Anda akan melakukan pembekuan sementara terhadap izin kapal berikut:
              </p>
              <div className="font-semibold text-slate-800 space-y-1">
                <p>• Nama Kapal: <span className="font-bold">{vesselName || '-'}</span></p>
                <p>• Nomor Izin: <span className="font-mono text-amber-800">{licenseNo || '-'}</span></p>
                <p>• Perusahaan: <span>{companyName || '-'}</span></p>
                <p>• Tgl. Pembekuan: <span>{freezeDate}</span></p>
              </div>
              <p className="text-[11px] text-amber-800 italic pt-1">
                Keterangan: "{freezeReason}"
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmFreeze}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Ya, Bekukan Izin Kapal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
