import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Ship,
  Calendar,
  RotateCcw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ClipboardList,
  FileX2
} from 'lucide-react'

const VERIFIKASI_KAPAL_DATA = {
  permohonan: [
    {
      id: 'VRF-IK-2026-001',
      applicant: 'PT Laut Nusantara',
      vessel: 'KM. Bahari Raya 01',
      gt: '120 GT',
      type: 'SIPI',
      status: 'Verifikasi Teknis Alat Tangkap & VMS',
      verifier: 'M. Ichsan',
      date: '2026-01-15',
      displayDate: '15 Jan 2026',
    },
    {
      id: 'VRF-IK-2026-002',
      applicant: 'CV Mina Bahari',
      vessel: 'KM. Mina Bahari 08',
      gt: '150 GT',
      type: 'SIKPI',
      status: 'Pemeriksaan Palka Berpendingin',
      verifier: 'Rahmi Aprianti',
      date: '2026-01-20',
      displayDate: '20 Jan 2026',
    },
    {
      id: 'VRF-IK-2026-003',
      applicant: 'Andi Rizky',
      vessel: 'KM. Sinar Bahari',
      gt: '85 GT',
      type: 'SIPI',
      status: 'Pemeriksaan Pas Besar & Gross Akte',
      verifier: 'Reyne P',
      date: '2026-02-05',
      displayDate: '05 Feb 2026',
    },
    {
      id: 'VRF-IK-2026-004',
      applicant: 'PT Samudra Sejahtera',
      vessel: 'KM. Samudra Sejahtera 02',
      gt: '180 GT',
      type: 'SIPI',
      status: 'Validasi Titik Daerah Penangkapan WPPNRI',
      verifier: 'Sumiati',
      date: '2026-02-12',
      displayDate: '12 Feb 2026',
    },
    {
      id: 'VRF-IK-2026-005',
      applicant: 'PT Samudera Abadi Sentosa',
      vessel: 'KM. Sinar Samudera',
      gt: '98 GT',
      type: 'SIPR',
      status: 'Verifikasi Titik Koordinat Rumpon',
      verifier: 'Rahmi Aprianti',
      date: '2026-02-18',
      displayDate: '18 Feb 2026',
    },
    {
      id: 'VRF-IK-2026-006',
      applicant: 'PT Indo Mina Perkasa',
      vessel: 'KM. Mina Perkasa 03',
      gt: '210 GT',
      type: 'SIKPI',
      status: 'Pemeriksaan Pelabuhan Pangkalan',
      verifier: 'M. Ichsan',
      date: '2026-02-22',
      displayDate: '22 Feb 2026',
    },
  ],
  penolakan: [
    {
      id: 'TOLAK-IK-2026-001',
      applicant: 'CV Samudra Perkasa',
      vessel: 'KM. Samudra Jaya 09',
      gt: '75 GT',
      type: 'SIPI',
      status: 'Ditolak Verifikasi',
      verifier: 'M. Ichsan',
      date: '2026-01-18',
      displayDate: '18 Jan 2026',
      alasan: 'Spesifikasi alat tangkap tidak sesuai dengan zona WPPNRI yang diajukan',
    },
    {
      id: 'TOLAK-IK-2026-002',
      applicant: 'PT Marina Bahari',
      vessel: 'KM. Marina Nusantara',
      gt: '130 GT',
      type: 'SIKPI',
      status: 'Ditolak Verifikasi',
      verifier: 'Reyne P',
      date: '2026-02-08',
      displayDate: '08 Feb 2026',
      alasan: 'Transmitter VMS tidak aktif dan tidak terdeteksi pada server pemantauan',
    },
  ],
}

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

export default function IKDaftarVerifikasi({ onLogout }) {
  const [activeTab, setActiveTab] = useState('permohonan')

  // Search form states
  const [applicantQuery, setApplicantQuery] = useState('')
  const [vesselQuery, setVesselQuery] = useState('')
  const [verifierFilter, setVerifierFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Applied filters state
  const [appliedFilters, setAppliedFilters] = useState({
    applicant: '',
    vessel: '',
    verifier: '',
    startDate: '',
    endDate: '',
  })

  // Table sorting & pagination
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, appliedFilters])

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    setAppliedFilters({
      applicant: applicantQuery,
      vessel: vesselQuery,
      verifier: verifierFilter,
      startDate: startDate,
      endDate: endDate,
    })
  }

  const handleReset = () => {
    setApplicantQuery('')
    setVesselQuery('')
    setVerifierFilter('')
    setStartDate('')
    setEndDate('')
    setAppliedFilters({
      applicant: '',
      vessel: '',
      verifier: '',
      startDate: '',
      endDate: '',
    })
  }

  const filteredData = useMemo(() => {
    const list = VERIFIKASI_KAPAL_DATA[activeTab] || []
    return list.filter((item) => {
      // Nama Pemohon filter
      if (appliedFilters.applicant) {
        const q = appliedFilters.applicant.toLowerCase().trim()
        if (!item.applicant.toLowerCase().includes(q)) return false
      }

      // Nama Kapal filter
      if (appliedFilters.vessel) {
        const q = appliedFilters.vessel.toLowerCase().trim()
        if (!item.vessel.toLowerCase().includes(q)) return false
      }

      // Verifikator filter
      if (appliedFilters.verifier && item.verifier !== appliedFilters.verifier) {
        return false
      }

      // Tanggal Kirim filter (startDate s/d endDate)
      if (appliedFilters.startDate && item.date < appliedFilters.startDate) {
        return false
      }
      if (appliedFilters.endDate && item.date > appliedFilters.endDate) {
        return false
      }

      return true
    })
  }, [activeTab, appliedFilters])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      let aVal = a[sortConfig.key] ?? ''
      let bVal = b[sortConfig.key] ?? ''

      // Numeric sort for GT
      if (sortConfig.key === 'gt') {
        const aNum = parseFloat(String(aVal).replace(/[^0-9.]/g, '')) || 0
        const bNum = parseFloat(String(bVal).replace(/[^0-9.]/g, '')) || 0
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum
      }

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginated Data
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
    { label: 'Layanan' },
    { label: 'Permohonan' },
    { label: 'Daftar Verifikasi Izin Kapal' },
  ]

  return (
    <Layout
      currentPath="/layanan/permohonan/ik/daftar-verifikasi"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Verifikasi Izin Kapal"
    >
      {/* Form Pencarian */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Form Pencarian Verifikasi Izin Kapal</span>
        </h2>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Row 1: Nama Pemohon, Nama Kapal, Verifikator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nama Pemohon */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Pemohon
              </label>
              <input
                type="text"
                value={applicantQuery}
                onChange={(e) => setApplicantQuery(e.target.value)}
                placeholder="Masukkan nama pemohon..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
              />
            </div>

            {/* Nama Kapal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Kapal
              </label>
              <input
                type="text"
                value={vesselQuery}
                onChange={(e) => setVesselQuery(e.target.value)}
                placeholder="Masukkan nama kapal..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
              />
            </div>

            {/* Verifikator */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Verifikator
              </label>
              <select
                value={verifierFilter}
                onChange={(e) => setVerifierFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">Semua Verifikator</option>
                <option value="M. Ichsan">M. Ichsan</option>
                <option value="Rahmi Aprianti">Rahmi Aprianti</option>
                <option value="Reyne P">Reyne P</option>
                <option value="Sumiati">Sumiati</option>
              </select>
            </div>
          </div>

          {/* Row 2: Tanggal Kirim s/d, Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Tanggal Kirim s/d */}
            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Kirim
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <span className="text-xs font-bold text-slate-400">s/d</span>
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons: Cari & Bersihkan/Hapus */}
            <div className="md:col-span-4 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:brightness-95 transition cursor-pointer shadow-xs"
              >
                <Search className="w-4 h-4" />
                <span>Cari</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition cursor-pointer"
                title="Bersihkan / Hapus Filter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bersihkan / Hapus</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* 2 Opsi Tab di Atas Tabel: Daftar Permohonan dan Daftar Penolakan */}
      <div className="flex items-center gap-2 mb-4" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'permohonan'}
          onClick={() => setActiveTab('permohonan')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'permohonan'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Daftar Permohonan</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'penolakan'}
          onClick={() => setActiveTab('penolakan')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'penolakan'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileX2 className="w-4 h-4" />
          <span>Daftar Penolakan</span>
        </button>
      </div>

      {/* Tabel Data Verifikasi Kapal */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <SortableTh label="No. Verifikasi" sortKey="id" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Nama Pemohon" sortKey="applicant" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Nama Kapal" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Tonase GT" sortKey="gt" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Jenis Izin" sortKey="type" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Tahapan Verifikasi" sortKey="status" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Verifikator" sortKey="verifier" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Tanggal Kirim" sortKey="date" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                {activeTab === 'penolakan' && (
                  <th className="px-5 py-3.5 font-bold">Alasan Penolakan</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-5 py-4 font-bold text-[var(--color-text)]">
                    {item.applicant}
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.vessel}
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-800 whitespace-nowrap">
                    {item.gt}
                  </td>
                  <td className="px-5 py-4 font-bold text-[var(--color-primary)] whitespace-nowrap">
                    {item.type}
                  </td>
                  <td className="px-5 py-4 text-slate-800 font-medium">
                    {item.status}
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.verifier}
                  </td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {item.displayDate}
                  </td>
                  {activeTab === 'penolakan' && (
                    <td className="px-5 py-4 text-rose-600 font-medium">
                      {item.alasan}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data verifikasi izin kapal tidak ditemukan.
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
    </Layout>
  )
}
