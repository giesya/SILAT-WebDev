import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Building2,
  Calendar,
  RotateCcw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileCheck2,
  Inbox,
  ListFilter
} from 'lucide-react'

const PENDOK_DATA = {
  baru: [
    {
      id: 'PND-SIUP-2026-001',
      applicant: 'PT Laut Nusantara',
      person: 'Andi Rizky',
      type: 'SIUP',
      status: 'Baru',
      verifier: 'Sara Kristiana L',
      date: '2026-01-12',
      displayDate: '12 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-004',
      applicant: 'PT Samudra Bahari Perkasa',
      person: 'Bambang Irawan',
      type: 'SIUP',
      status: 'Baru',
      verifier: 'Dimas',
      date: '2026-01-18',
      displayDate: '18 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-006',
      applicant: 'PT Indo Mina Perkasa',
      person: 'Agus Setiawan',
      type: 'SIUP',
      status: 'Perluasan',
      verifier: 'Dimas',
      date: '2026-01-21',
      displayDate: '21 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-007',
      applicant: 'CV Marina Maritim',
      person: 'Siti Rahma',
      type: 'SIUP',
      status: 'Update PIT',
      verifier: 'Tiara Dwi M',
      date: '2026-01-22',
      displayDate: '22 Jan 2026',
    },
  ],
  daftar: [
    {
      id: 'PND-SIUP-2026-001',
      applicant: 'PT Laut Nusantara',
      person: 'Andi Rizky',
      type: 'SIUP',
      status: 'Baru',
      verifier: 'Sara Kristiana L',
      date: '2026-01-12',
      displayDate: '12 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-002',
      applicant: 'CV Samudra Jaya',
      person: 'Dewi Lestari',
      type: 'SIUP',
      status: 'Perpanjangan',
      verifier: 'Dimas',
      date: '2026-01-15',
      displayDate: '15 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-003',
      applicant: 'PT Bahari Maju',
      person: 'Rizal Hidayat',
      type: 'SIUP',
      status: 'Perubahan',
      verifier: 'Tiara Dwi M',
      date: '2026-01-16',
      displayDate: '16 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-004',
      applicant: 'PT Samudra Bahari Perkasa',
      person: 'Bambang Irawan',
      type: 'SIUP',
      status: 'Penggantian',
      verifier: 'Windi Astuti',
      date: '2026-01-18',
      displayDate: '18 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-005',
      applicant: 'CV Mina Sejahtera',
      person: 'Hendro Wijaya',
      type: 'SIUP',
      status: 'Pengurangan',
      verifier: 'Sara Kristiana L',
      date: '2026-01-20',
      displayDate: '20 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-006',
      applicant: 'PT Indo Mina Perkasa',
      person: 'Agus Setiawan',
      type: 'SIUP',
      status: 'Perluasan',
      verifier: 'Dimas',
      date: '2026-01-21',
      displayDate: '21 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-007',
      applicant: 'CV Marina Maritim',
      person: 'Siti Rahma',
      type: 'SIUP',
      status: 'Update PIT',
      verifier: 'Tiara Dwi M',
      date: '2026-01-22',
      displayDate: '22 Jan 2026',
    },
    {
      id: 'PND-SIUP-2026-008',
      applicant: 'PT Samudera Abadi Sentosa',
      person: 'Fajar Nugraha',
      type: 'SIUP',
      status: 'Perpanjangan',
      verifier: 'Windi Astuti',
      date: '2026-01-24',
      displayDate: '24 Jan 2026',
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

export default function IUDaftarPendokSIUP({ onLogout }) {
  const [activeTab, setActiveTab] = useState('baru')

  // Search form states
  const [applicantQuery, setApplicantQuery] = useState('')
  const [permitType, setPermitType] = useState('SIUP')
  const [statusFilter, setStatusFilter] = useState('')
  const [verifierFilter, setVerifierFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Applied filters state (when button Cari is clicked)
  const [appliedFilters, setAppliedFilters] = useState({
    applicant: '',
    permitType: 'SIUP',
    status: '',
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
      permitType: permitType,
      status: statusFilter,
      verifier: verifierFilter,
      startDate: startDate,
      endDate: endDate,
    })
  }

  const handleReset = () => {
    setApplicantQuery('')
    setPermitType('SIUP')
    setStatusFilter('')
    setVerifierFilter('')
    setStartDate('')
    setEndDate('')
    setAppliedFilters({
      applicant: '',
      permitType: 'SIUP',
      status: '',
      verifier: '',
      startDate: '',
      endDate: '',
    })
  }

  const filteredData = useMemo(() => {
    const list = PENDOK_DATA[activeTab] || []
    return list.filter((item) => {
      // Nama Pemohon filter
      if (appliedFilters.applicant) {
        const q = appliedFilters.applicant.toLowerCase().trim()
        const matchApp = item.applicant.toLowerCase().includes(q) || item.person.toLowerCase().includes(q)
        if (!matchApp) return false
      }

      // Jenis Permohonan filter (SIUP)
      if (appliedFilters.permitType && item.type !== appliedFilters.permitType) {
        return false
      }

      // Status Permohonan filter
      if (appliedFilters.status && item.status !== appliedFilters.status) {
        return false
      }

      // Verifikator filter
      if (appliedFilters.verifier && item.verifier !== appliedFilters.verifier) {
        return false
      }

      // Tanggal filter (startDate s/d endDate)
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
    { label: 'Daftar Pendok SIUP' },
  ]

  return (
    <Layout
      currentPath="/layanan/permohonan/iu/pendok-siup"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Pendok SIUP"
    >
      {/* 2 Opsi Tab: Baru dan Daftar */}
      <div className="flex items-center gap-2 mb-6" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'baru'}
          onClick={() => setActiveTab('baru')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'baru'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Baru</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'daftar'}
          onClick={() => setActiveTab('daftar')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'daftar'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ListFilter className="w-4 h-4" />
          <span>Daftar</span>
        </button>
      </div>

      {/* Form Pencarian */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Form Pencarian Dokumen Pendukung SIUP</span>
        </h2>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Row 1: Nama Pemohon, Jenis Permohonan, Status Permohonan */}
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
                placeholder="Masukkan nama pemohon / perusahaan..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
              />
            </div>

            {/* Jenis Permohonan (SIUP saja) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jenis Permohonan
              </label>
              <select
                value={permitType}
                onChange={(e) => setPermitType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="SIUP">SIUP (Surat Izin Usaha Perikanan)</option>
              </select>
            </div>

            {/* Status Permohonan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Status Permohonan
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">Semua Status Permohonan</option>
                <option value="Baru">Baru</option>
                <option value="Penggantian">Penggantian</option>
                <option value="Pengurangan">Pengurangan</option>
                <option value="Perluasan">Perluasan</option>
                <option value="Perpanjangan">Perpanjangan</option>
                <option value="Perubahan">Perubahan</option>
                <option value="Update PIT">Update PIT</option>
              </select>
            </div>
          </div>

          {/* Row 2: Verifikator, Tanggal Permohonan s/d, Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Verifikator */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Verifikator
              </label>
              <select
                value={verifierFilter}
                onChange={(e) => setVerifierFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">Semua Verifikator</option>
                <option value="Dimas">Dimas</option>
                <option value="Sara Kristiana L">Sara Kristiana L</option>
                <option value="Tiara Dwi M">Tiara Dwi M</option>
                <option value="Windi Astuti">Windi Astuti</option>
              </select>
            </div>

            {/* Tanggal Permohonan s/d */}
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Permohonan
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
            <div className="md:col-span-3 flex items-center gap-2">
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

      {/* Tabel Data Pendok SIUP */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <SortableTh label="No. Berkas" sortKey="id" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Nama Pemohon" sortKey="applicant" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Penanggung Jawab" sortKey="person" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Jenis Permohonan" sortKey="type" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Status Permohonan" sortKey="status" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Verifikator" sortKey="verifier" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Tanggal Permohonan" sortKey="date" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)]">
                    {item.id}
                  </td>
                  <td className="px-5 py-4 font-bold text-[var(--color-text)]">
                    {item.applicant}
                  </td>
                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {item.person}
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-800">{item.type}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-800 font-medium">
                    {item.status}
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {item.verifier}
                  </td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {item.displayDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data dokumen pendukung SIUP tidak ditemukan.
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
