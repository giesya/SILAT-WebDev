import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Plus,
  CheckCircle2,
  Check,
  ShieldCheck,
  X,
  FilePlus2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const SAMPLE_PERMOHONAN_SIPR = [
  {
    id: 'PMH-SIPR-2026-001',
    date: '2026-01-12',
    displayDate: '12 Jan 2026',
    applicant: 'PT Laut Nusantara',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    status: 'Baru',
    notes: 'Pemasangan 3 unit atraktor rumpon dasar di WPPNRI 711 Natuna',
  },
  {
    id: 'PMH-SIPR-2026-002',
    date: '2026-01-18',
    displayDate: '18 Jan 2026',
    applicant: 'CV Mina Bahari',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    status: 'Perpanjangan',
    notes: 'Perpanjangan masa berlaku 2 unit rumpon permukaan di WPPNRI 712',
  },
  {
    id: 'PMH-SIPR-2026-003',
    date: '2026-02-02',
    displayDate: '02 Feb 2026',
    applicant: 'Andi Rizky (KM. Sinar Bahari)',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    status: 'Perubahan',
    notes: 'Pergeseran titik koordinat 06°05\'S 112°45\'E ke zona aman ALKI',
  },
  {
    id: 'PMH-SIPR-2026-004',
    date: '2026-02-14',
    displayDate: '14 Feb 2026',
    applicant: 'PT Samudera Abadi Sentosa',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    status: 'Perluasan',
    notes: 'Penambahan 1 unit atraktor rumpon hanyut di WPPNRI 573',
  },
  {
    id: 'PMH-SIPR-2026-005',
    date: '2026-02-20',
    displayDate: '20 Feb 2026',
    applicant: 'PT Indo Mina Perkasa',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    status: 'Baru',
    notes: 'Pemasangan 4 unit rumpon laut dalam WPPNRI 714 Laut Banda',
  },
  {
    id: 'PMH-SIPR-2026-006',
    date: '2026-02-26',
    displayDate: '26 Feb 2026',
    applicant: 'Hendro Wijaya',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    status: 'Penggantian',
    notes: 'Penggantian tali dan pelampung rumpon yang rusak akibat cuaca',
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

export default function IRDaftarPermohonan({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState(SAMPLE_PERMOHONAN_SIPR)
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [actionNotice, setActionNotice] = useState(null)
  const [showModalNew, setShowModalNew] = useState(false)
  const [newApplicant, setNewApplicant] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return data

    return data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(q))
    )
  }, [data, searchQuery])

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

  const handleAction = (type, item) => {
    setActionNotice({
      type,
      message:
        type === 'verifikasi'
          ? `Berkas ${item.id} (${item.applicant}) berhasil dialihkan ke tahap Verifikasi Teknis.`
          : `Permohonan ${item.id} (${item.applicant}) telah ditandai Selesai.`,
    })
    setTimeout(() => {
      setActionNotice(null)
    }, 4000)
  }

  const handleCreatePermohonan = (e) => {
    e.preventDefault()
    if (!newApplicant.trim()) return

    const newId = `PMH-SIPR-2026-00${data.length + 1}`
    const today = new Date().toISOString().split('T')[0]
    const newItem = {
      id: newId,
      date: today,
      displayDate: 'Hari ini',
      applicant: newApplicant,
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Baru',
      notes: newNotes || 'Pengajuan permohonan SIPR baru',
    }

    setData([newItem, ...data])
    setShowModalNew(false)
    setNewApplicant('')
    setNewNotes('')
    setActionNotice({
      type: 'create',
      message: `Permohonan baru ${newId} (${newItem.applicant}) berhasil didaftarkan.`,
    })
  }

  const breadcrumbs = [
    { label: 'Layanan' },
    { label: 'Permohonan' },
    { label: 'Daftar Permohonan SIPR' },
  ]

  return (
    <Layout
      currentPath="/layanan/permohonan/ir/daftar-permohonan"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Permohonan Izin Rumpon (SIPR)"
    >
      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionNotice.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Bar & Button Permohonan Header */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor permohonan, nama pemohon, keterangan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowModalNew(true)}
            className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-95 transition cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Permohonan</span>
          </button>
        </div>
      </section>

      {/* Tabel Data Permohonan SIPR */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3.5 font-bold w-12 text-center">No.</th>
                <SortableTh label="Tanggal Permohonan" sortKey="date" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Pemohon" sortKey="applicant" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="No. Permohonan" sortKey="id" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Jenis Permohonan" sortKey="permitType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Status Permohonan" sortKey="status" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <th className="px-5 py-3.5 font-bold">Keterangan</th>
                <th className="px-5 py-3.5 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {paginatedData.map((item, index) => {
                const rowNumber = (currentPage - 1) * pageSize + index + 1
                return (
                  <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    {/* No. */}
                    <td className="px-4 py-4 text-center font-bold text-slate-500">
                      {rowNumber}
                    </td>

                    {/* Tanggal Permohonan */}
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      {item.displayDate}
                    </td>

                    {/* Pemohon */}
                    <td className="px-5 py-4 font-bold text-[var(--color-text)]">
                      {item.applicant}
                    </td>

                    {/* No. Permohonan */}
                    <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                      {item.id}
                    </td>

                    {/* Jenis Permohonan */}
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {item.permitType}
                    </td>

                    {/* Status Permohonan */}
                    <td className="px-5 py-4 text-slate-800 font-medium whitespace-nowrap">
                      {item.status}
                    </td>

                    {/* Keterangan */}
                    <td className="px-5 py-4 text-slate-600 max-w-xs leading-snug">
                      {item.notes}
                    </td>

                    {/* Aksi (Button Verifikasi dan Selesai atas-bawah) */}
                    <td className="px-5 py-3 text-center whitespace-nowrap">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAction('verifikasi', item)}
                          className="w-24 py-1.5 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Verifikasi Berkas"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verifikasi</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAction('selesai', item)}
                          className="w-24 py-1.5 px-2 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Tandai Selesai"
                        >
                          <Check className="w-3 h-3" />
                          <span>Selesai</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data permohonan SIPR tidak ditemukan.
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

      {/* Modal Tambah Permohonan Baru */}
      {showModalNew && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowModalNew(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FilePlus2 className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-base text-[var(--color-text)]">
                  Pendaftaran Permohonan SIPR Baru
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModalNew(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePermohonan} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Pemohon / Perusahaan *
                </label>
                <input
                  type="text"
                  required
                  value={newApplicant}
                  onChange={(e) => setNewApplicant(e.target.value)}
                  placeholder="Contoh: PT Laut Nusantara"
                  className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Jenis Permohonan
                </label>
                <input
                  type="text"
                  readOnly
                  value="SURAT IZIN PENEMPATAN RUMPON (SIPR)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Keterangan Titik Pemasangan & WPPNRI
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Contoh: Pemasangan 3 unit atraktor rumpon dasar di WPPNRI 711 Natuna..."
                  className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModalNew(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Daftarkan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
