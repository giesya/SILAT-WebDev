import { useState, useMemo } from 'react'
import Layout from '../../components/Layout.jsx'
import {
  Search,
  CheckCircle2,
  XCircle,
  CreditCard,
  Ship,
  Check,
  X,
  Clock,
  Coins
} from 'lucide-react'

const SAMPLE_PHP_PPKA = [
  { id: 'PHP-2026-001', company: 'PT Laut Nusantara', billType: 'SPP-PHP (Pascaproduksi)', amount: 'Rp 145.000.000', stage: 'Sub Timja', date: '12 Jan 2026' },
  { id: 'PPKA-2026-002', company: 'PT Global Maritime', billType: 'SPP-PPKA (Kapal Asing)', amount: 'Rp 420.000.000', stage: 'Katimja', date: '15 Jan 2026' },
  { id: 'PHP-2026-003', company: 'CV Samudra Abadi', billType: 'SPP-PHP (Pascaproduksi)', amount: 'Rp 78.000.000', stage: 'Approved', date: '20 Jan 2026' },
]

export default function ApprovalSPPPHPPPKA({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Sub Timja')
  const [searchQuery, setSearchQuery] = useState('')
  const [data, setData] = useState(SAMPLE_PHP_PPKA)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleApprove = (id) => {
    if (activeTab === 'Sub Timja') {
      setData((prev) => prev.map((d) => d.id === id ? { ...d, stage: 'Katimja' } : d))
      showToast(`Tagihan ${id} disetujui Sub Timja & diteruskan ke Katimja.`)
    } else if (activeTab === 'Katimja') {
      setData((prev) => prev.map((d) => d.id === id ? { ...d, stage: 'Approved' } : d))
      showToast(`Tagihan ${id} disetujui Katimja (Siap Terbit Billing SIMPONI).`)
    }
  }

  const handleReject = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id))
    showToast(`Perhitungan ${id} ditolak untuk dikoreksi kembali.`)
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
    { label: 'Approval SPP–PHP & SPP–PPKA' },
  ]

  return (
    <Layout
      currentPath="/approval/spp-php-ppka"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      eyebrow="Approval Pungutan Perikanan"
      title="Approval SPP–PHP & SPP–PPKA"
      subtitle="Verifikasi bertingkat penghitungan PNBP Pungutan Hasil Perikanan (PHP) pascaproduksi dan Pungutan Penggunaan Kapal Asing (PPKA)."
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
          {['Sub Timja', 'Katimja', 'Approved'].map((tab) => {
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
            placeholder="Cari nomor tagihan, perusahaan..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Table Data */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-text)]">
            Tagihan Tahap {activeTab} ({filteredData.length} data)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-5 py-3.5 font-bold">No. SPP</th>
                <th className="px-5 py-3.5 font-bold">Perusahaan / Pemohon</th>
                <th className="px-5 py-3.5 font-bold">Kategori Pungutan</th>
                <th className="px-5 py-3.5 font-bold">Nominal Tagihan</th>
                <th className="px-5 py-3.5 font-bold">Tanggal</th>
                {activeTab !== 'Approved' && <th className="px-5 py-3.5 font-bold text-center">Tindakan</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)]">{item.id}</td>
                  <td className="px-5 py-4 font-bold text-[var(--color-text)]">{item.company}</td>
                  <td className="px-5 py-4">{item.billType}</td>
                  <td className="px-5 py-4 font-bold text-emerald-700">{item.amount}</td>
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
