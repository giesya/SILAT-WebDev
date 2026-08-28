import { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'
import Layout from '../components/Layout.jsx'
import {
  Folder,
  FolderOpen,
  FileSpreadsheet,
  FileText,
  Download,
  Printer,
  SlidersHorizontal,
  ArrowLeft,
  Search,
  Check,
  ChevronRight,
  BarChart3,
  Building2,
  Ship,
  Sparkles
} from 'lucide-react'

// Master folders & files
const REPORT_FOLDERS = [
  {
    id: 'siup-aktif',
    title: 'SIUP (IZIN AKTIF)',
    category: 'Perizinan Usaha',
    icon: Building2,
    accent: 'text-blue-600 bg-blue-50 border-blue-100',
    files: [
      { id: 'siup-aktif-all', name: 'Daftar SIUP Aktif (Semua Wilayah)', rowsCount: 1428, updated: '28 Jan 2026' },
      { id: 'siup-aktif-jawa', name: 'Daftar SIUP Aktif - Wilayah Jawa & Bali', rowsCount: 612, updated: '27 Jan 2026' },
      { id: 'siup-aktif-sumatera', name: 'Daftar SIUP Aktif - Wilayah Sumatera', rowsCount: 380, updated: '25 Jan 2026' },
      { id: 'siup-aktif-timur', name: 'Daftar SIUP Aktif - Wilayah Indonesia Timur', rowsCount: 436, updated: '24 Jan 2026' },
    ],
  },
  {
    id: 'sipi-aktif',
    title: 'SIPI (IZIN AKTIF)',
    category: 'Izin Kapal Tangkap',
    icon: Ship,
    accent: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    files: [
      { id: 'sipi-aktif-all', name: 'Daftar SIPI Aktif Nasional', rowsCount: 4210, updated: '28 Jan 2026' },
      { id: 'sipi-wpp-711', name: 'Daftar SIPI Aktif - WPPNRI 711 (Natuna)', rowsCount: 1240, updated: '26 Jan 2026' },
      { id: 'sipi-wpp-712', name: 'Daftar SIPI Aktif - WPPNRI 712 (Laut Jawa)', rowsCount: 1890, updated: '25 Jan 2026' },
    ],
  },
  {
    id: 'sikpi-aktif',
    title: 'SIKPI (IZIN AKTIF)',
    category: 'Izin Kapal Angkut',
    icon: Ship,
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    files: [
      { id: 'sikpi-aktif-all', name: 'Daftar SIKPI Aktif Nasional', rowsCount: 1680, updated: '27 Jan 2026' },
      { id: 'sikpi-hidup', name: 'SIKPI Pengangkut Ikan Hidup', rowsCount: 410, updated: '22 Jan 2026' },
      { id: 'sikpi-mati', name: 'SIKPI Pengangkut Ikan Segar / Mati', rowsCount: 1270, updated: '22 Jan 2026' },
    ],
  },
  {
    id: 'pnbp-pungutan',
    title: 'LAPORAN REALISASI PNBP',
    category: 'Keuangan & Pendapatan Negara',
    icon: BarChart3,
    accent: 'text-amber-600 bg-amber-50 border-amber-100',
    files: [
      { id: 'pnbp-ppp-2026', name: 'Realisasi Pungutan Pengusahaan (PPP) 2026', rowsCount: 890, updated: '28 Jan 2026' },
      { id: 'pnbp-php-2026', name: 'Realisasi Pungutan Hasil (PHP) Pascaproduksi 2026', rowsCount: 1540, updated: '28 Jan 2026' },
      { id: 'pnbp-ppka-2026', name: 'Realisasi Pungutan Penggunaan Kapal Asing (PPKA)', rowsCount: 45, updated: '20 Jan 2026' },
    ],
  },
]

const ALL_AVAILABLE_COLUMNS = [
  { key: 'no', label: 'No.' },
  { key: 'id', label: 'No. Izin / Registrasi' },
  { key: 'company', label: 'Nama Perusahaan / Pemohon' },
  { key: 'director', label: 'Direktur / Penanggung Jawab' },
  { key: 'npwp', label: 'NPWP Perusahaan' },
  { key: 'nib', label: 'NIB OSS' },
  { key: 'type', label: 'Jenis Usaha / Izin' },
  { key: 'vessel', label: 'Nama Kapal' },
  { key: 'gt', label: 'Tonase Kapal (GT)' },
  { key: 'gear', label: 'Alat Tangkap' },
  { key: 'zone', label: 'Wilayah WPPNRI' },
  { key: 'basePort', label: 'Pelabuhan Pangkalan' },
  { key: 'issuedDate', label: 'Tanggal Terbit' },
  { key: 'expiryDate', label: 'Masa Berlaku' },
  { key: 'status', label: 'Status Dokumen' },
]

const SAMPLE_REPORT_ROWS = [
  { no: 1, id: 'SIUP-2024-00128', company: 'PT Laut Nusantara', director: 'Andi Rizky', npwp: '01.234.567.8-901.000', nib: '91200012810', type: 'Penangkapan Ikan', vessel: 'KM. Bahari 01', gt: '120 GT', gear: 'Purse Seine', zone: 'WPPNRI 711', basePort: 'PPS Nizam Zachman Jakarta', issuedDate: '12 Jan 2024', expiryDate: '12 Jan 2027', status: 'Aktif' },
  { no: 2, id: 'SIUP-2024-00410', company: 'CV Samudra Jaya', director: 'Dewi Lestari', npwp: '01.118.920.8-912.001', nib: '91200041022', type: 'Penangkapan Ikan', vessel: 'KM. Sinar Samudra', gt: '85 GT', gear: 'Longline Tuna', zone: 'WPPNRI 712', basePort: 'PPN Pelabuhanratu', issuedDate: '05 Mei 2024', expiryDate: '05 Mei 2027', status: 'Aktif' },
  { no: 3, id: 'SIUP-2024-00672', company: 'PT Bahari Maju Sejahtera', director: 'Rizal Hidayat', npwp: '01.336.778.2-912.009', nib: '91200067233', type: 'Pengangkutan Ikan', vessel: 'KM. Maju Bahari 08', gt: '180 GT', gear: 'Kapal Pengangkut Berpendingin', zone: 'WPPNRI 713', basePort: 'PPS Bitung', issuedDate: '02 Jul 2024', expiryDate: '02 Jul 2027', status: 'Aktif' },
  { no: 4, id: 'SIUP-2024-00891', company: 'PT Mina Sejati Pratama', director: 'Irwan Setiawan', npwp: '01.442.119.5-904.000', nib: '91200089144', type: 'Penangkapan Ikan', vessel: 'KM. Mina Sejati 03', gt: '145 GT', gear: 'Handline', zone: 'WPPNRI 714', basePort: 'PPS Kendari', issuedDate: '15 Agu 2024', expiryDate: '15 Agu 2027', status: 'Aktif' },
  { no: 5, id: 'SIUP-2024-00995', company: 'CV Anugerah Samudra', director: 'Siti Nurhaliza', npwp: '01.558.330.1-905.002', nib: '91200099555', type: 'Penangkapan Ikan', vessel: 'KM. Anugerah 09', gt: '95 GT', gear: 'Gill Net', zone: 'WPPNRI 718', basePort: 'PPN Tual', issuedDate: '20 Sep 2024', expiryDate: '20 Sep 2027', status: 'Aktif' },
]

export default function Pelaporan({ onLogout }) {
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false)

  // Default visible columns
  const [visibleColumnKeys, setVisibleColumnKeys] = useState([
    'no',
    'id',
    'company',
    'director',
    'npwp',
    'vessel',
    'gt',
    'zone',
    'basePort',
    'status',
  ])

  const toggleColumn = (key) => {
    setVisibleColumnKeys((prev) => {
      if (prev.includes(key)) {
        if (prev.length <= 1) return prev
        return prev.filter((k) => k !== key)
      }
      return [...prev, key]
    })
  }

  const activeColumns = useMemo(() => {
    return ALL_AVAILABLE_COLUMNS.filter((col) => visibleColumnKeys.includes(col.key))
  }, [visibleColumnKeys])

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return SAMPLE_REPORT_ROWS
    return SAMPLE_REPORT_ROWS.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q))
    )
  }, [searchQuery])

  // Export CSV
  const handleExportCSV = () => {
    if (!filteredData.length) return
    const headers = activeColumns.map((c) => c.label).join(',')
    const rows = filteredData.map((row) =>
      activeColumns
        .map((col) => {
          const val = row[col.key] || ''
          return `"${String(val).replace(/"/g, '""')}"`
        })
        .join(',')
    )
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${selectedFile?.name || 'laporan-silat'}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Export Excel (.xlsx)
  const handleExportExcel = () => {
    if (!filteredData.length) return
    const exportRows = filteredData.map((row) => {
      const obj = {}
      activeColumns.forEach((col) => {
        obj[col.label] = row[col.key] || ''
      })
      return obj
    })

    const worksheet = XLSX.utils.json_to_sheet(exportRows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Laporan')
    XLSX.writeFile(workbook, `${selectedFile?.name || 'laporan-silat'}.xlsx`)
  }

  const handlePrint = () => {
    window.print()
  }

  // Breadcrumbs
  const breadcrumbs = useMemo(() => {
    const list = [{ label: 'Pelaporan', path: '/pelaporan' }]
    if (selectedFolder) {
      list.push({ label: selectedFolder.title, path: null })
    }
    if (selectedFile) {
      list.push({ label: selectedFile.name, path: null })
    }
    return list
  }, [selectedFolder, selectedFile])

  return (
    <Layout
      currentPath="/pelaporan"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      eyebrow="Pusat Analisis & Ekspor Data"
      title="Pelaporan & Tabulasi Terpadu SILAT"
      subtitle="Jelajahi berkas laporan perizinan usaha, izin kapal tangkap/angkut, serta realisasi penerimaan PNBP secara interaktif."
      actions={
        selectedFile && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Column Picker Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsColumnPickerOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[rgba(31,78,120,0.15)] text-xs font-bold text-slate-700 hover:border-[var(--color-primary)] transition shadow-2xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Pilih Kolom ({visibleColumnKeys.length})</span>
              </button>

              {/* Column Picker Dropdown Menu */}
              {isColumnPickerOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-[rgba(31,78,120,0.12)] shadow-xl p-3 z-50 animate-fade-in space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-[var(--color-text)]">Atur Tampilan Kolom</span>
                    <button
                      type="button"
                      onClick={() => setVisibleColumnKeys(ALL_AVAILABLE_COLUMNS.map((c) => c.key))}
                      className="text-[11px] font-bold text-[var(--color-primary)] hover:underline"
                    >
                      Pilih Semua
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                    {ALL_AVAILABLE_COLUMNS.map((col) => {
                      const isChecked = visibleColumnKeys.includes(col.key)
                      return (
                        <label
                          key={col.key}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--color-bg)] text-xs text-slate-700 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleColumn(col.key)}
                            className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                          />
                          <span>{col.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Export CSV */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[rgba(31,78,120,0.15)] text-xs font-bold text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ekspor CSV</span>
            </button>

            {/* Export Excel (.xlsx) */}
            <button
              type="button"
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-2xs cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ekspor Excel (.xlsx)</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Tabel</span>
            </button>
          </div>
        )
      }
    >
      {/* 1. LEVEL 1: Folder Overview View */}
      {!selectedFolder && !selectedFile && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] flex items-center gap-2">
              <Folder className="w-4 h-4" />
              <span>Kategori & Folder Laporan</span>
            </h2>
            <span className="text-xs text-[var(--color-muted)] font-semibold">{REPORT_FOLDERS.length} Direktori Tersedia</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REPORT_FOLDERS.map((folder) => {
              const FolderIcon = folder.icon
              return (
                <div
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder)}
                  className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-5 shadow-xs hover:border-[var(--color-primary)] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl border ${folder.accent}`}>
                        <FolderIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400">
                        {folder.files.length} Laporan
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition">
                      {folder.title}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] mt-1">{folder.category}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[var(--color-primary)]">
                    <span>Buka Direktori</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 2. LEVEL 2: Files in Selected Folder */}
      {selectedFolder && !selectedFile && (
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setSelectedFolder(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:text-[var(--color-primary)] transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Semua Folder</span>
          </button>

          <div className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
              <div className={`p-2 rounded-xl border ${selectedFolder.accent}`}>
                <FolderOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[var(--color-text)]">{selectedFolder.title}</h2>
                <p className="text-xs text-[var(--color-muted)]">Pilih salah satu berkas untuk melihat tabel data & ekspor</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedFolder.files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className="p-4 rounded-xl border border-slate-200 bg-[var(--color-bg)] hover:bg-white hover:border-[var(--color-primary)] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs group-hover:bg-blue-50 transition">
                      <FileSpreadsheet className="w-4 h-4 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                        {file.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {file.rowsCount.toLocaleString('id-ID')} Data · Diperbarui: {file.updated}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. LEVEL 3: Table View with Column Picker & Filters */}
      {selectedFile && (
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:text-[var(--color-primary)] transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Berkas ({selectedFolder.title})</span>
          </button>

          {/* Search Filter Bar */}
          <div className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-5 h-5 text-[var(--color-primary)]" />
              <div>
                <h3 className="font-bold text-sm text-[var(--color-text)]">{selectedFile.name}</h3>
                <span className="text-[11px] text-slate-400">
                  Menampilkan {filteredData.length} baris data · {activeColumns.length} kolom aktif
                </span>
              </div>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dalam tabel data..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Dynamic Table */}
          <div className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[var(--color-primary)] text-white font-bold uppercase tracking-wider text-[11px]">
                    {activeColumns.map((col) => (
                      <th key={col.key} className="px-4 py-3.5">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                      {activeColumns.map((col) => (
                        <td key={col.key} className="px-4 py-3.5 whitespace-nowrap">
                          {col.key === 'id' ? (
                            <span className="font-mono font-bold text-[var(--color-primary)]">
                              {row[col.key]}
                            </span>
                          ) : col.key === 'company' ? (
                            <span className="font-bold text-[var(--color-text)]">{row[col.key]}</span>
                          ) : col.key === 'status' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {row[col.key]}
                            </span>
                          ) : (
                            row[col.key] || '-'
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="p-12 text-center text-sm text-[var(--color-muted)]">
                Tidak ada data yang cocok dengan pencarian.
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  )
}
