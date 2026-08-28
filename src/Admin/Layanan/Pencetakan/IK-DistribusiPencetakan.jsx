import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Printer,
  Users,
  UserCheck,
  CheckCircle2,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileCheck,
  Send,
  CreditCard,
  Building2,
  Ship,
  Eye,
  FileText
} from 'lucide-react'

const USERS_LIST = [
  'Akbar Rianiri',
  'Dimas',
  'M. Ichsan',
  'Rahmi Aprianti',
  'Reyne P',
  'Sara Kristiana L',
  'Sumiati',
  'Tiara Dwi M',
  'Windi Astuti',
]

// Data for Pelunasan SPP-PHP/PPKA E-Service
const SAMPLE_PELUNASAN_PHP = [
  {
    id: 'PLN-PHP-001',
    owner: 'PT Samudra Pasifik Jaya',
    siupNo: 'SIUP-01.24.31.00192',
    address: 'Jl. Pelabuhan Benoa No. 12, Denpasar',
    number: 'SPP-PHP-2026-0045',
    date: '28 Jan 2026',
    vessel: 'KM. Pasifik Raya 01',
    licenseNo: 'SIPI-01.26.11.00456',
    permitType: 'SIPI',
    permitStatus: 'Lunas E-Service',
    totalBilling: 'Rp 48.500.000',
  },
  {
    id: 'PLN-PHP-002',
    owner: 'CV Bahtera Marina Jaya',
    siupNo: 'SIUP-01.25.12.00084',
    address: 'Jl. Dermaga Muara Baru No. 88, Jakarta Utara',
    number: 'SPP-PHP-2026-0089',
    date: '02 Feb 2026',
    vessel: 'KM. Bahtera 07',
    licenseNo: 'SIPI-01.26.22.00789',
    permitType: 'SIPI',
    permitStatus: 'Lunas E-Service',
    totalBilling: 'Rp 62.000.000',
  },
  {
    id: 'PLN-PHP-003',
    owner: 'PT Global Laut Utama',
    siupNo: 'SIUP-01.26.51.00012',
    address: 'Jl. Nusantara Belawan No. 45, Medan',
    number: 'SPP-PHP-2026-0112',
    date: '08 Feb 2026',
    vessel: 'KM. Laut Utama 03',
    licenseNo: 'SIKPI-01.26.33.00312',
    permitType: 'SIKPI',
    permitStatus: 'Lunas E-Service',
    totalBilling: 'Rp 35.750.000',
  },
]

// Data for Pelunasan SPP-PPKA E-Service
const SAMPLE_PELUNASAN_PPKA = [
  {
    id: 'PLN-PPKA-001',
    owner: 'PT Global Fisheries',
    siupNo: 'SIUP-B-2024-0034',
    address: 'Jl. Pelabuhan Tanjung Priok No. 88, Jakarta Utara',
    number: 'SPP-PPKA-2026-0034',
    date: '10 Feb 2026',
    vessel: 'KM. Pacific Star (Panama)',
    licenseNo: 'SIPI-A-2026-0012',
    permitType: 'SIPI Kapal Asing',
    permitStatus: 'Lunas E-Service',
    totalBilling: 'Rp 420.000.000',
  },
  {
    id: 'PLN-PPKA-002',
    owner: 'PT Oceanic Maritim Pasifik',
    siupNo: 'SIUP-B-2023-0112',
    address: 'Jl. Samudra Bitung No. 12, Bitung',
    number: 'SPP-PPKA-2026-0048',
    date: '15 Feb 2026',
    vessel: 'KM. Ocean Trader 09 (Liberia)',
    licenseNo: 'SIKPI-A-2026-0008',
    permitType: 'SIKPI Kapal Asing',
    permitStatus: 'Lunas E-Service',
    totalBilling: 'Rp 510.000.000',
  },
  {
    id: 'PLN-PPKA-003',
    owner: 'CV Marina Nusantara',
    siupNo: 'SIUP-B-2024-0245',
    address: 'Jl. Dermaga Benoa No. 34, Denpasar',
    number: 'SPP-PPKA-2026-0062',
    date: '20 Feb 2026',
    vessel: 'KM. Golden Harvest (Belize)',
    licenseNo: 'SIPI-A-2026-0025',
    permitType: 'SIPI Kapal Asing',
    permitStatus: 'Lunas E-Service',
    totalBilling: 'Rp 360.000.000',
  },
  {
    id: 'PLN-PPKA-004',
    owner: 'PT Samudera Trans Bahari',
    siupNo: 'SIUP-B-2024-0188',
    address: 'Jl. RE Martadinata No. 7, Surabaya',
    number: 'SPP-PPKA-2026-0089',
    date: '25 Feb 2026',
    vessel: 'KM. Trans Ocean 01 (Vanuatu)',
    licenseNo: 'SIKPI-A-2026-0019',
    permitType: 'SIKPI Kapal Asing',
    permitStatus: 'Lunas E-Service',
    totalBilling: 'Rp 395.000.000',
  },
]

// Data for Dokumen Masuk
const SAMPLE_DOKUMEN_MASUK_IK = [
  {
    id: 'DMIK-001',
    owner: 'PT Samudera Bahari Indonesia',
    vessel: 'KM. Samudera 01',
    appNo: 'PMH-IK-2026-00192',
    permitType: 'SIPI',
    permitStatus: 'Siap Cetak',
    requestDate: '12 Jan 2026',
    paymentDate: '15 Jan 2026',
    officer: 'Akbar Rianiri',
  },
  {
    id: 'DMIK-002',
    owner: 'CV Mina Nusantara',
    vessel: 'KM. Mina Jaya 08',
    appNo: 'PMH-IK-2026-00215',
    permitType: 'SIPI',
    permitStatus: 'Verifikasi Dokumen',
    requestDate: '14 Jan 2026',
    paymentDate: '16 Jan 2026',
    officer: 'Dimas',
  },
  {
    id: 'DMIK-003',
    owner: 'PT Lautan Makmur Abadi',
    vessel: 'KM. Lautan Mas',
    appNo: 'PMH-IK-2026-00248',
    permitType: 'SIKPI',
    permitStatus: 'Siap Cetak',
    requestDate: '18 Jan 2026',
    paymentDate: '20 Jan 2026',
    officer: 'M. Ichsan',
  },
  {
    id: 'DMIK-004',
    owner: 'PT Pacific Fisheries Jaya',
    vessel: 'KM. Pacific Star',
    appNo: 'PMH-IK-2026-00281',
    permitType: 'SIPI',
    permitStatus: 'Menunggu Distribusi Cetak',
    requestDate: '22 Jan 2026',
    paymentDate: '24 Jan 2026',
    officer: 'Rahmi Aprianti',
  },
  {
    id: 'DMIK-005',
    owner: 'CV Artha Samudra',
    vessel: 'KM. Artha Bahari',
    appNo: 'PMH-IK-2026-00305',
    permitType: 'SIKPI',
    permitStatus: 'Siap Cetak',
    requestDate: '25 Jan 2026',
    paymentDate: '27 Jan 2026',
    officer: 'Reyne P',
  },
  {
    id: 'DMIK-006',
    owner: 'PT Bahari Sejahtera',
    vessel: 'KM. Sejahtera 12',
    appNo: 'PMH-IK-2026-00334',
    permitType: 'SIPI',
    permitStatus: 'Verifikasi Dokumen',
    requestDate: '28 Jan 2026',
    paymentDate: '30 Jan 2026',
    officer: 'Sara Kristiana L',
  },
]

// Data for Daftar Distribusi
const SAMPLE_DAFTAR_DISTRIBUSI_IK = [
  {
    id: 'DSTIK-001',
    owner: 'PT Mina Bahari Lestari',
    vessel: 'KM. Mina Lestari 05',
    appNo: 'PMH-IK-2026-00088',
    permitType: 'SIPI',
    permitStatus: 'Telah Didistribusikan',
    requestDate: '02 Jan 2026',
    paymentDate: '04 Jan 2026',
    officer: 'Sumiati',
  },
  {
    id: 'DSTIK-002',
    owner: 'PT Indo Pasifik Sejahtera',
    vessel: 'KM. Indo Pasifik 02',
    appNo: 'PMH-IK-2026-00104',
    permitType: 'SIPI',
    permitStatus: 'Telah Didistribusikan',
    requestDate: '05 Jan 2026',
    paymentDate: '07 Jan 2026',
    officer: 'Tiara Dwi M',
  },
  {
    id: 'DSTIK-003',
    owner: 'CV Baruna Abadi',
    vessel: 'KM. Baruna 09',
    appNo: 'PMH-IK-2026-00122',
    permitType: 'SIKPI',
    permitStatus: 'Dalam Pengiriman Kurir',
    requestDate: '08 Jan 2026',
    paymentDate: '09 Jan 2026',
    officer: 'Windi Astuti',
  },
  {
    id: 'DSTIK-004',
    owner: 'PT Nusantara Ocean',
    vessel: 'KM. Ocean King',
    appNo: 'PMH-IK-2026-00155',
    permitType: 'SIPI',
    permitStatus: 'Telah Diterima Pemohon',
    requestDate: '10 Jan 2026',
    paymentDate: '11 Jan 2026',
    officer: 'Akbar Rianiri',
  },
  {
    id: 'DSTIK-005',
    owner: 'PT Maritim Samudra',
    vessel: 'KM. Maritim Utama',
    appNo: 'PMH-IK-2026-00176',
    permitType: 'SIKPI',
    permitStatus: 'Telah Didistribusikan',
    requestDate: '11 Jan 2026',
    paymentDate: '12 Jan 2026',
    officer: 'Dimas',
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

export default function IKDistribusiPencetakan({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dokumen_masuk')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // State data per tab
  const [pelunasanPhpData, setPelunasanPhpData] = useState(SAMPLE_PELUNASAN_PHP)
  const [pelunasanPpkaData, setPelunasanPpkaData] = useState(SAMPLE_PELUNASAN_PPKA)
  const [dokumenMasukData, setDokumenMasukData] = useState(SAMPLE_DOKUMEN_MASUK_IK)
  const [distribusiData, setDistribusiData] = useState(SAMPLE_DAFTAR_DISTRIBUSI_IK)

  // Modal Review & Modal Pilih User
  const [selectedReviewItem, setSelectedReviewItem] = useState(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedGlobalUser, setSelectedGlobalUser] = useState(USERS_LIST[0])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTab])

  // Get active dataset
  const currentDataset = useMemo(() => {
    if (activeTab === 'pelunasan_php') return pelunasanPhpData
    if (activeTab === 'pelunasan_ppka') return pelunasanPpkaData
    if (activeTab === 'dokumen_masuk') return dokumenMasukData
    return distribusiData
  }, [activeTab, pelunasanPhpData, pelunasanPpkaData, dokumenMasukData, distribusiData])

  // Filter
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return currentDataset
    return currentDataset.filter((item) =>
      Object.values(item).some((v) => String(v).toLowerCase().includes(q))
    )
  }, [currentDataset, searchQuery])

  // Sort
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

  // Pagination
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

  // Update officer per row
  const handleOfficerChange = (id, newOfficer) => {
    if (activeTab === 'dokumen_masuk') {
      setDokumenMasukData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, officer: newOfficer } : item))
      )
    } else if (activeTab === 'daftar_distribusi') {
      setDistribusiData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, officer: newOfficer } : item))
      )
    }
  }

  // Batch assign user
  const handleApplyUserToAll = () => {
    if (activeTab === 'dokumen_masuk') {
      setDokumenMasukData((prev) =>
        prev.map((item) => ({ ...item, officer: selectedGlobalUser }))
      )
    } else if (activeTab === 'daftar_distribusi') {
      setDistribusiData((prev) =>
        prev.map((item) => ({ ...item, officer: selectedGlobalUser }))
      )
    }
    setIsUserModalOpen(false)
  }

  const breadcrumbs = [
    { label: 'Pencetakan' },
    { label: 'Izin Kapal' },
    { label: 'Distribusi Pencetakan' },
  ]

  const isPelunasanTab = activeTab === 'pelunasan_php' || activeTab === 'pelunasan_ppka'

  return (
    <Layout
      currentPath="/layanan/pencetakan/ik-distribusi"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Distribusi Pencetakan SIPI / SIKPI"
    >
      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">Pencarian Dokumen Pencetakan Izin Kapal</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pemilik, nomor SIUP, nama kapal, nomor izin, status..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
          />
        </div>
      </section>

      {/* 4 Opsi Tabs Selection */}
      <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pelunasan_php'}
          onClick={() => setActiveTab('pelunasan_php')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'pelunasan_php'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Pelunasan SPP-PHP/PPKA E-Service</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pelunasan_ppka'}
          onClick={() => setActiveTab('pelunasan_ppka')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'pelunasan_ppka'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Pelunasan SPP-PPKA E-Service</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'dokumen_masuk'}
          onClick={() => setActiveTab('dokumen_masuk')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'dokumen_masuk'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Dokumen Masuk</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'daftar_distribusi'}
          onClick={() => setActiveTab('daftar_distribusi')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'daftar_distribusi'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Daftar Distribusi</span>
        </button>
      </div>

      {/* Main Table Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          {isPelunasanTab ? (
            /* Table for Pelunasan SPP-PPKA / SPP-PHP E-Service */
            <table className="w-full text-left text-sm border-collapse min-w-[1150px]">
              <thead>
                <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                  <SortableTh label="PEMILIK" sortKey="owner" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. SIUP" sortKey="siupNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="ALAMAT" sortKey="address" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NOMOR" sortKey="number" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL" sortKey="date" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NAMA KAPAL" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. IZIN" sortKey="licenseNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="JENIS IZIN" sortKey="permitType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="STATUS IZIN" sortKey="permitStatus" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <th className="px-5 py-3.5 font-bold text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    <td className="px-5 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">{item.owner}</td>
                    <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">{item.siupNo}</td>
                    <td className="px-5 py-4 text-slate-600 max-w-xs leading-snug">{item.address}</td>
                    <td className="px-5 py-4 font-mono font-semibold text-slate-800 whitespace-nowrap">{item.number}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{item.date}</td>
                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">{item.vessel}</td>
                    <td className="px-5 py-4 font-mono font-bold text-slate-700 whitespace-nowrap">{item.licenseNo}</td>
                    <td className="px-5 py-4 font-medium text-slate-700 whitespace-nowrap">{item.permitType}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-semibold text-emerald-700">{item.permitStatus}</span>
                    </td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedReviewItem(item)}
                        className="px-3.5 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 cursor-pointer inline-flex items-center gap-1.5 shadow-2xs transition"
                        title="Review Dokumen Pelunasan"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Table for Dokumen Masuk & Daftar Distribusi */
            <table className="w-full text-left text-sm border-collapse min-w-[1050px]">
              <thead>
                <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                  <SortableTh label="NAMA PEMILIK" sortKey="owner" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NAMA KAPAL" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. PERMOHONAN" sortKey="appNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="JENIS IZIN" sortKey="permitType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="STATUS IZIN" sortKey="permitStatus" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL PERMOHONAN" sortKey="requestDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL BAYAR" sortKey="paymentDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <th className="px-5 py-3.5 font-bold text-center min-w-[200px]">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    <td className="px-5 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">{item.owner}</td>
                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">{item.vessel}</td>
                    <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">{item.appNo}</td>
                    <td className="px-5 py-4 text-slate-700 whitespace-nowrap">{item.permitType}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{item.permitStatus}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{item.requestDate}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{item.paymentDate}</td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <select
                          value={item.officer}
                          onChange={(e) => handleOfficerChange(item.id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg border border-[rgba(31,78,120,0.2)] bg-white text-xs font-bold text-slate-800 focus:outline-none focus:border-[var(--color-primary)] shadow-2xs cursor-pointer"
                        >
                          {USERS_LIST.map((user) => (
                            <option key={user} value={user}>
                              {user}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Area: Pagination & Button Pilih User di Bawah Tabel */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {activeTab === 'dokumen_masuk' && (
              <button
                type="button"
                onClick={() => setIsUserModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-95 transition cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Users className="w-4 h-4" />
                <span>Pilih User</span>
              </button>
            )}
          </div>

          <div className="flex-1 flex justify-end">
            {sortedData.length === 0 ? (
              <div className="text-center text-sm text-[var(--color-muted)] py-4">
                Data dokumen pencetakan izin kapal tidak ditemukan.
              </div>
            ) : (
              <Pagination
                currentPage={currentPage}
                totalItems={sortedData.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </section>

      {/* Modal Review Pelunasan */}
      {selectedReviewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedReviewItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">
                    Review Pelunasan E-Service Izin Kapal
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">{selectedReviewItem.number} · {selectedReviewItem.vessel}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReviewItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 p-4 bg-[var(--color-bg)] rounded-xl">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pemilik:</span>
                <span className="font-bold text-slate-800">{selectedReviewItem.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor SIUP:</span>
                <span className="font-mono font-bold text-[var(--color-primary)]">{selectedReviewItem.siupNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Alamat Perusahaan:</span>
                <span className="font-medium text-slate-700 text-right max-w-xs">{selectedReviewItem.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Kapal:</span>
                <span className="font-bold text-slate-800">{selectedReviewItem.vessel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Izin ({selectedReviewItem.permitType}):</span>
                <span className="font-mono font-bold text-slate-800">{selectedReviewItem.licenseNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Pelunasan:</span>
                <span className="font-semibold text-slate-800">{selectedReviewItem.date}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-bold">Total Pelunasan:</span>
                <span className="font-mono text-sm font-extrabold text-emerald-700">{selectedReviewItem.totalBilling}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setSelectedReviewItem(null)}
                className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer shadow-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pilih User */}
      {isUserModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsUserModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-base text-[var(--color-text)]">
                  Pilih User Petugas Distribusi Izin Kapal
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Pilih nama petugas pencetakan izin kapal yang akan ditugaskan ke seluruh baris dokumen masuk:
            </p>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {USERS_LIST.map((user) => (
                <label
                  key={user}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedGlobalUser === user
                      ? 'border-[var(--color-primary)] bg-blue-50/50 text-[var(--color-primary)] font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="globalUserIK"
                      value={user}
                      checked={selectedGlobalUser === user}
                      onChange={() => setSelectedGlobalUser(user)}
                      className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                    />
                    <span className="text-xs">{user}</span>
                  </div>
                  {selectedGlobalUser === user && (
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
                  )}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleApplyUserToAll}
                className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer shadow-xs"
              >
                Terapkan ke Semua Baris
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
