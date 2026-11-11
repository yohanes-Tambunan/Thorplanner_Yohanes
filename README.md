# FitPlanner — Personal Gym Planner

FitPlanner adalah website React untuk membantu pengguna membuat profil kebugaran awal, menghitung BMI, mendapatkan saran latihan sesuai profil, melihat demonstrasi gerakan, mengelola jadwal gym, dan mencatat perkembangan latihan.

## Teknologi

- React 18 + Vite
- JavaScript (JSX)
- React Router DOM
- React Hooks dan Context API
- Props dan PropTypes
- Lucide React untuk ikon
- CSS responsif
- `localStorage` untuk penyimpanan lokal di browser

## Menjalankan proyek

Pastikan Node.js dan npm sudah terpasang. Buka terminal pada folder proyek, lalu jalankan:

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite (biasanya `http://localhost:5173`). Untuk build produksi:

```bash
npm run build
npm run preview
```

## Alur pertama kali membuka website

1. **Profil awal** — pengguna mengisi nama, usia, dan gender. Ini merupakan onboarding lokal, bukan autentikasi akun dengan password/server.
2. **Data tubuh** — pengguna mengisi berat badan (kg) dan tinggi badan (cm). Website menghitung BMI secara otomatis.
3. **Pengalaman dan frekuensi** — pengguna memilih Pemula, Menengah, atau Berpengalaman, lalu memilih 1–6 hari gym per minggu.
4. **Ringkasan rekomendasi** — pengguna melihat fokus latihan dan rancangan jadwal awal.
5. **Exercise Library** — setelah onboarding selesai, pengguna langsung diarahkan ke halaman ini untuk mencari/filter gerakan, melihat gerakan yang direkomendasikan untuk rencana mingguannya, membaca instruksi, dan menonton video demonstrasi untuk setiap gerakan.

## Logika personalisasi latihan

- **BMI di bawah 18,5 (dewasa):** program lebih menekankan latihan kekuatan/resistance training untuk membangun otot; kardio dibuat ringan dan singkat.
- **BMI 18,5 sampai kurang dari 25 (dewasa):** program menggabungkan latihan kekuatan dan kardio.
- **BMI 25 sampai kurang dari 30 (dewasa):** program menambah porsi kardio berdampak rendah sambil mempertahankan latihan kekuatan.
- **BMI 30 atau lebih (dewasa):** program mengutamakan kardio berdampak rendah secara bertahap dan tetap menyertakan latihan kekuatan ringan.
- **Usia di bawah 20 tahun:** website menampilkan nilai BMI, tetapi tidak memberi label kategori BMI dewasa. Penilaian BMI usia 2–19 tahun memerlukan persentil berdasarkan usia dan gender.

BMI adalah alat skrining, bukan diagnosis dan bukan ukuran komposisi tubuh. Hasilnya perlu dilihat bersama faktor kesehatan lain. Karena rekomendasi volume latihan tidak sebaiknya ditentukan dari gender saja, gender disimpan pada profil, sedangkan set, repetisi, durasi, dan pembagian latihan ditentukan terutama dari pengalaman, frekuensi latihan, dan fokus BMI. Pengguna tetap perlu menyesuaikan beban dengan kemampuan aktualnya.

### Penyesuaian berdasarkan pengalaman

- **Pemula:** umumnya mulai dari 2 set dengan rentang repetisi dasar, alat yang stabil, dan durasi kardio yang lebih singkat.
- **Menengah:** umumnya 3 set dengan volume dan durasi sedikit lebih tinggi.
- **Berpengalaman:** umumnya 3 set dengan variasi repetisi yang lebih menantang; beban harus tetap dapat dikontrol dengan teknik yang benar.

Frekuensi gym dipakai untuk menyusun pembagian hari. Rencana merupakan contoh awal, bukan program medis atau pengganti arahan pelatih. Sisakan hari pemulihan dan berhenti jika mengalami nyeri atau gejala yang tidak biasa.

## Fitur website

1. **Onboarding** — profil nama, gender, usia, tinggi, berat, BMI, pengalaman, dan frekuensi gym.
2. **Dashboard** — statistik, target mingguan, jadwal mendatang, dan aktivitas terbaru.
3. **Workout Plan** — tambah, edit, hapus, cari program, serta melihat rekomendasi jadwal yang dipersonalisasi.
4. **Exercise Library** — 13 gerakan yang dapat dicari dan difilter berdasarkan kelompok otot/peralatan; setiap gerakan mempunyai video demonstrasi dan petunjuk langkah.
5. **Schedule** — tambah, edit, hapus, dan tandai jadwal sebagai selesai.
6. **Workout History** — riwayat latihan yang diselesaikan.
7. **Progress Tracking** — catat berat badan dan lihat grafik perkembangan.
8. **Goals** — atur target latihan mingguan dan target kebugaran.
9. **Profile** — lihat dan ubah informasi pengguna; perubahan berat akan memperbarui BMI dan fokus rekomendasi.

## Struktur folder

```text
gym-planner/
├── public/
├── src/
│   ├── assets/
│   │   └── fonts/
│   ├── components/
│   │   ├── ExerciseCard.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── Toast.jsx
│   │   └── WorkoutCard.jsx
│   ├── context/
│   │   └── GymContext.jsx
│   ├── data/
│   │   ├── exercises.js
│   │   └── initialData.js
│   ├── layouts/
│   │   └── MainLayout.jsx
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
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── personalization.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Font DaFont

Tampilan menggunakan **Bebas** untuk heading/display dan **Roboto** untuk isi teks. File font tidak disertakan dalam ZIP. Baca petunjuk `FONT-INSTALLATION.md` di folder utama atau `public/fonts/README.md`, unduh arsip dari DaFont, lalu salin file `.ttf` ke `public/fonts/`. Referensi font memakai jalur `/fonts/...`, sehingga aplikasi tetap dapat dibuka dengan font fallback meskipun file `.ttf` belum dipasang. Periksa README/lisensi di dalam setiap arsip sebelum font didistribusikan kembali.

## Video dan sumber materi

Daftar alat/gerakan mengadaptasi materi pengenalan alat gym berikut:

- [HelloSehat — Mengenal 10 Jenis Alat Gym dan Cara Menggunakannya](https://hellosehat.com/kebugaran/olahraga-lainnya/berbagai-alat-fitness-di-tempat-gym/)
- [KYZN — Mengenai Alat Gym: Jenis, Cara Pakai, dan Kegunaannya](https://kyzn.life/blog/alat-gym-jenis-cara-pakai-dan-kegunaannya)
- [IDN Times — 15 Nama Alat Gym serta Gambar, Fungsi, dan Cara Pakainya](https://www.idntimes.com/sport/arena/nama-alat-gym-serta-gambar-fungsi-dan-cara-pakainya-q9t03-00-qftxr-vdx8p9)
- [SVRG — 25 Nama Alat Gym, Fungsi, dan Cara Menggunakannya](https://svrg.id/blogs/the-journey/nama-alat-gym)
- [PureGym — Equipment How-To Videos](https://www.puregym.com/lets-get-started/workout-builder/equipment-how-tos/)
- [UC Davis Health — Lat Pulldown for Beginners](https://www.youtube.com/watch?v=oMJmAHRZXBk)
- [MuscleWiki — Triceps Pushdown](https://www.youtube.com/watch?v=w_viR9hVi4A)
- [Shelley Darlington — Barbell Squat](https://www.youtube.com/watch?v=f-KL4VNN96E)
- [Jack Hanrahan Fitness — Romanian Deadlift](https://www.youtube.com/watch?v=ZEnWV4kguKc)
- [Runna — Plank Tutorial](https://www.youtube.com/watch?v=kSFvHo9p53Y)
- [CDC — Adult BMI Categories](https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html)
- [American Heart Association — Strength and Resistance Training Exercise](https://www.heart.org/en/healthy-living/fitness/fitness-basics/strength-and-resistance-training-exercise)

Video merupakan konten pihak ketiga dari YouTube. Ketersediaan atau kemampuan embed dapat berubah; tombol untuk membuka video langsung di YouTube juga disediakan.

## Penyimpanan data

Data disimpan di browser menggunakan key `fitplanner-data-v1`. Data tidak disinkronkan ke perangkat lain karena proyek ini belum memakai backend/database online. Untuk mengulang onboarding dari awal, buka Developer Tools → Application → Local Storage, hapus key tersebut, lalu refresh halaman.

## Jika halaman browser putih

1. Pastikan terminal masih menjalankan `npm run dev` dan tidak menampilkan error.
2. Hentikan server dengan `Ctrl + C`.
3. Jalankan `npm install` (jika belum pernah dilakukan), lalu `npm run dev -- --force`.
4. Buka alamat localhost yang tampil di terminal, kemudian lakukan hard refresh dengan `Ctrl + Shift + R`.
5. Jika masih putih, buka halaman di Chrome/Edge, tekan `F12`, pilih tab **Console**, refresh, lalu baca pesan merah pertama. Pesan itu biasanya menunjukkan modul atau baris kode yang gagal.
6. Jika pesan menyebut `fitplanner-data-v1` atau data Local Storage, buka DevTools → Application → Local Storage → `http://localhost:5173`, hapus key `fitplanner-data-v1`, lalu refresh. Tindakan ini mereset data profil lokal dan onboarding.

Penting: file font DaFont yang belum diunduh tidak lagi menghalangi aplikasi tampil. Tanpa file `.ttf`, yang terjadi hanya fallback font yang digunakan.
#   T h o r p l a n n e r _ Y o h a n e s  
 