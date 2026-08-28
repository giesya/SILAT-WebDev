import { useState, useMemo, useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Pagination from './components/Pagination.jsx'
import {
  Building2,
  Ship,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  CheckCircle2,
  TrendingUp,
  X,
  FileCheck2,
  ExternalLink
} from 'lucide-react'

const IZIN_DATA = {
  siup: [
    { owner: 'PT Laut Nusantara', person: 'Andi Rizky', npwp: '01.234.567.8-901.000', izin: 'SIUP-2024-00128', rev: '02', mulai: '12 Jan 2024', akhir: '12 Jan 2027', status: 'Aktif' },
    { owner: 'CV Samudra Jaya', person: 'Dewi Lestari', npwp: '01.118.920.8-912.001', izin: 'SIUP-2024-00410', rev: '01', mulai: '05 Mei 2024', akhir: '05 Mei 2027', status: 'Aktif' },
    { owner: 'PT Bahari Maju', person: 'Rizal Hidayat', npwp: '01.336.778.2-912.009', izin: 'SIUP-2024-00672', rev: '03', mulai: '02 Jul 2024', akhir: '02 Jul 2027', status: 'Aktif' },
    { owner: 'PT Samudera Abadi Sentosa', person: 'Bambang Irawan', npwp: '02.441.890.1-014.000', izin: 'SIUP-2024-00819', rev: '01', mulai: '14 Agu 2024', akhir: '14 Agu 2027', status: 'Aktif' },
    { owner: 'CV Marina Maritim', person: 'Siti Rahma', npwp: '03.552.123.4-025.000', izin: 'SIUP-2024-00945', rev: '02', mulai: '20 Sep 2024', akhir: '20 Sep 2027', status: 'Aktif' },
    { owner: 'PT Indo Mina Perkasa', person: 'Agus Setiawan', npwp: '04.663.456.7-036.000', izin: 'SIUP-2024-01024', rev: '01', mulai: '01 Okt 2024', akhir: '01 Okt 2027', status: 'Aktif' },
    { owner: 'CV Bahari Makmur', person: 'Hendro Wijaya', npwp: '05.774.789.0-047.000', izin: 'SIUP-2024-01188', rev: '02', mulai: '11 Nov 2024', akhir: '11 Nov 2027', status: 'Aktif' },
  ],
  sipi: [
    {
      vessel: 'KM. Bahari Raya 01',
      owner: 'PT Laut Nusantara',
      noSiup: 'SIUP-2024-00128',
      izin: 'SIPI-2024-00456',
      tandaSelar: 'GT.120 No. 441/Ka',
      alatTangkap: 'Pancing Cumi (Squid Jigging)',
      gt: '120 GT',
      mulai: '08 Mar 2024',
      akhir: '08 Mar 2026',
      status: 'Aktif',
    },
    {
      vessel: 'KM. Mina Bahari 08',
      owner: 'CV Mina Bahari',
      noSiup: 'SIUP-2024-00410',
      izin: 'SIKPI-2024-00312',
      tandaSelar: 'GT.150 No. 892/Jkt',
      alatTangkap: 'Kapal Pengangkut Berpendingin',
      gt: '150 GT',
      mulai: '12 Apr 2024',
      akhir: '12 Apr 2027',
      status: 'Aktif',
    },
    {
      vessel: 'KM. Anamora Indah',
      owner: 'CV Anamora',
      noSiup: 'SIUP-2024-00672',
      izin: 'SIKPI-2024-00777',
      tandaSelar: 'GT.85 No. 312/Btm',
      alatTangkap: 'Kapal Pengangkut Ikan Hidup',
      gt: '85 GT',
      mulai: '08 Apr 2024',
      akhir: '08 Jun 2026',
      status: 'Aktif',
    },
    {
      vessel: 'KM. Sinar Samudera 08',
      owner: 'PT Samudera Abadi Sentosa',
      noSiup: 'SIUP-2024-00819',
      izin: 'SIPI-2024-00911',
      tandaSelar: 'GT.98 No. 553/Sby',
      alatTangkap: 'Rawai Tuna (Tuna Longline)',
      gt: '98 GT',
      mulai: '25 Jun 2024',
      akhir: '25 Jun 2026',
      status: 'Aktif',
    },
    {
      vessel: 'KM. Mina Sejahtera 02',
      owner: 'PT Indo Mina Perkasa',
      noSiup: 'SIUP-2024-01024',
      izin: 'SIPI-2024-01055',
      tandaSelar: 'GT.180 No. 671/Mks',
      alatTangkap: 'Pukat Cincin Pelagis Besar (Purse Seine)',
      gt: '180 GT',
      mulai: '15 Jul 2024',
      akhir: '15 Jul 2027',
      status: 'Aktif',
    },
    {
      vessel: 'KM. Bintang Laut 05',
      owner: 'CV Marina Maritim',
      noSiup: 'SIUP-2024-00945',
      izin: 'SIPI-2024-01120',
      tandaSelar: 'GT.75 No. 221/Smg',
      alatTangkap: 'Jaring Insang Hanyut (Drift Gillnet)',
      gt: '75 GT',
      mulai: '18 Agu 2024',
      akhir: '18 Agu 2026',
      status: 'Aktif',
    },
    {
      vessel: 'KM. Samudra Jaya 12',
      owner: 'CV Bahari Makmur',
      noSiup: 'SIUP-2024-01188',
      izin: 'SIKPI-2024-01244',
      tandaSelar: 'GT.210 No. 784/Bln',
      alatTangkap: 'Kapal Pengangkut Berpendingin',
      gt: '210 GT',
      mulai: '02 Sep 2024',
      akhir: '02 Sep 2027',
      status: 'Aktif',
    },
  ],
}

const DOCUMENT_DETAILS = {
  kkp: {
    title: 'Dokumen Resmi KKP',
    number: 'SIUP-2024-00128',
    issuer: 'Kementerian Kelautan dan Perikanan RI',
    type: 'Surat Izin Usaha Perikanan (SIUP)',
    filename: 'dokumen-kkp-siup-2024-00128.txt',
  },
  oss: {
    title: 'Perizinan Berusaha OSS',
    number: 'NIB-812001928371',
    issuer: 'Lembaga OSS - Kementerian Investasi/BKPM',
    type: 'Izin Usaha Berbasis Risiko (NIB)',
    filename: 'dokumen-oss-nib-812001928371.txt',
  },
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

export default function Beranda({ onLogout }) {
  const [activeTab, setActiveTab] = useState('siup')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'owner', direction: 'asc' })
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Reset page and default sort key on tab or search change
  useEffect(() => {
    setCurrentPage(1)
    if (activeTab === 'siup') {
      setSortConfig({ key: 'owner', direction: 'asc' })
    } else {
      setSortConfig({ key: 'vessel', direction: 'asc' })
    }
  }, [activeTab])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const filteredRows = useMemo(() => {
    const data = IZIN_DATA[activeTab] || []
    const q = searchQuery.toLowerCase().trim()
    if (!q) return data

    return data.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q))
    )
  }, [activeTab, searchQuery])

  const sortedRows = useMemo(() => {
    if (!sortConfig.key) return filteredRows

    return [...filteredRows].sort((a, b) => {
      let aVal = a[sortConfig.key] ?? ''
      let bVal = b[sortConfig.key] ?? ''

      // Numeric sort for GT
      if (sortConfig.key === 'gt') {
        const aNum = parseFloat(String(aVal).replace(/[^0-9.]/g, '')) || 0
        const bNum = parseFloat(String(bVal).replace(/[^0-9.]/g, '')) || 0
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum
      }

      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredRows, sortConfig])

  // Paginated Rows
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return sortedRows.slice(startIndex, startIndex + pageSize)
  }, [sortedRows, currentPage, pageSize])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const downloadDocument = () => {
    if (!selectedDocument) return
    const detail = DOCUMENT_DETAILS[selectedDocument]
    const content = `${detail.title}\nJenis: ${detail.type}\nNomor: ${detail.number}\nPenerbit: ${detail.issuer}\nStatus: Terverifikasi Digital KKP`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = detail.filename
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <Layout
      currentPath="/beranda"
      onLogout={onLogout}
      title="Preview Izin Aktif"
    >
      {/* Quick Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-primary)] border border-blue-100 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-muted)] font-medium">SIUP Aktif</p>
            <h3 className="text-2xl font-extrabold text-[var(--color-text)] mt-0.5">1.428</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12% bulan ini
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center shrink-0">
            <Ship className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-muted)] font-medium">SIPI / SIKPI Aktif</p>
            <h3 className="text-2xl font-extrabold text-[var(--color-text)] mt-0.5">5.890</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +8.4% tahun ini
            </span>
          </div>
        </div>
      </section>

      {/* Main Table Section with Tabs */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'siup'}
              onClick={() => setActiveTab('siup')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'siup'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>SIUP Aktif</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'sipi'}
              onClick={() => setActiveTab('sipi')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'sipi'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>SIPI/SIKPI Aktif</span>
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'siup' ? 'Cari pemilik, NPWP, nomor izin...' : 'Cari kapal, pemilik, no izin, alat tangkap...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                {activeTab === 'siup' ? (
                  <>
                    <SortableTh label="Nama Pemilik" sortKey="owner" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Penanggung Jawab" sortKey="person" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="NPWP" sortKey="npwp" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="No. Izin Usaha" sortKey="izin" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Revisi" sortKey="rev" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Mulai Berlaku" sortKey="mulai" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Akhir Berlaku" sortKey="akhir" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <th className="px-5 py-3.5 font-bold text-center">Preview</th>
                  </>
                ) : (
                  <>
                    <SortableTh label="Nama Kapal" sortKey="vessel" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Nama Pemilik" sortKey="owner" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="No. SIUP" sortKey="noSiup" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="No. Izin" sortKey="izin" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="T. Selar" sortKey="tandaSelar" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Alat Tangkap" sortKey="alatTangkap" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="GT" sortKey="gt" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Mulai Berlaku" sortKey="mulai" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <SortableTh label="Akhir Berlaku" sortKey="akhir" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                    <th className="px-5 py-3.5 font-bold text-center">Preview</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {activeTab === 'siup' ? (
                paginatedRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    <td className="px-5 py-4 font-bold text-[var(--color-text)]">{row.owner}</td>
                    <td className="px-5 py-4">{row.person}</td>
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{row.npwp}</td>
                    <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)]">{row.izin}</td>
                    <td className="px-5 py-4 font-semibold">{row.rev}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.mulai}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.akhir}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDocument('kkp')}
                          className="w-20 py-1 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Preview Dokumen KKP"
                        >
                          <FileCheck2 className="w-3 h-3" />
                          <span>KKP</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedDocument('oss')}
                          className="w-20 py-1 px-2 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Preview Dokumen OSS"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>OSS</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                paginatedRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    <td className="px-5 py-4 font-bold text-[var(--color-text)]">{row.vessel}</td>
                    <td className="px-5 py-4">{row.owner}</td>
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{row.noSiup}</td>
                    <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)]">{row.izin}</td>
                    <td className="px-5 py-4 font-semibold text-slate-700">{row.tandaSelar}</td>
                    <td className="px-5 py-4 text-slate-700 max-w-[200px] truncate" title={row.alatTangkap}>
                      {row.alatTangkap}
                    </td>
                    <td className="px-5 py-4 font-bold text-emerald-700 whitespace-nowrap">{row.gt}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.mulai}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.akhir}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDocument('kkp')}
                          className="w-20 py-1 px-2 rounded-lg bg-[var(--color-primary)] text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Preview Dokumen KKP"
                        >
                          <FileCheck2 className="w-3 h-3" />
                          <span>KKP</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedDocument('oss')}
                          className="w-20 py-1 px-2 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:brightness-95 cursor-pointer flex items-center justify-center gap-1 shadow-2xs transition"
                          title="Preview Dokumen OSS"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>OSS</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {sortedRows.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data izin tidak ditemukan.
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalItems={sortedRows.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      {/* Document View Modal */}
      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-base text-[var(--color-text)]">
                  {DOCUMENT_DETAILS[selectedDocument].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Jenis Dokumen</span>
                <span className="font-bold">{DOCUMENT_DETAILS[selectedDocument].type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Nomor Registrasi</span>
                <span className="font-mono font-bold text-[var(--color-primary)]">
                  {DOCUMENT_DETAILS[selectedDocument].number}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Penerbit Resmi</span>
                <span>{DOCUMENT_DETAILS[selectedDocument].issuer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Status Validasi</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid & Terotentikasi
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={downloadDocument}
                className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold flex items-center gap-1.5 hover:brightness-95 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Dokumen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
