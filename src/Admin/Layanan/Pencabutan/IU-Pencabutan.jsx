import { useState, useMemo, useRef, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import {
  Building2,
  Search,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Ban,
  Printer,
  Upload,
  UserCheck,
  Phone,
  X,
  Lock,
  ArrowRight
} from 'lucide-react'

const SAMPLE_COMPANIES_PENCABUTAN = [
  {
    id: 1,
    companyName: 'PT Samudera Bahari Nusantara',
    siupNo: 'SIUP-01.26.31.00192',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Muara Baru Raya No. 45, Penjaringan, Jakarta Utara, DKI Jakarta',
    revisionNo: 'REV-02',
    siupDate: '2024-03-15',
    officer: 'Dimas',
    applicantContact: 'H. Bambang Sudirman',
    phone: '0812-3456-7890',
  },
  {
    id: 2,
    companyName: 'CV Mina Makmur Abadi',
    siupNo: 'SIUP-01.25.12.00084',
    siupStatus: 'Dalam Pembekuan',
    companyAddress: 'Jl. Pelabuhan Benoa No. 12, Denpasar Selatan, Bali',
    revisionNo: 'REV-00',
    siupDate: '2023-08-20',
    officer: 'Sarah Kristiana L',
    applicantContact: 'I Made Suwarta',
    phone: '0813-9876-5432',
  },
  {
    id: 3,
    companyName: 'Koperasi Nelayan Sejahtera Mandiri',
    siupNo: 'SIUP-01.26.51.00012',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Samudra Belawan No. 88, Belawan, Medan, Sumatera Utara',
    revisionNo: 'REV-01',
    siupDate: '2024-01-10',
    officer: 'Tiara Dwi M',
    applicantContact: 'Sutan Harahap',
    phone: '0821-4455-6677',
  },
  {
    id: 4,
    companyName: 'PT Pasifik Fishery Utama',
    siupNo: 'SIUP-01.24.32.00119',
    siupStatus: 'Dalam Pembekuan',
    companyAddress: 'Jl. Samratulangi No. 72, Bitung Barat, Kota Bitung, Sulawesi Utara',
    revisionNo: 'REV-03',
    siupDate: '2022-11-05',
    officer: 'Windi Astuti',
    applicantContact: 'Franky Sompotan',
    phone: '0852-1122-3344',
  },
  {
    id: 5,
    companyName: 'KUB Bahari Utama',
    siupNo: 'SIUP-01.24.15.00045',
    siupStatus: 'Aktif / Berlaku',
    companyAddress: 'Jl. Dermaga Cilacap No. 18, Cilacap Selatan, Jawa Tengah',
    revisionNo: 'REV-00',
    siupDate: '2024-05-12',
    officer: 'Dimas',
    applicantContact: 'Sukirman',
    phone: '0878-5566-7788',
  },
]

export default function IUPencabutan({ onLogout }) {
  // Form state
  const [companyName, setCompanyName] = useState('')
  const [siupNo, setSiupNo] = useState('')
  const [siupStatus, setSiupStatus] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [revisionNo, setRevisionNo] = useState('')
  const [siupDate, setSiupDate] = useState('')
  const [revocationDate, setRevocationDate] = useState(new Date().toISOString().split('T')[0])
  const [revocationReason, setRevocationReason] = useState('')
  const [receivingOfficer, setReceivingOfficer] = useState('Dimas')
  const [requestLetterNo, setRequestLetterNo] = useState('')
  const [requestLetterDate, setRequestLetterDate] = useState('')
  const [submitterName, setSubmitterName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [attachedDocs, setAttachedDocs] = useState('Surat Permohonan Asli bermaterai, Dokumen SIUP Asli, FC KTP Direktur, Akta Perusahaan')

  // Search autocomplete states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)

  // Modals & toast states
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [toast, setToast] = useState(null)

  // Filter matching companies based on search
  const filteredCompanies = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SAMPLE_COMPANIES_PENCABUTAN
    return SAMPLE_COMPANIES_PENCABUTAN.filter(
      (item) =>
        item.companyName.toLowerCase().includes(q) ||
        item.siupNo.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Select company from autocomplete
  const handleSelectCompany = (comp) => {
    setCompanyName(comp.companyName)
    setSearchQuery(comp.companyName)
    setSiupNo(comp.siupNo)
    setSiupStatus(comp.siupStatus)
    setCompanyAddress(comp.companyAddress)
    setRevisionNo(comp.revisionNo)
    setSiupDate(comp.siupDate)
    setReceivingOfficer(comp.officer || 'Dimas')
    setSubmitterName(comp.applicantContact || '')
    setPhoneNo(comp.phone || '')
    setIsDropdownOpen(false)
  }

  // Handle outside click to close dropdown
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
    if (!siupNo.trim() || !revocationDate || !revocationReason.trim()) {
      alert('Mohon lengkapi seluruh kolom bertanda bintang (*)')
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmRevocation = () => {
    setShowConfirmModal(false)
    setSiupStatus('Dicabut')
    setToast({
      type: 'success',
      message: `Surat Izin Usaha Perikanan (SIUP) nomor ${siupNo} milik ${companyName || 'Perusahaan'} berhasil DICABUT pada tanggal ${revocationDate}.`,
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
    setRevocationDate(new Date().toISOString().split('T')[0])
    setRevocationReason('')
    setReceivingOfficer('Dimas')
    setRequestLetterNo('')
    setRequestLetterDate('')
    setSubmitterName('')
    setPhoneNo('')
    setAttachedDocs('Surat Permohonan Asli bermaterai, Dokumen SIUP Asli, FC KTP Direktur, Akta Perusahaan')
    setToast(null)
  }

  const breadcrumbs = [
    { label: 'Pembekuan & Pencabutan' },
    { label: 'Pencabutan Izin Usaha' },
  ]

  return (
    <Layout
      currentPath="/layanan/pencabutan/iu"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Pencabutan Izin Usaha"
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
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">
                Formulir Pencabutan Izin Usaha (SIUP)
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
                  placeholder="Cari Perusahaan..."
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

            {/* 3. Status SIUP (Auto Generate Text) */}
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

          {/* Row 4: Tanggal Pencabutan * (Left) & Petugas Penerima (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 7. Tanggal Pencabutan * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Pencabutan <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="date"
                value={revocationDate}
                onChange={(e) => setRevocationDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 8. Petugas Penerima */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Petugas Penerima
              </label>
              <select
                value={receivingOfficer}
                onChange={(e) => setReceivingOfficer(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="Dimas">Dimas</option>
                <option value="Sarah Kristiana L">Sarah Kristiana L</option>
                <option value="Tiara Dwi M">Tiara Dwi M</option>
                <option value="Windi Astuti">Windi Astuti</option>
                <option value="M. Ichsan">M. Ichsan</option>
              </select>
            </div>
          </div>

          {/* Row 5: No Surat Permohonan dari Pengusaha (Left) & Tanggal Surat Permohonan (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 9. No Surat Permohonan dari Pengusaha */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                No Surat Permohonan dari Pengusaha
              </label>
              <input
                type="text"
                value={requestLetterNo}
                onChange={(e) => setRequestLetterNo(e.target.value)}
                placeholder="Contoh: 045/EXT-SBN/I/2026"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 10. Tanggal Surat Permohonan dari Pengusaha */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Surat Permohonan dari Pengusaha
              </label>
              <input
                type="date"
                value={requestLetterDate}
                onChange={(e) => setRequestLetterDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 6: Yang Menyampaikan (Left) & No. HP (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 11. Yang Menyampaikan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Yang Menyampaikan
              </label>
              <input
                type="text"
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
                placeholder="Nama kuasa / pengurus yang menyampaikan berkas..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 12. No. HP */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                No. HP
              </label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Contoh: 0812-3456-7890"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 7: Dokumen Terlampir */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Dokumen Terlampir
            </label>
            <input
              type="text"
              value={attachedDocs}
              onChange={(e) => setAttachedDocs(e.target.value)}
              placeholder="Sebutkan kelengkapan berkas fisik yang diserahkan..."
              className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Row 8: Keterangan Pencabutan * (Full Width Textarea) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Keterangan Pencabutan <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows="4"
              value={revocationReason}
              onChange={(e) => setRevocationReason(e.target.value)}
              placeholder="Masukkan alasan penetapan pencabutan SIUP (misal: permohonan pengembalian izin usaha atas inisiatif pelaku usaha / likuidasi badan usaha)..."
              className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Row 9: Action Buttons di Pojok Kanan Bawah */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={() => {
                if (!siupNo.trim()) {
                  alert('Silakan pilih atau masukkan data perusahaan / nomor SIUP terlebih dahulu.')
                  return
                }
                setShowReceiptModal(true)
              }}
              className="px-5 py-2.5 rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] bg-white hover:bg-blue-50/60 text-xs font-bold transition cursor-pointer shadow-2xs flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Tanda Terima</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Ban className="w-4 h-4" />
              <span>Cabut SIUP</span>
            </button>
          </div>
        </form>
      </section>

      {/* Modal Konfirmasi Pencabutan SIUP */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-600 border-b pb-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <Ban className="w-5 h-5 text-rose-700" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[var(--color-text)]">
                  Konfirmasi Pencabutan SIUP
                </h3>
                <p className="text-xs text-[var(--color-muted)]">Tindakan ini bersifat permanen</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 p-4 bg-rose-50/60 border border-rose-200/50 rounded-xl">
              <p>
                Anda akan melakukan pencabutan izin usaha secara permanen terhadap:
              </p>
              <div className="font-semibold text-slate-800 space-y-1">
                <p>• Perusahaan: <span className="font-bold">{companyName || '-'}</span></p>
                <p>• Nomor SIUP: <span className="font-mono text-rose-700">{siupNo}</span></p>
                <p>• Tgl. Pencabutan: <span>{revocationDate}</span></p>
              </div>
              <p className="text-[11px] text-rose-800 italic pt-1">
                Keterangan: "{revocationReason}"
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
                onClick={handleConfirmRevocation}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Ya, Cabut SIUP</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cetak Tanda Terima Permohonan Pencabutan */}
      {showReceiptModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowReceiptModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-[var(--color-primary)]">
                <Printer className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">
                    Tanda Terima Berkas Pencabutan SIUP
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">Kementerian Kelautan dan Perikanan</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 p-5 bg-[var(--color-bg)] rounded-xl border border-slate-200">
              <div className="text-center pb-2 border-b border-slate-200">
                <p className="font-bold text-sm text-[var(--color-text)] uppercase">BUKTI TANDA TERIMA PENYERAHAN DOKUMEN</p>
                <p className="text-[11px] text-slate-500">PENCABUTAN SURAT IZIN USAHA PERIKANAN (SIUP)</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <span className="text-slate-500 block">Nama Perusahaan:</span>
                  <span className="font-bold text-slate-800">{companyName || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Nomor SIUP:</span>
                  <span className="font-mono font-bold text-[var(--color-primary)]">{siupNo || '-'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block">Alamat Perusahaan:</span>
                <span className="font-medium text-slate-700">{companyAddress || '-'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">No. Surat Pemohon:</span>
                  <span className="font-mono text-slate-800">{requestLetterNo || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tgl. Surat Pemohon:</span>
                  <span className="text-slate-800">{requestLetterDate || '-'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">Yang Menyerahkan:</span>
                  <span className="font-bold text-slate-800">{submitterName || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">No. Kontak / HP:</span>
                  <span className="font-mono text-slate-800">{phoneNo || '-'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block">Dokumen Fisik Terlampir:</span>
                <span className="font-medium text-slate-700">{attachedDocs}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Petugas Penerima: <strong className="text-slate-800">{receivingOfficer}</strong></span>
                <span className="text-slate-500">Tanggal Terima: <strong className="text-slate-800">{revocationDate}</strong></span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Mencetak bukti tanda terima pencabutan SIUP (${siupNo})...`)
                  setShowReceiptModal(false)
                }}
                className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar Tanda Terima</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
