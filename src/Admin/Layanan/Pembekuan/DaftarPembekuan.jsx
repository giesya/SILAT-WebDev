import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Building2,
  Ship,
  ShieldAlert,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileText
} from 'lucide-react'

// Data for Izin Usaha Pembekuan
const SAMPLE_PEMBEKUAN_IU = [
  {
    id: 1,
    ownerName: 'PT Samudera Bahari Nusantara',
    address: 'Jl. Muara Baru Raya No. 45, Penjaringan, Jakarta Utara, DKI Jakarta',
    siupNo: 'SIUP-01.26.31.00192',
    revisionNo: 'REV-02',
    freezeDate: '10 Jan 2026',
    freezeReason: 'Surat Peringatan III telah melewati batas waktu pelaporan logbook penangkapan ikan',
    unfreezeDate: '-',
    unfreezeReason: '-',
  },
  {
    id: 2,
    ownerName: 'CV Mina Makmur Abadi',
    address: 'Jl. Pelabuhan Benoa No. 12, Denpasar Selatan, Bali',
    siupNo: 'SIUP-01.25.12.00084',
    revisionNo: 'REV-00',
    freezeDate: '15 Des 2025',
    freezeReason: 'Tunggakan pembayaran PNBP Pungutan Hasil Perikanan (PHP)',
    unfreezeDate: '20 Jan 2026',
    unfreezeReason: 'Telah menyelesaikan seluruh pelunasan billing tagihan SIMPONI',
  },
  {
    id: 3,
    ownerName: 'Koperasi Nelayan Sejahtera Mandiri',
    address: 'Jl. Samudra Belawan No. 88, Belawan, Medan, Sumatera Utara',
    siupNo: 'SIUP-01.26.51.00012',
    revisionNo: 'REV-01',
    freezeDate: '02 Feb 2026',
    freezeReason: 'Ketidaksesuaian laporan data sarana dan prasarana armada perikanan',
    unfreezeDate: '-',
    unfreezeReason: '-',
  },
  {
    id: 4,
    ownerName: 'PT Pasifik Fishery Utama',
    address: 'Jl. Samratulangi No. 72, Bitung Barat, Kota Bitung, Sulawesi Utara',
    siupNo: 'SIUP-01.24.32.00119',
    revisionNo: 'REV-03',
    freezeDate: '18 Nov 2025',
    freezeReason: 'Tidak menyampaikan laporan kegiatan usaha tahunan (LKUT)',
    unfreezeDate: '10 Jan 2026',
    unfreezeReason: 'Telah menyerahkan kelengkapan LKUT terevaluasi',
  },
  {
    id: 5,
    ownerName: 'KUB Bahari Utama',
    address: 'Jl. Dermaga Cilacap No. 18, Cilacap Selatan, Jawa Tengah',
    siupNo: 'SIUP-01.24.15.00045',
    revisionNo: 'REV-00',
    freezeDate: '12 Feb 2026',
    freezeReason: 'Pelanggaran administratif kepatuhan pelaporan hasil tangkapan ikan',
    unfreezeDate: '-',
    unfreezeReason: '-',
  },
]

// Data for Izin Kapal Pembekuan
const SAMPLE_PEMBEKUAN_IK = [
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
    freezeDate: '14 Jan 2026',
    freezeReason: 'Transmitter VMS tidak aktif (offline) saat beroperasi di perairan WPPNRI 711',
    unfreezeDate: '-',
    unfreezeReason: '-',
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
    freezeDate: '20 Des 2025',
    freezeReason: 'Pelanggaran rute pelabuhan pangkalan muat dan bongkar komoditas ikan',
    unfreezeDate: '15 Jan 2026',
    unfreezeReason: 'Telah diverifikasi kesesuaian trayek angkut resmi oleh petugas pangkalan',
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
    freezeDate: '05 Feb 2026',
    freezeReason: 'Beroperasi di luar Daerah Penangkapan Ikan (DPI) yang telah ditetapkan',
    unfreezeDate: '-',
    unfreezeReason: '-',
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
    freezeDate: '10 Jan 2026',
    freezeReason: 'Penggunaan mata jaring alat tangkap tidak sesuai spesifikasi teknis SIPI',
    unfreezeDate: '02 Feb 2026',
    unfreezeReason: 'Telah dilakukan inspeksi ulang fisik alat tangkap di pelabuhan pangkalan',
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
    freezeDate: '18 Feb 2026',
    freezeReason: 'Tidak mengaktifkan AIS dan transmisi sinyal VMS selama pelayaran di laut lepas',
    unfreezeDate: '-',
    unfreezeReason: '-',
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

export default function DaftarPembekuan({ onLogout }) {
  const [activeTab, setActiveTab] = useState('izin_usaha')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'freezeDate', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTab])

  // Get active dataset
  const currentDataset = useMemo(() => {
    return activeTab === 'izin_usaha' ? SAMPLE_PEMBEKUAN_IU : SAMPLE_PEMBEKUAN_IK
  }, [activeTab])

  // Filter dataset based on search bar query
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return currentDataset
    return currentDataset.filter((item) =>
      Object.values(item).some((v) => String(v).toLowerCase().includes(q))
    )
  }, [currentDataset, searchQuery])

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
    { label: 'Daftar Pembekuan' },
  ]

  return (
    <Layout
      currentPath="/layanan/pembekuan/daftar"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Pembekuan"
    >
      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-6">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">
          Pencarian Data Pembekuan
        </h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pemilik, alamat, nomor izin, keterangan pembekuan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)] font-medium"
          />
        </div>
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
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>
              Daftar Pembekuan {activeTab === 'izin_usaha' ? 'Izin Usaha (SIUP)' : 'Izin Kapal (SIPI/SIKPI)'} ({sortedData.length} data)
            </span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'izin_usaha' ? (
            /* Table for Izin Usaha: Nama Pemilik, Alamat, No. Izin Usaha, No. Revisi, Tanggal beku, Keterangan Beku, Tanggal Batal Beku, Keterangan Batal Beku */
            <table className="w-full text-left text-sm border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                  <SortableTh label="NAMA PEMILIK" sortKey="ownerName" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="ALAMAT" sortKey="address" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. IZIN USAHA" sortKey="siupNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="NO. REVISI" sortKey="revisionNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL BEKU" sortKey="freezeDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN BEKU" sortKey="freezeReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL BATAL BEKU" sortKey="unfreezeDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN BATAL BEKU" sortKey="unfreezeReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
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

                    {/* Tanggal Beku */}
                    <td className="px-4 py-4 text-amber-700 font-semibold whitespace-nowrap">
                      {item.freezeDate}
                    </td>

                    {/* Keterangan Beku */}
                    <td className="px-4 py-4 text-slate-700 max-w-sm leading-snug">
                      {item.freezeReason}
                    </td>

                    {/* Tanggal Batal Beku */}
                    <td className="px-4 py-4 text-emerald-700 font-semibold whitespace-nowrap">
                      {item.unfreezeDate}
                    </td>

                    {/* Keterangan Batal Beku */}
                    <td className="px-4 py-4 text-slate-600 max-w-sm leading-snug">
                      {item.unfreezeReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Table for Izin Kapal: Nama Pemilik, Alamat, No. Izin Usaha, No. Revisi, No. Izin Kapal, Nama Kapal, Alat Tangkap, Berat Kotor, Tanggal Beku, Keterangan Beku, Tanggal Batal beku, Keterangan Batal beku */
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
                  <SortableTh label="TANGGAL BEKU" sortKey="freezeDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN BEKU" sortKey="freezeReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="TANGGAL BATAL BEKU" sortKey="unfreezeDate" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                  <SortableTh label="KETERANGAN BATAL BEKU" sortKey="unfreezeReason" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
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

                    {/* Tanggal Beku */}
                    <td className="px-4 py-4 text-amber-700 font-semibold whitespace-nowrap">
                      {item.freezeDate}
                    </td>

                    {/* Keterangan Beku */}
                    <td className="px-4 py-4 text-slate-700 max-w-sm leading-snug">
                      {item.freezeReason}
                    </td>

                    {/* Tanggal Batal Beku */}
                    <td className="px-4 py-4 text-emerald-700 font-semibold whitespace-nowrap">
                      {item.unfreezeDate}
                    </td>

                    {/* Keterangan Batal Beku */}
                    <td className="px-4 py-4 text-slate-600 max-w-sm leading-snug">
                      {item.unfreezeReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data pembekuan {activeTab === 'izin_usaha' ? 'izin usaha' : 'izin kapal'} tidak ditemukan.
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
