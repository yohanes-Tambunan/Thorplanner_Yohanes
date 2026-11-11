# 💪 ThorPlanner — Personal Gym Planner

**ThorPlanner** adalah website personal gym planner berbasis React yang dirancang untuk membantu pengguna mengatur aktivitas kebugaran secara lebih terstruktur. Website ini menyediakan fitur pembuatan profil kebugaran, perhitungan Body Mass Index (BMI), rekomendasi latihan berdasarkan kondisi tubuh dan pengalaman gym, serta pemantauan perkembangan latihan.

ThorPlanner bertujuan membantu pengguna merencanakan aktivitas gym sesuai dengan kebutuhan dan kemampuan masing-masing.

---

## ✨ Fitur Utama

### 1. User Onboarding
Pengguna harus melengkapi profil sebelum menggunakan website, meliputi:
- Nama pengguna.
- Usia.
- Gender.
- Berat badan.
- Tinggi badan.
- Tingkat pengalaman gym.
- Frekuensi latihan dalam satu minggu.

### 2. BMI Calculator
Website menghitung BMI secara otomatis berdasarkan berat dan tinggi badan pengguna.

Rumus perhitungan:

\[
BMI = \frac{Berat\ Badan\ (kg)}{Tinggi\ Badan\ (m)^2}
\]

Hasil perhitungan digunakan untuk memberikan gambaran kondisi berat badan dan rekomendasi aktivitas kebugaran.

Kategori BMI dewasa:
- Di bawah 18,5: Berat badan kurang.
- 18,5–24,9: Berat badan normal.
- 25–29,9: Berat badan berlebih.
- 30 atau lebih: Obesitas.

**Catatan:** Kategori BMI dewasa hanya digunakan untuk pengguna berusia 20 tahun ke atas. Untuk pengguna berusia 2–19 tahun, penilaian memerlukan persentil BMI berdasarkan usia dan gender. BMI merupakan alat skrining, bukan diagnosis medis.

### 3. Personalized Workout Recommendation
Rekomendasi latihan disesuaikan dengan:
- Hasil perhitungan BMI.
- Tingkat pengalaman gym.
- Frekuensi latihan mingguan.
- Kebutuhan dan tujuan kebugaran.

Pengguna dapat memilih tingkat pengalaman:
- **Beginner:** Pemula.
- **Intermediate:** Menengah.
- **Advanced:** Berpengalaman.

Intensitas, jumlah set, repetisi, dan durasi latihan disesuaikan berdasarkan tingkat pengalaman serta kemampuan pengguna.

### 4. Exercise Library
Menyediakan kumpulan latihan gym beserta informasi penggunaannya.

Fitur:
- Daftar latihan berdasarkan kelompok otot.
- Informasi peralatan gym.
- Pencarian dan filter latihan.
- Petunjuk penggunaan alat dan gerakan.
- Video demonstrasi untuk membantu pengguna memahami teknik latihan.
- Rekomendasi latihan sesuai profil pengguna.

### 5. Workout Plan
Pengguna dapat mengelola program latihan dengan fitur:
- Menambahkan program latihan.
- Mengedit program latihan.
- Menghapus program latihan.
- Melihat detail program latihan.
- Mengatur kelompok otot yang ingin dilatih.

### 6. Workout Schedule
Mengatur jadwal kegiatan gym berdasarkan hari dan tanggal.

Fitur:
- Membuat jadwal latihan.
- Mengubah jadwal.
- Menghapus jadwal.
- Menandai latihan sebagai selesai.

### 7. Workout History
Menampilkan catatan latihan yang telah diselesaikan oleh pengguna.

### 8. Progress Tracking
Membantu pengguna memantau perkembangan kebugaran melalui:
- Pencatatan berat badan.
- Grafik perkembangan berat badan.
- Statistik aktivitas latihan.
- Pemantauan pencapaian target.

### 9. Fitness Goals
Pengguna dapat menentukan target kebugaran, seperti frekuensi latihan mingguan dan target perkembangan fisik.

### 10. User Profile
Menampilkan dan mengelola informasi profil pengguna yang telah diisi pada tahap onboarding.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| React 18 | Membangun antarmuka website |
| Vite | Development server dan build project |
| JavaScript (JSX) | Logika dan fungsionalitas aplikasi |
| React Router DOM | Navigasi antarhalaman |
| React Hooks | Mengelola state dan lifecycle komponen |
| Context API | Mengelola data profil dan aplikasi |
| Props & PropTypes | Mengirim dan memvalidasi data komponen |
| Lucide React | Menampilkan ikon |
| CSS3 | Mengatur tampilan dan responsivitas |
| localStorage | Menyimpan data secara lokal di browser |

---

## 📂 Struktur Folder

```text
ThorPlanner/
│
├── public/
│   ├── fonts/
│   ├── favicon.png
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── context/
│   │
│   ├── data/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Exercise.jsx
│   │   ├── Goals.jsx
│   │   ├── History.jsx
│   │   ├── NotFound.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Profile.jsx
│   │   ├── Progress.jsx
│   │   ├── Schedule.jsx
│   │   └── Workout.jsx
│   │
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── personalization.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🚀 Instalasi dan Menjalankan Project

### Persyaratan
Pastikan perangkat sudah memiliki:
- Node.js.
- npm (Node Package Manager).
- Visual Studio Code atau editor kode lainnya.

### 1. Clone Repository

```bash
git clone https://github.com/yohanes-Tambunan/Thorplanner_Yohanes.git
```

### 2. Masuk ke Folder Project

```bash
cd Thorplanner_Yohanes/ThorPlanner
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Jalankan Development Server

```bash
npm run dev
```

### 5. Buka Website

Buka alamat lokal yang ditampilkan oleh Vite pada terminal, biasanya:

```text
http://localhost:5173/
```

### 6. Build untuk Production

```bash
npm run build
```

Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

---

## 📋 Alur Penggunaan Website

1. Pengguna membuka ThorPlanner.
2. Pengguna mengisi profil awal berupa nama, usia, dan gender.
3. Pengguna memasukkan berat badan dan tinggi badan.
4. Sistem menghitung BMI secara otomatis.
5. Pengguna memilih tingkat pengalaman gym dan frekuensi latihan per minggu.
6. Sistem menampilkan rekomendasi latihan berdasarkan profil pengguna.
7. Pengguna melihat daftar latihan, petunjuk gerakan, dan video demonstrasi.
8. Pengguna membuat workout plan dan mengatur jadwal gym.
9. Pengguna mencatat latihan yang telah diselesaikan.
10. Pengguna memantau perkembangan melalui Progress Tracking.

---

## 💾 Penyimpanan Data

ThorPlanner menggunakan `localStorage` sebagai media penyimpanan data pada browser.

Dengan mekanisme ini, data profil dan aktivitas pengguna dapat tetap tersedia ketika halaman dimuat ulang pada browser yang sama.

**Catatan:** Project ini menggunakan penyimpanan lokal dan belum menggunakan backend maupun database online. Data tidak otomatis tersinkronisasi antarperangkat atau antar-browser.

---

## 🎨 Desain Antarmuka

ThorPlanner mengusung konsep desain modern dengan tema dark mode dan aksen warna hijau neon.

Beberapa elemen desain yang diterapkan:
- Tampilan dashboard yang informatif.
- Navigasi menggunakan sidebar.
- Komponen kartu untuk informasi latihan.
- Tipografi Bebas untuk heading.
- Tipografi Roboto untuk teks antarmuka.
- Ikon menggunakan Lucide React.
- Layout responsif untuk berbagai ukuran layar.

Font lokal ditempatkan pada folder `public/fonts/`.

---

## 🎯 Tujuan Pengembangan

Project ini dikembangkan sebagai implementasi pembelajaran pengembangan aplikasi web menggunakan React, khususnya dalam penerapan:

- Component dan reusable component.
- Props dan PropTypes.
- State Management menggunakan React Hooks.
- Conditional Rendering.
- Rendering data menggunakan `.map()`.
- React Router untuk navigasi halaman.
- Context API untuk pengelolaan data.
- Local Storage untuk penyimpanan data.
- Pemisahan struktur folder dan komponen.

---

## 👨‍💻 Developer

**Yohanes Tambunan**

Program Studi S1 Teknik Informatika

Universitas Riau

Project Praktikum Pengembangan Web Menggunakan React.

---

<p align="center">
  **ThorPlanner — BUILD YOUR STRENGTH, TRACK YOUR PROGRESS.** 💪
</p>