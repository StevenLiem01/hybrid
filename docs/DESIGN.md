# DESIGN.md: Back Room

Aplikasi mobile untuk booking barbershop pria. Portrait, lebar acuan 390px, tema gelap saja.

## Karakter visual

Permukaan datar dan matte, warna hangat seperti kulit kursi dan kayu gelap, satu aksen kuningan. Foto capster dan hasil potongan menjadi pusat perhatian; elemen UI di sekitarnya dibuat tenang. Kedalaman datang dari perbedaan warna surface dan border 1px.

## Colors

| Token | Hex | Dipakai untuk |
|---|---|---|
| ink | #16130F | Background layar |
| surface | #1F1B16 | Card, bottom sheet, tab bar |
| surface-raised | #2A241D | Input, modal, kartu tiket |
| line | #3A3228 | Border dan divider 1px |
| bone | #F1EADB | Teks utama |
| bone-muted | #A89C88 | Teks sekunder, placeholder, caption |
| brass | #C8963E | Tombol utama, tab aktif, harga |
| brass-pressed | #A87B2C | Tombol utama saat ditekan |
| oxblood | #8C2F2B | Badge "Populer" dan promo |
| pole-navy | #27405E | Badge status "Sedang dilayani" |
| success | #7A8B4A | Booking terkonfirmasi, selesai |
| warning | #D9822B | Menunggu, giliran hampir tiba |
| danger | #E06A5F | Batal, error, input tidak valid |

Kontras terhadap `surface`: bone 12:1, bone-muted 6:1, brass 6:1, danger 5:1, success 4.6:1.

**Aturan pakai**
- Brass hanya untuk aksi utama, tab aktif, dan harga. Satu tombol brass per layar.
- Teks di atas brass memakai ink.
- Oxblood dan pole-navy hanya muncul sebagai badge kecil, tidak pernah sebagai tombol.
- Tidak ada gradient. Tidak ada #FFFFFF atau #000000.

## Typography

Judul: **Young Serif** (satu weight, 400). Isi: **Public Sans**.

| Peran | Font | Weight | Ukuran / line height |
|---|---|---|---|
| Judul layar | Young Serif | 400 | 28 / 34 |
| Judul section | Young Serif | 400 | 20 / 26 |
| Nomor antrean | Young Serif | 400 | 56 / 60 |
| Judul card | Public Sans | 600 | 16 / 22 |
| Isi | Public Sans | 400 | 15 / 22 |
| Label dan caption | Public Sans | 500 | 12 / 16 |
| Harga | Public Sans | 700 | 16 / 20 |
| Tombol | Public Sans | 600 | 15 / 20 |

Judul rata kiri. Label status boleh huruf kapital dengan letter-spacing 0.04em.

## Layout

- Skala spacing: 4, 8, 12, 16, 24, 32.
- Padding horizontal layar 20px. Jarak antar section 24px. Jarak antar card 12px.
- Tab bar tinggi 64px. Touch target minimal 44x44px.

## Shape

- Radius: card 12px, tombol 10px, input 10px, chip 999px, foto 10px.
- Tanpa shadow. Elevasi = surface-raised + border `line`.
- Bottom sheet: radius atas 16px, handle 36x4px warna `line`.

## Components

**Tombol utama.** Background brass, teks ink, tinggi 52px, lebar penuh. Pressed: brass-pressed. Disabled: surface-raised, teks bone-muted.

**Tombol sekunder.** Transparan, border `line`, teks bone.

**Input.** Background surface-raised, border `line`, saat fokus border brass. Label di atas, tinggi 52px.

**Card layanan.** Surface, border `line`. Nama layanan di kiri, durasi di bawahnya (caption), harga brass di kanan.

**Card capster.** Foto rasio 4:5, nama, spesialisasi, rating. Chip "Hari ini" bila tersedia.

**Chip jam.** Default: border `line`. Terpilih: background brass, teks ink. Penuh: teks bone-muted, dicoret, tidak bisa ditekan.

**Strip tanggal.** Tujuh hari horizontal, tanggal terpilih berlatar brass.

**Badge.** Populer: oxblood dengan teks bone. Status: success, warning, danger, pole-navy.

**Tab bar.** Beranda, Booking, Riwayat, Profil. Aktif: ikon dan label brass. Tidak aktif: bone-muted.

**Tiket antrean.** Kartu surface-raised dengan nomor antrean besar, garis putus-putus `line` sebagai sobekan, QR code di bawah garis.

**Poin loyalitas.** Bar progres tipis: terisi brass, sisa `line`. Teks "7 dari 10 poin" di atasnya.

**Ikon.** Lucide, outline, stroke 1.5px.

## Foto

Foto berwarna, tone hangat, kontras sedang, cahaya alami dalam ruangan barbershop. Semua foto di satu layar memakai perlakuan warna yang sama. Ilustrasi (gunting, sisir, tiang barber) berupa garis tunggal warna bone di atas ink; tiang barber memakai oxblood dan pole-navy.

## Bahasa

Indonesia, santai, singkat, memakai istilah barbershop: capster, booking, antrean, potong. Tombol berisi kata kerja ("Booking Sekarang", "Konfirmasi").
