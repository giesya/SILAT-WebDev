import { useState, useMemo } from 'react'
import Layout from '../../../../components/Layout.jsx'
import {
  Calculator,
  Plus,
  Trash2,
  Ship,
  RotateCcw,
  Info,
  Check
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

const RANGE_GT_OPTIONS = [
  { label: '5 - 10 GT', avgGt: 8, baseRate: 850000 },
  { label: '11 - 20 GT', avgGt: 15, baseRate: 950000 },
  { label: '21 - 30 GT', avgGt: 25, baseRate: 1100000 },
  { label: '31 - 50 GT', avgGt: 40, baseRate: 1350000 },
  { label: '51 - 100 GT', avgGt: 75, baseRate: 1600000 },
  { label: '101 - 150 GT', avgGt: 125, baseRate: 1850000 },
  { label: '151 - 200 GT', avgGt: 175, baseRate: 2100000 },
  { label: '201 - 300 GT', avgGt: 250, baseRate: 2400000 },
  { label: '301 - 500 GT', avgGt: 400, baseRate: 2800000 },
  { label: '501 - 1000 GT', avgGt: 750, baseRate: 3300000 },
  { label: '1001 - 2000 GT', avgGt: 1500, baseRate: 4000000 },
  { label: '2001 - 3000 GT', avgGt: 2500, baseRate: 4800000 },
  { label: '3001 - 5000 GT', avgGt: 4000, baseRate: 5500000 },
]

function calculateRowTarif(gear, gtRangeLabel) {
  if (!gear || !gtRangeLabel) return 0

  const rangeObj = RANGE_GT_OPTIONS.find((r) => r.label === gtRangeLabel)
  if (!rangeObj) return 0

  if (gear === 'Rumpon') {
    return 3500000
  }

  let multiplier = 1.0
  if (gear.includes('Pukat Cincin Pelagis Besar') || gear.includes('Rawai Tuna')) {
    multiplier = 1.25
  } else if (gear.includes('Kapal Pengangkut')) {
    multiplier = 1.15
  } else if (gear.includes('Pancing Ulur') || gear.includes('Bubu')) {
    multiplier = 0.85
  }

  return Math.round(rangeObj.avgGt * rangeObj.baseRate * multiplier)
}

export default function SimulasiPPP({ onLogout }) {
  // Initial state is completely empty
  const [rows, setRows] = useState([])
  const [showCalculatedBadge, setShowCalculatedBadge] = useState(false)

  // Add empty row
  const handleAddRow = () => {
    const newId = Date.now()
    setRows((prev) => [
      ...prev,
      {
        id: newId,
        checked: true,
        gear: '',
        gtRange: '',
        allocation: '',
      },
    ])
    setShowCalculatedBadge(false)
  }

  // Delete row
  const handleDeleteRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
    setShowCalculatedBadge(false)
  }

  // Toggle checkbox
  const handleToggleCheck = (id) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    )
    setShowCalculatedBadge(false)
  }

  // Toggle select all
  const allChecked = rows.length > 0 && rows.every((r) => r.checked)
  const handleToggleAll = () => {
    const nextVal = !allChecked
    setRows((prev) => prev.map((r) => ({ ...r, checked: nextVal })))
    setShowCalculatedBadge(false)
  }

  // Update row field
  const handleUpdateRow = (id, field, val) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    )
    setShowCalculatedBadge(false)
  }

  // Process rows with auto-generated rates
  const computedRows = useMemo(() => {
    return rows.map((r) => {
      const tarifPPP = calculateRowTarif(r.gear, r.gtRange)
      const alloc = Math.max(0, parseInt(r.allocation, 10) || 0)
      const jumlahTagihan = r.checked && tarifPPP > 0 && alloc > 0 ? tarifPPP * alloc : 0
      return {
        ...r,
        allocationNum: alloc,
        tarifPPP,
        jumlahTagihan,
      }
    })
  }, [rows])

  // Total active statistics
  const activeRows = computedRows.filter((r) => r.checked && r.allocationNum > 0 && r.tarifPPP > 0)
  const totalActiveArmada = activeRows.reduce((acc, r) => acc + r.allocationNum, 0)
  const totalActiveTagihan = activeRows.reduce((acc, r) => acc + r.jumlahTagihan, 0)

  // Handle Calculate Trigger
  const handleCalculate = () => {
    if (rows.length === 0) {
      alert('Silakan tambahkan data alokasi armada terlebih dahulu.')
      return
    }
    setShowCalculatedBadge(true)
  }

  const handleReset = () => {
    setRows([])
    setShowCalculatedBadge(false)
  }

  const breadcrumbs = [
    { label: 'Layanan' },
    { label: 'Pungutan' },
    { label: 'Simulasi PPP' },
  ]

  return (
    <Layout
      currentPath="/layanan/pungutan/simulasi/ppp"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Simulasi Pungutan Pengusahaan Perikanan (PPP)"
    >
      {/* Table Section with Bottom Total Row */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[var(--color-primary)] border border-blue-100 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">Tabel Parameter Alokasi Armada PPP</h2>
              <p className="text-xs text-[var(--color-muted)]">Pilih checklist status armada dan atur alokasi izin untuk menghitung tagihan.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:brightness-95 transition cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data Alokasi</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[1050px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3.5 font-bold text-center w-24">
                  <div className="flex flex-col items-center gap-1">
                    <span>STATUS ARMADA ALOKASI</span>
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={handleToggleAll}
                      disabled={rows.length === 0}
                      className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer disabled:opacity-50"
                      title="Pilih / Batalkan Semua"
                    />
                  </div>
                </th>
                <th className="px-5 py-3.5 font-bold min-w-[260px]">Jenis Alat Tangkap</th>
                <th className="px-4 py-3.5 font-bold min-w-[150px]">Range GT</th>
                <th className="px-4 py-3.5 font-bold w-32 text-center">Alokasi Izin</th>
                <th className="px-5 py-3.5 font-bold min-w-[160px]">Tarif PPP (Auto)</th>
                <th className="px-5 py-3.5 font-bold min-w-[180px]">Jumlah Tagihan PPP (Auto)</th>
                <th className="px-4 py-3.5 font-bold text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {computedRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Ship className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-slate-700 text-sm">Belum Ada Data Alokasi Armada</p>
                      <p className="text-xs text-slate-400">
                        Silakan klik tombol <strong className="text-[var(--color-primary)] font-bold">"+ Tambah Data Alokasi"</strong> di atas untuk memulai simulasi perhitungan.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                computedRows.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      row.checked ? 'bg-blue-50/20 hover:bg-blue-50/40' : 'opacity-70 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    {/* Status Armada Alokasi (Checkbox) */}
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => handleToggleCheck(row.id)}
                        className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                      />
                    </td>

                    {/* Jenis Alat Tangkap (Dropdown) */}
                    <td className="px-5 py-4">
                      <select
                        value={row.gear}
                        onChange={(e) => handleUpdateRow(row.id, 'gear', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">-- Pilih Jenis Alat Tangkap --</option>
                        {GEAR_TYPES.map((gear, idx) => (
                          <option key={idx} value={gear}>
                            {gear}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Range GT (Dropdown) */}
                    <td className="px-4 py-4">
                      <select
                        value={row.gtRange}
                        onChange={(e) => handleUpdateRow(row.id, 'gtRange', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[rgba(31,78,120,0.15)] bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">-- Pilih Range GT --</option>
                        {RANGE_GT_OPTIONS.map((rng, idx) => (
                          <option key={idx} value={rng.label}>
                            {rng.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Alokasi Izin (Input Text/Number) */}
                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="0"
                        value={row.allocation}
                        onChange={(e) => handleUpdateRow(row.id, 'allocation', e.target.value)}
                        className="w-20 px-3 py-2 text-center rounded-xl border border-[rgba(31,78,120,0.15)] bg-white text-xs font-bold text-slate-800 focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </td>

                    {/* Tarif PPP (Auto Generate) */}
                    <td className="px-5 py-4 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                      {row.tarifPPP > 0 ? `Rp ${row.tarifPPP.toLocaleString('id-ID')}` : '-'}
                    </td>

                    {/* Jumlah Tagihan PPP (Auto Generate) */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {row.jumlahTagihan > 0 ? (
                        <span className="font-mono font-extrabold text-emerald-700">
                          Rp {row.jumlahTagihan.toLocaleString('id-ID')}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium italic">Rp 0</span>
                      )}
                    </td>

                    {/* Aksi (Delete Row) */}
                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(row.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                        title="Hapus Baris Data"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Baris Total Langsung di Bawah Tabel */}
            <tfoot>
              <tr className="bg-slate-100/90 border-t-2 border-slate-200 text-xs font-bold text-slate-800">
                <td colSpan={3} className="px-5 py-4 text-right uppercase tracking-wider text-slate-600">
                  Total Keseluruhan (Status Armada Tercentang):
                </td>
                <td className="px-4 py-4 text-center font-extrabold text-[var(--color-primary)] text-sm">
                  {totalActiveArmada} Unit
                </td>
                <td className="px-5 py-4 text-slate-400 font-mono">-</td>
                <td className="px-5 py-4 font-mono font-black text-emerald-700 text-base whitespace-nowrap">
                  Rp {totalActiveTagihan.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-4 text-center">-</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Action Footer: Button Hitung, Reset, dan Tagihan Terhitung */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
            <span>
              Menghitung <strong>{activeRows.length}</strong> dari <strong>{rows.length}</strong> jenis alat tangkap (Total <strong>{totalActiveArmada} unit kapal</strong>).
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleCalculate}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Hitung Total Tagihan</span>
            </button>

            {/* Kotak Ringkasan Total Tagihan PPP */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${
              showCalculatedBadge
                ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30'
                : 'bg-white border-slate-200'
            }`}>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Total Tagihan PPP Terhitung
                </span>
                <span className="text-sm sm:text-base font-mono font-black text-emerald-700">
                  Rp {totalActiveTagihan.toLocaleString('id-ID')}
                </span>
              </div>
              {showCalculatedBadge && (
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
