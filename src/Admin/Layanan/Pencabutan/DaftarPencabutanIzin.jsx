import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Building2,
  Ship,
  Ban,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  RotateCcw
} from 'lucide-react'

// Data for Izin Usaha Pencabutan
const SAMPLE_PENCABUTAN_IU = [
  {
    id: 1,
    ownerName: 'PT Samudera Bahari Nusantara',
    address: 'Jl. Muara Baru Raya No. 45, Penjaringan, Jakarta Utara, DKI Jakarta',
    siupNo: 'SIUP-01.26.31.00192',
    revisionNo: 'REV-02',
    rawRevocationDate: '2026-01-15',
    revocationDate: '15 Jan 2026',
    revocationReason: 'Permohonan pengembalian izin usaha atas inisiatif dan likuidasi badan usaha',
    unrevocationDate: '-',
    unrevocationReason: '-',
  },
  {
    id: 2,
    ownerName: 'CV Mina Makmur Abadi',
    address: 'Jl. Pelabuhan Benoa No. 12, Denpasar Selatan, Bali',
    siupNo: 'SIUP-01.25.12.00084',
    revisionNo: 'REV-00',
    rawRevocationDate: '2025-12-20',
    revocationDate: '20 Des 2025',
    revocationReason: 'Pelanggaran berat ketentuan perizinan dan tindak pidana perikanan',
    unrevocationDate: '10 Feb 2026',
    unrevocationReason: 'Putusan inkrah Pengadilan Negeri membatalkan sanksi pencabutan',
  },
  {
    id: 3,
    ownerName: 'Koperasi Nelayan Sejahtera Mandiri',
    address: 'Jl. Samudra Belawan No. 88, Belawan, Medan, Sumatera Utara',
    siupNo: 'SIUP-01.26.51.00012',
    revisionNo: 'REV-01',
    rawRevocationDate: '2026-02-05',
    revocationDate: '05 Feb 2026',
    revocationReason: 'Badan hukum koperasi telah dibubarkan berdasarkan ketetapan Rapat Anggota Tahunan',
    unrevocationDate: '-',
    unrevocationReason: '-',
  },
  {
    id: 4,
    ownerName: 'PT Pasifik Fishery Utama',
    address: 'Jl. Samratulangi No. 72, Bitung Barat, Kota Bitung, Sulawesi Utara',
    siupNo: 'SIUP-01.24.32.00119',
    revisionNo: 'REV-03',
    rawRevocationDate: '2025-11-10',
    revocationDate: '10 Nov 2025',
    revocationReason: 'Tidak melakukan kegiatan operasional usaha perikanan selama 2 tahun berturut-turut',
    unrevocationDate: '15 Jan 2026',
    unrevocationReason: 'Pengajuan banding administratif disetujui Dirjen dengan pemenuhan syarat',
  },
  {
    id: 5,
    ownerName: 'KUB Bahari Utama',
    address: 'Jl. Dermaga Cilacap No. 18, Cilacap Selatan, Jawa Tengah',
    siupNo: 'SIUP-01.24.15.00045',
    revisionNo: 'REV-00',
    rawRevocationDate: '2026-02-18',
    revocationDate: '18 Feb 2026',
    revocationReason: 'Pencabutan izin atas permohonan penggabungan (merger) badan usaha',
    unrevocationDate: '-',
    unrevocationReason: '-',
  },
]

// Data for Izin Kapal Pencabutan
const SAMPLE_PENCABUTAN_IK = [
  {
    id: 1,
    ownerName: 'PT Samudra Sejahtera Mandiri',
    address: 'Jl. Pelabuhan Benoa No. 12, Denpasar Selatan, Bali',
    siupNo: 'SIUP-01.26.31.00192',
    revisionNo: 'REV-02',
    licenseNo: 'SIPI-01.26.11.00456',
    vesselName: 'KM. Sinar Laut 08',
    gearType: 'Pukat Cincin Pelagis Besar dengan Satu Kapal',
    grossTonnage: '120 GT',
    rawRevocationDate: '2026-01-20',
    revocationDate: '20 Jan 2026',
    revocationReason: 'Kapal telah dialihkan kepemilikannya (dijual) ke perusahaan lain',
    unrevocationDate: '-',
    unrevocationReason: '-',
  },
  {
    id: 2,
    ownerName: 'CV Mina Bahari Utama',
    address: 'Jl. Dermaga Muara Baru No. 88, Penjaringan, Jakarta Utara',
    siupNo: 'SIUP-01.25.12.00084',
    revisionNo: 'REV-00',
    licenseNo: 'SIKPI-01.26.22.00312',
    vesselName: 'KM. Mina Bahari 01',
    gearType: 'Kapal Pengangkut Ikan antar Pelabuhan Pangkalan',
    grossTonnage: '280 GT',
    rawRevocationDate: '2025-12-15',
    revocationDate: '15 Des 2025',
    revocationReason: 'Kapal mengalami musibah tenggelam dan dinyatakan afkir permanen',
    unrevocationDate: '-',
    unrevocationReason: '-',
  },
  {
    id: 3,
    ownerName: 'Koperasi Nelayan Pasifik Raya',
    address: 'Jl. Samudra Belawan No. 88, Medan, Sumatera Utara',
    siupNo: 'SIUP-01.26.51.00012',
    revisionNo: 'REV-01',
    licenseNo: 'SIPI-01.25.33.00789',
    vesselName: 'KM. Pasifik Jaya 09',
    gearType: 'Rawai Tuna',
    grossTonnage: '85 GT',
    rawRevocationDate: '2026-02-10',
    revocationDate: '10 Feb 2026',
    revocationReason: 'Penggunaan alat tangkap terlarang (destructive fishing) yang melanggar UU',
    unrevocationDate: '-',
    unrevocationReason: '-',
  },
  {
    id: 4,
    ownerName: 'KUB Nelayan Makmur',
    address: 'Jl. Dermaga Cilacap No. 18, Cilacap Selatan, Jawa Tengah',
    siupNo: 'SIUP-01.24.15.00045',
    revisionNo: 'REV-00',
    licenseNo: 'SIPI-01.26.44.00119',
    vesselName: 'KM. Berkah Laut 03',
    gearType: 'Bagan Berperahu Teri',
    grossTonnage: '45 GT',
    rawRevocationDate: '2026-01-08',
    revocationDate: '08 Jan 2026',
    revocationReason: 'Permohonan penghapusan kapal dari daftar armada perikanan aktif',
    unrevocationDate: '28 Jan 2026',
    unrevocationReason: 'Pembatalan permohonan penghapusan kapal atas permohonan pemilik',
  },
  {
    id: 5,
    ownerName: 'PT Lautan Artha Pasifik',
    address: 'Jl. Yos Sudarso No. 101, Pelabuhan Tanjung Emas, Semarang, Jawa Tengah',
    siupNo: 'SIUP-01.25.72.00062',
    revisionNo: 'REV-01',
    licenseNo: 'SIKPI-01.24.55.00210',
    vesselName: 'KM. Artha Bahari 05',
    gearType: 'Kapal Pengangkut Ikan di Laut Lepas',
    grossTonnage: '450 GT',
    rawRevocationDate: '2026-02-22',
    revocationDate: '22 Feb 2026',
    revocationReason: 'Pencabutan izin alih muatan kapal (transshipment) ilegal di perairan internasional',
    unrevocationDate: '-',
    unrevocationReason: '-',
  },
]

function SortableTh({ label, sortKey, currentSortKey, currentDirection, onSort, className = '' }) {
  const isActive = currentSortKey === sortKey
  return (
    <th
      className={`px-4 py-3.5 font-bold cursor-pointer select-none hover:bg-white/15 transition-colors ${className}`}
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

export default function DaftarPencabutanIzin({ onLogout }) {
  const [activeTab, setActiveTab] = useState('izin_usaha')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    from: '',
    to: '',
  })

  const [sortConfig, setSortConfig] = useState({ key: 'revocationDate', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [appliedFilters, activeTab])

  // Get active dataset
  const currentDataset = useMemo(() => {
    return activeTab === 'izin_usaha' ? SAMPLE_PENCABUTAN_IU : SAMPLE_PENCABUTAN_IK
  }, [activeTab])

  // Handle Search & Reset
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault()
    setAppliedFilters({
      search: searchQuery,
      from: dateFrom,
      to: dateTo,
    })
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setDateFrom('')
    setDateTo('')
    setAppliedFilters({
      search: '',
      from: '',
      to: '',
    })
  }

  // Filter dataset based on search and date range
  const filteredData = useMemo(() => {
    return currentDataset.filter((item) => {
      // 1. Text search
      const q = appliedFilters.search.toLowerCase().trim()
      const matchText = !q || Object.values(item).some((v) => String(v).toLowerCase().includes(q))

      // 2. Date range comparison on rawRevocationDate (YYYY-MM-DD)
      let matchDate = true
      if (appliedFilters.from && item.rawRevocationDate) {
        if (item.rawRevocationDate < appliedFilters.from) matchDate = false
      }
      if (appliedFilters.to && item.rawRevocationDate) {
        if (item.rawRevocationDate > appliedFilters.to) matchDate = false
      }

      return matchText && matchDate
    })
  }, [currentDataset, appliedFilters])

  // Sort dataset
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
    { label: 'Pembekuan & Pencabutan' },
    { label: 'Daftar Pencabutan Izin' },
  ]

  return (
    <Layout
      currentPath="/layanan/pencabutan/daftar"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Pencabutan Izin"
    >
      {/* Search & Date Range Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-6">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-4">
          Pencarian Data Pencabutan
        </h2>

        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Input Biasa (7 Cols) */}
            <div className="lg:col-span-7">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Pencarian Umum
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama pemilik, alamat, nomor izin, nama kapal, alasan..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] font-medium"
                />
              </div>
            </div>

            {/* Rentang Tanggal Cabut: Dari s/d Sampai (5 Cols) */}
            <div className="lg:col-span-5">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tanggal Cabut
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs text-[var(--color-text)] font-medium focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <span className="text-xs font-bold text-slate-400">s/d</span>
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs text-[var(--color-text)] font-medium focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Cari di Kiri, Bersihkan di Kanan (di Pojok Kanan Bawah) */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cari</span>
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bersihkan</span>
            </button>
          </div>
        </form>
      </section>

      {/* 2 Opsi Tabs: Izin Usaha & Izin Kapal */}
      <div className="flex items-center gap-2 mb-6" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'izin_usaha'}
          onClick={() => setActiveTab('izin_usaha')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'izin_usaha'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Izin Usaha</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'izin_kapal'}
          onClick={() => setActiveTab('izin_kapal')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'izin_kapal'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>Izin Kapal</span>
        </button>
      </div>

      {/* Output Table Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-600" />
            <span>
              Daftar Pencabutan {activeTab === 'izin_usaha' ? 'Izin Usaha (SIUP)' : 'Izin Kapal (SIPI/SIKPI)'} ({sortedData.length} data)
            </span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'izin_usaha' ? (
            /* Table for Izin Usaha: Nama Pemilik, Alamat, No. Izin Usaha, No. Revisi, Tanggal Cabut, Keterangan Cabut, Tanggal Batal Cabut, Keterangan Batal Cabut */
            <table className="w-full text-left text-sm border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                  <SortableTh label="NAMA PEMILIK" sortKey="ownerName" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="ALAMAT" sortKey="address" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. IZIN USAHA" sortKey="siupNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. REVISI" sortKey="revisionNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL CABUT" sortKey="rawRevocationDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN CABUT" sortKey="revocationReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL BATAL CABUT" sortKey="unrevocationDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN BATAL CABUT" sortKey="unrevocationReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    {/* Nama Pemilik */}
                    <td className="px-4 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                      {item.ownerName}
                    </td>

                    {/* Alamat */}
                    <td className="px-4 py-4 text-slate-600 max-w-xs leading-snug">
                      {item.address}
                    </td>

                    {/* No. Izin Usaha */}
                    <td className="px-4 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                      {item.siupNo}
                    </td>

                    {/* No. Revisi */}
                    <td className="px-4 py-4 font-mono font-medium text-slate-700 whitespace-nowrap">
                      {item.revisionNo}
                    </td>

                    {/* Tanggal Cabut */}
                    <td className="px-4 py-4 text-rose-700 font-semibold whitespace-nowrap">
                      {item.revocationDate}
                    </td>

                    {/* Keterangan Cabut */}
                    <td className="px-4 py-4 text-slate-700 max-w-sm leading-snug">
                      {item.revocationReason}
                    </td>

                    {/* Tanggal Batal Cabut */}
                    <td className="px-4 py-4 text-emerald-700 font-semibold whitespace-nowrap">
                      {item.unrevocationDate}
                    </td>

                    {/* Keterangan Batal Cabut */}
                    <td className="px-4 py-4 text-slate-600 max-w-sm leading-snug">
                      {item.unrevocationReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Table for Izin Kapal: Nama Pemilik, Alamat, No. Izin Usaha, No. Revisi, No. Izin Kapal, Nama Kapal, Alat Tangkap, Berat Kotor, Tanggal Cabut, Keterangan Cabut, Tanggal Batal Cabut, Keterangan Batal Cabut */
            <table className="w-full text-left text-sm border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                  <SortableTh label="NAMA PEMILIK" sortKey="ownerName" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="ALAMAT" sortKey="address" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. IZIN USAHA" sortKey="siupNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. REVISI" sortKey="revisionNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. IZIN KAPAL" sortKey="licenseNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NAMA KAPAL" sortKey="vesselName" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="ALAT TANGKAP" sortKey="gearType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="BERAT KOTOR" sortKey="grossTonnage" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL CABUT" sortKey="rawRevocationDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN CABUT" sortKey="revocationReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL BATAL CABUT" sortKey="unrevocationDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN BATAL CABUT" sortKey="unrevocationReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    {/* Nama Pemilik */}
                    <td className="px-4 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                      {item.ownerName}
                    </td>

                    {/* Alamat */}
                    <td className="px-4 py-4 text-slate-600 max-w-xs leading-snug">
                      {item.address}
                    </td>

                    {/* No. Izin Usaha */}
                    <td className="px-4 py-4 font-mono font-semibold text-slate-800 whitespace-nowrap">
                      {item.siupNo}
                    </td>

                    {/* No. Revisi */}
                    <td className="px-4 py-4 font-mono font-medium text-slate-700 whitespace-nowrap">
                      {item.revisionNo}
                    </td>

                    {/* No. Izin Kapal */}
                    <td className="px-4 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                      {item.licenseNo}
                    </td>

                    {/* Nama Kapal */}
                    <td className="px-4 py-4 font-bold text-slate-800 whitespace-nowrap">
                      {item.vesselName}
                    </td>

                    {/* Alat Tangkap */}
                    <td className="px-4 py-4 text-slate-700 max-w-xs">
                      {item.gearType}
                    </td>

                    {/* Berat Kotor */}
                    <td className="px-4 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {item.grossTonnage}
                    </td>

                    {/* Tanggal Cabut */}
                    <td className="px-4 py-4 text-rose-700 font-semibold whitespace-nowrap">
                      {item.revocationDate}
                    </td>

                    {/* Keterangan Cabut */}
                    <td className="px-4 py-4 text-slate-700 max-w-sm leading-snug">
                      {item.revocationReason}
                    </td>

                    {/* Tanggal Batal Cabut */}
                    <td className="px-4 py-4 text-emerald-700 font-semibold whitespace-nowrap">
                      {item.unrevocationDate}
                    </td>

                    {/* Keterangan Batal Cabut */}
                    <td className="px-4 py-4 text-slate-600 max-w-sm leading-snug">
                      {item.unrevocationReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data pencabutan {activeTab === 'izin_usaha' ? 'izin usaha' : 'izin kapal'} tidak ditemukan.
          </div>
        ) : (
          <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalItems={sortedData.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>
    </Layout>
  )
}
