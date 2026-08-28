import { useState, useMemo } from 'react'
import Layout from '../../components/Layout.jsx'
import Pagination from '../../components/Pagination.jsx'
import {
  Search,
  Ship,
  FileCheck2,
  Building2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  X,
  RotateCcw,
  Send
} from 'lucide-react'

const SAMPLE_KEMENHUB_SHIPS = [
  {
    id: 1,
    namaKapal: 'KM. BAHARI JAYA 01',
    eksNamaKapal: 'KM. SINAR LAUT',
    callSign: 'YB3920',
    jenisKapal: 'Kapal Penangkap Ikan',
    noAkta: 'AKT-2019-JKT-00441',
    namaPemilik: 'PT Samudera Bahari Nusantara',
    noTandaPendaftaran: '2019 Ba No. 441/L',
    tempatPendaftaran: 'Jakarta',
    tglGrosseAkta: '15/03/2019',
    loa: '28.50 m',
    panjang: '25.40 m',
    lebar: '6.80 m',
    gt: '120 GT',
    alamatPemilik: 'Jl. Muara Baru Raya No. 45, Jakarta Utara',
    bahanUtamaKapal: 'Baja',
    cerobong: '1 Buah',
    benderaAsal: 'Indonesia',
    isiBersih: '36 NT',
    dalam: '3.20 m',
    daya: '450 HP',
    jumlahBalingBaling: '1 (Satu)',
    jumlahGeladak: '1 Geladak',
    jumlahPenumpang: '18 ABK',
    merekTK: 'Yanmar',
    mesin: 'Diesel Motor',
    mesinPutaran: '1800 RPM',
    mesinSN: '6HYM-WET-99412',
    nomorIMO: 'IMO-9812401',
    mesinType: 'Inboard Marine',
    npwp: '01.263.100.1-092.000',
    nomorInduk: 'NIK-3172010901',
    nomorPusat: 'PUSAT-JKT-0912',
    sejakTanggal: '15/03/2019',
    pengerakUtama: 'Motor Diesel',
    suratTanggalUkur: '10/02/2019',
    suratUkurNo: 'PK.110/04/18/DKP-19',
    tandaSelar: 'GT.120 No. 441/Ba',
    tahunPembuatan: '2018',
    tempatPembuatan: 'Tegal',
    tempatUkur: 'Pelabuhan Nizam Zachman Jakarta',
    tglPeletakan: '12/04/2017',
    kategoriKapal: 'Kapal Ikan Motor',
  },
  {
    id: 2,
    namaKapal: 'KM. MINA SEJAHTERA 08',
    eksNamaKapal: 'KM. BINTANG TIMUR',
    callSign: 'YC5512',
    jenisKapal: 'Kapal Penangkap Ikan',
    noAkta: 'AKT-2020-DPS-00912',
    namaPemilik: 'CV Mina Makmur Abadi',
    noTandaPendaftaran: '2020 Ba No. 912/L',
    tempatPendaftaran: 'Benoa Denpasar',
    tglGrosseAkta: '20/08/2020',
    loa: '24.20 m',
    panjang: '21.80 m',
    lebar: '5.90 m',
    gt: '85 GT',
    alamatPemilik: 'Jl. Pelabuhan Benoa No. 12, Denpasar, Bali',
    bahanUtamaKapal: 'Kayu Berlapis Fiber',
    cerobong: '1 Buah',
    benderaAsal: 'Indonesia',
    isiBersih: '26 NT',
    dalam: '2.80 m',
    daya: '350 HP',
    jumlahBalingBaling: '1 (Satu)',
    jumlahGeladak: '1 Geladak',
    jumlahPenumpang: '14 ABK',
    merekTK: 'Mitsubishi',
    mesin: 'Diesel Motor',
    mesinPutaran: '2000 RPM',
    mesinSN: '6D24-88712',
    nomorIMO: 'IMO-9411209',
    mesinType: 'Marine Engine',
    npwp: '02.512.000.8-901.000',
    nomorInduk: 'NIK-5171020804',
    nomorPusat: 'PUSAT-DPS-0411',
    sejakTanggal: '20/08/2020',
    pengerakUtama: 'Motor Diesel',
    suratTanggalUkur: '05/07/2020',
    suratUkurNo: 'PK.110/02/09/DKP-20',
    tandaSelar: 'GT.85 No. 912/Ba',
    tahunPembuatan: '2020',
    tempatPembuatan: 'Banyuwangi',
    tempatUkur: 'Pelabuhan Benoa',
    tglPeletakan: '15/09/2019',
    kategoriKapal: 'Kapal Ikan Motor',
  },
  {
    id: 3,
    namaKapal: 'KM. SAMUDRA PERKASA',
    eksNamaKapal: 'KM. ORIENTAL OCEAN',
    callSign: 'YD7890',
    jenisKapal: 'Kapal Pengangkut Ikan',
    noAkta: 'AKT-2017-BTG-00312',
    namaPemilik: 'PT Pasifik Fishery Utama',
    noTandaPendaftaran: '2017 Ba No. 312/L',
    tempatPendaftaran: 'Bitung',
    tglGrosseAkta: '11/05/2017',
    loa: '38.00 m',
    panjang: '34.50 m',
    lebar: '8.20 m',
    gt: '280 GT',
    alamatPemilik: 'Jl. Samratulangi No. 72, Bitung, Sulawesi Utara',
    bahanUtamaKapal: 'Baja',
    cerobong: '2 Buah',
    benderaAsal: 'Indonesia',
    isiBersih: '84 NT',
    dalam: '4.10 m',
    daya: '850 HP',
    jumlahBalingBaling: '1 (Satu)',
    jumlahGeladak: '2 Geladak',
    jumlahPenumpang: '22 ABK',
    merekTK: 'Caterpillar',
    mesin: 'Diesel Motor',
    mesinPutaran: '1600 RPM',
    mesinSN: 'CAT-3508-44120',
    nomorIMO: 'IMO-9112903',
    mesinType: 'Heavy Duty Marine',
    npwp: '01.243.200.1-019.000',
    nomorInduk: 'NIK-7172030511',
    nomorPusat: 'PUSAT-BTG-0819',
    sejakTanggal: '11/05/2017',
    pengerakUtama: 'Motor Diesel',
    suratTanggalUkur: '18/04/2017',
    suratUkurNo: 'PK.110/01/15/DKP-17',
    tandaSelar: 'GT.280 No. 312/Ba',
    tahunPembuatan: '2017',
    tempatPembuatan: 'Surabaya',
    tempatUkur: 'Pelabuhan Bitung',
    tglPeletakan: '10/01/2016',
    kategoriKapal: 'Kapal Pengangkut Ikan',
  },
  {
    id: 4,
    namaKapal: 'KM. PASIFIK RAYA 09',
    eksNamaKapal: 'KM. CITRA BAHARI',
    callSign: 'YB4421',
    jenisKapal: 'Kapal Penangkap Ikan',
    noAkta: 'AKT-2021-BLW-00512',
    namaPemilik: 'Koperasi Nelayan Sejahtera Mandiri',
    noTandaPendaftaran: '2021 Ba No. 512/L',
    tempatPendaftaran: 'Belawan',
    tglGrosseAkta: '10/01/2021',
    loa: '22.00 m',
    panjang: '19.50 m',
    lebar: '5.20 m',
    gt: '55 GT',
    alamatPemilik: 'Jl. Samudra Belawan No. 88, Medan, Sumatera Utara',
    bahanUtamaKapal: 'Kayu',
    cerobong: '1 Buah',
    benderaAsal: 'Indonesia',
    isiBersih: '17 NT',
    dalam: '2.40 m',
    daya: '280 HP',
    jumlahBalingBaling: '1 (Satu)',
    jumlahGeladak: '1 Geladak',
    jumlahPenumpang: '12 ABK',
    merekTK: 'Nissan Diesel',
    mesin: 'Diesel Motor',
    mesinPutaran: '2200 RPM',
    mesinSN: 'RD8-99120',
    nomorIMO: 'IMO-9331802',
    mesinType: 'Inboard Engine',
    npwp: '01.265.100.0-012.000',
    nomorInduk: 'NIK-1271010109',
    nomorPusat: 'PUSAT-BLW-0512',
    sejakTanggal: '10/01/2021',
    pengerakUtama: 'Motor Diesel',
    suratTanggalUkur: '20/12/2020',
    suratUkurNo: 'PK.110/05/11/DKP-20',
    tandaSelar: 'GT.55 No. 512/Ba',
    tahunPembuatan: '2020',
    tempatPembuatan: 'Sibolga',
    tempatUkur: 'Pelabuhan Belawan',
    tglPeletakan: '08/03/2020',
    kategoriKapal: 'Kapal Ikan Motor',
  },
]

function SortableTh({ label, sortKey, currentSortKey, currentDirection, onSort, className = '' }) {
  const isActive = currentSortKey === sortKey
  return (
    <th
      className={`px-3 py-3 font-bold cursor-pointer select-none hover:bg-white/15 transition-colors whitespace-nowrap ${className}`}
      onClick={() => onSort(sortKey)}
      title={`Klik untuk mengurutkan ${currentDirection === 'asc' && isActive ? 'Z ke A' : 'A ke Z'}`}
    >
      <div className="flex items-center gap-1.5">
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

export default function KemenhubKapal({ onLogout }) {
  const [noTandaPendaftaran, setNoTandaPendaftaran] = useState('')
  const [namaKapal, setNamaKapal] = useState('')

  // Applied filter state
  const [appliedQuery, setAppliedQuery] = useState({
    noTanda: '',
    vessel: '',
  })

  // Table states
  const [sortConfig, setSortConfig] = useState({ key: 'namaKapal', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Modal detail state
  const [selectedShip, setSelectedShip] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAppliedQuery({
      noTanda: noTandaPendaftaran.trim(),
      vessel: namaKapal.trim(),
    })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setNoTandaPendaftaran('')
    setNamaKapal('')
    setAppliedQuery({
      noTanda: '',
      vessel: '',
    })
    setCurrentPage(1)
  }

  // Filter matching ships
  const filteredData = useMemo(() => {
    const qNo = appliedQuery.noTanda.toLowerCase()
    const qVessel = appliedQuery.vessel.toLowerCase()

    return SAMPLE_KEMENHUB_SHIPS.filter((item) => {
      const matchNo = !qNo || item.noTandaPendaftaran.toLowerCase().includes(qNo)
      const matchVessel = !qVessel || item.namaKapal.toLowerCase().includes(qVessel)
      return matchNo && matchVessel
    })
  }, [appliedQuery])

  // Sort dataset
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

  // Paginate dataset
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
    { label: 'Data & Pusat' },
    { label: 'Kemenhub Kapal' },
  ]

  return (
    <Layout
      currentPath="/data-pusat/kemenhub-kapal"
      onLogout={onLogout}
      breadcrumbs={breadcrumbs}
      title="Kemenhub Kapal"
    >
      {/* Form Input Section */}
      <section className="w-full bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] p-6 md:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)] border border-blue-200">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">
                Pencarian Data Kapal Kemenhub (Hubla)
              </h2>
              <p className="text-xs text-[var(--color-muted)]">
                Masukkan No. Tanda Pendaftaran atau Nama Kapal untuk memverifikasi spesifikasi teknis dari Kemenhub.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            Reset Form
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. No. Tanda Pendaftaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                No. Tanda Pendaftaran
              </label>
              <input
                type="text"
                value={noTandaPendaftaran}
                onChange={(e) => setNoTandaPendaftaran(e.target.value)}
                placeholder="Contoh: 2019 Ba No. 441/L"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-mono font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* 2. Nama Kapal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Kapal
              </label>
              <input
                type="text"
                value={namaKapal}
                onChange={(e) => setNamaKapal(e.target.value)}
                placeholder="Contoh: KM. BAHARI JAYA 01"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(31,78,120,0.15)] bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bersihkan</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:brightness-95 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </section>

      {/* Output Table Section */}
      <section className="bg-white rounded-2xl border border-[rgba(31,78,120,0.08)] shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-text)] flex items-center gap-2">
            <Ship className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Hasil Sinkronisasi Data Kapal Kemenhub ({sortedData.length} entitas)</span>
          </h3>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Terhubung API Hubla Kemenhub
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[3400px]">
            <thead>
              <tr className="bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider">
                <th className="px-3 py-3.5 font-bold w-12 text-center">NO</th>
                <th className="px-3 py-3.5 font-bold text-center">AKSI</th>
                <SortableTh label="NAMA KAPAL" sortKey="namaKapal" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="EKS NAMA KAPAL" sortKey="eksNamaKapal" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="CALL SIGN" sortKey="callSign" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="JENIS KAPAL" sortKey="jenisKapal" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NO. AKTA" sortKey="noAkta" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NAMA PEMILIK" sortKey="namaPemilik" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NO. TANDA PENDAFTARAN" sortKey="noTandaPendaftaran" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TEMPAT PENDAFTARAN" sortKey="tempatPendaftaran" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TGL GROSSE AKTA" sortKey="tglGrosseAkta" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="LOA" sortKey="loa" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="PANJANG" sortKey="panjang" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="LEBAR" sortKey="lebar" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="GT" sortKey="gt" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="ALAMAT PEMILIK" sortKey="alamatPemilik" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="BAHAN UTAMA KAPAL" sortKey="bahanUtamaKapal" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="CEROBONG" sortKey="cerobong" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="BENDERA ASAL" sortKey="benderaAsal" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="ISI BERSIH" sortKey="isiBersih" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="DALAM" sortKey="dalam" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="DAYA" sortKey="daya" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="JUMLAH BALING BALING" sortKey="jumlahBalingBaling" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="JUMLAH GELADAK" sortKey="jumlahGeladak" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="JUMLAH PENUMPANG" sortKey="jumlahPenumpang" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="MEREK TK" sortKey="merekTK" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="MESIN" sortKey="mesin" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="MESIN PUTARAN" sortKey="mesinPutaran" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="MESIN SN" sortKey="mesinSN" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NOMOR IMO" sortKey="nomorIMO" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="MESIN TYPE" sortKey="mesinType" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NPWP" sortKey="npwp" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NOMOR INDUK" sortKey="nomorInduk" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="NOMOR PUSAT" sortKey="nomorPusat" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="SEJAK TANGGAL" sortKey="sejakTanggal" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="PENGERAK UTAMA" sortKey="pengerakUtama" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="SURAT TANGGAL UKUR" sortKey="suratTanggalUkur" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="SURAT UKUR NO" sortKey="suratUkurNo" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TANDA SELAR" sortKey="tandaSelar" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TAHUN PEMBUATAN" sortKey="tahunPembuatan" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TEMPAT PEMBUATAN" sortKey="tempatPembuatan" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TEMPAT UKUR" sortKey="tempatUkur" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="TGL PELETAKAN" sortKey="tglPeletakan" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
                <SortableTh label="KATEGORI KAPAL" sortKey="kategoriKapal" currentSortKey={sortConfig.key} currentDirection={sortConfig.direction} onSort={handleSort} />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-[rgba(0,90,156,0.03)] transition-colors">
                  {/* NO */}
                  <td className="px-3 py-3.5 text-center font-bold text-slate-500 whitespace-nowrap">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>

                  {/* AKSI */}
                  <td className="px-3 py-3.5 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedShip(item)}
                      className="p-1.5 rounded-lg border border-[rgba(31,78,120,0.2)] text-[var(--color-primary)] hover:bg-blue-50 transition cursor-pointer"
                      title="Lihat Spesifikasi Lengkap"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>

                  {/* 1. Nama Kapal */}
                  <td className="px-3 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                    {item.namaKapal}
                  </td>

                  {/* 2. Eks Nama Kapal */}
                  <td className="px-3 py-3.5 text-slate-500 whitespace-nowrap">
                    {item.eksNamaKapal}
                  </td>

                  {/* 3. Call Sign */}
                  <td className="px-3 py-3.5 font-mono font-bold text-[var(--color-primary)] whitespace-nowrap">
                    {item.callSign}
                  </td>

                  {/* 4. Jenis Kapal */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.jenisKapal}
                  </td>

                  {/* 5. No. Akta */}
                  <td className="px-3 py-3.5 font-mono whitespace-nowrap">
                    {item.noAkta}
                  </td>

                  {/* 6. Nama Pemilik */}
                  <td className="px-3 py-3.5 font-bold text-slate-800 whitespace-nowrap">
                    {item.namaPemilik}
                  </td>

                  {/* 7. No. Tanda Pendaftaran */}
                  <td className="px-3 py-3.5 font-mono font-bold text-amber-800 whitespace-nowrap">
                    {item.noTandaPendaftaran}
                  </td>

                  {/* 8. Tempat Pendaftaran */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.tempatPendaftaran}
                  </td>

                  {/* 9. Tgl Grosse Akta */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.tglGrosseAkta}
                  </td>

                  {/* 10. LOA */}
                  <td className="px-3 py-3.5 font-semibold whitespace-nowrap">
                    {item.loa}
                  </td>

                  {/* 11. Panjang */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.panjang}
                  </td>

                  {/* 12. Lebar */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.lebar}
                  </td>

                  {/* 13. GT */}
                  <td className="px-3 py-3.5 font-bold text-[var(--color-primary)] whitespace-nowrap">
                    {item.gt}
                  </td>

                  {/* 14. Alamat Pemilik */}
                  <td className="px-3 py-3.5 text-slate-600 min-w-[200px] leading-snug">
                    {item.alamatPemilik}
                  </td>

                  {/* 15. Bahan Utama Kapal */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.bahanUtamaKapal}
                  </td>

                  {/* 16. Cerobong */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.cerobong}
                  </td>

                  {/* 17. Bendera Asal */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.benderaAsal}
                  </td>

                  {/* 18. Isi Bersih */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.isiBersih}
                  </td>

                  {/* 19. Dalam */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.dalam}
                  </td>

                  {/* 20. Daya */}
                  <td className="px-3 py-3.5 font-semibold whitespace-nowrap">
                    {item.daya}
                  </td>

                  {/* 21. Jumlah Baling Baling */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.jumlahBalingBaling}
                  </td>

                  {/* 22. Jumlah Geladak */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.jumlahGeladak}
                  </td>

                  {/* 23. Jumlah Penumpang */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.jumlahPenumpang}
                  </td>

                  {/* 24. Merek TK */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.merekTK}
                  </td>

                  {/* 25. Mesin */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.mesin}
                  </td>

                  {/* 26. Mesin Putaran */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.mesinPutaran}
                  </td>

                  {/* 27. Mesin SN */}
                  <td className="px-3 py-3.5 font-mono whitespace-nowrap">
                    {item.mesinSN}
                  </td>

                  {/* 28. Nomor IMO */}
                  <td className="px-3 py-3.5 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {item.nomorIMO}
                  </td>

                  {/* 29. Mesin Type */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.mesinType}
                  </td>

                  {/* 30. NPWP */}
                  <td className="px-3 py-3.5 font-mono whitespace-nowrap">
                    {item.npwp}
                  </td>

                  {/* 31. Nomor Induk */}
                  <td className="px-3 py-3.5 font-mono whitespace-nowrap">
                    {item.nomorInduk}
                  </td>

                  {/* 32. Nomor Pusat */}
                  <td className="px-3 py-3.5 font-mono whitespace-nowrap">
                    {item.nomorPusat}
                  </td>

                  {/* 33. Sejak Tanggal */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.sejakTanggal}
                  </td>

                  {/* 34. Pengerak Utama */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.pengerakUtama}
                  </td>

                  {/* 35. Surat Tanggal Ukur */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.suratTanggalUkur}
                  </td>

                  {/* 36. Surat Ukur No */}
                  <td className="px-3 py-3.5 font-mono whitespace-nowrap">
                    {item.suratUkurNo}
                  </td>

                  {/* 37. Tanda Selar */}
                  <td className="px-3 py-3.5 font-bold text-slate-800 whitespace-nowrap">
                    {item.tandaSelar}
                  </td>

                  {/* 38. Tahun Pembuatan */}
                  <td className="px-3 py-3.5 font-semibold whitespace-nowrap">
                    {item.tahunPembuatan}
                  </td>

                  {/* 39. Tempat Pembuatan */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.tempatPembuatan}
                  </td>

                  {/* 40. Tempat Ukur */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.tempatUkur}
                  </td>

                  {/* 41. Tgl Peletakan */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    {item.tglPeletakan}
                  </td>

                  {/* 42. Kategori Kapal */}
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[var(--color-primary)] border border-blue-200">
                      {item.kategoriKapal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--color-muted)]">
            Data kapal tidak ditemukan sesuai No. Tanda Pendaftaran atau Nama Kapal yang dimasukkan.
          </div>
        ) : (
          <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalItems={sortedData.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>

      {/* Modal Detail Spesifikasi Kapal Kemenhub */}
      {selectedShip && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedShip(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-[var(--color-primary)]">
                <Ship className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text)]">
                    Spesifikasi Teknis Kapal Hubla Kemenhub
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">{selectedShip.namaKapal} ({selectedShip.tandaSelar})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedShip(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              {/* Section 1: Identitas Kapal & Pemilik */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[var(--color-primary)] border-b pb-1">
                  1. Identitas & Kepemilikan Kapal
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 block">Nama Kapal:</span>
                    <span className="font-bold text-slate-900">{selectedShip.namaKapal}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Eks Nama Kapal:</span>
                    <span className="font-medium text-slate-700">{selectedShip.eksNamaKapal}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Call Sign / IMO:</span>
                    <span className="font-mono font-bold text-slate-800">{selectedShip.callSign} / {selectedShip.nomorIMO}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Nama Pemilik:</span>
                    <span className="font-bold text-slate-800">{selectedShip.namaPemilik}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">NPWP Pemilik:</span>
                    <span className="font-mono text-slate-700">{selectedShip.npwp}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Kategori / Jenis:</span>
                    <span className="font-medium text-slate-800">{selectedShip.kategoriKapal}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block">Alamat Pemilik:</span>
                  <span className="font-medium text-slate-700">{selectedShip.alamatPemilik}</span>
                </div>
              </div>

              {/* Section 2: Pendaftaran & Ukur Kapal */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[var(--color-primary)] border-b pb-1">
                  2. Pendaftaran & Surat Ukur
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 block">No. Tanda Pendaftaran:</span>
                    <span className="font-mono font-bold text-amber-800">{selectedShip.noTandaPendaftaran}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tempat Pendaftaran:</span>
                    <span className="font-medium text-slate-800">{selectedShip.tempatPendaftaran}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">No. Akta / Tgl Grosse:</span>
                    <span className="font-medium text-slate-800">{selectedShip.noAkta} ({selectedShip.tglGrosseAkta})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tanda Selar:</span>
                    <span className="font-bold text-slate-900">{selectedShip.tandaSelar}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Surat Ukur No:</span>
                    <span className="font-mono text-slate-800">{selectedShip.suratUkurNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tgl & Tempat Ukur:</span>
                    <span className="text-slate-800">{selectedShip.suratTanggalUkur} ({selectedShip.tempatUkur})</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Dimensi & Mesin */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[var(--color-primary)] border-b pb-1">
                  3. Dimensi Fisik & Tenaga Penggerak
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 block">Gross Tonnage (GT):</span>
                    <span className="font-bold text-[var(--color-primary)]">{selectedShip.gt}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Isi Bersih (NT):</span>
                    <span className="font-semibold text-slate-800">{selectedShip.isiBersih}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Dimensi (LOA/P/L/D):</span>
                    <span className="text-slate-800 font-mono">{selectedShip.loa} / {selectedShip.panjang} / {selectedShip.lebar} / {selectedShip.dalam}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bahan / Geladak:</span>
                    <span className="text-slate-800">{selectedShip.bahanUtamaKapal} / {selectedShip.jumlahGeladak}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Merek Mesin:</span>
                    <span className="font-bold text-slate-800">{selectedShip.merekTK}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Daya / Putaran:</span>
                    <span className="text-slate-800">{selectedShip.daya} ({selectedShip.mesinPutaran})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Mesin SN / Type:</span>
                    <span className="font-mono text-slate-800">{selectedShip.mesinSN}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Thn & Tempat Buat:</span>
                    <span className="text-slate-800">{selectedShip.tahunPembuatan} ({selectedShip.tempatPembuatan})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setSelectedShip(null)}
                className="px-5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-95 transition cursor-pointer"
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
