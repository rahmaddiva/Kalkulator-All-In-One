# Kalkulator

Aplikasi kalkulator berbasis web yang dibuat dengan React dan Vite. Project ini menyediakan beberapa jenis kalkulator dalam satu dashboard, mulai dari kalkulator umum, fisika, matematika, konversi satuan, statistik, geometri, sampai persentase.

## Fitur

- Dashboard utama untuk memilih jenis kalkulator.
- Kalkulator umum dengan operasi aritmatika dasar dan mode saintifik.
- Riwayat 10 kalkulasi terakhir pada kalkulator umum.
- Kalkulator fisika untuk kinematika, gaya, energi, listrik, gelombang, tekanan, dan momentum.
- Kalkulator matematika untuk persamaan kuadrat, trigonometri, invers trigonometri, serta deret aritmatika dan geometri.
- Konversi satuan untuk panjang, massa, suhu, waktu, kecepatan, luas, volume, dan data digital.
- Kalkulator statistik untuk mean, median, modus, standar deviasi, varians, range, nilai minimum, dan nilai maksimum.
- Kalkulator geometri untuk luas, keliling, volume, dan luas permukaan beberapa bangun.
- Kalkulator persentase untuk persen dari nilai, kenaikan, penurunan, dan rasio.
- Kalkulator Dinas P3AP2KB untuk TFR, ASFR, mCPR, CPR, unmet need, dan MKJP.

## Teknologi

- React 19
- Vite
- React Router DOM
- Math.js
- React Icons
- ESLint

## Prasyarat

Pastikan Node.js dan npm sudah terpasang di komputer.

Disarankan menggunakan Node.js versi LTS terbaru.

## Instalasi

Clone atau buka folder project, lalu jalankan:

```bash
npm install
```

## Menjalankan Project

Untuk menjalankan aplikasi dalam mode development:

```bash
npm run dev
```

Setelah server berjalan, buka alamat yang ditampilkan di terminal, biasanya:

```text
http://localhost:5173
```

## Build Production

Untuk membuat build production:

```bash
npm run build
```

Hasil build akan dibuat di folder `dist`.

Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

## Linting

Untuk menjalankan pemeriksaan lint:

```bash
npm run lint
```

## Struktur Folder

```text
kalkulator/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── GeneralCalc.jsx
│   │   ├── PhysicsCalc.jsx
│   │   ├── MathCalc.jsx
│   │   ├── ConversionCalc.jsx
│   │   ├── StatisticsCalc.jsx
│   │   ├── GeometryCalc.jsx
│   │   └── PercentageCalc.jsx
│   ├── styles/
│   ├── utils/
│   │   └── calculatorEngine.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Rute Aplikasi

| Rute | Halaman |
| --- | --- |
| `/` | Dashboard |
| `/umum` | Kalkulator Umum |
| `/fisika` | Kalkulator Fisika |
| `/matematika` | Kalkulator Matematika |
| `/konversi` | Konversi Satuan |
| `/statistik` | Kalkulator Statistik |
| `/geometri` | Kalkulator Geometri |
| `/persentase` | Kalkulator Persentase |
| `/p3ap2kb` | Kalkulator Dinas P3AP2KB |

## Catatan Pengembangan

- Logika perhitungan utama berada di `src/utils/calculatorEngine.js`.
- Routing aplikasi didefinisikan di `src/App.jsx`.
- Layout utama dan navigasi sidebar berada di `src/components`.
- Halaman kalkulator berada di `src/pages`.

## Lisensi

Project ini belum memiliki lisensi khusus.
# Kalkulator-All-In-One
