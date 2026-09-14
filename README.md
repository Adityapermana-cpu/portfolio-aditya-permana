# 🌾 Portofolio Intan Srimaya — Tax Specialist & Financial Accounting 📋✨

Website portofolio interaktif bertema **Pastoral Farm & Modern Neo-Brutalism** untuk **Intan Srimaya**, seorang praktisi **Akuntansi Perpajakan** (S1/D4) yang berfokus pada rekonsiliasi fiskal, kepatuhan pajak korporasi & perorangan (PPh, PPN, e-Faktur 4.0, e-Bupot Unifikasi), audit laporan keuangan, dan perencanaan pajak (*Tax Planning*).

Dibangun dengan arsitektur **React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**, serta dilengkapi dengan simulasi kanvas 2D pastoral, fisika nama interaktif, dan animasi yang dioptimasi untuk performa ultra-ringan (60 FPS di semua perangkat).

---

## 🌟 Fitur Utama

- 🧭 **Navbar Kompak & Bergradasi Mewah**:
  - Header navigasi ramping (`py-2 sm:py-2.5`) dengan gradasi *emerald-to-forest* (`from-[#0d2a18] via-[#143e23] to-[#0b2615]`), *frosted glassmorphism*, emblem monogram emas `IS`, dan pil pelacak bagian aktif (*active section indicator*).
  - Sepenuhnya responsif untuk semua ukuran layar (HP kecil, smartphone, tablet, laptop, dan desktop).

- 🐔 **Hero Pastoral & Balok Nama Fisika Interaktif**:
  - Huruf-huruf nama **`INTAN SRIMAYA`** dapat di-drag, dilempar, dan berinteraksi secara fisik dengan gravitasi serta riak rumput/embun.
  - Karakter interaktif (Ayam peternakan, Anjing penjaga, dan Burung walet) dengan dialog kontekstual perpajakan (*e-Faktur 4.0, rekonsiliasi fiskal, e-Bupot Unifikasi, persiapan SPT Tahunan 1771*).

- 📊 **Studi Kasus Perpajakan & Audit Finansial**:
  1. **Rekonsiliasi Fiskal & SPT 1771 PT Agro Makmur Nusantara**: Koreksi positif/negatif UU PPh, kalkulasi pajak tangguhan PSAK 46, dan pelaporan SPT Badan.
  2. **Implementasi e-Faktur 4.0 & Tax Planning Distribusi Pangan**: Manajemen PPN, validasi QR faktur pajak, dan integrasi Accurate ERP.
  3. **Audit Laporan Keuangan & Kepatuhan Pajak Koperasi Agro**: Standarisasi PSAK ETAP, audit substantif neraca/laba rugi, dan pelaporan PPh 21/23.

- 🛠️ **4 Layer Kompetensi & Tools Perpajakan**:
  - **Portal DJP & Regulasi**: DJP Online, e-Faktur 4.0, Sertifikasi Brevet Terpadu A & B.
  - **Sistem ERP & Software Akuntansi**: Accurate Online, SAP FICO, Zahir Accounting.
  - **Kertas Kerja Audit & Analitik Data**: Microsoft Excel Advanced (Power Query, XLOOKUP, VBA Macro), Power BI, SPSS.
  - **Standar Akuntansi & Kepatuhan**: Rekonsiliasi Fiskal, Tax Planning Legal, Standar PSAK 46 & ISAK.

- 📈 **Rekam Jejak Aktivitas & Milestone Karir**:
  - Visualisasi log dokumen kepatuhan, siklus penutupan buku (*monthly/annual closing*), serta linimasa perjalanan karir dari pendidikan formal hingga koordinator edukasi pajak UMKM.

- ⚡ **Optimasi Performa Ekstrem (Anti-Lag & Hemat Daya)**:
  - **IntersectionObserver Lifecycle**: Seluruh kanvas 2D otomatis berhenti saat berada di luar layar.
  - **Visibility API (`document.hidden`)**: Semua loop animasi (`requestAnimationFrame`) otomatis jeda saat berpindah tab browser.
  - **Throttled Scroll & Collision**: Menghilangkan *layout thrashing* dan re-render berlebih pada saat scrolling cepat.
  - **DPR Clamping**: Membatasi skala kanvas maksimal 1.25x untuk menjaga kelancaran di layar Retina / 4K.

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
| :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/) |
| **Bahasa Pemrograman** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| **Animasi & Gestur** | [Framer Motion](https://www.framer-motion.com/) |
| **Smooth Scrolling** | [Lenis](https://lenis.darkroom.engineering/) |
| **Ikonografi** | [Lucide React](https://lucide.dev/) & [Simple Icons](https://simpleicons.org/) |

---

## 🚀 Panduan Menjalankan Proyek

### 1. Kloning Repository
```bash
git clone https://github.com/adityashp2/Portofolio-Farm.git
cd Portofolio-Farm
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka peramban di `http://localhost:5173`.

### 4. Build untuk Produksi
```bash
npm run build
```
File hasil kompilasi siap pakai akan berada di dalam direktori `dist/`.

---

## 📂 Struktur Direktori

```text
template-porto-pantai/
├── public/
│   ├── intan.jpg                # Foto profil utama Intan Srimaya
│   ├── cv.pdf                   # File resume / Curriculum Vitae
│   ├── favicon.svg              # Ikon tab browser
│   └── projects/                # Gambar aset studi kasus perpajakan
├── src/
│   ├── components/
│   │   ├── activity/            # Log aktivitas fiskal & ringkasan kepatuhan
│   │   ├── common/              # Logo brand monogram & elemen global
│   │   ├── contact/             # Section kontak & kanvas twilight pasture
│   │   ├── hero/                # Hero section, fisika balok huruf, karakter ternak
│   │   ├── journey/             # Linimasa karir & kanvas padang rumput
│   │   ├── navigation/          # Navbar bergradasi emerald responsif
│   │   ├── profile/             # Kartu foto profil 3D tilt & ringkasan profil
│   │   ├── projects/            # Showcase proyek, dock filter kategori, modal kasus
│   │   ├── tech/                # Grid kompetensi perpajakan & pipeline audit
│   │   └── ui/                  # Tombol taktil & notifikasi interaktif
│   ├── data/
│   │   └── portfolioData.ts     # Data terpusat (Profil, Skill, Proyek, Linimasa)
│   ├── hooks/                   # Custom React hooks (Lenis, Scroll, Tilt, dll)
│   ├── types/                   # Definisi tipe data TypeScript
│   ├── App.tsx                  # Komponen induk aplikasi
│   ├── main.tsx                 # Entry point React
│   └── index.css                # Konfigurasi Tailwind CSS v4 & font
├── package.json
└── vite.config.ts
```

---

## ✏️ Cara Mengubah Data Portofolio

Semua data profil, keahlian, dan studi kasus dapat diubah dengan mudah melalui **satu file terpusat**:

1. Buka [`src/data/portfolioData.ts`](src/data/portfolioData.ts).
2. Ubah objek:
   - **`profileData`**: Nama, tagline, bio, kontak (email, LinkedIn, GitHub), serta link avatar (`avatarUrl`).
   - **`techStackData`**: Daftar software akuntansi, portal DJP, dan sertifikasi.
   - **`projectsData`**: Detail studi kasus proyek, hasil kuantitatif, dan dokumen output.
   - **`experienceData`**: Riwayat pendidikan dan pengalaman kerja.
3. Untuk memperbarui foto profil, letakkan file foto di `public/intan.jpg` atau ubah nama file pada `avatarUrl`.
4. Untuk memperbarui dokumen resume, letakkan file di `public/cv.pdf`.

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT](LICENSE). Bebas digunakan, disesuaikan, dan dikembangkan lebih lanjut.
