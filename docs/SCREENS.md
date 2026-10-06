# SCREENS.md: Back Room

Visual mengikuti `DESIGN.md`.

## Fitur

- Pilih cabang
- Pilih capster
- Pilih layanan
- Pilih tanggal dan jam
- E-ticket antrean
- Poin loyalitas: 1 poin per booking selesai, 10 poin = 1 potong gratis
- Riwayat booking
- Rating dan ulasan

Pembayaran dilakukan di tempat, jadi tidak ada layar pembayaran.

## Alur

Onboarding → Pilih Cabang → Beranda → Pilih Capster → Layanan dan Jadwal → Konfirmasi → E-ticket → Riwayat

## 1. Onboarding

Tiga slide, masing-masing satu foto besar di atas, judul serif, satu kalimat penjelas.

1. "Duduk, tinggal tunggu giliran." Booking dari rumah, datang sesuai jam.
2. "Capster pilihanmu, jam pilihanmu." Lihat jadwal kosong sebelum berangkat.
3. "Sepuluh potongan, satu gratis." Tiap booking selesai dapat satu poin.

Tombol "Lanjut", link "Lewati". Slide terakhir: tombol "Masuk dengan Nomor HP".

## 2. Pilih Cabang

Daftar card cabang: foto depan toko, nama, alamat singkat, jarak, jam buka, badge "Buka" (success) atau "Tutup" (danger). Satu cabang dipilih, tombol "Pilih Cabang" di bawah. Cabang bisa diganti kapan saja dari Beranda.

## 3. Beranda

- Atas: "Halo, Rizky" dan nama cabang terpilih dengan tombol ganti.
- Card booking berikutnya (jika ada): tanggal, jam, capster, tombol "Lihat Tiket". Jika tidak ada, tampilkan satu kalimat ajakan.
- Tombol utama "Booking Sekarang".
- "Layanan Populer": daftar horizontal card layanan, satu berbadge Populer.
- "Capster Hari Ini": card capster yang tersedia.
- Bar poin loyalitas.

## 4. Pilih Capster

- App bar: kembali, judul "Pilih Capster".
- Chip filter: Semua, Hari Ini, Fade, Klasik, Jenggot.
- Baris "Siapa saja" di atas grid.
- Grid dua kolom card capster.
- Tap card membuka bottom sheet: foto besar, bio dua baris, tiga foto hasil potongan, tombol "Pilih Capster".

## 5. Layanan dan Jadwal

- Daftar layanan dengan checkbox: potong rambut, cukur jenggot, potong + jenggot, cuci rambut, semir rambut.
- Strip tanggal tujuh hari.
- Chip jam dikelompokkan pagi, siang, sore.
- Ringkasan menempel di bawah: total harga, total durasi, tombol "Lanjut".

## 6. Konfirmasi

- Kartu ringkasan: cabang, capster, layanan, tanggal dan jam, total harga.
- Catatan opsional untuk capster.
- Toggle "Pakai 10 poin untuk potong gratis", aktif hanya jika poin cukup.
- Teks kecil: "Bayar di tempat."
- Tombol "Konfirmasi".
- Setelah berhasil: layar sukses dengan ikon centang success, judul serif "Booking masuk", tombol "Lihat Tiket".

## 7. E-ticket Antrean

- Tiket: nomor antrean besar, QR code, cabang, capster, jam.
- Status: Menunggu (warning), Giliran Sebentar Lagi (warning), Sedang Dilayani (pole-navy), Selesai (success).
- Perkiraan waktu tunggu.
- Tombol sekunder "Batalkan Booking".

## 8. Riwayat

- Tab: Akan Datang, Selesai, Dibatalkan.
- Card list: tanggal, layanan, capster, harga, badge status.
- Booking selesai: tombol "Beri Ulasan" dan "Booking Lagi".
- Modal ulasan: bintang 1 sampai 5, kolom komentar, tombol "Kirim".

## 9. Profil

Foto, nama, nomor HP, bar poin loyalitas dengan jumlah poin, menu: Edit Profil, Notifikasi, Bantuan, Keluar.

## State kosong dan error

- Riwayat kosong: ilustrasi gunting garis, "Belum ada booking", tombol "Booking Sekarang".
- Jam penuh: chip dicoret dan tidak bisa ditekan.
- Gagal memuat: satu kalimat dan tombol "Coba Lagi".
