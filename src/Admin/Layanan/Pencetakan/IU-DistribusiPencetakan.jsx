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
  Ship
} from 'lucide-react'

const USERS_LIST = [
  'Dimas',
  'Sara Kristiana L',
  'Tiara Dwi M',
  'Windi Astuti',
]

const SAMPLE_PELUNASAN = [
  {
    id: 'PLN-001',
    owner: 'PT Samudra Pasifik Jaya',
    vessel: 'KM. Pasifik Raya',
    appNo: 'PMH-IU-2026-00350',
    permitType: 'SIUP Baru',
    permitStatus: 'Lunas (NTPN Valid)',
    receiptDate: '28 Jan 2026',
    paymentDate: '29 Jan 2026',
    officer: 'Dimas',
  },
  {
    id: 'PLN-002',
    owner: 'CV Bahtera Marina',
    vessel: 'KM. Bahtera 07',
    appNo: 'PMH-IU-2026-00362',
    permitType: 'SIUP Perpanjangan',
    permitStatus: 'Lunas (NTPN Valid)',
    receiptDate: '01 Feb 2026',
    paymentDate: '02 Feb 2026',
    officer: 'Tiara Dwi M',
  },
  {
    id: 'PLN-003',
    owner: 'PT Global Laut Utama',
    vessel: 'KM. Laut Utama 03',
    appNo: 'PMH-IU-2026-00388',
    permitType: 'SIUP Baru',
    permitStatus: 'Lunas (NTPN Valid)',
    receiptDate: '05 Feb 2026',
    paymentDate: '06 Feb 2026',
    officer: 'Sara Kristiana L',
  },
  {
    id: 'PLN-004',
    owner: 'CV Sumber Rezeki Bahari',
    vessel: 'KM. Rezeki Samudra',
    appNo: 'PMH-IU-2026-00401',
    permitType: 'SIUP Perubahan',
    permitStatus: 'Lunas (NTPN Valid)',
    receiptDate: '10 Feb 2026',
    paymentDate: '11 Feb 2026',
    officer: 'Windi Astuti',
  },
]

const SAMPLE_DOKUMEN_MASUK = [
  {
    id: 'DM-001',
    owner: 'PT Samudera Bahari Indonesia',
    vessel: 'KM. Samudera 01',
    appNo: 'PMH-IU-2026-00192',
    permitType: 'SIUP Baru',
    permitStatus: 'Siap Cetak',
    receiptDate: '12 Jan 2026',
    paymentDate: '15 Jan 2026',
    officer: 'Dimas',
  },
  {
    id: 'DM-002',
    owner: 'CV Mina Nusantara',
    vessel: 'KM. Mina Jaya 08',
    appNo: 'PMH-IU-2026-00215',
    permitType: 'SIUP Perpanjangan',
    permitStatus: 'Verifikasi Dokumen',
    receiptDate: '14 Jan 2026',
    paymentDate: '16 Jan 2026',
    officer: 'Sara Kristiana L',
  },
  {
    id: 'DM-003',
    owner: 'PT Lautan Makmur Abadi',
    vessel: 'KM. Lautan Mas',
    appNo: 'PMH-IU-2026-00248',
    permitType: 'SIUP Perubahan',
    permitStatus: 'Siap Cetak',
    receiptDate: '18 Jan 2026',
    paymentDate: '20 Jan 2026',
    officer: 'Tiara Dwi M',
  },
  {
    id: 'DM-004',
    owner: 'PT Pacific Fisheries Jaya',
    vessel: 'KM. Pacific Star',
    appNo: 'PMH-IU-2026-00281',
    permitType: 'SIUP Baru',
    permitStatus: 'Menunggu Distribusi Cetak',
    receiptDate: '22 Jan 2026',
    paymentDate: '24 Jan 2026',
    officer: 'Windi Astuti',
  },
  {
    id: 'DM-005',
    owner: 'CV Artha Samudra',
    vessel: 'KM. Artha Bahari',
    appNo: 'PMH-IU-2026-00305',
    permitType: 'SIUP Perpanjangan',
    permitStatus: 'Siap Cetak',
    receiptDate: '25 Jan 2026',
    paymentDate: '27 Jan 2026',
    officer: 'Dimas',
  },
  {
    id: 'DM-006',
    owner: 'PT Bahari Sejahtera',
    vessel: 'KM. Sejahtera 12',
    appNo: 'PMH-IU-2026-00334',
    permitType: 'SIUP Baru',
    permitStatus: 'Verifikasi Dokumen',
    receiptDate: '28 Jan 2026',
    paymentDate: '30 Jan 2026',
    officer: 'Sara Kristiana L',
  },
]

const SAMPLE_DAFTAR_DISTRIBUSI = [
  {
    id: 'DST-001',
    owner: 'PT Mina Bahari Lestari',
    vessel: 'KM. Mina Lestari 05',
    appNo: 'PMH-IU-2026-00088',
    permitType: 'SIUP Baru',
    permitStatus: 'Telah Didistribusikan',
    receiptDate: '02 Jan 2026',
    paymentDate: '04 Jan 2026',
    officer: 'Sara Kristiana L',
  },
  {
    id: 'DST-002',
    owner: 'PT Indo Pasifik Sejahtera',
    vessel: 'KM. Indo Pasifik 02',
    appNo: 'PMH-IU-2026-00104',
    permitType: 'SIUP Perpanjangan',
    permitStatus: 'Telah Didistribusikan',
    receiptDate: '05 Jan 2026',
    paymentDate: '07 Jan 2026',
    officer: 'Tiara Dwi M',
  },
  {
    id: 'DST-003',
    owner: 'CV Baruna Abadi',
    vessel: 'KM. Baruna 09',
    appNo: 'PMH-IU-2026-00122',
    permitType: 'SIUP Baru',
    permitStatus: 'Dalam Pengiriman Kurir',
    receiptDate: '08 Jan 2026',
    paymentDate: '09 Jan 2026',
    officer: 'Dimas',
  },
  {
    id: 'DST-004',
    owner: 'PT Nusantara Ocean',
    vessel: 'KM. Ocean King',
    appNo: 'PMH-IU-2026-00155',
    permitType: 'SIUP Perubahan',
    permitStatus: 'Telah Diterima Pemohon',
    receiptDate: '10 Jan 2026',
    paymentDate: '11 Jan 2026',
    officer: 'Windi Astuti',
  },
  {
    id: 'DST-005',
    owner: 'PT Maritim Samudra',
    vessel: 'KM. Maritim Utama',
    appNo: 'PMH-IU-2026-00176',
    permitType: 'SIUP Perpanjangan',
    permitStatus: 'Telah Didistribusikan',
    receiptDate: '11 Jan 2026',
    paymentDate: '12 Jan 2026',
    officer: 'Sara Kristiana L',
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

export default function IUDistribusiPencetakan({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dokumen_masuk')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'receiptDate', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // State data per tab to allow live officer change
  const [pelunasanData, setPelunasanData] = useState(SAMPLE_PELUNASAN)
  const [dokumenMasukData, setDokumenMasukData] = useState(SAMPLE_DOKUMEN_MASUK)
  const [distribusiData, setDistribusiData] = useState(SAMPLE_DAFTAR_DISTRIBUSI)

  // Modal Pilih User
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedGlobalUser, setSelectedGlobalUser] = useState(USERS_LIST[0])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTab])

  // Get active dataset
  const currentDataset = useMemo(() => {
    if (activeTab === 'pelunasan') return pelunasanData
    if (activeTab === 'dokumen_masuk') return dokumenMasukData
    return distribusiData
  }, [activeTab, pelunasanData, dokumenMasukData, distribusiData])

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
    if (activeTab === 'pelunasan') {
      setPelunasanData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, officer: newOfficer } : item))
      )
    } else if (activeTab === 'dokumen_masuk') {
      setDokumenMasukData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, officer: newOfficer } : item))
      )
    } else {
      setDistribusiData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, officer: newOfficer } : item))
      )
    }
  }

  // Batch assign all rows in current tab to selected user
  const handleApplyUserToAll = () => {
    if (activeTab === 'dokumen_masuk') {
      setDokumenMasukData((prev) =>
        prev.map((item) => ({ ...item, officer: selectedGlobalUser }))
      )
    } else if (activeTab === 'pelunasan') {
      setPelunasanData((prev) =>
        prev.map((item) => ({ ...item, officer: selectedGlobalUser }))
      )
    } else {
      setDistribusiData((prev) =>
        prev.map((item) => ({ ...item, officer: selectedGlobalUser }))
      )
    }
    setIsUserModalOpen(false)
  }

  const breadcrumbs = [
    { label: 'Pencetakan' },
    { label: 'Izin Usaha' },
    { label: 'Distribusi Pencetakan' },
  ]

  return (
    <Layout
      currentPath="/layanan/pencetakan/iu-distribusi"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Distribusi Pencetakan SIUP"
    >
      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">Pencarian Dokumen Pencetakan SIUP</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pemilik, nama kapal, nomor permohonan, status izin, petugas..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
          />
        </div>
      </section>

      {/* Tabs Selection & Button Pilih User */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('pelunasan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'pelunasan'
                ? 'bg-white text-[var(--color-primary)] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
          >
            Pelunasan SPP-PPP E-Service ({pelunasanData.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dokumen_masuk')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'dokumen_masuk'
                ? 'bg-white text-[var(--color-primary)] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
          >
            Dokumen Masuk ({dokumenMasukData.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('daftar_distribusi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'daftar_distribusi'
                ? 'bg-white text-[var(--color-primary)] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
          >
            Daftar Distribusi ({distribusiData.length})
          </button>
        </div>

        {/* Button Pilih User */}
        {activeTab === 'dokumen_masuk' && (
          <button
            type="button"
            onClick={() => setIsUserModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-95 transition cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Users className="w-4 h-4" />
            <span>Pilih User Petugas</span>
          </button>
        )}
      </div>

      {/* Main Table */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[1050px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <SortableTh label="NAMA PEMILIK" sortKey="owner" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NAMA KAPAL" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NO. PERMOHONAN" sortKey="appNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="JENIS IZIN" sortKey="permitType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="STATUS IZIN" sortKey="permitStatus" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh
                  label={activeTab === 'daftar_distribusi' ? 'TANGGAL TANDA TERIMA' : 'TGL. TANDA TERIMA'}
                  sortKey="receiptDate"
                  currentSortKey={sortConfig.key}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
                <SortableTh
                  label={activeTab === 'daftar_distribusi' ? 'TANGGAL BAYAR' : 'TANGGAL BAYAR'}
                  sortKey="paymentDate"
                  currentSortKey={sortConfig.key}
                  currentDirection={sortConfig.direction}
                  onSort={handleSort}
                />
                <th className="px-5 py-3.5 font-bold text-center min-w-[180px]">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  {/* Nama Pemilik */}
                  <td className="px-5 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                    {item.owner}
                  </td>

                  {/* Nama Kapal */}
                  <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.vessel}
                  </td>

                  {/* No. Permohonan */}
                  <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                    {item.appNo}
                  </td>

                  {/* Jenis Izin */}
                  <td className="px-5 py-4 text-slate-700 whitespace-nowrap">
                    {item.permitType}
                  </td>

                  {/* Status Izin */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800">
                      {item.permitStatus}
                    </span>
                  </td>

                  {/* Tgl. Tanda Terima */}
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {item.receiptDate}
                  </td>

                  {/* Tanggal Bayar */}
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {item.paymentDate}
                  </td>

                  {/* Aksi (Dropdown Pilihan User Petugas: Dimas, Sara Kristiana L, Tiara Dwi M, Windi Astuti) */}
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
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data dokumen pencetakan tidak ditemukan.
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
                  Pilih User Petugas Pencetakan
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
              Pilih nama petugas pencetakan yang akan ditugaskan untuk memproses dokumen masuk:
            </p>

            <div className="space-y-2">
              {USERS_LIST.map((user) => (
                <label
                  key={user}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${selectedGlobalUser === user
                      ? 'border-[var(--color-primary)] bg-blue-50/50 text-[var(--color-primary)] font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="globalUser"
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
