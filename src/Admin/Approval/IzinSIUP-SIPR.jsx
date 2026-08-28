import { useState, useMemo } from 'react'
import Layout from '../../components/Layout.jsx'
import {
  Search,
  CheckCircle2,
  XCircle,
  Building2,
  Check,
  X,
  Clock,
  Filter,
  FileCheck2
} from 'lucide-react'

const SAMPLE_SIUP_DATA = [
  { id: 'SIUP-2026-001', company: 'PT Laut Nusantara', npwp: '01.234.567.8-901.000', type: 'SIUP', stage: 'Katimja', date: '12 Jan 2026' },
  { id: 'SIPR-2026-002', company: 'CV Samudra Jaya', npwp: '01.118.920.8-912.001', type: 'SIPR', stage: 'Direktur', date: '15 Jan 2026' },
  { id: 'SIUP-2026-003', company: 'PT Bahari Maju', npwp: '01.336.778.2-912.009', type: 'SIUP', stage: 'Approved', date: '20 Jan 2026' },
]

export default function ApprovalIzinSIUPSIPR({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Katimja')
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState(SAMPLE_SIUP_DATA)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleApprove = (id) => {
    if (activeTab === 'Katimja') {
      setData((prev) => prev.map((d) => d.id === id ? { ...d, stage: 'Direktur' } : d))
      showToast(`Permohonan ${id} disetujui Katimja & diteruskan ke Direktur.`)
    } else if (activeTab === 'Direktur') {
      setData((prev) => prev.map((d) => d.id === id ? { ...d, stage: 'Approved' } : d))
      showToast(`Permohonan ${id} disetujui Direktur (Selesai).`)
    }
  }

  const handleReject = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id))
    showToast(`Permohonan ${id} ditolak dan dipindahkan ke Daftar Penolakan.`)
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchStage = item.stage === activeTab
      const q = searchQuery.toLowerCase().trim()
      const matchQ = !q || Object.values(item).some((v) => String(v).toLowerCase().includes(q))
      return matchStage && matchQ
    })
  }, [data, activeTab, searchQuery])

  const breadcrumbs = [
    { label: 'Approval' },
    { label: 'Approval Izin SIUP & SIPR' },
  ]

  return (
    <Layout
      currentPath="/approval/izin-siup-sipr"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      eyebrow="Approval Perizinan Usaha"
      title="Approval Izin SIUP & SIPR"
      subtitle="Persetujuan bertahap penerbitan Surat Izin Usaha Perikanan (SIUP) dan Surat Izin Pemasangan Rumpon (SIPR)."
    >
      {toast && (
        <div className="mb-6 rounded-xl bg-emerald-600 text-white px-5 py-3.5 shadow-lg text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist">
          {['Katimja', 'Direktur', 'Approved'].map((tab) => {
            const count = data.filter((d) => d.stage === tab).length
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[var(--color-primary)] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab === 'Approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                <span>{tab === 'Approved' ? 'Daftar Approved' : `Approval ${tab}`}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
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
            placeholder="Cari SIUP/SIPR atau perusahaan..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Table Data */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-text)]">
            Daftar Berkas Tahap {activeTab} ({filteredData.length} data)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-5 py-3.5 font-bold">No. Registrasi</th>
                <th className="px-5 py-3.5 font-bold">Nama Perusahaan</th>
                <th className="px-5 py-3.5 font-bold">NPWP Perusahaan</th>
                <th className="px-5 py-3.5 font-bold">Jenis Izin</th>
                <th className="px-5 py-3.5 font-bold">Tanggal Pengajuan</th>
                {activeTab !== 'Approved' && <th className="px-5 py-3.5 font-bold text-center">Tindakan</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)]">{item.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 font-bold text-[var(--color-text)]">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.company}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">{item.npwp}</td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-[var(--color-primary)]">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{item.date}</td>
                  {activeTab !== 'Approved' && (
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition shadow-2xs cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Tolak</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Tidak ada permohonan pada tahap ini.
          </div>
        )}
      </section>
    </Layout>
  )
}
