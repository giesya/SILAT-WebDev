<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daftar Pendok SIUP | SILAT KKP</title>
  <link rel="stylesheet" href="/theme.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/shared.js"></script>
</head>

<body class="min-h-screen overflow-auto bg-[var(--color-bg)] text-[var(--color-text)]">
  <header class="sticky top-0 z-40 border-b border-[var(--color-bg)] bg-[var(--color-surface)] shadow-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
      <a class="flex shrink-0 items-center gap-3" href="/" aria-label="Kembali ke login SILAT">
        <div class="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-[var(--color-primary)] text-[var(--color-primary-contrast)] shadow-md">
          <svg class="h-6 w-6" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M8 31c6 5 11 5 16 0 5 5 10 5 16 0M12 27h24M16 27V16h16v11M22 16V9h4v7M7 37c7 4 13 4 17 0 5 4 11 4 17 0" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div>
          <p class="font-heading text-lg font-bold tracking-wide">SILAT</p>
          <p class="text-xs text-[var(--color-muted)]">Layanan Perizinan Terpadu</p>
        </div>
      </a>

      <nav class="hidden items-center gap-2 lg:flex" aria-label="Menu utama">
        <a class="rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-bg)]" href="/beranda">Beranda</a>
        <a class="rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-bg)]" href="/dashboard">Dashboard</a>
        <a class="rounded-[var(--radius)] bg-[var(--color-bg)] px-3 py-2.5 text-sm font-semibold text-[var(--color-primary)]" href="/dashboard/permohonan/izin-usaha/daftar-pendek-siup" aria-current="page">Layanan</a>
        <a class="rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-bg)]" href="/dashboard">Approval</a>
        <a class="rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-bg)]" href="/beranda">Pelaporan</a>
      </nav>

      <div class="flex items-center gap-3">
        <span class="hidden text-sm font-bold sm:inline">Andi Rizky</span>
        <a class="rounded-[var(--radius)] border border-[var(--color-bg)] px-3 py-2 text-sm font-semibold text-[var(--color-accent)] transition hover:bg-[var(--color-bg)]" href="/">Keluar</a>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-7xl px-6 pb-12 pt-8 lg:px-10 lg:pt-10">
    <div class="mb-7">
      <div class="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--color-muted)]">
        <a class="transition hover:text-[var(--color-primary)]" href="/dashboard">Dashboard</a>
        <span aria-hidden="true">›</span>
        <span>Permohonan</span>
        <span aria-hidden="true">›</span>
        <span>Izin Usaha</span>
      </div>
      <p class="text-xs font-bold uppercase tracking-[.16em] text-[var(--color-primary)]">Permohonan · Izin Usaha</p>
      <h1 class="mt-2 font-heading text-2xl font-bold sm:text-3xl">Daftar Pendok SIUP</h1>
      <p class="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">Cari dan pantau daftar permohonan Surat Izin Usaha Perikanan berdasarkan kriteria yang Anda pilih.</p>
    </div>

    <section class="rounded-[var(--radius)] border border-[var(--color-bg)] bg-[var(--color-surface)] shadow-sm" aria-labelledby="search-title">
      <div class="border-b border-[var(--color-bg)] px-5 pt-5 sm:px-6">
        <h2 id="search-title" class="font-heading text-lg font-bold">Pencarian Permohonan</h2>
        <div class="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Pilihan data permohonan">
          <button class="search-tab rounded-[var(--radius)] bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-[var(--color-primary-contrast)]" type="button" role="tab" aria-selected="true" data-tab="baru">Baru</button>
          <button class="search-tab rounded-[var(--radius)] px-5 py-3 text-sm font-bold text-[var(--color-text)] transition hover:bg-[var(--color-bg)]" type="button" role="tab" aria-selected="false" data-tab="daftar">Daftar</button>
        </div>
      </div>

      <form id="search-form" class="grid gap-5 px-5 py-6 sm:grid-cols-2 lg:grid-cols-3 sm:px-6" action="#hasil-pencarian">
        <div>
          <label class="mb-2 block text-sm font-semibold" for="applicant">Nama Pemohon</label>
          <input id="applicant" name="applicant" class="field-input" type="text" placeholder="Masukkan nama pemohon">
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold" for="application-type">Jenis Permohonan</label>
          <select id="application-type" name="application-type" class="field-input">
            <option value="SIUP">SIUP</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold" for="status">Status Permohonan</label>
          <select id="status" name="status" class="field-input">
            <option value="">Semua status</option>
            <option value="Baru">Baru</option>
            <option value="Penggantian">Penggantian</option>
            <option value="Pengurangan">Pengurangan</option>
            <option value="Perluasan">Perluasan</option>
            <option value="Perpanjangan">Perpanjangan</option>
            <option value="Perubahan">Perubahan</option>
            <option value="Update PIT">Update PIT</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold" for="verifier">Verifikator</label>
          <select id="verifier" name="verifier" class="field-input">
            <option value="">Semua verifikator</option>
            <option value="Dimas">Dimas</option>
            <option value="Sara">Sara</option>
            <option value="Tiara">Tiara</option>
            <option value="Windi">Windi</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold" for="date-start">Tanggal Permohonan</label>
          <div class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
            <input id="date-start" name="date-start" class="field-input" type="date" aria-label="Tanggal mulai">
            <span class="text-sm font-semibold text-[var(--color-muted)]">s/d</span>
            <input id="date-end" name="date-end" class="field-input" type="date" aria-label="Tanggal akhir">
          </div>
        </div>
        <div class="flex items-end gap-3 sm:col-span-2 lg:col-span-1">
          <button class="flex-1 rounded-[var(--radius)] bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-[var(--color-primary-contrast)] shadow-md shadow-[var(--color-primary)]/15 transition hover:-translate-y-0.5 hover:brightness-95" type="submit">Cari</button>
          <button id="reset-search" class="flex-1 rounded-[var(--radius)] border border-[var(--color-bg)] px-5 py-3 text-sm font-bold text-[var(--color-text)] transition hover:bg-[var(--color-bg)]" type="button">Hapus</button>
        </div>
      </form>
    </section>

    <section id="hasil-pencarian" class="mt-7 overflow-hidden rounded-[var(--radius)] border border-[var(--color-bg)] bg-[var(--color-surface)] shadow-sm" aria-labelledby="result-title">
      <div class="flex flex-col gap-2 border-b border-[var(--color-bg)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 id="result-title" class="font-heading text-lg font-bold">Hasil Pencarian</h2>
          <p id="result-summary" class="mt-1 text-sm text-[var(--color-muted)]">Menampilkan 4 data permohonan</p>
        </div>
        <span id="active-tab" class="w-fit rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">Data Baru</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[980px] text-left text-sm">
          <thead class="bg-[var(--color-primary)] text-[var(--color-primary-contrast)]">
            <tr>
              <th class="px-5 py-4 font-semibold">Nama Pemohon</th>
              <th class="px-5 py-4 font-semibold">Jenis Permohonan</th>
              <th class="px-5 py-4 font-semibold">Status Permohonan</th>
              <th class="px-5 py-4 font-semibold">Verifikator</th>
              <th class="px-5 py-4 font-semibold">Tanggal Permohonan</th>
              <th class="px-5 py-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody id="result-body" class="divide-y divide-[var(--color-bg)]">
            <tr data-name="Budi Santoso" data-status="Baru" data-verifier="Dimas" data-date="2024-01-12">
              <td class="px-5 py-5">Budi Santoso</td>
              <td class="px-5 py-5">SIUP</td>
              <td class="px-5 py-5"><span class="rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">Baru</span></td>
              <td class="px-5 py-5">Dimas</td>
              <td class="px-5 py-5">12 Jan 2024</td>
              <td class="px-5 py-5"><button class="text-[var(--color-primary)] underline underline-offset-4" type="button">Lihat</button></td>
            </tr>
            <tr data-name="PT Bahari Jaya" data-status="Penggantian" data-verifier="Sara" data-date="2024-02-05">
              <td class="px-5 py-5">PT Bahari Jaya</td>
              <td class="px-5 py-5">SIUP</td>
              <td class="px-5 py-5"><span class="rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">Penggantian</span></td>
              <td class="px-5 py-5">Sara</td>
              <td class="px-5 py-5">05 Feb 2024</td>
              <td class="px-5 py-5"><button class="text-[var(--color-primary)] underline underline-offset-4" type="button">Lihat</button></td>
            </tr>
            <tr data-name="Siti Aminah" data-status="Perpanjangan" data-verifier="Tiara" data-date="2024-03-18">
              <td class="px-5 py-5">Siti Aminah</td>
              <td class="px-5 py-5">SIUP</td>
              <td class="px-5 py-5"><span class="rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">Perpanjangan</span></td>
              <td class="px-5 py-5">Tiara</td>
              <td class="px-5 py-5">18 Mar 2024</td>
              <td class="px-5 py-5"><button class="text-[var(--color-primary)] underline underline-offset-4" type="button">Lihat</button></td>
            </tr>
            <tr data-name="CV Samudra Makmur" data-status="Perubahan" data-verifier="Windi" data-date="2024-04-22">
              <td class="px-5 py-5">CV Samudra Makmur</td>
              <td class="px-5 py-5">SIUP</td>
              <td class="px-5 py-5"><span class="rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">Perubahan</span></td>
              <td class="px-5 py-5">Windi</td>
              <td class="px-5 py-5">22 Apr 2024</td>
              <td class="px-5 py-5"><button class="text-[var(--color-primary)] underline underline-offset-4" type="button">Lihat</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p id="empty-result" class="hidden px-6 py-10 text-center text-sm text-[var(--color-muted)]">Data permohonan tidak ditemukan.</p>
    </section>
  </main>

  <style>
    .field-input {
      width: 100%;
      border: 1px solid var(--color-bg);
      border-radius: var(--radius);
      background: var(--color-bg);
      padding: .75rem 1rem;
      color: var(--color-text);
      font-size: .875rem;
      outline: none;
    }

    .field-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 18%, transparent);
    }

  </style>

  <script>
    const form = document.querySelector('#search-form');
    const resetButton = document.querySelector('#reset-search');
    const rows = [...document.querySelectorAll('#result-body tr')];
    const summary = document.querySelector('#result-summary');
    const emptyResult = document.querySelector('#empty-result');
    const activeTab = document.querySelector('#active-tab');
    const tabs = [...document.querySelectorAll('.search-tab')];

    function filterResults() {
      const name = document.querySelector('#applicant').value.toLowerCase().trim();
      const status = document.querySelector('#status').value;
      const verifier = document.querySelector('#verifier').value;
      const start = document.querySelector('#date-start').value;
      const end = document.querySelector('#date-end').value;
      let visible = 0;

      rows.forEach((row) => {
        const matches = row.dataset.name.toLowerCase().includes(name) &&
          (!status || row.dataset.status === status) &&
          (!verifier || row.dataset.verifier === verifier) &&
          (!start || row.dataset.date >= start) &&
          (!end || row.dataset.date <= end);
        row.classList.toggle('hidden', !matches);
        if (matches) visible += 1;
      });

      summary.textContent = `Menampilkan ${visible} data permohonan`;
      emptyResult.classList.toggle('hidden', visible > 0);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      filterResults();
      document.querySelector('#hasil-pencarian').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });

    resetButton.addEventListener('click', () => {
      form.reset();
      filterResults();
    });

    tabs.forEach((tab) => tab.addEventListener('click', () => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.classList.toggle('bg-[var(--color-primary)]', selected);
        item.classList.toggle('text-[var(--color-primary-contrast)]', selected);
        item.classList.toggle('text-[var(--color-text)]', !selected);
      });
      activeTab.textContent = tab.dataset.tab === 'baru' ? 'Data Baru' : 'Daftar Permohonan';
    }));

  </script>
</body>

</html>
