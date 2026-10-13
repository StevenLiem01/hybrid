---
name: Paper and Ink
colors:
  paper: '#FAF9F6'
  card: '#FFFFFF'
  muted: '#F1EFEA'
  border: '#E4E1DA'
  ink: '#1A1917'
  ink-muted: '#6B675F'
  ink-faint: '#8A857B'
  pole: '#25405F'
  pole-pressed: '#1B3049'
  pole-soft: '#E3E9F1'
  success: '#3F6B3A'
  success-soft: '#E4EEDF'
  warning: '#9A5B0F'
  warning-soft: '#F6E8D2'
  danger: '#B3261E'
  danger-soft: '#F6E0DE'
typography:
  headline-lg:
    fontFamily: Domine
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 34px
  headline-md:
    fontFamily: Domine
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 26px
  headline-queue:
    fontFamily: Domine
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 60px
  title-card:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body:
    fontFamily: Public Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  button:
    fontFamily: Public Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  caption:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  control: 10px
  card: 12px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  margin: 20px
---

# DESIGN.md: Back Room

Aplikasi mobile untuk booking barbershop pria. Portrait, lebar acuan 390px, hanya mode terang.

## Karakter visual

Bersih, tenang, dan hampir monokrom. Latar putih hangat, teks hitam hangat, satu warna aksen navy. Warna hanya muncul saat punya fungsi. Pemisah antar elemen berupa garis tipis dan jarak kosong, bukan shadow atau dekorasi. Karakter barbershop datang dari foto capster dan tipografi serif pada judul.

## Colors

| Token | Hex | Dipakai untuk |
|---|---|---|
| paper | #FAF9F6 | Background layar |
| card | #FFFFFF | Card, bottom sheet, tab bar |
| muted | #F1EFEA | Background input, chip, area nonaktif |
| border | #E4E1DA | Border dan divider 1px |
| ink | #1A1917 | Teks utama, harga |
| ink-muted | #6B675F | Teks sekunder, caption |
| ink-faint | #8A857B | Placeholder, ikon tidak aktif |
| pole | #25405F | Tombol utama, tab aktif, link, checkbox, fokus input |
| pole-pressed | #1B3049 | Tombol utama saat ditekan |
| pole-soft | #E3E9F1 | Chip terpilih, badge "Populer" |
| success / success-soft | #3F6B3A / #E4EEDF | Terkonfirmasi, selesai |
| warning / warning-soft | #9A5B0F / #F6E8D2 | Menunggu, giliran hampir tiba |
| danger / danger-soft | #B3261E / #F6E0DE | Batal, error, input tidak valid |

**Aturan pakai**
- Navy `pole` adalah satu-satunya warna aksen. Tidak ada warna dekoratif lain.
- Tombol utama berlatar `pole` dengan teks `paper`. Hanya satu tombol utama per layar.
- Harga memakai warna `ink`, bukan warna aksen.
- Warna status hanya untuk status, selalu berpasangan teks gelap di atas background `-soft`.
- `ink-faint` hanya untuk placeholder dan ikon, bukan untuk teks yang harus dibaca.
- Tanpa gradient. Tanpa shadow. Tanpa blur atau efek kaca.

## Typography

Judul memakai **Domine** (serif), isi memakai **Public Sans**.

| Peran | Font | Weight | Ukuran / line height |
|---|---|---|---|
| Judul layar | Domine | 400 | 28 / 34 |
| Judul section | Domine | 400 | 20 / 26 |
| Nomor antrean | Domine | 400 | 56 / 60 |
| Judul card | Public Sans | 600 | 16 / 22 |
| Isi | Public Sans | 400 | 15 / 22 |
| Tombol | Public Sans | 600 | 15 / 20 |
| Caption dan label | Public Sans | 500 | 12 / 16 |
| Harga | Public Sans | 600 | 16 / 20 |

**Aturan**
- Serif hanya untuk judul dan nomor antrean. Semua yang lain sans.
- Sentence case di semua teks, termasuk tombol dan label. Tidak ada huruf kapital penuh.
- Judul rata kiri. Pengecualian: layar login dan layar sukses, yang berpusat pada satu emblem.

## Layout

- Skala spacing: 4, 8, 12, 16, 24.
- Padding horizontal layar 20px. Jarak antar section 24px. Jarak antar card 12px.
- Tab bar tinggi 64px. Touch target minimal 44x44px.
- Beri ruang kosong yang cukup di sekitar foto dan tombol utama.

## Shape dan elevasi

- Radius: card 12px, tombol dan input 10px, chip dan badge penuh (pill), foto 10px.
- Tidak ada shadow. Elevasi dibuat dari warna `card` putih di atas `paper`, ditambah border `border` 1px.
- Bottom sheet: radius atas 16px, handle 36x4px warna `border`.

## Components

**Tombol utama.** Background `pole`, teks `paper`, tinggi 52px, lebar penuh. Pressed: `pole-pressed`.

**Tombol sekunder.** Background `card`, border `border` 1px, teks `ink`, tinggi 52px.

**Tombol nonaktif.** Background `muted`, teks `ink-faint`.

**Input.** Background `muted`, border `border` 1px, tinggi 52px, label caption di atas. Fokus: border `pole`. Error: border `danger` dan pesan `danger` di bawah.

**Card.** Background `card`, border `border` 1px, radius 12px, padding 16px.

**Baris layanan.** Nama layanan di kiri, durasi di bawahnya (caption `ink-muted`), harga `ink` di kanan. Dipisah garis `border` 1px.

**Card capster.** Foto rasio 4:5, nama, spesialisasi (caption), rating. Chip "Hari ini" bila tersedia.

**Chip jam dan tanggal.** Default: background `card`, border `border`. Terpilih: background `pole-soft`, border `pole`, teks `pole`. Penuh: background `muted`, teks `ink-faint`, dicoret.

**Badge.** Populer: `pole-soft` dengan teks `pole`. Status: pasangan teks dan background `-soft` dari success, warning, atau danger.

**Tab bar.** Beranda, Booking, Riwayat, Profil. Background `card`, border atas `border`. Aktif: ikon dan label `pole`. Tidak aktif: `ink-faint`.

**Tiket antrean.** Card putih dengan nomor antrean besar (Domine 56), garis putus-putus `border` sebagai sobekan, QR code di bawah garis.

**Poin loyalitas.** Bar progres tipis: terisi `pole`, sisa `border`. Teks "7 dari 10 poin" di atasnya.

**Ikon.** Outline, stroke 1.5px, warna `ink` atau `ink-faint`. Tidak memakai emoji.

## Foto

Foto berwarna, tone hangat, kontras sedang, cahaya alami di dalam barbershop. Semua foto di satu layar memakai perlakuan warna yang sama. Ilustrasi (gunting, sisir) berupa garis tunggal warna `ink` di atas `paper`.

## Bahasa

Indonesia, santai, singkat. Memakai "kamu", bukan "Anda". Memakai istilah barbershop: capster, booking, antrean, potong. Tombol berisi kata kerja ("Booking sekarang", "Konfirmasi"). Label dan judul tanpa tanda baca di akhir.

## Do dan Don't

**Do**
- Biarkan foto dan ruang kosong yang membawa suasana.
- Pakai satu aksen navy secara konsisten.
- Pakai garis tipis untuk memisahkan, bukan kotak berlapis.

**Don't**
- Jangan pakai gradient, shadow, glow, atau glassmorphism.
- Jangan tambah warna aksen kedua (emas, hijau, ungu, teal).
- Jangan pakai warna aksen untuk harga atau dekorasi.
- Jangan pakai huruf kapital penuh, emoji sebagai ikon, atau header dengan blur.
- Jangan tampilkan brand dua kali di satu layar.
