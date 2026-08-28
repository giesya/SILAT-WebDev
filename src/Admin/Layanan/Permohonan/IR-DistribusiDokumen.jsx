import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Send,
  CheckCircle2,
  Inbox,
  ListFilter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Check,
  X
} from 'lucide-react'

const DISTRIBUSI_DATA = {
  baru: [
    {
      id: 'PMH-SIPR-2026-001',
      date: '2026-01-12',
      displayDate: '12 Jan 2026',
      applicant: 'PT Laut Nusantara',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Baru',
      notes: 'Berkas siap didistribusikan ke Dinas Kelautan dan Perikanan Prov. DKI Jakarta',
    },
    {
      id: 'PMH-SIPR-2026-002',
      date: '2026-01-18',
      displayDate: '18 Jan 2026',
      applicant: 'CV Mina Bahari',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Perpanjangan',
      notes: 'Menunggu pengiriman fisik dan digital ke PPS Nizam Zachman Jakarta',
    },
    {
      id: 'PMH-SIPR-2026-003',
      date: '2026-02-02',
      displayDate: '02 Feb 2026',
      applicant: 'Andi Rizky (KM. Sinar Bahari)',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Perubahan',
      notes: 'Validasi koordinat WPPNRI 711 selesai, siap dikirim ke DKP Kepri',
    },
    {
      id: 'PMH-SIPR-2026-004',
      date: '2026-02-14',
      displayDate: '14 Feb 2026',
      applicant: 'PT Samudera Abadi Sentosa',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Perluasan',
      notes: 'Surat rekomendasi terbit, menunggu distribusi ke Pelabuhan Benoa',
    },
  ],
  daftar: [
    {
      id: 'PMH-SIPR-2026-001',
      date: '2026-01-12',
      displayDate: '12 Jan 2026',
      applicant: 'PT Laut Nusantara',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Baru',
      notes: 'Telah didistribusikan ke DKP DKI Jakarta pada 15 Jan 2026',
    },
    {
      id: 'PMH-SIPR-2026-002',
      date: '2026-01-18',
      displayDate: '18 Jan 2026',
      applicant: 'CV Mina Bahari',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Perpanjangan',
      notes: 'Telah didistribusikan ke PPS Nizam Zachman pada 22 Jan 2026',
    },
    {
      id: 'PMH-SIPR-2026-003',
      date: '2026-02-02',
      displayDate: '02 Feb 2026',
      applicant: 'Andi Rizky (KM. Sinar Bahari)',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Perubahan',
      notes: 'Telah didistribusikan ke DKP Kepri pada 05 Feb 2026',
    },
    {
      id: 'PMH-SIPR-2026-005',
      date: '2026-02-10',
      displayDate: '10 Feb 2026',
      applicant: 'PT Indo Mina Perkasa',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Baru',
      notes: 'Telah didistribusikan ke Pelabuhan Perikanan Samudera Belawan',
    },
    {
      id: 'PMH-SIPR-2026-006',
      date: '2026-02-20',
      displayDate: '20 Feb 2026',
      applicant: 'Koperasi Nelayan Sejahtera',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Perpanjangan',
      notes: 'Telah didistribusikan ke Dinas Kelautan dan Perikanan Prov. Maluku',
    },
    {
      id: 'PMH-SIPR-2026-007',
      date: '2026-02-25',
      displayDate: '25 Feb 2026',
      applicant: 'CV Bahari Makmur',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      status: 'Penggantian',
      notes: 'Telah didistribusikan ke Pelabuhan Perikanan Nusantara Tual',
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

export default function IRDistribusiDokumen({ onLogout }) {
  const [activeTab, setActiveTab] = useState('baru')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [actionNotice, setActionNotice] = useState(null)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchQuery])

  const filteredData = useMemo(() => {
    const list = DISTRIBUSI_DATA[activeTab] || []
    const q = searchQuery.toLowerCase().trim()
    if (!q) return list

    return list.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(q))
    )
  }, [activeTab, searchQuery])

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
        type === 'distribusi'
          ? `Dokumen permohonan ${item.id} (${item.applicant}) berhasil diproses untuk didistribusikan.`
          : `Dokumen permohonan ${item.id} (${item.applicant}) telah ditandai Selesai.`,
    })
    setTimeout(() => {
      setActionNotice(null)
    }, 4000)
  }

  const breadcrumbs = [
    { label: 'Layanan' },
    { label: 'Permohonan' },
    { label: 'Distribusi Dokumen SIPR' },
  ]

  return (
    <Layout
      currentPath="/layanan/permohonan/ir/distribusi-dokumen"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Distribusi Dokumen SIPR"
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

      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-6">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">Pencarian Distribusi Dokumen</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor permohonan, nama pemohon, atau keterangan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
          />
        </div>
      </section>

      {/* 2 Opsi Tab: Baru dan Daftar */}
      <div className="flex items-center gap-2 mb-4" role="tablist">
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

      {/* Tabel Data Distribusi Dokumen */}
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

                    {/* Aksi */}
                    <td className="px-5 py-3 text-center whitespace-nowrap">
                      {activeTab === 'baru' ? (
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleAction('distribusi', item)}
                            className="w-24 py-1.5 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                            title="Distribusi Dokumen"
                          >
                            <Send className="w-3 h-3" />
                            <span>Distribusi</span>
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
                      ) : (
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleAction('distribusi', item)}
                            className="w-24 py-1.5 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                            title="Distribusi Dokumen"
                          >
                            <Send className="w-3 h-3" />
                            <span>Distribusi</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data distribusi dokumen tidak ditemukan.
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
