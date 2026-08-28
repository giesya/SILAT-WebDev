# SILAT - Sistem Informasi Layanan Cepat (WebDev)

> **Kementerian Kelautan dan Perikanan Republik Indonesia (KKP RI)**  
> **Direktorat Jenderal Perikanan Tangkap (DJPT)**  
> *Perizinan Berusaha Subsektor Penangkapan Ikan dan Subsektor Pengangkutan Ikan*

---

## 📌 Tentang Proyek
**SILAT (Sistem Informasi Layanan Cepat)** adalah aplikasi berbasis web modern untuk pengelolaan, verifikasi, penerbitan, simulasi pungutan PNBP, pembekuan, pencabutan, serta pengarsipan perizinan berusaha perikanan tangkap di Indonesia (SIUP, SIPI, SIKPI, SIPR, SPP-PPP, SPP-PHP, dan SPP-PPKA).

Aplikasi ini dibangun menggunakan arsitektur Single Page Application (SPA) berbasis **React 19**, **Vite**, dan **Tailwind CSS v4** dengan standarisasi antarmuka elegan, responsif di semua perangkat, serta tipografi terpadu keluarga font **Poppins**.

---

## 🚀 Fitur Utama & Modul Aplikasi

### 1. 🔐 Autentikasi & Login (`/`)
- Desain split-screen presisi 1 layar (*Zero Scroll*).
- Panel visual ilustrasi maritim (ombak, kapal berlayar, ikan bergerak) dan logo resmi KKP & SILAT.
- Formulir login interaktif dengan visibilitas sandi (*toggle show/hide password*), verifikasi captcha, dan penanganan autentikasi aman.

### 2. 🏠 Beranda & Dashboard
- **Beranda (`/beranda`)**: Ringkasan status layanan, navigasi cepat perizinan, dan statistik operasional.
- **Dashboard (`/dashboard`)**: Monitoring verifikasi permohonan real-time (SIUP, SIPI, SIKPI, SIPR, SPP-PPP, SPP-PHP, SPP-PPKA).

### 3. 📋 Layanan Permohonan
- **Izin Usaha (SIUP)**:
  - *Daftar Pendok SIUP*: Penerimaan dan validasi berkas pendukung.
  - *Daftar Permohonan*: Monitoring antrean permohonan baru.
  - *Daftar Verifikasi*: Pemeriksaan kelayakan teknis perizinan usaha.
- **Izin Kapal (SIPI / SIKPI)**:
  - *Daftar Pendok SIPI / SIKPI*: Kelengkapan dokumen teknis kapal.
  - *Daftar Verifikasi*: Verifikasi kelaikan kapal penangkap & pengangkut ikan.
- **Izin Rumpon (SIPR)**:
  - *Distribusi Dokumen*: Alokasi berkas permohonan rumpon ke verifikator.
  - *Approval SIPR*: Persetujuan perizinan rumpon.
  - *Daftar Permohonan & Verifikasi*: Monitoring status berkas rumpon.

### 4. 💳 Layanan Pungutan (PNBP)
- **Surat Perintah Pembayaran (SPP)**:
  - *SPP–PPP*: Pungutan Pengusahaan Perikanan (Daftar Permohonan & Daftar SPP).
  - *SPP–PHP*: Pungutan Hasil Perikanan (Daftar Permohonan & Daftar SPP).
  - *SPP–PPKA*: Pungutan Penggunaan Kapal Asing (Daftar Permohonan & Daftar SPP).
- **Simulasi Tarif PNBP**:
  - *Kalkulator Tarif PPP*, *PHP*, dan *PPKA* otomatis berdasarkan tonase (GT), alat tangkap, zona WPPNRI, dan indeks harga.

### 5. 🖨️ Layanan Perizinan & Dokumen
- **Pencetakan Izin**:
  - Distribusi dan pencetakan fisik/digital dokumen izin usaha, kapal, dan rumpon.
- **Pembekuan Izin**:
  - *Pembekuan Izin Usaha*: Formulir pembekuan dengan autocomplete data perusahaan, status otomatis, dan modal konfirmasi.
  - *Pembekuan Izin Kapal*: Formulir pembekuan spesifikasi kapal penangkap/pengangkut.
  - *Daftar Pembekuan*: Tabel riwayat status pembekuan (Tab Izin Usaha & Izin Kapal).
- **Pencabutan Izin**:
  - *Pencabutan Izin Usaha*: Formulir pencabutan perizinan usaha, pencatatan petugas penerima, permohonan pengusaha, modal cetak tanda terima (*receipt*), dan konfirmasi pencabutan.
  - *Pencabutan Izin Kapal*: Formulir pencabutan izin kapal nelayan/perusahaan.
  - *Daftar Pencabutan Izin*: Tabel riwayat pencabutan dengan filter rentang tanggal cabut dan pencarian kata kunci.

### 6. 🗄️ Data & Pusat
- **Data SIUP dan Kapal (`/data-pusat/siup-dan-kapal`)**:
  - 5 formulir submit terpadu:
    1. *SIUP Aktif*: Input Nama Perusahaan + Submit.
    2. *SIUP Terbit*: Input Nama Perusahaan + Submit.
    3. *Kapal Aktif*: Input Nama Perusahaan, Dropdown DAN/ATAU, Nama Kapal 1, Dropdown DAN/ATAU, Nama Kapal 2 + Submit.
    4. *Kapal Terbit*: Input Nama Perusahaan, Dropdown DAN/ATAU, Nama Kapal 1, Dropdown DAN/ATAU, Nama Kapal 2 + Submit.
    5. *Alokasi Realisasi*: Input Nama Perusahaan & Nomor SIUP + Submit.
- **Basis Data Kapal Kemenhub (`/data-pusat/kemenhub-kapal`)**:
  - Formulir sinkronisasi Ditjen Hubla Kemenhub (No. Tanda Pendaftaran & Nama Kapal).
  - Tabel hasil lengkap memuat **42 atribut teknis kapal resmi**.
  - Sorting data, pagination, dan popup modal rincian spesifikasi kapal.

### 7. 🛡️ Modul Approval
- Navigasi ringkas terpadu untuk persetujuan berjenjang:
  - *Approval SPP–PPP & SIPR*
  - *Approval SPP–PHP & SPP–PPKA*
  - *Approval Izin SIUP & SIPR*
  - *Approval Izin SIPI & SIKPI*
  - *Daftar Penolakan Permohonan*

### 8. 📊 Pelaporan & Ekspor Data (`/pelaporan`)
- Rekapitulasi perizinan terbit, pembayaran PNBP, dan statistik kapal berdasarkan rentang tanggal.
- Fitur ekspor multi-format: **Excel (.xlsx)**, **CSV**, dan **Cetak Dokumen**.

---

## 📂 Struktur Direktori Proyek

```plaintext
Silat-WebDev/
├── public/                     # Aset statis & logo (KKP, SILAT, dsb.)
│   ├── KKP.png
│   ├── SILAT NOBG.png
│   └── LOGO.png
├── src/
│   ├── Admin/                  # Halaman admin & modul layanan
│   │   ├── Approval/           # Halaman persetujuan berkas
│   │   │   ├── Izin-SIPI-SIKPI.jsx
│   │   │   ├── Izin-SIUP-SIPR.jsx
│   │   │   ├── Penolakan.jsx
│   │   │   ├── SPP-PHP-PPKA.jsx
│   │   │   └── SPP-PPP-SIPR.jsx
│   │   ├── Data & Pusat/       # Modul integrasi pusat data
│   │   │   ├── KemenhubKapal.jsx
│   │   │   └── SIUP-dan-Kapal.jsx
│   │   ├── Layanan/            # Modul operasional layanan
│   │   │   ├── Pembekuan/      # Pembekuan IU, IK, & Daftar
│   │   │   ├── Pencabutan/     # Pencabutan IU, IK, & Daftar
│   │   │   ├── Pencetakan/     # Cetak IU, IK, IR
│   │   │   ├── Permohonan/     # Verifikasi & Pendok IU, IK, IR
│   │   │   └── Pungutan/       # SPP-PPP, PHP, PPKA, & Simulasi
│   │   └── Pelaporan.jsx       # Laporan & Ekspor data
│   ├── components/             # Komponen UI bersama
│   │   ├── Layout.jsx          # Wrapper layout + Breadcrumb + Navbar
│   │   ├── Navbar.jsx          # Mega-menu desktop & mobile drawer
│   │   └── Pagination.jsx      # Kontrol pagination data
│   ├── App.jsx                 # Client-side routing & router state
│   ├── Beranda.jsx             # Halaman Beranda utama
│   ├── Dashboard.jsx           # Halaman Dashboard monitoring
│   ├── Login.jsx               # Halaman Login
│   ├── index.css               # Styling global (Poppins, tokens, layout)
│   └── main.jsx                # Entry point aplikasi React
├── index.html                  # HTML template + Google Font Poppins
├── package.json                # Dependensi & script proyek
└── README.md                   # Dokumentasi proyek
```

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Keterangan |
| :--- | :--- |
| **React 19** | Library UI modern untuk komponen antarmuka reaktif. |
| **Vite** | Build tool super cepat untuk pengembangan web modern. |
| **Tailwind CSS v4** | Utility-first CSS framework untuk styling responsif. |
| **Lucide React** | Paket ikon modern, bersih, dan konsisten. |
| **XLSX (SheetJS)** | Pustaka ekspor file spreadsheet Excel (.xlsx). |
| **Google Fonts (Poppins)** | Standar tipografi resmi (Weights: 300, 400, 500, 600, 700, 800). |

---

## 💻 Panduan Instalasi & Menjalankan Proyek

### 1. Prasyarat
- **Node.js** (Versi 18+ direkomendasikan)
- **npm** atau **yarn / pnpm**

### 2. Instalasi Dependensi
```bash
# Clone atau buka direktori proyek
cd Silat-WebDev

# Install seluruh paket dependensi
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Aplikasi akan aktif dan dapat diakses melalui browser pada alamat:
👉 `http://localhost:5173/`

### 4. Melakukan Build untuk Produksi
```bash
npm run build
```

---

## 🎨 Pedoman Desain & Palet Warna

- **Primary Blue**: `#005a9c` (Warna identitas SILAT DJPT)
- **Primary Hover**: `#004780`
- **Text Color**: `#1f4e78` (Navy tua elegan)
- **Accent Orange**: `#ff7638` (Aksen KKP RI)
- **Background**: `#f4f6f9` (Abu-abu lembut)
- **Surface**: `#ffffff` (Putih bersih)
- **Font Utama**: `'Poppins', sans-serif`

---

## 👥 Pengembang & Hak Cipta
Dikembangkan untuk **Direktorat Jenderal Perikanan Tangkap**,  
**Kementerian Kelautan dan Perikanan Republik Indonesia**.  
*© 2026 SILAT KKP. All rights reserved.*
