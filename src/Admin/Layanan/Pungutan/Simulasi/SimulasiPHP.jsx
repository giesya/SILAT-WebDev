import { useState } from 'react'
import Layout from '../../../../components/Layout.jsx'
import {
  Calculator,
  RotateCcw,
  Info,
  CheckCircle2,
  ReceiptText,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react'

const GEAR_TYPES = [
  'Bagan Berperahu',
  'Bagan Berperahu Teri',
  'Bouke Ami',
  'Bubu (Pots)',
  'Huhate',
  'Huhate Mekanis',
  'Jala Jatuh Berkapal',
  'Jaring Hela Ikan Berkantong',
  'Jaring Hela Udang Berkantong',
  'Jaring Insang Hanyut',
  'Jaring Insang Tetap',
  'Jaring Tarik Berkantong',
  'Jaring Tarik Berkantong (Es Batu)',
  'Jaring Tarik Berkantong (Freezer)',
  'Kapal Pengangkut Ikan antar Pelabuhan Pangkalan',
  'Kapal Pengangkut Ikan dari Daerah Penangkapan Ikan (WPPNRI)',
  'Kapal Pengangkut Ikan di Laut Lepas',
  'Kapal Pengangkut Ikan Hidup Antar Tempat Pembudidayaan Ikan',
  'Kapal Pengangkut Ikan Hidup dari Tempat Pembudidayaan / Pelabuhan Check Point ke Negara Tujuan Ekspor',
  'Kapal Pengangkut Ikan Segar/Beku ke Negara Tujuan',
  'Kapal Pengangkut Ikan Sewa untuk Ikan Hidup dari Check Point ke Negara Tujuan (Berbendera Asing)',
  'Kapal Pengangkut Ikan Sewa untuk Ikan Segar/Beku ke Negara Tujuan (Berbendera Asing)',
  'Pancing Berjoran',
  'Pancing Cumi',
  'Pancing Cumi Mekanis',
  'Pancing Ulur',
  'Pancing Ulur Tuna',
  'Payang',
  'Pukat Cincin Pelagis Besar dengan Satu Kapal',
  'Pukat Cincin Pelagis Kecil dengan Satu Kapal',
  'Pukat Cincin Teri dengan Satu Kapal',
  'Pukat Labuh',
  'Rawai Dasar',
  'Rawai Tuna',
  'Rumpon',
]

const WATER_CATEGORIES = [
  'Perairan Dalam',
  'Perairan Dangkal',
  'Laut Lepas S. Hindia',
  'Laut Lepas S. Pasifik',
]

const SPECIES_PRESETS = [
  { name: 'Ikan Cakalang', latin: 'Katsuwonus pelamis', code: 'CKL-01', tonGt: 0.95, hpi: 22500 },
  { name: 'Ikan Tuna Madidihang', latin: 'Thunnus albacares', code: 'TNA-02', tonGt: 0.65, hpi: 42000 },
  { name: 'Ikan Tongkol Komo', latin: 'Euthynnus affinis', code: 'TKL-03', tonGt: 0.45, hpi: 18000 },
  { name: 'Ikan Layang', latin: 'Decapterus spp.', code: 'LYG-04', tonGt: 0.35, hpi: 16500 },
]

export default function SimulasiPHP({ onLogout }) {
  // Form states (Initial empty state)
  const [productivityRule, setProductivityRule] = useState('Kepmen KP Nomor 98 Tahun 2021')
  const [sppType, setSppType] = useState('')
  const [gearType, setGearType] = useState('')
  const [waterCategory, setWaterCategory] = useState('')
  const [tariffPercent, setTariffPercent] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [vesselSize, setVesselSize] = useState('')

  // Calculation state
  const [calculationResult, setCalculationResult] = useState(null)

  const handleCalculate = (e) => {
    if (e) e.preventDefault()

    const gtNum = parseFloat(vesselSize) || 0
    const percentNum = parseFloat(tariffPercent) || 0

    if (!gtNum || gtNum <= 0) {
      alert('Silakan masukkan Ukuran Kapal (GT) yang valid.')
      return
    }

    if (!percentNum || percentNum <= 0) {
      alert('Silakan pilih Persentase Tarif.')
      return
    }

    // Generate detailed breakdown items
    const rows = SPECIES_PRESETS.map((sp) => {
      const tonTh = Math.round(sp.tonGt * gtNum * 100) / 100
      const volumeKg = Math.round(tonTh * 1000)
      const totalAmount = Math.round(volumeKg * sp.hpi * (percentNum / 100))
      return {
        hasil: sp.name,
        tonGt: sp.tonGt,
        tonTh: tonTh,
        nama: `${sp.name} (${sp.latin})`,
        kode: sp.code,
        persen: `${percentNum.toFixed(2)}%`,
        jumlahKg: volumeKg,
        hpi: sp.hpi,
        total: totalAmount,
      }
    })

    const totalTagihan = rows.reduce((acc, curr) => acc + curr.total, 0)
    const totalVolumeKg = rows.reduce((acc, curr) => acc + curr.jumlahKg, 0)
    const totalTonTh = rows.reduce((acc, curr) => acc + curr.tonTh, 0)

    setCalculationResult({
      vesselSize: gtNum,
      tariffPercent: percentNum,
      gearType: gearType || 'Semua Alat Tangkap',
      waterCategory: waterCategory || 'Perairan WPPNRI',
      sppType: sppType || 'Pertama',
      startDate,
      endDate,
      rows,
      totalVolumeKg,
      totalTonTh,
      totalTagihan,
    })
  }

  const handleReset = () => {
    setProductivityRule('Kepmen KP Nomor 98 Tahun 2021')
    setSppType('')
    setGearType('')
    setWaterCategory('')
    setTariffPercent('')
    setStartDate('')
    setEndDate('')
    setVesselSize('')
    setCalculationResult(null)
  }

  const breadcrumbs = [
    { label: 'Layanan' },
    { label: 'Pungutan' },
    { label: 'Simulasi PHP' },
  ]

  return (
    <Layout
      currentPath="/layanan/pungutan/simulasi/php"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Simulasi Pungutan Hasil Perikanan (PHP)"
    >
      {/* Parameter Form Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 shadow-xs mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[var(--color-primary)] border border-blue-100 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">Parameter Perhitungan SPP–PHP</h2>
              <p className="text-xs text-[var(--color-muted)]">
                Lengkapi seluruh formulir parameter di bawah ini untuk menghitung simulasi tagihan PHP.
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
          {/* Row 1: Produktivitas, Jenis SPP PHP, Jenis Alat Tangkap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Produktivitas */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Produktivitas
              </label>
              <input
                type="text"
                readOnly
                value={productivityRule}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-700 cursor-not-allowed"
              />
            </div>

            {/* Jenis SPP PHP */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Jenis SPP PHP
              </label>
              <select
                value={sppType}
                onChange={(e) => setSppType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Pilih Jenis SPP PHP --</option>
                <option value="Pertama">Pertama</option>
                <option value="Perpanjangan">Perpanjangan</option>
              </select>
            </div>

            {/* Jenis Alat Tangkap (35 Options) */}
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
          </div>

          {/* Row 2: Kategori Perairan, Persentase Tarif, Ukuran Kapal (GT) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Kategori Perairan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kategori Perairan
              </label>
              <select
                value={waterCategory}
                onChange={(e) => setWaterCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Pilih Kategori Perairan --</option>
                {WATER_CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Persentase Tarif */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Persentase Tarif
              </label>
              <select
                value={tariffPercent}
                onChange={(e) => setTariffPercent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">-- Pilih Persentase Tarif --</option>
                <option value="5.00">5.00% (Skala Kecil: 6 - 60 GT)</option>
                <option value="10.00">10.00% (Skala Menengah: 61 - 1.000 GT)</option>
                <option value="25.00">25.00% (Skala Besar: &gt; 1.000 GT)</option>
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
                placeholder="Masukkan ukuran GT (contoh: 100)..."
                value={vesselSize}
                onChange={(e) => setVesselSize(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-bold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Row 3: Periode Awal SPP *, Periode Akhir SPP *, Tombol Hitung */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-1">
            {/* Periode Awal SPP * */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Periode Awal SPP *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Periode Akhir SPP * */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Periode Akhir SPP *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Button Hitung */}
            <div className="md:col-span-4">
              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-extrabold flex items-center justify-center gap-2 hover:brightness-95 transition cursor-pointer shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span>Hitung Tagihan PHP</span>
              </button>
            </div>
          </div>
        </form>

        {/* Bagian Catatan Resmi KKP */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Catatan Ketentuan Perhitungan:</span>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-amber-800">
            <li><strong>Perairan Dangkal</strong> = WPPNRI-571, 711, 712, 713 &amp; 718</li>
            <li><strong>Perairan Dalam</strong> = WPPNRI-572, 573, 714, 715, 716 &amp; 717</li>
            <li><strong>Laut Lepas S. Hindia dan S. Pasifik</strong> khusus tarif Rawai Tuna</li>
            <li><strong>Persentase Tarif</strong>: 5% = Ukuran Kapal 6 - 60 GT, 10% = 61 - 1.000 GT, 25% = Ukuran Kapal &gt; 1.000 GT</li>
          </ol>
        </div>
      </section>

      {/* Tabel PERINCIAN SPP-PHP */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="font-bold text-sm text-[var(--color-text)]">
              TABEL PERINCIAN SPP–PHP
            </h3>
          </div>

          {calculationResult && (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulasi Terhitung: {calculationResult.vesselSize} GT ({calculationResult.tariffPercent}%)</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3.5 font-bold">HASIL</th>
                <th className="px-4 py-3.5 font-bold text-center">TON GT</th>
                <th className="px-4 py-3.5 font-bold text-center">TON TH</th>
                <th className="px-5 py-3.5 font-bold">NAMA</th>
                <th className="px-4 py-3.5 font-bold text-center">KODE</th>
                <th className="px-4 py-3.5 font-bold text-center">PERSEN</th>
                <th className="px-5 py-3.5 font-bold text-right">JUMLAH (KG)</th>
                <th className="px-5 py-3.5 font-bold text-right">HPI (RP)</th>
                <th className="px-5 py-3.5 font-bold text-right">TOTAL (RP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {!calculationResult ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <ReceiptText className="w-8 h-8 text-slate-300" />
                      <p className="font-bold text-slate-700 text-sm">Belum Ada Perincian SPP–PHP</p>
                      <p className="text-xs text-slate-400">
                        Silakan lengkapi parameter ukuran kapal, tarif, dan periode di atas, kemudian klik tombol <strong className="text-[var(--color-primary)]">"Hitung Tagihan PHP"</strong>.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                calculationResult.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                    {/* HASIL */}
                    <td className="px-4 py-4 font-bold text-[var(--color-text)] whitespace-nowrap">
                      {row.hasil}
                    </td>

                    {/* TON GT */}
                    <td className="px-4 py-4 text-center font-mono font-semibold text-slate-700">
                      {row.tonGt.toFixed(2)}
                    </td>

                    {/* TON TH */}
                    <td className="px-4 py-4 text-center font-mono font-bold text-slate-800">
                      {row.tonTh.toLocaleString('id-ID')}
                    </td>

                    {/* NAMA */}
                    <td className="px-5 py-4 text-slate-800 font-medium">
                      {row.nama}
                    </td>

                    {/* KODE */}
                    <td className="px-4 py-4 text-center font-mono font-bold text-[var(--color-primary)]">
                      {row.kode}
                    </td>

                    {/* PERSEN */}
                    <td className="px-4 py-4 text-center font-bold text-slate-700">
                      {row.persen}
                    </td>

                    {/* JUMLAH (KG) */}
                    <td className="px-5 py-4 text-right font-mono font-semibold text-slate-800 whitespace-nowrap">
                      {row.jumlahKg.toLocaleString('id-ID')} Kg
                    </td>

                    {/* HPI */}
                    <td className="px-5 py-4 text-right font-mono text-slate-700 whitespace-nowrap">
                      Rp {row.hpi.toLocaleString('id-ID')}
                    </td>

                    {/* TOTAL */}
                    <td className="px-5 py-4 text-right font-mono font-extrabold text-emerald-700 whitespace-nowrap">
                      Rp {row.total.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Baris Total Keseluruhan SPP-PHP */}
            <tfoot>
              <tr className="bg-slate-100/90 border-t-2 border-slate-200 text-xs font-bold text-slate-800">
                <td colSpan={2} className="px-4 py-4 uppercase tracking-wider text-slate-600 text-right">
                  TOTAL KESELURUHAN:
                </td>
                <td className="px-4 py-4 text-center font-mono font-black text-slate-800">
                  {calculationResult ? `${calculationResult.totalTonTh.toLocaleString('id-ID')} Ton` : '-'}
                </td>
                <td colSpan={3} className="px-4 py-4"></td>
                <td className="px-5 py-4 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                  {calculationResult ? `${calculationResult.totalVolumeKg.toLocaleString('id-ID')} Kg` : '-'}
                </td>
                <td className="px-5 py-4 text-right text-slate-400 font-mono">-</td>
                <td className="px-5 py-4 text-right font-mono font-black text-emerald-700 text-base whitespace-nowrap">
                  {calculationResult ? `Rp ${calculationResult.totalTagihan.toLocaleString('id-ID')}` : 'Rp 0'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </Layout>
  )
}
