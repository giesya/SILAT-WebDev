import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  Eye,
  FileText,
  X,
  CheckCircle2,
  Ship,
  MapPin,
  FileCheck2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const SAMPLE_VERIFIKASI_RUMPON = [
  {
    id: 'VRF-SIPR-2026-001',
    date: '2026-01-12',
    displayDate: '12 Jan 2026',
    applicant: 'PT Laut Nusantara',
    vessel: 'KM. Bahari Raya 01',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    location: 'WPPNRI 711 (Laut Natuna) · 05°12\'N 106°20\'E',
    status: 'Proses Verifikasi Teknis',
    verifier: 'Siti Rahmawati',
    resumeNotes: 'Evaluasi kesesuaian koordinat dengan peta alur laut ALKI I dinyatakan aman. Jarak minimum antar rumpon > 10 mil laut terpenuhi.',
  },
  {
    id: 'VRF-SIPR-2026-002',
    date: '2026-01-18',
    displayDate: '18 Jan 2026',
    applicant: 'CV Mina Bahari',
    vessel: 'KM. Mina Bahari 08',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    location: 'WPPNRI 712 (Laut Jawa) · 06°05\'S 112°45\'E',
    status: 'Pemeriksaan Peta Laut',
    verifier: 'Budi Santoso',
    resumeNotes: 'Pemeriksaan batimetri kedalaman perairan > 200m valid. Struktur atraktor ramah lingkungan berbahan daun kelapa.',
  },
  {
    id: 'VRF-SIPR-2026-003',
    date: '2026-02-02',
    displayDate: '02 Feb 2026',
    applicant: 'Andi Rizky',
    vessel: 'KM. Sinar Bahari',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    location: 'WPPNRI 713 (Selat Makassar) · 04°30\'S 119°10\'E',
    status: 'Validasi Titik Koordinat',
    verifier: 'Virda Wulandari',
    resumeNotes: 'Validasi titik koordinat disetujui tanpa tumpang tindih dengan izin rumpon aktif lainnya.',
  },
  {
    id: 'VRF-SIPR-2026-004',
    date: '2026-02-14',
    displayDate: '14 Feb 2026',
    applicant: 'PT Samudera Abadi Sentosa',
    vessel: 'KM. Sinar Samudera',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    location: 'WPPNRI 573 (Samudera Hindia) · 09°15\'S 114°20\'E',
    status: 'Evaluasi Dokumen SIPI',
    verifier: 'Dewi Lestari',
    resumeNotes: 'Dokumen SIPI kapal penangkap aktif dan terintegrasi dengan data VMS DJPT.',
  },
  {
    id: 'VRF-SIPR-2026-005',
    date: '2026-02-20',
    displayDate: '20 Feb 2026',
    applicant: 'PT Indo Mina Perkasa',
    vessel: 'KM. Mina Perkasa 03',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    location: 'WPPNRI 714 (Laut Banda) · 04°50\'S 128°30\'E',
    status: 'Verifikasi Teknis Selesai',
    verifier: 'Rizal Hidayat',
    resumeNotes: 'Seluruh tahapan verifikasi teknis dan administratif lengkap, diteruskan untuk persetujuan Katimja.',
  },
  {
    id: 'VRF-SIPR-2026-006',
    date: '2026-02-26',
    displayDate: '26 Feb 2026',
    applicant: 'Hendro Wijaya',
    vessel: 'KM. Bahari Makmur',
    permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
    location: 'WPPNRI 718 (Laut Aru) · 05°45\'S 135°10\'E',
    status: 'Proses Verifikasi Teknis',
    verifier: 'Agus Setiawan',
    resumeNotes: 'Pemeriksaan kelengkapan rekomendasi dinas provinsi dan kesesuaian armada penangkap.',
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

export default function IRDaftarVerifikasi({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [modalPreview, setModalPreview] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SAMPLE_VERIFIKASI_RUMPON

    return SAMPLE_VERIFIKASI_RUMPON.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(q))
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
    { label: 'Daftar Verifikasi SIPR' },
  ]

  return (
    <Layout
      currentPath="/layanan/permohonan/ir/daftar-verifikasi"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Daftar Verifikasi Izin Rumpon (SIPR)"
    >
      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">Pencarian Verifikasi Izin Rumpon</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pemohon, kapal, lokasi koordinat, atau status..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
          />
        </div>
      </section>

      {/* Tabel Data Verifikasi Rumpon */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3.5 font-bold w-12 text-center">No.</th>
                <SortableTh label="Tanggal Permohonan" sortKey="date" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Pemohon" sortKey="applicant" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Nama Kapal" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Jenis Permohonan" sortKey="permitType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Lokasi Rumpon" sortKey="location" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="Status Izin" sortKey="status" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
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
                    <td className="px-5 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                      {item.applicant}
                    </td>

                    {/* Nama Kapal */}
                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {item.vessel}
                    </td>

                    {/* Jenis Permohonan */}
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {item.permitType}
                    </td>

                    {/* Lokasi Rumpon */}
                    <td className="px-5 py-4 text-slate-700 font-medium max-w-xs leading-snug">
                      {item.location}
                    </td>

                    {/* Status Izin */}
                    <td className="px-5 py-4 text-slate-800 font-medium whitespace-nowrap">
                      {item.status}
                    </td>

                    {/* Aksi (Button Lihat dan Resume atas-bawah) */}
                    <td className="px-5 py-3 text-center whitespace-nowrap">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setModalPreview({ type: 'lihat', item })}
                          className="w-24 py-1.5 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Lihat Detail Berkas"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Lihat</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setModalPreview({ type: 'resume', item })}
                          className="w-24 py-1.5 px-2 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Lihat Resume Verifikasi"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Resume</span>
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
            Data verifikasi izin rumpon tidak ditemukan.
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

      {/* Modal Detail & Resume Verifikasi */}
      {modalPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalPreview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                {modalPreview.type === 'lihat' ? (
                  <Eye className="w-5 h-5 text-[var(--color-primary)]" />
                ) : (
                  <FileText className="w-5 h-5 text-emerald-600" />
                )}
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">
                    {modalPreview.type === 'lihat'
                      ? 'Detail Berkas Verifikasi Rumpon'
                      : 'Resume Hasil Verifikasi Teknis'}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">
                    {modalPreview.item.id} · {modalPreview.item.applicant}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalPreview(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 bg-[var(--color-bg)] rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pemohon:</span>
                  <span className="font-bold text-slate-800">{modalPreview.item.applicant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Kapal:</span>
                  <span className="font-bold text-slate-800">{modalPreview.item.vessel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lokasi Rumpon:</span>
                  <span className="font-semibold text-slate-800 text-right">{modalPreview.item.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verifikator:</span>
                  <span className="font-bold text-[var(--color-primary)]">{modalPreview.item.verifier}</span>
                </div>
              </div>

              {modalPreview.type === 'lihat' ? (
                <div className="space-y-2">
                  <p className="font-bold text-slate-800">Dokumen dan Data Teknis Verifikasi:</p>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileCheck2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>Peta Batimetri dan Koordinat GPS WPPNRI (Valid)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileCheck2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>Surat Rekomendasi Pemasangan Rumpon DKP (Lengkap)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileCheck2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>Pemeriksaan Bebas Alur Pelayaran ALKI & Kabel Laut (Aman)</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-bold text-slate-800">Catatan & Rekomendasi Resume Verifikator:</p>
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900 leading-relaxed font-medium">
                    {modalPreview.item.resumeNotes}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Rekomendasi teknis memenuhi syarat untuk persetujuan perizinan.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                type="button"
                onClick={() => setModalPreview(null)}
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
