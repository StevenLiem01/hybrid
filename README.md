# Back Room Barbershop - Hybrid Application Development

**Tema:** Services
**Nama:** Steven Karunia Liem
- **NIM:** 2802458573
- **Kelas:** LB95
- **Mata Kuliah:** COMP6923051 - Hybrid Application Development
- **Tautan Video Demo:** [Link gdrive]

---

## 📸 Tangkapan Layar (Screenshots)
*[Tambahkan screenshot aplikasimu di sini. Contoh format:]*
<!-- ![Login Screen](./assets/login.png) -->
<!-- ![Home Screen](./assets/home.png) -->
<!-- ![Booking Screen](./assets/booking.png) -->
<!-- ![Confirmation Screen](./assets/confirmation.png) -->

---

## 🚀 Cara Menjalankan Aplikasi
1. Pastikan Node.js dan Git sudah terinstal.
2. Clone repositori ini: `git clone https://github.com/StevenLiem01/hybrid`
3. Buka terminal di folder proyek dan jalankan `npm install` untuk mengunduh semua *dependencies*.
4. Jalankan aplikasi menggunakan perintah: `npx expo start`
5. Pindai kode QR menggunakan aplikasi Expo Go di smartphone (Android/iOS) atau gunakan Emulator.

---

## 📚 Penjelasan Konsep React Native

React Native adalah kerangka kerja (framework) berbasis JavaScript dan React yang memungkinkan pengembang untuk membangun aplikasi seluler secara *cross-platform* (Android dan iOS) menggunakan satu basis kode (codebase). Berbeda dengan aplikasi web berbasis *WebView*, React Native bekerja dengan menerjemahkan komponen-komponen React (seperti `<View>` dan `<Text>`) menjadi elemen UI *native* bawaan dari masing-masing sistem operasi menggunakan sebuah "jembatan" komunikasi (*Bridge*) atau arsitektur JSI baru. Hal ini membuat aplikasi terasa jauh lebih responsif.

Terdapat tiga keunggulan utama React Native untuk pengembangan aplikasi *hybrid*:
1. **Efisiensi Waktu dan Biaya (Cross-Platform):** Pengembang tidak perlu menulis dua kode berbeda menggunakan Swift (iOS) dan Kotlin/Java (Android). Satu basis kode JavaScript bisa dikompilasi ke dua platform sekaligus.
2. **Fast Refresh:** Perubahan pada baris kode dapat langsung terlihat di layar emulator atau perangkat nyata dalam hitungan milidetik tanpa perlu me-rebuild aplikasi dari awal, sehingga mempercepat proses *styling* dan *debugging*.
3. **Performa Mendekati Native:** Karena merender elemen antarmuka *native* secara langsung (bukan web HTML), animasi dan transisi berjalan jauh lebih mulus dibandingkan framework *hybrid* berbasis WebView.

Dalam membangun prototipe aplikasi Back Room, saya menerapkan empat konsep utama React Native:

**1. Komponen (Component):**
Komponen adalah blok penyusun dasar UI yang dapat digunakan kembali (*reusable*). Di aplikasi ini, saya memisahkan elemen antarmuka menjadi fungsi independen.
Contoh kode saya:
```tsx
function SectionHeader({ title }: { title: string }) {
    const router = useRouter();
    return (
        <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-title">{title}</Text>
        </View>
    );
}
```

**2. Props (Properties):**
Props adalah cara mengoper data dari komponen induk ke komponen anak. Props bersifat *read-only*. Pada contoh kode `SectionHeader` di atas, `{ title }` adalah sebuah props yang menerima string teks dari halaman utama untuk dirender secara dinamis.

**3. State:**
State adalah memori internal komponen untuk menyimpan data yang dapat berubah dan memicu render ulang (re-render) pada antarmuka.
Contoh kode saya menggunakan *Hooks* `useState`:
```tsx
const [favoriteIds, setFavoriteIds] = useState<string[]>(['b1', 'b2']);
const toggleFavorite = (id: string) => 
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
```

**4. Navigasi (Navigation):**
Sistem perpindahan antar layar. Saya menggunakan **Expo Router** yang mengadopsi sistem *file-based routing*.
Contoh kode saya untuk pindah ke halaman Booking:
```tsx
import { useRouter } from 'expo-router';
// di dalam komponen:
const router = useRouter();
<Button onPress={() => router.push('/booking')} label="Booking sekarang" />
```

---

## 🎯 Analisis Kebutuhan & Desain

**Masalah:** 
Pelanggan barbershop sering kali harus membuang waktu mengantre lama di lokasi karena tidak tahu kapan *barber* langganan mereka kosong. Di sisi lain, sistem antrean manual sering menyebabkan kebingungan.

**Target User:** 
Pria (pelajar, mahasiswa, pekerja profesional) yang peduli dengan penampilan namun memiliki waktu yang terbatas dan menginginkan kepraktisan.

**Kebutuhan User:**
1. User dapat mendaftarkan akun dan masuk (Login/Register).
2. User dapat melihat daftar *barber* populer dan menyimpan *barber* favorit mereka.
3. User dapat memilih tanggal, jam, dan jenis layanan potong rambut secara spesifik.
4. User mendapatkan ringkasan tagihan dan kode *booking* sebagai bukti pemesanan.
5. User dapat melihat status jadwal pemesanan aktif mereka langsung di halaman utama.

**Tabel Pemetaan Kebutuhan ke Layar & Komponen:**

| Kebutuhan User | Layar (Screen) Terkait | Komponen / Elemen UI Terkait |
| :--- | :--- | :--- |
| Login & Akses Akun | `login.tsx`, `register.tsx` | `TextInput`, `Button`, Context Auth |
| Lihat Barber & Favorit | `home.tsx` | `BarberCard`, `ScrollView` (horizontal), icon `Star` |
| Pilih Jadwal & Layanan | `booking.tsx` | `Calendar`, `Radio`, List Layanan (Map function) |
| Ringkasan & Bukti Pemesanan | `confirmation.tsx` | `Modal` (Kode Booking), Rincian Biaya |
| Tampilan Status Pemesanan | `home.tsx` | Kartu "Booking berikutnya" (Conditional Rendering) |

**Alasan Keputusan Desain:**
Aplikasi didesain menggunakan gaya minimalis dengan palet warna hitam (ink), putih (paper), dan aksen warna kutub (pole). Pemilihan warna kontras tinggi ini bertujuan untuk menonjolkan nuansa *maskulin* dan elegan yang identik dengan industri *barbershop*. Saya menggunakan `ScrollView` agar layanan mudah ditelusuri tanpa memakan tempat, serta *Conditional Rendering* di halaman utama agar UI tetap bersih (layar kosong jika belum ada pesanan, dan muncul kartu jika ada jadwal).

**Rencana Pengembangan (Future Development):**
Untuk pengembangan selanjutnya, prototipe ini akan dihubungkan dengan *backend* (seperti Firebase/Supabase) agar sistem autentikasi dan ketersediaan slot jam *barber* berjalan secara *real-time*. Fitur `marketplace.tsx` juga akan diselesaikan secara utuh lengkap dengan integrasi API pembayaran (*Payment Gateway*) agar User bisa membeli produk perawatan rambut (pomade, serum) langsung dari aplikasi.