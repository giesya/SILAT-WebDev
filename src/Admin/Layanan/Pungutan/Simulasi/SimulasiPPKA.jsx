import { useState } from 'react'
import Layout from '../../../../components/Layout.jsx'
import {
  Calculator,
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet,
  ReceiptText,
  Ship,
  Info
} from 'lucide-react'

const GEAR_TYPES = [
  'Kapal Pengangkut Ikan antar Pelabuhan Pangkalan',
  'Kapal Pengangkut Ikan dari Daerah Penangkapan Ikan (WPPNRI)',
  'Kapal Pengangkut Ikan di Laut Lepas',
  'Kapal Pengangkut Ikan Hidup Antar Tempat Pembudidayaan Ikan',
  'Kapal Pengangkut Ikan Hidup dari Tempat Pembudidayaan / Pelabuhan Check Point ke Negara Tujuan Ekspor',
  'Kapal Pengangkut Ikan Segar/Beku ke Negara Tujuan',
  'Kapal Pengangkut Ikan Sewa untuk Ikan Hidup dari Check Point ke Negara Tujuan (Berbendera Asing)',
  'Kapal Pengangkut Ikan Sewa untuk Ikan Segar/Beku ke Negara Tujuan (Berbendera Asing)',
  'Rumpon',
]

function getTarifPerGt(gear) {
  switch (gear) {
    case 'Kapal Pengangkut Ikan antar Pelabuhan Pangkalan':
      return 950000
    case 'Kapal Pengangkut Ikan dari Daerah Penangkapan Ikan (WPPNRI)':
      return 1150000
    case 'Kapal Pengangkut Ikan di Laut Lepas':
      return 1450000
    case 'Kapal Pengangkut Ikan Hidup Antar Tempat Pembudidayaan Ikan':
      return 1100000
    case 'Kapal Pengangkut Ikan Hidup dari Tempat Pembudidayaan / Pelabuhan Check Point ke Negara Tujuan Ekspor':
      return 1650000
    case 'Kapal Pengangkut Ikan Segar/Beku ke Negara Tujuan':
      return 1550000
    case 'Kapal Pengangkut Ikan Sewa untuk Ikan Hidup dari Check Point ke Negara Tujuan (Berbendera Asing)':
      return 2400000
    case 'Kapal Pengangkut Ikan Sewa untuk Ikan Segar/Beku ke Negara Tujuan (Berbendera Asing)':
      return 2200000
    case 'Rumpon':
      return 3500000
    default:
      return 1250000
  }
}

export default function SimulasiPPKA({ onLogout }) {
  // Form states (Initial empty state)
  const [sppType, setSppType] = useState('')
  const [gearType, setGearType] = useState('')
  const [vesselSize, setVesselSize] = useState('')

  // Calculation result state
  const [calculationResult, setCalculationResult] = useState(null)

  const handleCalculate = (e) => {
    if (e) e.preventDefault()

    const gtNum = parseFloat(vesselSize) || 0

    if (!gtNum || gtNum <= 0) {
      alert('Silakan masukkan Ukuran Kapal (GT) yang valid.')
      return
    }

    if (!gearType) {
      alert('Silakan pilih Jenis Alat Tangkap / Armada Pengangkut.')
      return
    }

    const tarifPerGt = getTarifPerGt(gearType)
    const totalAmount = gearType === 'Rumpon' ? tarifPerGt : gtNum * tarifPerGt

    setCalculationResult({
      sppType: sppType || 'Pertama',
      gearType,
      vesselSize: gtNum,
      tarifPerGt,
      totalAmount,
    })
  }

  const handleReset = () => {
    setSppType('')
    setGearType('')
    setVesselSize('')
    setCalculationResult(null)
  }

  const breadcrumbs = [
    { label: 'Layanan' },
    { label: 'Pungutan' },
    { label: 'Simulasi PPPKA' },
  ]

  return (
    <Layout
      currentPath="/layanan/pungutan/simulasi/ppka"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Simulasi Pungutan Penggunaan Kapal Angkut (PPPKA)"
    >
      {/* Parameter Form Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[var(--color-primary)] border border-blue-100 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">Parameter Perhitungan SPP–PPPKA</h2>
              <p className="text-xs text-[var(--color-muted)]">
                Lengkapi formulir di bawah ini untuk menghitung simulasi tagihan SPP–PPP Kapal Angkut.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Formulir</span>
          </button>
        </div>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Jenis SPP PPPKA */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jenis SPP PPPKA
              </label>
              <select
                value={sppType}
                onChange={(e) => setSppType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Pilih Jenis SPP PPPKA --</option>
                <option value="Pertama">Pertama</option>
                <option value="Perpanjangan">Perpanjangan</option>
              </select>
            </div>

            {/* Jenis Alat Tangkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jenis Alat Tangkap
              </label>
              <select
                value={gearType}
                onChange={(e) => setGearType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Pilih Jenis Alat Tangkap --</option>
                {GEAR_TYPES.map((gear, idx) => (
                  <option key={idx} value={gear}>
                    {gear}
                  </option>
                ))}
              </select>
            </div>

            {/* Ukuran Kapal * */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ukuran Kapal (GT) *
              </label>
              <input
                type="number"
                min="1"
                placeholder="Masukkan ukuran GT (contoh: 150)..."
                value={vesselSize}
                onChange={(e) => setVesselSize(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-bold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Button Hitung */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-[var(--color-primary)] text-white text-xs font-extrabold flex items-center justify-center gap-2 hover:brightness-95 transition cursor-pointer shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Hitung</span>
            </button>
          </div>
        </form>
      </section>

      {/* Tabel PERINCIAN SPP-PPP KAPAL ANGKUT */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="font-bold text-sm text-[var(--color-text)]">
              PERINCIAN SPP-PPP KAPAL ANGKUT
            </h3>
          </div>

          {calculationResult && (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulasi Terhitung: {calculationResult.vesselSize} GT ({calculationResult.sppType})</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-6 py-3.5 font-bold">Komponen Perincian SPP–PPP Kapal Angkut</th>
                <th className="px-6 py-3.5 font-bold text-right">Nilai / Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {!calculationResult ? (
                <tr>
                  <td colSpan={2} className="px-5 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <ReceiptText className="w-8 h-8 text-slate-300" />
                      <p className="font-bold text-slate-700 text-sm">Belum Ada Perincian SPP–PPP Kapal Angkut</p>
                      <p className="text-xs text-slate-400">
                        Silakan pilih jenis SPP, alat tangkap, dan masukkan ukuran kapal (GT) di atas, kemudian klik tombol <strong className="text-[var(--color-primary)]">"Hitung"</strong>.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {/* Jenis Armada */}
                  <tr className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      Jenis Alat Tangkap / Armada Pengangkut
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-[var(--color-text)]">
                      {calculationResult.gearType}
                    </td>
                  </tr>

                  {/* Ukuran GT Kapal */}
                  <tr className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      Ukuran GT Kapal
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-800 text-sm">
                      {calculationResult.vesselSize.toLocaleString('id-ID')} GT
                    </td>
                  </tr>

                  {/* Tarif Per GT */}
                  <tr className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      Tarif Per GT
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-[var(--color-primary)] text-sm">
                      Rp. {calculationResult.tarifPerGt.toLocaleString('id-ID')}
                    </td>
                  </tr>
                </>
              )}
            </tbody>

            {/* Total Perincian SPP-PPP Kapal Angkut */}
            <tfoot>
              <tr className="bg-slate-100/90 border-t-2 border-slate-200 text-xs font-bold text-slate-800">
                <td className="px-6 py-4 uppercase tracking-wider text-slate-700 font-extrabold">
                  Total Perincian SPP-PPP Kapal Angkut
                </td>
                <td className="px-6 py-4 text-right font-mono font-black text-emerald-700 text-base whitespace-nowrap">
                  {calculationResult
                    ? `Rp. ${calculationResult.totalAmount.toLocaleString('id-ID')}`
                    : 'Rp. 0'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </Layout>
  )
}
