import { useState } from 'react'
import Layout from '../../components/Layout.jsx'
import {
  Building2,
  Ship,
  FileText,
  Database,
  BarChart3,
  CheckCircle2,
  X,
  Send
} from 'lucide-react'

export default function SIUPDanKapal({ onLogout }) {
  const [activeTab, setActiveTab] = useState('siup_aktif')

  // Form states for SIUP Aktif & SIUP Terbit
  const [siupCompany, setSiupCompany] = useState('')

  // Form states for Kapal Aktif & Kapal Terbit
  const [kapalCompany, setKapalCompany] = useState('')
  const [operator1, setOperator1] = useState('DAN')
  const [vesselName1, setVesselName1] = useState('')
  const [operator2, setOperator2] = useState('DAN')
  const [vesselName2, setVesselName2] = useState('')

  // Form states for Alokasi Realisasi
  const [alokasiCompany, setAlokasiCompany] = useState('')
  const [alokasiSiupNo, setAlokasiSiupNo] = useState('')

  // Toast state
  const [toast, setToast] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    let tabLabel = 'SIUP Aktif'
    if (activeTab === 'siup_terbit') tabLabel = 'SIUP Terbit'
    if (activeTab === 'kapal_aktif') tabLabel = 'Kapal Aktif'
    if (activeTab === 'kapal_terbit') tabLabel = 'Kapal Terbit'
    if (activeTab === 'alokasi_realisasi') tabLabel = 'Alokasi Realisasi'

    setToast({
      type: 'success',
      message: `Formulir ${tabLabel} berhasil disubmit.`,
    })

    // Reset current form
    if (activeTab === 'siup_aktif' || activeTab === 'siup_terbit') {
      setSiupCompany('')
    } else if (activeTab === 'kapal_aktif' || activeTab === 'kapal_terbit') {
      setKapalCompany('')
      setVesselName1('')
      setVesselName2('')
    } else if (activeTab === 'alokasi_realisasi') {
      setAlokasiCompany('')
      setAlokasiSiupNo('')
    }
  }

  const handleResetForm = () => {
    setSiupCompany('')
    setKapalCompany('')
    setOperator1('DAN')
    setVesselName1('')
    setOperator2('DAN')
    setVesselName2('')
    setAlokasiCompany('')
    setAlokasiSiupNo('')
    setToast(null)
  }

  const breadcrumbs = [
    { label: 'Data & Pusat' },
    { label: 'SIUP dan Kapal' },
  ]

  return (
    <Layout
      currentPath="/data-pusat/siup-dan-kapal"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Data SIUP dan Kapal"
    >
      {/* Toast Notification */}
      {toast && (
        <div className="mb-6 rounded-2xl bg-emerald-600 text-white p-4 shadow-lg text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 5 Opsi Tabs: SIUP Aktif, SIUP Terbit, Kapal Aktif, Kapal Terbit, Alokasi Realisasi */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'siup_aktif'}
          onClick={() => {
            setActiveTab('siup_aktif')
            handleResetForm()
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'siup_aktif'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>SIUP Aktif</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'siup_terbit'}
          onClick={() => {
            setActiveTab('siup_terbit')
            handleResetForm()
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'siup_terbit'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>SIUP Terbit</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'kapal_aktif'}
          onClick={() => {
            setActiveTab('kapal_aktif')
            handleResetForm()
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'kapal_aktif'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>Kapal Aktif</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'kapal_terbit'}
          onClick={() => {
            setActiveTab('kapal_terbit')
            handleResetForm()
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'kapal_terbit'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Kapal Terbit</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'alokasi_realisasi'}
          onClick={() => {
            setActiveTab('alokasi_realisasi')
            handleResetForm()
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'alokasi_realisasi'
              ? 'bg-[var(--color-primary)] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Alokasi Realisasi</span>
        </button>
      </div>

      {/* Main Card Form Area */}
      <section className="w-full bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 md:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)] border border-blue-200">
              {activeTab.includes('siup') && <Building2 className="w-5 h-5" />}
              {activeTab.includes('kapal') && <Ship className="w-5 h-5" />}
              {activeTab === 'alokasi_realisasi' && <BarChart3 className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">
                {activeTab === 'siup_aktif' && 'Formulir SIUP Aktif'}
                {activeTab === 'siup_terbit' && 'Formulir SIUP Terbit'}
                {activeTab === 'kapal_aktif' && 'Formulir Kapal Aktif'}
                {activeTab === 'kapal_terbit' && 'Formulir Kapal Terbit'}
                {activeTab === 'alokasi_realisasi' && 'Formulir Alokasi Realisasi'}
              </h2>
              <p className="text-xs text-[var(--color-muted)]">
                Lengkapi isian data formulir di bawah ini lalu tekan tombol submit.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            Reset Form
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form 1 & 2: SIUP Aktif & SIUP Terbit */}
          {(activeTab === 'siup_aktif' || activeTab === 'siup_terbit') && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Perusahaan
                </label>
                <input
                  required
                  type="text"
                  value={siupCompany}
                  onChange={(e) => setSiupCompany(e.target.value)}
                  placeholder="Masukkan nama perusahaan..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:brightness-95 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </div>
          )}

          {/* Form 3 & 4: Kapal Aktif & Kapal Terbit */}
          {(activeTab === 'kapal_aktif' || activeTab === 'kapal_terbit') && (
            <div className="space-y-5">
              {/* Nama Perusahaan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Perusahaan
                </label>
                <input
                  required
                  type="text"
                  value={kapalCompany}
                  onChange={(e) => setKapalCompany(e.target.value)}
                  placeholder="Masukkan nama perusahaan..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Kombinasi 1: Dropdown Dan/Atau + Nama Kapal */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kombinasi 1
                  </label>
                  <select
                    value={operator1}
                    onChange={(e) => setOperator1(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-bold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="DAN">DAN</option>
                    <option value="ATAU">ATAU</option>
                  </select>
                </div>

                <div className="md:col-span-9">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Kapal
                  </label>
                  <input
                    type="text"
                    value={vesselName1}
                    onChange={(e) => setVesselName1(e.target.value)}
                    placeholder="Masukkan nama kapal..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              {/* Kombinasi 2: Dropdown Dan/Atau + Nama Kapal */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kombinasi 2
                  </label>
                  <select
                    value={operator2}
                    onChange={(e) => setOperator2(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-bold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="DAN">DAN</option>
                    <option value="ATAU">ATAU</option>
                  </select>
                </div>

                <div className="md:col-span-9">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Kapal
                  </label>
                  <input
                    type="text"
                    value={vesselName2}
                    onChange={(e) => setVesselName2(e.target.value)}
                    placeholder="Masukkan nama kapal..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:brightness-95 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </div>
          )}

          {/* Form 5: Alokasi Realisasi */}
          {activeTab === 'alokasi_realisasi' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Perusahaan
                  </label>
                  <input
                    required
                    type="text"
                    value={alokasiCompany}
                    onChange={(e) => setAlokasiCompany(e.target.value)}
                    placeholder="Masukkan nama perusahaan..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nomor SIUP
                  </label>
                  <input
                    required
                    type="text"
                    value={alokasiSiupNo}
                    onChange={(e) => setAlokasiSiupNo(e.target.value)}
                    placeholder="Masukkan nomor SIUP..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:brightness-95 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </Layout>
  )
}
