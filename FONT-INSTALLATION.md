# Cara memasang font DaFont di FitPlanner

Font yang dipakai:

- **Bebas** untuk judul, heading, dan angka display: https://www.dafont.com/bebas.font
- **Roboto** untuk teks isi dan antarmuka: https://www.dafont.com/roboto.font

## Langkah pemasangan

1. Buka halaman Bebas dan Roboto di DaFont menggunakan browser.
2. Tekan tombol **Download** di setiap halaman.
3. Buka folder Downloads, lalu extract kedua file ZIP font.
4. Di folder proyek FitPlanner, buka `public` lalu buat folder bernama `fonts` jika belum ada.
5. Salin file berikut ke `public/fonts/`:
   - `Bebas-Regular.ttf`
   - `Roboto-Regular.ttf`
   - `Roboto-Medium.ttf`
   - `Roboto-Bold.ttf`
6. Simpan file. Jika Vite sedang berjalan, hentikan dengan `Ctrl + C`, jalankan `npm run dev` lagi, lalu refresh browser.

## Bentuk struktur yang benar

```text
fitplanner/
└── public/
    └── fonts/
        ├── Bebas-Regular.ttf
        ├── Roboto-Regular.ttf
        ├── Roboto-Medium.ttf
        └── Roboto-Bold.ttf
```

Nama file harus sama persis seperti di atas agar sesuai dengan `@font-face` pada `src/index.css`. Halaman DaFont untuk Bebas menyediakan `Bebas-Regular.ttf`; halaman Roboto menampilkan variasi Regular, Medium, dan Bold dengan nama tersebut. Jika file hasil extract memiliki nama berbeda, rename salinannya mengikuti nama di atas.

**Penting:** file font tidak disertakan di ZIP. Tanpa font lokal, website tetap seharusnya berjalan dengan font fallback. Karena URL font memakai `/fonts/...`, file yang belum ada hanya membuat font tersebut tidak termuat—bukan membuat React berhenti dirender.

Periksa file lisensi/README yang disertakan pembuat font sebelum menggunakan font untuk distribusi atau penggunaan komersial.
