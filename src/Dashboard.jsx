import { useState, useMemo, useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Pagination from './components/Pagination.jsx'
import {
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  FileText,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const APPLICATIONS = [
  {
    id: 'siup-1',
    applicantName: 'PT Laut Nusantara',
    vesselOrOwner: 'KM. Laut Nusantara 01',
    date: '12 Jan 2026',
    type: 'SIUP',
    verifier: 'Siti Rahmawati',
    stage: 'Tahap 3 dari 5',
    status: 'Verifikasi Teknis & Lapangan',
    lastUpdated: 'Kamis, 15 Jan 2026 · 13:42 WIB',
    steps: [
      { name: 'Pengajuan Diterima & Validasi Berkas Awal', time: 'Senin, 12 Jan 2026 · 09:14 WIB', done: true },
      { name: 'Verifikasi Dokumen Administrasi & NPWP', time: 'Selasa, 13 Jan 2026 · 11:20 WIB', done: true },
      { name: 'Verifikasi Teknis Kelayakan Lapangan', time: 'Kamis, 15 Jan 2026 · 13:42 WIB', current: true },
      { name: 'Approval Pejabat Berwenang', time: 'Estimasi: 19 Jan 2026', done: false },
      { name: 'Penerbitan Sertifikat SIUP Digital', time: 'Menunggu', done: false },
    ],
  },
  {
    id: 'sipi-1',
    applicantName: 'Andi Rizky',
    vesselOrOwner: 'KM. Sinar Bahari',
    date: '08 Mar 2026',
    type: 'SIPI',
    verifier: 'Budi Santoso',
    stage: 'Tahap 2 dari 4',
    status: 'Pemeriksaan Dokumen Kelaikan & Pas Besar',
    lastUpdated: 'Rabu, 11 Mar 2026 · 08:55 WIB',
    steps: [
      { name: 'Pengajuan Permohonan SIPI Online', time: 'Minggu, 08 Mar 2026 · 14:26 WIB', done: true },
      { name: 'Pemeriksaan Dokumen Kelaikan & Pas Besar', time: 'Rabu, 11 Mar 2026 · 08:55 WIB', current: true },
      { name: 'Verifikasi Alat Tangkap & Transmitter VMS', time: 'Estimasi: 14 Mar 2026', done: false },
      { name: 'Penerbitan Surat Izin Penangkapan Ikan (SIPI)', time: 'Menunggu', done: false },
    ],
  },
  {
    id: 'spp-1',
    applicantName: 'PT Samudra Sejahtera',
    vesselOrOwner: 'KM. Samudra Sejahtera 08',
    date: '22 Apr 2026',
    type: 'SPP–PPP',
    verifier: 'Virda Wulandari',
    stage: 'Tahap 4 dari 5',
    status: 'Menunggu Approval Katimja',
    lastUpdated: 'Kamis, 23 Apr 2026 · 11:30 WIB',
    steps: [
      { name: 'Perhitungan Tagihan PNBP Sistem Otomatis', time: 'Rabu, 22 Apr 2026 · 10:05 WIB', done: true },
      { name: 'Verifikasi Komponen Tarif oleh Verifikator', time: 'Rabu, 22 Apr 2026 · 15:40 WIB', done: true },
      { name: 'Persetujuan (Approval) Sub Timja', time: 'Kamis, 23 Apr 2026 · 11:30 WIB', done: true },
      { name: 'Approval Akhir Katimja Pungutan', time: 'Sedang Berlangsung', current: true },
      { name: 'Penerbitan Kode Billing SIMPONI', time: 'Menunggu', done: false },
    ],
  },
  {
    id: 'sipr-1',
    applicantName: 'Hendro Wijaya',
    vesselOrOwner: 'KM. Bahari Makmur',
    date: '02 Mei 2026',
    type: 'SIPR',
    verifier: 'Agus Setiawan',
    stage: 'Tahap 3 dari 4',
    status: 'Validasi Titik Koordinat WPPNRI',
    lastUpdated: 'Senin, 04 Mei 2026 · 14:15 WIB',
    steps: [
      { name: 'Penerimaan Berkas Permohonan SIPR', time: 'Sabtu, 02 Mei 2026 · 08:30 WIB', done: true },
      { name: 'Verifikasi SIUP & SIPI Induk Kapal', time: 'Senin, 04 Mei 2026 · 09:00 WIB', done: true },
      { name: 'Validasi Titik Koordinat Pemasangan Rumpon', time: 'Senin, 04 Mei 2026 · 14:15 WIB', current: true },
      { name: 'Approval & Penerbitan Sertifikat SIPR', time: 'Menunggu', done: false },
    ],
  },
  {
    id: 'spp-php',
    applicantName: 'PT Samudera Abadi Sentosa',
    vesselOrOwner: 'KM. Sinar Samudera',
    date: '14 Mei 2026',
    type: 'SPP–PHP',
    verifier: 'Dewi Lestari',
    stage: 'Tahap 2 dari 5',
    status: 'Verifikasi Data Timbangan Logbook & STBL',
    lastUpdated: 'Jumat, 15 Mei 2026 · 16:20 WIB',
    steps: [
      { name: 'Input Laporan Pendaratan Ikan (LAPI)', time: 'Kamis, 14 Mei 2026 · 11:00 WIB', done: true },
      { name: 'Verifikasi Data Timbangan Logbook & STBL', time: 'Jumat, 15 Mei 2026 · 16:20 WIB', current: true },
      { name: 'Kalkulasi Nilai Produksi Ikan', time: 'Menunggu Verifikasi', done: false },
      { name: 'Approval Katimja PNBP', time: 'Menunggu', done: false },
      { name: 'Penerbitan Surat Tagihan SPP–PHP', time: 'Menunggu', done: false },
    ],
  },
  {
    id: 'sikpi-1',
    applicantName: 'PT Indo Mina Perkasa',
    vesselOrOwner: 'KM. Mina Sejahtera 02',
    date: '20 Mei 2026',
    type: 'SIKPI',
    verifier: 'Rizal Hidayat',
    stage: 'Tahap 1 dari 4',
    status: 'Pemeriksaan Berkas & Palka Berpendingin',
    lastUpdated: 'Kamis, 21 Mei 2026 · 09:30 WIB',
    steps: [
      { name: 'Pengajuan Izin Kapal Pengangkut Online', time: 'Rabu, 20 Mei 2026 · 13:45 WIB', done: true },
      { name: 'Pemeriksaan Berkas & Palka Berpendingin', time: 'Kamis, 21 Mei 2026 · 09:30 WIB', current: true },
      { name: 'Pemeriksaan Rute Pelabuhan Singgah Pangkalan', time: 'Menunggu', done: false },
      { name: 'Penerbitan SIKPI Resmi', time: 'Menunggu', done: false },
    ],
  },
  {
    id: 'spp-ppka',
    applicantName: 'PT Pasifik Maritim',
    vesselOrOwner: 'KM. Pasifik Star',
    date: '25 Mei 2026',
    type: 'SPP–PPKA',
    verifier: 'Virda Wulandari',
    stage: 'Tahap 3 dari 5',
    status: 'Konversi Kurs Jisdor & Rekonsiliasi Valas',
    lastUpdated: 'Selasa, 26 Mei 2026 · 10:45 WIB',
    steps: [
      { name: 'Registrasi Dokumen Kapal Asing & Agen', time: 'Senin, 25 Mei 2026 · 08:15 WIB', done: true },
      { name: 'Verifikasi Daerah Penangkapan ZEEI', time: 'Senin, 25 Mei 2026 · 14:00 WIB', done: true },
      { name: 'Konversi Kurs Jisdor & Rekonsiliasi Valas', time: 'Selasa, 26 Mei 2026 · 10:45 WIB', current: true },
      { name: 'Approval Direktur Perizinan', time: 'Menunggu', done: false },
      { name: 'Penerbitan Billing USD / IDR SIMPONI', time: 'Menunggu', done: false },
    ],
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

export default function Dashboard({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const filteredApplications = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return APPLICATIONS
    return APPLICATIONS.filter((app) =>
      Object.values(app).some((val) => String(val).toLowerCase().includes(q))
    )
  }, [searchQuery])

  const sortedApplications = useMemo(() => {
    if (!sortConfig.key) return filteredApplications

    return [...filteredApplications].sort((a, b) => {
      let aVal = a[sortConfig.key] ?? ''
      let bVal = b[sortConfig.key] ?? ''

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredApplications, sortConfig])

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return sortedApplications.slice(startIndex, startIndex + pageSize)
  }, [sortedApplications, currentPage, pageSize])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const activeDetail = selectedApplication
    ? APPLICATIONS.find((app) => app.id === selectedApplication)
    : null

  return (
    <Layout
      currentPath="/dashboard"
      onLogout={onLogout}
      breadcrumbs={[{ label: 'Dashboard' }]}
      title="Dashboard"
    >
      {/* Search Header */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[var(--color-text)]">Pelacakan Status Berkas</h2>
            <p className="text-xs text-[var(--color-muted)]">Cari berdasarkan perorangan/badan hukum, nama kapal/pemilik, jenis izin, atau verifikator.</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari permohonan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
        </div>
      </section>

      {/* Main Table for Dashboard Applications */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <SortableTh label="Perorangan / Badan Hukum" sortKey="applicantName" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Nama Kapal / Nama Pemilik" sortKey="vesselOrOwner" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Tanggal Pengajuan Permohonan" sortKey="date" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Jenis Izin" sortKey="type" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Verifikator" sortKey="verifier" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Posisi Permohonan" sortKey="stage" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  {/* Perorangan / Badan Hukum */}
                  <td className="px-5 py-4 font-bold text-[var(--color-text)]">
                    {item.applicantName}
                  </td>

                  {/* Nama Kapal / Nama Pemilik */}
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {item.vesselOrOwner}
                  </td>

                  {/* Tanggal Pengajuan (Tanggal saja tanpa ikon) */}
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Jenis Izin */}
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-800">{item.type}</span>
                  </td>

                  {/* Verifikator (Nama saja tanpa gelar/timja) */}
                  <td className="px-5 py-4 text-slate-800 font-medium">
                    {item.verifier}
                  </td>

                  {/* Posisi Permohonan */}
                  <td className="px-5 py-4">
                    <div className="space-y-1 max-w-xs">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-[rgba(0,90,156,0.08)] text-[var(--color-primary)] font-bold text-[11px]">
                          {item.stage}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-800 leading-snug">
                        {item.status}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.lastUpdated}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedApplication(item.id)}
                        className="text-[11px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                      >
                        <span>Lihat Alur ({item.steps.length} Tahapan)</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedApplications.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data permohonan tidak ditemukan.
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalItems={sortedApplications.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      {/* Timeline Modal Detail */}
      {activeDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">{activeDetail.applicantName}</h3>
                  <p className="text-xs text-[var(--color-muted)]">{activeDetail.vesselOrOwner} · {activeDetail.type}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Meta in Modal */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Verifikator:</span>
                <span className="font-bold text-slate-700">{activeDetail.verifier}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Posisi Terkini:</span>
                <span className="font-bold text-[var(--color-primary)]">{activeDetail.stage}</span>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
              {activeDetail.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step.done
                          ? 'bg-emerald-600 text-white'
                          : step.current
                            ? 'bg-[var(--color-primary)] text-white ring-4 ring-blue-100'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                    >
                      {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    {idx < activeDetail.steps.length - 1 && (
                      <div className={`w-0.5 h-7 my-1 ${step.done ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-xs font-bold ${step.current ? 'text-[var(--color-primary)]' : 'text-slate-800'
                        }`}
                    >
                      {step.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{step.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
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
