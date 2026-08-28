import { useState, useMemo } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  RotateCcw,
  Printer,
  FileText,
  Building2,
  Ship,
  MapPin,
  Calendar,
  UserCheck,
  CheckCircle2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Eye
} from 'lucide-react'

const GEAR_TYPES = [
  'Bagan Berperahu',
  'Bagan Berperahu Teri',
  'Bouke Ami',
  'Bubu (Pots)',
  'Huhate',
  'Huhate Mekanis',
  'Jala Jatuh Berkapal',
  'Jaring Hela Ikan Berkantong',
  'Jaring Hela Udang Berkantong',
  'Jaring Insang Hanyut',
  'Jaring Insang Tetap',
  'Jaring Tarik Berkantong',
  'Jaring Tarik Berkantong (Es Batu)',
  'Jaring Tarik Berkantong (Freezer)',
  'Kapal Pengangkut Ikan antar Pelabuhan Pangkalan',
  'Kapal Pengangkut Ikan dari Daerah Penangkapan Ikan (WPPNRI)',
  'Kapal Pengangkut Ikan di Laut Lepas',
  'Kapal Pengangkut Ikan Hidup Antar Tempat Pembudidayaan Ikan',
  'Kapal Pengangkut Ikan Hidup dari Tempat Pembudidayaan / Pelabuhan Check Point ke Negara Tujuan Ekspor',
  'Kapal Pengangkut Ikan Segar/Beku ke Negara Tujuan',
  'Kapal Pengangkut Ikan Sewa untuk Ikan Hidup dari Check Point ke Negara Tujuan (Berbendera Asing)',
  'Kapal Pengangkut Ikan Sewa untuk Ikan Segar/Beku ke Negara Tujuan (Berbendera Asing)',
  'Pancing Berjoran',
  'Pancing Cumi',
  'Pancing Cumi Mekanis',
  'Pancing Ulur',
  'Pancing Ulur Tuna',
  'Payang',
  'Pukat Cincin Pelagis Besar dengan Satu Kapal',
  'Pukat Cincin Pelagis Kecil dengan Satu Kapal',
  'Pukat Cincin Teri dengan Satu Kapal',
  'Pukat Labuh',
  'Rawai Dasar',
  'Rawai Tuna',
  'Rumpon',
]

const PERMIT_TYPES = [
  'SUBSEKTOR PENANGKAPAN IKAN DI LAUT LEPAS',
  'SUBSEKTOR PENANGKAPAN IKAN DI PERAIRAN DARAT',
  'SUBSEKTOR PENANGKAPAN IKAN DI WPPNRI',
  'SUBSEKTOR PENGANGKUTAN IKAN ANTAR PELABUHAN PANGKALAN',
  'SUBSEKTOR PENGANGKUTAN IKAN BEROPERASI DI LAUT LEPAS',
  'SUBSEKTOR PENGANGKUTAN IKAN DARI DAERAH PENANGKAPAN IKAN (WPPNRI)',
  'SUBSEKTOR PENGANGKUTAN IKAN HIDUP ANTAR TEMPAT PEMBUDIDAYAAN IKAN',
  'SUBSEKTOR PENGANGKUTAN IKAN HIDUP DARI TEMPAT PEMBUDIDAYAAN/PELABUHAN CHECK POINT KE NEGARA TUJUAN',
  'SUBSEKTOR PENGANGKUTAN IKAN HIDUP KAPAL SEWA BERBENDERA ASING DARI PELABUHAN CHECK POINT KE NEGARA TUJUAN',
  'SUBSEKTOR PENGANGKUTAN IKAN SEGAR/BEKU KAPAL SEWA BERBENDERA ASING KE NEGARA TUJUAN',
  'SUBSEKTOR PENGANGKUTAN IKAN SEGAR/BEKU KE NEGARA',
  'SURAT IZIN PENEMPATAN RUMPON',
]

const SERVICE_STATUS_LIST = [
  'Reguler',
  'E-Service',
  '30360',
  'Gerai',
]

const STATUS_PERMOHONAN_LIST = [
  'Baru',
  'Penggantian',
  'Pengurangan',
  'Perluasan',
  'Perpanjangan',
  'Perubahan',
  'Update PIT',
]

const COMPANY_TYPES = [
  'CV',
  'Koperasi',
  'KUB',
  'Perorangan',
  'Perseroan Terbatas (PT)',
]

const VERIFIKATOR_LIST = [
  'M. Ichsan',
  'Rahmi Aprianti',
  'Reyne P',
  'Sumiati',
]

// Generate years from 2026 down to 1987
const YEARS_LIST = Array.from({ length: 2026 - 1987 + 1 }, (_, i) => String(2026 - i))

const SAMPLE_PERMOHONAN_CETAK_IR = [
  {
    id: 1,
    blankoNo: 'BLK-SIPR-2026-00088',
    applicant: 'PT Laut Nusantara Mandiri',
    vessel: 'KM. Bahari Rumpon 01',
    companyType: 'Perseroan Terbatas (PT)',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON',
    serviceStatus: 'Reguler',
    gearType: 'Rumpon',
    status: 'Baru',
    signDate: '2026-01-15',
    signDateDisplay: '15 Jan 2026',
    signYear: '2026',
    verifier: 'M. Ichsan',
    licenseNumber: 'SIPR-01.26.11.00088',
  },
  {
    id: 2,
    blankoNo: 'BLK-SIPR-2026-00094',
    applicant: 'Andi Rizky Pratama',
    vessel: 'KM. Rizky Samudra',
    companyType: 'Perorangan',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON',
    serviceStatus: 'E-Service',
    gearType: 'Rumpon',
    status: 'Perpanjangan',
    signDate: '2026-02-10',
    signDateDisplay: '10 Feb 2026',
    signYear: '2026',
    verifier: 'Rahmi Aprianti',
    licenseNumber: 'SIPR-01.26.22.00094',
  },
  {
    id: 3,
    blankoNo: 'BLK-SIPR-2025-00122',
    applicant: 'CV Sumber Bahari Raya',
    vessel: 'KM. Sumber Rezeki 07',
    companyType: 'CV',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON',
    serviceStatus: '30360',
    gearType: 'Rumpon',
    status: 'Perluasan',
    signDate: '2025-11-20',
    signDateDisplay: '20 Nov 2025',
    signYear: '2025',
    verifier: 'Reyne P',
    licenseNumber: 'SIPR-01.25.33.00122',
  },
  {
    id: 4,
    blankoNo: 'BLK-SIPR-2026-00052',
    applicant: 'Koperasi Nelayan Mina Sejahtera',
    vessel: 'KM. Mina Bahari 05',
    companyType: 'Koperasi',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON',
    serviceStatus: 'Gerai',
    gearType: 'Rumpon',
    status: 'Penggantian',
    signDate: '2026-02-05',
    signDateDisplay: '05 Feb 2026',
    signYear: '2026',
    verifier: 'Sumiati',
    licenseNumber: 'SIPR-01.26.44.00052',
  },
  {
    id: 5,
    blankoNo: 'BLK-SIPR-2024-00185',
    applicant: 'KUB Nelayan Samudra Mas',
    vessel: 'KM. Samudra Jaya 02',
    companyType: 'KUB',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON',
    serviceStatus: 'Reguler',
    gearType: 'Rumpon',
    status: 'Update PIT',
    signDate: '2024-12-14',
    signDateDisplay: '14 Des 2024',
    signYear: '2024',
    verifier: 'M. Ichsan',
    licenseNumber: 'SIPR-01.24.55.00185',
  },
  {
    id: 6,
    blankoNo: 'BLK-SIPR-2025-00215',
    applicant: 'PT Samudera Pasifik Nusantara',
    vessel: 'KM. Pasifik Jaya 08',
    companyType: 'Perseroan Terbatas (PT)',
    permitType: 'SUBSEKTOR PENANGKAPAN IKAN DI WPPNRI',
    serviceStatus: 'E-Service',
    gearType: 'Pukat Cincin Pelagis Besar dengan Satu Kapal',
    status: 'Perubahan',
    signDate: '2025-10-18',
    signDateDisplay: '18 Okt 2025',
    signYear: '2025',
    verifier: 'Rahmi Aprianti',
    licenseNumber: 'SIPR-01.25.66.00215',
  },
  {
    id: 7,
    blankoNo: 'BLK-SIPR-2026-00031',
    applicant: 'Haji Sulaiman Al-Bahri',
    vessel: 'KM. Barokah Laut 09',
    companyType: 'Perorangan',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON',
    serviceStatus: 'Gerai',
    gearType: 'Rumpon',
    status: 'Pengurangan',
    signDate: '2026-02-14',
    signDateDisplay: '14 Feb 2026',
    signYear: '2026',
    verifier: 'Sumiati',
    licenseNumber: 'SIPR-01.26.77.00031',
  },
]

function SortableTh({ label, sortKey, currentSortKey, currentDirection, onSort, className = '' }) {
  const isActive = currentSortKey === sortKey
  return (
    <th
      className={`px-5 py-3.5 font-bold cursor-pointer select-none hover:bg-white/15 transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
      title={`Klik untuk mengurutkan ${currentDirection === 'asc' && isActive ? 'Z ke A' : 'A ke Z'}`}
    >
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span>{label}</span>
        {isActive ? (
          currentDirection === 'asc' ? (
            <ArrowUp className="w-3.5 h-3.5 shrink-0 text-white" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 shrink-0 text-white" />
          )
        ) : (
          <ArrowUpDown className="w-3.5 h-3.5 shrink-0 opacity-50 hover:opacity-100" />
        )}
      </div>
    </th>
  )
}

export default function IRDaftarPermohonanPencetakan({ onLogout }) {
  // Form search filter states
  const [filterApplicant, setFilterApplicant] = useState('')
  const [filterVessel, setFilterVessel] = useState('')
  const [filterGear, setFilterGear] = useState('')
  const [filterPermitType, setFilterPermitType] = useState('')
  const [filterServiceStatus, setFilterServiceStatus] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterBlanko, setFilterBlanko] = useState('')
  const [filterCompanyType, setFilterCompanyType] = useState('')
  const [filterSignYear, setFilterSignYear] = useState('')
  const [filterStartDate, setFilterStartDate] = useState('')
  const [filterEndDate, setFilterEndDate] = useState('')
  const [filterVerifier, setFilterVerifier] = useState('')

  // Applied filters (triggered on clicking Cari)
  const [appliedFilters, setAppliedFilters] = useState({})

  // Sorting & pagination
  const [sortConfig, setSortConfig] = useState({ key: 'signDate', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Modal preview state
  const [selectedDoc, setSelectedDoc] = useState(null)

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    setAppliedFilters({
      applicant: filterApplicant.trim(),
      vessel: filterVessel.trim(),
      gear: filterGear,
      permitType: filterPermitType,
      serviceStatus: filterServiceStatus,
      status: filterStatus,
      blanko: filterBlanko.trim(),
      companyType: filterCompanyType,
      signYear: filterSignYear,
      startDate: filterStartDate,
      endDate: filterEndDate,
      verifier: filterVerifier,
    })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilterApplicant('')
    setFilterVessel('')
    setFilterGear('')
    setFilterPermitType('')
    setFilterServiceStatus('')
    setFilterStatus('')
    setFilterBlanko('')
    setFilterCompanyType('')
    setFilterSignYear('')
    setFilterStartDate('')
    setFilterEndDate('')
    setFilterVerifier('')
    setAppliedFilters({})
    setCurrentPage(1)
  }

  // Filtered dataset
  const filteredData = useMemo(() => {
    return SAMPLE_PERMOHONAN_CETAK_IR.filter((item) => {
      if (appliedFilters.applicant && !item.applicant.toLowerCase().includes(appliedFilters.applicant.toLowerCase())) {
        return false
      }
      if (appliedFilters.vessel && !item.vessel.toLowerCase().includes(appliedFilters.vessel.toLowerCase())) {
        return false
      }
      if (appliedFilters.gear && item.gearType !== appliedFilters.gear) {
        return false
      }
      if (appliedFilters.permitType && item.permitType !== appliedFilters.permitType) {
        return false
      }
      if (appliedFilters.serviceStatus && item.serviceStatus !== appliedFilters.serviceStatus) {
        return false
      }
      if (appliedFilters.status && item.status !== appliedFilters.status) {
        return false
      }
      if (appliedFilters.blanko && !item.blankoNo.toLowerCase().includes(appliedFilters.blanko.toLowerCase())) {
        return false
      }
      if (appliedFilters.companyType && item.companyType !== appliedFilters.companyType) {
        return false
      }
      if (appliedFilters.signYear && item.signYear !== appliedFilters.signYear) {
        return false
      }
      if (appliedFilters.verifier && item.verifier !== appliedFilters.verifier) {
        return false
      }
      if (appliedFilters.startDate && item.signDate < appliedFilters.startDate) {
        return false
      }
      if (appliedFilters.endDate && item.signDate > appliedFilters.endDate) {
        return false
      }
      return true
    })
  }, [appliedFilters])

  // Sorted dataset
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      let aVal = a[sortConfig.key] ?? ''
      let bVal = b[sortConfig.key] ?? ''

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginated dataset
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const breadcrumbs = [
    { label: 'Pencetakan' },
    { label: 'Izin Rumpon' },
    { label: 'Daftar Permohonan' },
  ]

  return (
    <Layout
      currentPath="/layanan/pencetakan/ir-permohonan"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Permohonan Cetak SIPR"
    >
      {/* Comprehensive Search Form Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-4">
          Pencarian Data Permohonan Cetak SIPR
        </h2>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Row 1: Nama Pemohon, Nama Kapal, Alat Tangkap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nama Pemohon */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Pemohon
              </label>
              <input
                type="text"
                value={filterApplicant}
                onChange={(e) => setFilterApplicant(e.target.value)}
                placeholder="Masukkan nama pemohon / pemilik..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Nama Kapal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Kapal
              </label>
              <input
                type="text"
                value={filterVessel}
                onChange={(e) => setFilterVessel(e.target.value)}
                placeholder="Masukkan nama armada kapal..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Alat Tangkap (35 Options) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alat Tangkap
              </label>
              <select
                value={filterGear}
                onChange={(e) => setFilterGear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Semua Alat Tangkap --</option>
                {GEAR_TYPES.map((gear, idx) => (
                  <option key={idx} value={gear}>
                    {gear}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Jenis Permohonan, Status (Reguler/E-Service/30360/Gerai), Status Permohonan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Jenis Permohonan (12 Subsektor Options) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jenis Permohonan
              </label>
              <select
                value={filterPermitType}
                onChange={(e) => setFilterPermitType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Semua Jenis Permohonan --</option>
                {PERMIT_TYPES.map((pType, idx) => (
                  <option key={idx} value={pType}>
                    {pType}
                  </option>
                ))}
              </select>
            </div>

            {/* Status (Reguler, E-Service, 30360, Gerai) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                value={filterServiceStatus}
                onChange={(e) => setFilterServiceStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Semua Status --</option>
                {SERVICE_STATUS_LIST.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Permohonan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Status Permohonan
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Semua Status Permohonan --</option>
                {STATUS_PERMOHONAN_LIST.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Nomor Blanko, Jenis Perusahaan, Tahun Tanda Tangan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nomor Blanko */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor Blanko
              </label>
              <input
                type="text"
                value={filterBlanko}
                onChange={(e) => setFilterBlanko(e.target.value)}
                placeholder="Contoh: BLK-SIPR-2026..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Jenis Perusahaan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jenis Perusahaan
              </label>
              <select
                value={filterCompanyType}
                onChange={(e) => setFilterCompanyType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Semua Jenis Perusahaan --</option>
                {COMPANY_TYPES.map((cType) => (
                  <option key={cType} value={cType}>
                    {cType}
                  </option>
                ))}
              </select>
            </div>

            {/* Tahun Tanda Tangan (dari 1987) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tahun Tanda Tangan
              </label>
              <select
                value={filterSignYear}
                onChange={(e) => setFilterSignYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Semua Tahun --</option>
                {YEARS_LIST.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Tanggal Tanda Tangan s/d, Verifikator, Button Cari & Bersihkan */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-3 border-t border-slate-100">
            {/* Tanggal Tanda Tangan s/d */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Tanda Tangan
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <span className="text-xs font-bold text-slate-400">s/d</span>
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>

            {/* Verifikator */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Verifikator
              </label>
              <select
                value={filterVerifier}
                onChange={(e) => setFilterVerifier(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Semua Verifikator --</option>
                {VERIFIKATOR_LIST.map((ver) => (
                  <option key={ver} value={ver}>
                    {ver}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons: Cari & Bersihkan sejajar di sebelah kanan */}
            <div className="md:col-span-5 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer shadow-xs flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Cari</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bersihkan / Hapus</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Output Table Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
            <Printer className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Hasil Permohonan Cetak SIPR ({sortedData.length} data ditemukan)</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[1250px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3.5 font-bold text-center w-12">No.</th>
                <SortableTh label="NO. BLANKO" sortKey="blankoNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NAMA PEMOHON" sortKey="applicant" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NAMA KAPAL" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="JENIS PERUSAHAAN" sortKey="companyType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="JENIS PERMOHONAN" sortKey="permitType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="STATUS" sortKey="serviceStatus" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="ALAT TANGKAP" sortKey="gearType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="STATUS PERMOHONAN" sortKey="status" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TGL. TANDA TANGAN" sortKey="signDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="VERIFIKATOR" sortKey="verifier" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <th className="px-5 py-3.5 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {paginatedData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  {/* No. */}
                  <td className="px-4 py-4 text-center text-slate-500 font-bold">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>

                  {/* No. Blanko */}
                  <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                    {item.blankoNo}
                  </td>

                  {/* Nama Pemohon */}
                  <td className="px-5 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                    {item.applicant}
                  </td>

                  {/* Nama Kapal */}
                  <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.vessel}
                  </td>

                  {/* Jenis Perusahaan */}
                  <td className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap">
                    {item.companyType}
                  </td>

                  {/* Jenis Permohonan */}
                  <td className="px-5 py-4 text-slate-800 font-medium max-w-xs">
                    {item.permitType}
                  </td>

                  {/* Status (Reguler / E-Service / 30360 / Gerai) */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {item.serviceStatus}
                    </span>
                  </td>

                  {/* Alat Tangkap */}
                  <td className="px-5 py-4 text-slate-700 max-w-xs">
                    {item.gearType}
                  </td>

                  {/* Status Permohonan */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800">
                      {item.status}
                    </span>
                  </td>

                  {/* Tgl. Tanda Tangan */}
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {item.signDateDisplay}
                  </td>

                  {/* Verifikator */}
                  <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.verifier}
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedDoc(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 cursor-pointer inline-flex items-center gap-1.5 shadow-2xs transition"
                      title="Lihat Pratinjau Cetak SIPR"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Cetak</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data permohonan cetak SIPR tidak ditemukan. Silakan gunakan filter pencarian di atas.
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalItems={sortedData.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      {/* Modal Pratinjau Dokumen SIPR */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">
                    Pratinjau Pencetakan Dokumen SIPR
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">{selectedDoc.blankoNo} · {selectedDoc.licenseNumber}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 p-4 bg-[var(--color-bg)] rounded-xl">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pemohon:</span>
                <span className="font-bold text-slate-800">{selectedDoc.applicant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Armada Kapal:</span>
                <span className="font-bold text-slate-800">{selectedDoc.vessel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bentuk Perusahaan:</span>
                <span className="font-semibold text-slate-800">{selectedDoc.companyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jenis Dokumen & Subsektor:</span>
                <span className="font-bold text-[var(--color-primary)] text-right max-w-xs">{selectedDoc.permitType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Layanan:</span>
                <span className="font-bold text-blue-700">{selectedDoc.serviceStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Permohonan:</span>
                <span className="font-bold text-slate-800">{selectedDoc.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Alat Penangkapan Ikan:</span>
                <span className="font-medium text-slate-700 text-right max-w-xs">{selectedDoc.gearType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Blanko Hologram:</span>
                <span className="font-mono font-bold text-slate-800">{selectedDoc.blankoNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Tanda Tangan:</span>
                <span className="font-semibold text-slate-800">{selectedDoc.signDateDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verifikator Petugas:</span>
                <span className="font-bold text-slate-800">{selectedDoc.verifier}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Memulai proses pencetakan dokumen SIPR (${selectedDoc.blankoNo})...`)
                  setSelectedDoc(null)
                }}
                className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Dokumen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
