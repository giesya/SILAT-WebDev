import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../../components/Layout.jsx'
import Pagination from '../../../../components/Pagination.jsx'
import {
  Search,
  ReceiptText,
  Building2,
  Ship,
  X,
  CreditCard,
  CheckCircle2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const SAMPLE_DAFTAR_SPP_PPKA = [
  {
    id: 'SPP-PPKA-2026-0034',
    owner: 'PT Global Fisheries',
    vessel: 'KM. Pacific Star (Panama)',
    siup: 'SIUP-B-2024-0034',
    address: 'Jl. Pelabuhan Tanjung Priok No. 88, Jakarta Utara',
    pic: 'Capt. David Hartono',
    gt: '450 GT',
    billingAmount: 'Rp 420.000.000',
    billingCode: '820199778899',
    status: 'Lunas / Terbayar (NTPN Valid)',
    dueDate: '10 Feb 2026',
  },
  {
    id: 'SPP-PPKA-2026-0048',
    owner: 'PT Oceanic Maritim Pasifik',
    vessel: 'KM. Ocean Trader 09 (Liberia)',
    siup: 'SIUP-B-2023-0112',
    address: 'Jl. Samudra Bitung No. 12, Bitung',
    pic: 'Robert Tan',
    gt: '520 GT',
    billingAmount: 'Rp 510.000.000',
    billingCode: '820199665544',
    status: 'Menunggu Pembayaran',
    dueDate: '22 Feb 2026',
  },
  {
    id: 'SPP-PPKA-2026-0062',
    owner: 'CV Marina Nusantara',
    vessel: 'KM. Golden Harvest (Belize)',
    siup: 'SIUP-B-2024-0245',
    address: 'Jl. Dermaga Benoa No. 34, Denpasar',
    pic: 'H. Anwar Sanusi',
    gt: '380 GT',
    billingAmount: 'Rp 360.000.000',
    billingCode: '820199332211',
    status: 'Lunas / Terbayar (NTPN Valid)',
    dueDate: '01 Mar 2026',
  },
  {
    id: 'SPP-PPKA-2026-0075',
    owner: 'PT Asia Marine Logistik',
    vessel: 'KM. Asian Glory 02 (Panama)',
    siup: 'SIUP-B-2025-0019',
    address: 'Jl. Nusantara Belawan No. 50, Medan',
    pic: 'Michael Gunawan',
    gt: '600 GT',
    billingAmount: 'Rp 580.000.000',
    billingCode: '820199119988',
    status: 'Menunggu Pembayaran',
    dueDate: '12 Mar 2026',
  },
  {
    id: 'SPP-PPKA-2026-0089',
    owner: 'PT Samudera Trans Bahari',
    vessel: 'KM. Trans Ocean 01 (Vanuatu)',
    siup: 'SIUP-B-2024-0188',
    address: 'Jl. RE Martadinata No. 7, Surabaya',
    pic: 'Johan Pratama',
    gt: '420 GT',
    billingAmount: 'Rp 395.000.000',
    billingCode: '820199447722',
    status: 'Lunas / Terbayar (NTPN Valid)',
    dueDate: '18 Mar 2026',
  },
  {
    id: 'SPP-PPKA-2026-0097',
    owner: 'PT Indo Pasifik Sejahtera',
    vessel: 'KM. Nusantara Leader (Singapore)',
    siup: 'SIUP-B-2025-0094',
    address: 'Jl. Yos Sudarso No. 21, Ambon',
    pic: 'Ir. Herman Susilo',
    gt: '490 GT',
    billingAmount: 'Rp 470.000.000',
    billingCode: '820199883344',
    status: 'Menunggu Pembayaran',
    dueDate: '25 Mar 2026',
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

export default function DaftarSPPPPKA({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSPP, setSelectedSPP] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: 'owner', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SAMPLE_DAFTAR_SPP_PPKA
    return SAMPLE_DAFTAR_SPP_PPKA.filter((item) =>
      Object.values(item).some((v) => String(v).toLowerCase().includes(q))
    )
  }, [searchQuery])

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
    { label: 'Pungutan' },
    { label: 'SPP–PPKA' },
    { label: 'Daftar SPP–PPKA' },
  ]

  return (
    <Layout
      currentPath="/layanan/pungutan/spp-ppka/daftar-spp-ppka"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar SPP–PPKA"
    >
      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">Pencarian Daftar Tagihan SPP–PPKA</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pemilik, nama kapal asing, nomor SIUP, penanggung jawab, atau alamat..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
          />
        </div>
      </section>

      {/* Main Table */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <SortableTh label="PEMILIK" sortKey="owner" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NAMA KAPAL" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="SIUP" sortKey="siup" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="ALAMAT" sortKey="address" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="PENANGGUNG JAWAB" sortKey="pic" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <th className="px-5 py-3.5 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  {/* Pemilik */}
                  <td className="px-5 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                    {item.owner}
                  </td>

                  {/* Nama Kapal */}
                  <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.vessel}
                  </td>

                  {/* SIUP */}
                  <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                    {item.siup}
                  </td>

                  {/* Alamat */}
                  <td className="px-5 py-4 text-slate-600 max-w-xs leading-snug">
                    {item.address}
                  </td>

                  {/* Penanggung Jawab */}
                  <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.pic}
                  </td>

                  {/* Aksi (Button Daftar SPP) */}
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedSPP(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 cursor-pointer inline-flex items-center gap-1.5 shadow-2xs transition"
                      title="Lihat Rincian Daftar SPP"
                    >
                      <ReceiptText className="w-3.5 h-3.5" />
                      <span>Daftar SPP</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data SPP–PPKA tidak ditemukan.
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

      {/* Modal Detail SPP */}
      {selectedSPP && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedSPP(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <ReceiptText className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">
                    Surat Tagihan SPP–PPKA
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">{selectedSPP.id} · {selectedSPP.vessel}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSPP(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-4 bg-[var(--color-bg)] rounded-xl space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Pemilik / Agen:</span>
                  <span className="font-bold text-slate-800">{selectedSPP.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kapal Asing:</span>
                  <span className="font-bold text-slate-800">{selectedSPP.vessel} ({selectedSPP.gt})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor SIUP:</span>
                  <span className="font-mono font-bold text-[var(--color-primary)]">{selectedSPP.siup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Penanggung Jawab:</span>
                  <span className="font-semibold text-slate-800">{selectedSPP.pic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Alamat:</span>
                  <span className="font-medium text-slate-700 text-right max-w-[240px]">{selectedSPP.address}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-800 font-bold">Kode Billing SIMPONI:</span>
                  <span className="font-mono text-base font-extrabold text-emerald-900">{selectedSPP.billingCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-800 font-bold">Nominal Tarif Tagihan (PPKA):</span>
                  <span className="text-base font-extrabold text-emerald-700">{selectedSPP.billingAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-800 font-bold">Status Pembayaran:</span>
                  <span className="font-semibold text-emerald-800 text-xs">{selectedSPP.status}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                type="button"
                onClick={() => setSelectedSPP(null)}
                className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 cursor-pointer shadow-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
