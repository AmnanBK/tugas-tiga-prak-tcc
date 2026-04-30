# Alur Refactoring Diary Web App (Express.js + Sequelize)

Struktur ini mengikuti pola **Separation of Concerns** yang memisahkan konfigurasi, skema, akses data, logika bisnis, dan rute.

## 1. Entry Point: `index.js`
File utama yang menjalankan aplikasi.
- Menginisialisasi Express dan Middleware (cors, json, urlencoded).
- Menyajikan file statis dari frontend.
- Mendaftarkan rute API (`/api/notes`).
- Melakukan sinkronisasi database (`sequelize.sync()`).

## 2. Database Config: `config/database.js`
Mengelola koneksi ke MySQL menggunakan Sequelize.
- Mengambil kredensial dari `.env`.
- Mematikan logging SQL untuk kebersihan console.

## 3. Schema Definition: `schema/Note.js`
Mendefinisikan struktur tabel `notes` di database.
- Kolom: `id`, `judul`, `isi`, `tanggal_dibuat`.
- Menggunakan `DataTypes` dari Sequelize.

## 4. Data Access Layer: `models/noteModels.js`
Menyediakan fungsi abstraksi untuk operasi database.
- Membungkus fungsi Sequelize seperti `findAll`, `create`, `findByPk`, `update`, dan `destroy`.
- Memisahkan query database dari logika controller.

## 5. Business Logic: `controllers/noteController.js`
Menangani permintaan HTTP dan mengirimkan respon.
- Menggunakan fungsi dari `noteModels.js`.
- Mengembalikan format JSON yang konsisten: `{ message: "...", data: ... }`.

## 6. API Routing: `routes/noteRoutes.js`
Menghubungkan metode HTTP dan endpoint ke fungsi controller yang sesuai.

## 7. Testing: `api.rest`
File untuk melakukan pengujian API secara langsung di VS Code menggunakan ekstensi REST Client.
