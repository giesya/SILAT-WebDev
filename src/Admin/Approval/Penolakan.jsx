import { useState, useMemo } from 'react'
import Layout from '../../components/Layout.jsx'
import {
  Search,
  AlertTriangle,
  FileText,
  Building2,
  Ship,
  XCircle,
  Undo2,
  Trash2
} from 'lucide-react'

const SAMPLE_PENOLAKAN = [
  { id: 'TOLAK-001', refNo: 'SIUP-2026-0089', applicant: 'PT Bahari Sentosa', type: 'Izin Usaha (SIUP)', reason: 'NPWP Perusahaan tidak valid / tercatat pasif di DJP', rejectedBy: 'Katimja Perizinan Usaha', date: '14 Jan 2026' },
  { id: 'TOLAK-002', refNo: 'SIPI-2026-0034', applicant: 'KM. Mina Samudra 05', type: 'Izin Kapal (SIPI)', reason: 'Ukuran alat tangkap melebihi spesifikasi WPP yang ditentukan', rejectedBy: 'Direktur Perizinan dan Kenelayanan', date: '18 Jan 2026' },
]

export default function ApprovalPenolakan({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [items, setItems] = useState(SAMPLE_PENOLAKAN)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleRestore = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    showToast(`Berkas ${id} telah dikembalikan ke antrean verifikasi ulang.`)
  }

  const filteredData = useMemo(() => {
    return items.filter((item) => {
      const matchTab = activeTab === 'Semua' || item.type.includes(activeTab)
      const q = searchQuery.toLowerCase().trim()
      const matchQ = !q || Object.values(item).some((v) => String(v).toLowerCase().includes(q))
      return matchTab && matchQ
    })
  }, [items, activeTab, searchQuery])

  const breadcrumbs = [
    { label: 'Approval' },
    { label: 'Daftar Penolakan Permohonan' },
  ]

  return (
    <Layout
      currentPath="/approval/penolakan"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      eyebrow="Arsip Penolakan & Evaluasi"
      title="Daftar Penolakan Permohonan"
      subtitle="Arsip berkas permohonan yang ditolak atau dikembalikan kepada pemohon beserta alasan penolakan dan verifikator pengambil keputusan."
    >
      {toast && (
        <div className="mb-6 rounded-xl bg-emerald-600 text-white px-5 py-3.5 shadow-lg text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist">
          {['Semua', 'SIUP', 'SIPI'].map((tab) => {
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[var(--color-primary)] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab === 'Semua' ? 'Semua Penolakan' : `Penolakan ${tab}`}
              </button>
            )
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari alasan, nomor berkas..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Table Data */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-text)]">
            Berkas yang Ditolak ({filteredData.length} data)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-5 py-3.5 font-bold">No. Penolakan</th>
                <th className="px-5 py-3.5 font-bold">No. Berkas Referensi</th>
                <th className="px-5 py-3.5 font-bold">Nama Pemohon / Kapal</th>
                <th className="px-5 py-3.5 font-bold">Kategori</th>
                <th className="px-5 py-3.5 font-bold">Alasan Penolakan</th>
                <th className="px-5 py-3.5 font-bold">Pejabat Verifikator</th>
                <th className="px-5 py-3.5 font-bold">Tanggal</th>
                <th className="px-5 py-3.5 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-rose-700">{item.id}</td>
                  <td className="px-5 py-4 font-mono font-bold text-slate-800">{item.refNo}</td>
                  <td className="px-5 py-4 font-bold text-[var(--color-text)]">{item.applicant}</td>
                  <td className="px-5 py-4">{item.type}</td>
                  <td className="px-5 py-4 text-slate-600 max-w-xs">{item.reason}</td>
                  <td className="px-5 py-4 font-semibold">{item.rejectedBy}</td>
                  <td className="px-5 py-4 text-slate-500">{item.date}</td>
                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleRestore(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition shadow-2xs cursor-pointer mx-auto"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>Verifikasi Ulang</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Tidak ada riwayat berkas yang ditolak.
          </div>
        )}
      </section>
    </Layout>
  )
}
