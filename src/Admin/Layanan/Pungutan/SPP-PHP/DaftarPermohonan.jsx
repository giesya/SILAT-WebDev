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

const SAMPLE_PERMOHONAN_PHP = [
  {
    id: 'PMH-PHP-001',
    owner: 'PT Samudra Bahari',
    vessel: 'KM. Bahari 08',
    siup: 'SIUP-B-2024-0012',
    address: 'Jl. Samudra Hindia No. 10, Jakarta Utara',
    pic: 'H. Ridwan Kamil',
    totalCatch: '45.000 Kg',
    billingAmount: 'Rp 145.000.000',
    billingCode: '820199001234',
    status: 'Siap Terbit SPP',
  },
  {
    id: 'PMH-PHP-002',
    owner: 'CV Mina Jaya Mandiri',
    vessel: 'KM. Mina Jaya 02',
    siup: 'SIUP-B-2023-0056',
    address: 'Jl. Mina Bahari No. 25, Cilacap',
    pic: 'Siti Rohmah',
    totalCatch: '22.500 Kg',
    billingAmount: 'Rp 68.500.000',
    billingCode: '820199556789',
    status: 'Siap Terbit SPP',
  },
  {
    id: 'PMH-PHP-003',
    owner: 'PT Lautan Permata',
    vessel: 'KM. Permata Laut 05',
    siup: 'SIUP-B-2024-0198',
    address: 'Jl. Pelabuhan Ratu No. 14, Sukabumi',
    pic: 'Budi Santoso',
    totalCatch: '38.000 Kg',
    billingAmount: 'Rp 112.000.000',
    billingCode: '820199334411',
    status: 'Siap Terbit SPP',
  },
  {
    id: 'PMH-PHP-004',
    owner: 'Andi Rizky',
    vessel: 'KM. Sinar Bahari',
    siup: 'SIUP-P-2025-0012',
    address: 'Jl. Samudra No. 8, Cirebon',
    pic: 'Andi Rizky',
    totalCatch: '18.200 Kg',
    billingAmount: 'Rp 54.000.000',
    billingCode: '820199882310',
    status: 'Siap Terbit SPP',
  },
  {
    id: 'PMH-PHP-005',
    owner: 'PT Samudera Abadi Sentosa',
    vessel: 'KM. Sinar Samudera',
    siup: 'SIUP-B-2024-0318',
    address: 'Jl. Martadinata No. 22, Bitung',
    pic: 'Ferry Tanuwijaya',
    totalCatch: '31.500 Kg',
    billingAmount: 'Rp 95.000.000',
    billingCode: '820199773199',
    status: 'Siap Terbit SPP',
  },
  {
    id: 'PMH-PHP-006',
    owner: 'PT Indo Mina Perkasa',
    vessel: 'KM. Mina Perkasa 03',
    siup: 'SIUP-B-2025-0082',
    address: 'Jl. Gabion No. 15, Belawan',
    pic: 'M. Yusuf Siregar',
    totalCatch: '52.000 Kg',
    billingAmount: 'Rp 160.000.000',
    billingCode: '820199554312',
    status: 'Siap Terbit SPP',
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

export default function SPPPHPDaftarPermohonan({ onLogout }) {
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
    if (!q) return SAMPLE_PERMOHONAN_PHP
    return SAMPLE_PERMOHONAN_PHP.filter((item) =>
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
    { label: 'SPP–PHP' },
    { label: 'Daftar Permohonan' },
  ]

  return (
    <Layout
      currentPath="/layanan/pungutan/spp-php/daftar-permohonan"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Permohonan SPP–PHP"
    >
      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">Pencarian Permohonan SPP–PHP</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pemilik, nama kapal, nomor SIUP, penanggung jawab, atau alamat..."
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
            Data permohonan SPP–PHP tidak ditemukan.
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

      {/* Modal Detail Daftar SPP */}
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
                    Rincian Surat Tagihan SPP–PHP
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
                  <span className="text-slate-500">Nama Pemilik:</span>
                  <span className="font-bold text-slate-800">{selectedSPP.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Kapal:</span>
                  <span className="font-bold text-slate-800">{selectedSPP.vessel}</span>
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
                  <span className="text-slate-500">Total Tangkapan:</span>
                  <span className="font-bold text-slate-800">{selectedSPP.totalCatch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Alamat Perusahaan:</span>
                  <span className="font-medium text-slate-700 text-right max-w-[240px]">{selectedSPP.address}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-800 font-bold">Kode Billing SIMPONI:</span>
                  <span className="font-mono text-base font-extrabold text-emerald-900">{selectedSPP.billingCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-800 font-bold">Nominal Pungutan (PHP Pascaproduksi):</span>
                  <span className="text-base font-extrabold text-emerald-700">{selectedSPP.billingAmount}</span>
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
