import { useState, useMemo, useEffect } from 'react'
import Layout from '../../../components/Layout.jsx'
import Pagination from '../../../components/Pagination.jsx'
import {
  Search,
  CheckCircle2,
  MapPin,
  Clock,
  FileText,
  Eye,
  X,
  Building2,
  Ship,
  UserCheck,
  ShieldCheck,
  Award,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const APPROVAL_SIPR_DATA = {
  katimja: [
    {
      id: 'SIPR-2026-0081',
      applicantName: 'PT Laut Nusantara',
      owner: 'PT Laut Nusantara',
      vessel: 'KM. Bahari Raya 01',
      location: 'WPPNRI 711 (Laut Natuna) · 05°12\'N 106°20\'E',
      verifierMessage: 'Titik koordinat telah diverifikasi bebas dari alur pelayaran ALKI I dan pipa bawah laut.',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      verifier: 'Siti Rahmawati',
      verifiedAt: 'Senin, 12 Jan 2026 · 09:30 WIB',
      status: 'Menunggu Approval Katimja',
    },
    {
      id: 'SIPR-2026-0084',
      applicantName: 'Andi Rizky',
      owner: 'Andi Rizky',
      vessel: 'KM. Sinar Bahari',
      location: 'WPPNRI 712 (Laut Jawa) · 06°05\'S 112°45\'E',
      verifierMessage: 'Jumlah atraktor rumpon sesuai kuota maksimal 3 unit per armada kapal.',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      verifier: 'Budi Santoso',
      verifiedAt: 'Kamis, 15 Jan 2026 · 14:15 WIB',
      status: 'Menunggu Approval Katimja',
    },
  ],
  direktur: [
    {
      id: 'SIPR-2026-0094',
      applicantName: 'CV Samudra Sejahtera',
      owner: 'CV Samudra Sejahtera',
      vessel: 'KM. Samudra Sejahtera 02',
      location: 'WPPNRI 713 (Selat Makassar) · 04°30\'S 119°10\'E',
      verifierMessage: 'Rekomendasi teknis Balai Pengelolaan Sumberdaya Pesisir & Laut (BPSPL) lengkap.',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      verifier: 'Virda Wulandari',
      verifiedAt: 'Senin, 08 Feb 2026 · 10:20 WIB',
      approvedBy: 'Dimas (Katimja)',
      approvedAt: 'Selasa, 09 Feb 2026 · 13:45 WIB',
      status: 'Disetujui Katimja',
    },
    {
      id: 'SIPR-2026-0098',
      applicantName: 'PT Samudera Abadi Sentosa',
      owner: 'PT Samudera Abadi Sentosa',
      vessel: 'KM. Sinar Samudera',
      location: 'WPPNRI 573 (Samudera Hindia) · 09°15\'S 114°20\'E',
      verifierMessage: 'Pemberitahuan penempatan telah ditembuskan ke Ditjen Hubla Kemenhub.',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      verifier: 'Dewi Lestari',
      verifiedAt: 'Kamis, 12 Feb 2026 · 11:00 WIB',
      approvedBy: 'Dimas (Katimja)',
      approvedAt: 'Jumat, 13 Feb 2026 · 15:30 WIB',
      status: 'Disetujui Katimja',
    },
  ],
  approved: [
    {
      id: 'SIPR-2026-0072',
      applicantName: 'PT Indo Mina Perkasa',
      owner: 'PT Indo Mina Perkasa',
      vessel: 'KM. Mina Perkasa 03',
      location: 'WPPNRI 714 (Laut Banda) · 04°50\'S 128°30\'E',
      verifierMessage: 'Seluruh persyaratan administratif dan koordinat teknis terverifikasi valid.',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      verifier: 'Rizal Hidayat',
      verifiedAt: 'Jumat, 02 Jan 2026 · 08:45 WIB',
      approvedBy: 'Direktur Perizinan dan Kenelayanan',
      approvedAt: 'Senin, 05 Jan 2026 · 16:00 WIB',
      status: 'Terbit Resmi',
    },
    {
      id: 'SIPR-2026-0075',
      applicantName: 'Hendro Wijaya',
      owner: 'Hendro Wijaya',
      vessel: 'KM. Bahari Makmur',
      location: 'WPPNRI 718 (Laut Aru) · 05°45\'S 135°10\'E',
      verifierMessage: 'Surat Izin Penempatan Rumpon telah ditandatangani secara elektronik (BSrE).',
      permitType: 'SURAT IZIN PENEMPATAN RUMPON (SIPR)',
      verifier: 'Agus Setiawan',
      verifiedAt: 'Minggu, 04 Jan 2026 · 13:10 WIB',
      approvedBy: 'Direktur Perizinan dan Kenelayanan',
      approvedAt: 'Rabu, 07 Jan 2026 · 10:15 WIB',
      status: 'Terbit Resmi',
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

export default function IRApprovalSIPR({ onLogout }) {
  const [activeTab, setActiveTab] = useState('katimja')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalPreview, setModalPreview] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchQuery])

  const filteredData = useMemo(() => {
    const list = APPROVAL_SIPR_DATA[activeTab] || []
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

  const breadcrumbs = [
    { label: 'Layanan' },
    { label: 'Permohonan' },
    { label: 'Approval SIPR' },
  ]

  return (
    <Layout
      currentPath="/layanan/permohonan/ir/approval-sipr"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Approval Surat Izin Pemasangan Rumpon (SIPR)"
    >
      {/* Search Bar Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-6">
        <h2 className="text-base font-bold text-[var(--color-text)] mb-3">Pencarian Approval SIPR</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor SIPR, pemilik, nama kapal, lokasi koordinat..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)] text-[var(--color-text)]"
          />
        </div>
      </section>

      {/* 3 Opsi Tab: Approval Katimja, Approval Direktur, Daftar Approved SIPR */}
      <div className="flex flex-wrap items-center gap-2 mb-4" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'katimja'}
          onClick={() => setActiveTab('katimja')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'katimja'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Approval Katimja</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'direktur'}
          onClick={() => setActiveTab('direktur')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'direktur'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Approval Direktur</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'approved'}
          onClick={() => setActiveTab('approved')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'approved'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Daftar Approved SIPR</span>
        </button>
      </div>

      {/* Tabel Data Approval SIPR */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3.5 font-bold w-12 text-center">No.</th>
                <SortableTh label="PERORANGAN / BADAN HUKUM" sortKey="applicantName" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NAMA PEMILIK / NAMA KAPAL" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="LOKASI RUMPON" sortKey="location" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <th className="px-5 py-3.5 font-bold">PESAN VERIFIKATOR</th>
                <SortableTh label="JENIS IZIN" sortKey="permitType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <th className="px-5 py-3.5 font-bold text-center">Draft</th>
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

                    {/* Perorangan / Badan Hukum */}
                    <td className="px-5 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                      {item.applicantName}
                    </td>

                    {/* Nama Pemilik / Nama Kapal */}
                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {item.vessel}
                    </td>

                    {/* Lokasi Rumpon */}
                    <td className="px-5 py-4 text-slate-700 font-medium max-w-xs leading-snug">
                      {item.location}
                    </td>

                    {/* Pesan Verifikator */}
                    <td className="px-5 py-4 text-slate-600 max-w-xs leading-snug">
                      {item.verifierMessage}
                    </td>

                    {/* Jenis Izin */}
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {item.permitType}
                    </td>

                    {/* Draft (button Draft Izin dan Lihat Dokumen) */}
                    {/* Draft (button Draft Izin dan Lihat Dokumen atas-bawah) */}
                    <td className="px-5 py-3 text-center whitespace-nowrap">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setModalPreview({ type: 'draft', item })}
                          className="w-28 py-1.5 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Lihat Draft Izin"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Draft Izin</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setModalPreview({ type: 'dokumen', item })}
                          className="w-28 py-1.5 px-2 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Lihat Dokumen Kelengkapan"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Lihat Dokumen</span>
                        </button>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="px-5 py-4 text-center">
                      {activeTab === 'katimja' && (
                        <div className="text-xs space-y-0.5 text-left max-w-xs">
                          <p className="font-semibold text-slate-800">
                            Diverifikasi oleh <span className="text-[var(--color-primary)]">{item.verifier}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{item.verifiedAt}</span>
                          </p>
                        </div>
                      )}

                      {activeTab === 'direktur' && (
                        <div className="text-xs space-y-0.5 text-left max-w-xs">
                          <p className="font-semibold text-emerald-700">
                            Disetujui oleh <span className="font-bold">{item.approvedBy}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{item.approvedAt}</span>
                          </p>
                        </div>
                      )}

                      {activeTab === 'approved' && (
                        <span className="text-slate-400 font-bold">-</span>
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
            Data approval SIPR tidak ditemukan.
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

      {/* Modal Preview Draft Izin & Dokumen */}
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
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">
                    {modalPreview.type === 'draft' ? 'Pratinjau Draft Izin SIPR' : 'Dokumen Kelengkapan Permohonan'}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">{modalPreview.item.id} · {modalPreview.item.owner}</p>
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
                  <span className="text-slate-500">Pemilik & Kapal:</span>
                  <span className="font-bold text-slate-800">{modalPreview.item.owner} ({modalPreview.item.vessel})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lokasi Rumpon:</span>
                  <span className="font-semibold text-slate-800 text-right">{modalPreview.item.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Validasi:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi Digital KKP
                  </span>
                </div>
              </div>

              {modalPreview.type === 'draft' ? (
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 font-mono text-[11px] leading-relaxed text-slate-700">
                  <p className="font-bold text-center border-b pb-2 mb-2 text-slate-800">
                    KEMENTERIAN KELAUTAN DAN PERIKANAN REPUBLIK INDONESIA<br />
                    SURAT IZIN PENEMPATAN RUMPON (SIPR)<br />
                    NOMOR: {modalPreview.item.id}
                  </p>
                  <p>Diberikan kepada: {modalPreview.item.owner}</p>
                  <p>Armada Kapal: {modalPreview.item.vessel}</p>
                  <p>Lokasi Pemasangan: {modalPreview.item.location}</p>
                  <p>Masa Berlaku: 2 (dua) Tahun sejak tanggal diterbitkan.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-bold text-slate-800">Daftar Dokumen Terlampir:</p>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>Surat Permohonan Pemasangan Rumpon Asli (PDF)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>Peta & Titik Koordinat GPS WPPNRI (PDF)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>Salinan SIPI / SIKPI Kapal Penangkap (PDF)</span>
                    </li>
                  </ul>
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
