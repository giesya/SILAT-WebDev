import { useState, useMemo, useRef, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import {
  Building2,
  Search,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  HelpCircle,
  X,
  Lock,
  ArrowRight
} from 'lucide-react'

const SAMPLE_COMPANIES_SIUP = [
  {
    id: 1,
    companyName: 'PT Samudera Bahari Nusantara',
    siupNo: 'SIUP-01.26.31.00192',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Muara Baru Raya No. 45, Penjaringan, Jakarta Utara, DKI Jakarta',
    revisionNo: 'REV-02',
    siupDate: '2024-03-15',
  },
  {
    id: 2,
    companyName: 'CV Mina Makmur Abadi',
    siupNo: 'SIUP-01.25.12.00084',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Pelabuhan Benoa No. 12, Denpasar Selatan, Bali',
    revisionNo: 'REV-00',
    siupDate: '2023-08-20',
  },
  {
    id: 3,
    companyName: 'Koperasi Nelayan Sejahtera Mandiri',
    siupNo: 'SIUP-01.26.51.00012',
    siupStatus: 'Dalam Peringatan SP-2',
    companyAddress: 'Jl. Samudra Belawan No. 88, Belawan, Medan, Sumatera Utara',
    revisionNo: 'REV-01',
    siupDate: '2024-01-10',
  },
  {
    id: 4,
    companyName: 'PT Pasifik Fishery Utama',
    siupNo: 'SIUP-01.24.32.00119',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Samratulangi No. 72, Bitung Barat, Kota Bitung, Sulawesi Utara',
    revisionNo: 'REV-03',
    siupDate: '2022-11-05',
  },
  {
    id: 5,
    companyName: 'KUB Bahari Utama',
    siupNo: 'SIUP-01.24.15.00045',
    siupStatus: 'Dalam Peringatan SP-1',
    companyAddress: 'Jl. Dermaga Cilacap No. 18, Cilacap Selatan, Jawa Tengah',
    revisionNo: 'REV-00',
    siupDate: '2024-05-12',
  },
  {
    id: 6,
    companyName: 'Haji Mansyur Arifin',
    siupNo: 'SIUP-01.26.71.00027',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Raya Paotere No. 09, Ujung Tanah, Makassar, Sulawesi Selatan',
    revisionNo: 'REV-00',
    siupDate: '2025-01-22',
  },
  {
    id: 7,
    companyName: 'PT Lautan Artha Pasifik',
    siupNo: 'SIUP-01.25.72.00062',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Yos Sudarso No. 101, Pelabuhan Tanjung Emas, Semarang, Jawa Tengah',
    revisionNo: 'REV-01',
    siupDate: '2023-09-30',
  },
]

export default function IUPembekuan({ onLogout }) {
  // Form input states
  const [companyName, setCompanyName] = useState('')
  const [siupNo, setSiupNo] = useState('')
  const [siupStatus, setSiupStatus] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [revisionNo, setRevisionNo] = useState('')
  const [siupDate, setSiupDate] = useState('')
  const [freezeDate, setFreezeDate] = useState(new Date().toISOString().split('T')[0])
  const [freezeReason, setFreezeReason] = useState('')

  // Search autocomplete states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)

  // Confirmation & toast states
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [toast, setToast] = useState(null)

  // Filter matching companies based on search
  const filteredCompanies = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SAMPLE_COMPANIES_SIUP
    return SAMPLE_COMPANIES_SIUP.filter(
      (item) =>
        item.companyName.toLowerCase().includes(q) ||
        item.siupNo.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Handle select company from search
  const handleSelectCompany = (comp) => {
    setCompanyName(comp.companyName)
    setSearchQuery(comp.companyName)
    setSiupNo(comp.siupNo)
    setSiupStatus(comp.siupStatus)
    setCompanyAddress(comp.companyAddress)
    setRevisionNo(comp.revisionNo)
    setSiupDate(comp.siupDate)
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
    if (!siupNo.trim() || !freezeDate || !freezeReason.trim()) {
      alert('Mohon lengkapi seluruh kolom bertanda bintang (*)')
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmFreeze = () => {
    setShowConfirmModal(false)
    setSiupStatus('Dibekukan')
    setToast({
      type: 'success',
      message: `Surat Izin Usaha Perikanan (SIUP) nomor ${siupNo} milik ${companyName || 'Perusahaan'} berhasil DIBEKUKAN pada tanggal ${freezeDate}.`,
    })
  }

  const handleResetForm = () => {
    setCompanyName('')
    setSearchQuery('')
    setSiupNo('')
    setSiupStatus('')
    setCompanyAddress('')
    setRevisionNo('')
    setSiupDate('')
    setFreezeDate(new Date().toISOString().split('T')[0])
    setFreezeReason('')
    setToast(null)
  }

  const breadcrumbs = [
    { label: 'Pembekuan & Pencabutan' },
    { label: 'Pembekuan Izin Usaha' },
  ]

  return (
    <Layout
      currentPath="/layanan/pembekuan/iu"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Pembekuan Izin Usaha"
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
                Formulir Pembekuan Izin Usaha (SIUP)
              </h2>
              <p className="text-xs text-[var(--color-muted)]">
                Cari nama perusahaan atau masukkan nomor SIUP untuk mengisi data secara otomatis.
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
          {/* Row 1: Nama Perusahaan (Left) & Alamat Perusahaan (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Nama Perusahaan (Input text with search & autocomplete) */}
            <div className="relative" ref={searchRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Perusahaan <span className="text-slate-400 font-normal">(Ketik untuk mencari & auto-fill)</span>
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCompanyName(e.target.value)
                    setIsDropdownOpen(true)
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Ketik nama perusahaan atau nomor SIUP..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Autocomplete Dropdown List */}
              {isDropdownOpen && filteredCompanies.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-[rgba(31,78,120,0.15)] shadow-xl z-30 max-h-64 overflow-y-auto divide-y divide-slate-100">
                  <div className="p-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Pilih Perusahaan dari Database ({filteredCompanies.length} ditemukan)
                  </div>
                  {filteredCompanies.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => handleSelectCompany(comp)}
                      className="p-3 hover:bg-blue-50/70 cursor-pointer transition flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800">{comp.companyName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {comp.siupNo} · {comp.revisionNo} · {comp.siupDate}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-700 border-slate-200">
                        {comp.siupStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Alamat Perusahaan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Perusahaan
              </label>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap domisili perusahaan..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 2: Nomor SIUP * (Left) & Status SIUP (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 2. Nomor SIUP * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor SIUP <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="text"
                value={siupNo}
                onChange={(e) => setSiupNo(e.target.value)}
                placeholder="Contoh: SIUP-01.26.31.00192"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-bold text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 3. Status SIUP (Auto Generate) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Status SIUP <span className="text-slate-400 font-normal">(Auto Generate)</span>
              </label>
              <input
                type="text"
                value={siupStatus}
                onChange={(e) => setSiupStatus(e.target.value)}
                placeholder="Status SIUP akan terisi otomatis..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 3: Nomor Revisi SIUP (Left) & Tanggal SIUP (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 5. Nomor Revisi SIUP */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor Revisi SIUP
              </label>
              <input
                type="text"
                value={revisionNo}
                onChange={(e) => setRevisionNo(e.target.value)}
                placeholder="Contoh: REV-01 / REV-00"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 6. Tanggal SIUP (Calendar) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal SIUP
              </label>
              <input
                type="date"
                value={siupDate}
                onChange={(e) => setSiupDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 4: Tanggal Pembekuan * (Left) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 7. Tanggal Pembekuan * (Calendar) */}
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

          {/* Row 5: Keterangan Pembekuan * (Full Width Textarea) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Keterangan Pembekuan <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows="4"
              value={freezeReason}
              onChange={(e) => setFreezeReason(e.target.value)}
              placeholder="Masukkan dasar penetapan pembekuan, nomor surat peringatan (SP-1 / SP-2 / SP-3), atau pelanggaran administrasi terkait..."
              className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Row 6: Button Aksi di Pojok Kanan Bawah */}
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
              <span>Beku SIUP</span>
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
                  Konfirmasi Pembekuan SIUP
                </h3>
                <p className="text-xs text-[var(--color-muted)]">Tindakan ini memerlukan verifikasi</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 p-4 bg-amber-50/60 border border-amber-200/50 rounded-xl">
              <p>
                Anda akan melakukan pembekuan sementara terhadap izin usaha berikut:
              </p>
              <div className="font-semibold text-slate-800 space-y-1">
                <p>• Perusahaan: <span className="font-bold">{companyName || '-'}</span></p>
                <p>• Nomor SIUP: <span className="font-mono text-amber-800">{siupNo}</span></p>
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
                <span>Ya, Bekukan SIUP</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
