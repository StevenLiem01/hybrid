# Back Room Barbershop - Hybrid Application Development
# Tema: Services

- Nama: Steven Karunia Liem
- NIM: 2802458573
- Kelas: LB95

## Lampiran
- Video Demo: https://drive.google.com/file/d/1-NusIa3wKnoQ05xSTE49HD6xH5JuY_zc/view?usp=sharing
- Screenshot: https://drive.google.com/drive/folders/1PXjxjcEdL8369QJPFzTNTMO3z1u57WfR?usp=sharing

## 🚀 Cara Menjalankan Aplikasi
1. Clone repositori: `git clone https://github.com/StevenLiem01/hybrid`
2. Buka terminal proyek dan jalankan `npm install`.
3. Jalankan `npx expo start`.
4. Pindai kode QR via aplikasi Expo Go atau gunakan Emulator.

---

## 📚 Penjelasan Konsep React Native

React Native adalah framework JavaScript untuk membangun aplikasi *cross-platform* (Android & iOS) dengan satu *code base*. Framework ini menerjemahkan komponen React ke elemen UI *native* bawaan OS menggunakan *Bridge*, memberikan performa responsif tanpa bergantung pada *WebView*.

Terdapat tiga keunggulan React Native untuk development *hybrid application*:
1. **Efisiensi:** Satu *code base* untuk iOS dan Android.
2. **Fast Refresh:** Perubahan kode langsung terlihat di layar tanpa perlu *rebuild* ulang.
3. **Performa Native:** Merender antarmuka *native* murni sehingga animasi berjalan mulus.

Empat konsep utama yang diterapkan pada aplikasi Back Room:

**1. Komponen (Component) & Props:**
Komponen adalah blok penyusun UI yang *reusable*, sedangkan *Props* digunakan untuk mengoper data dinamis.
```tsx
// Komponen menerima Props{title}
function SectionHeader({ title }: { title: string }) {
    const router = useRouter();
    return (
        <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-title">{title}</Text>
        </View>
    );
}
```

**2. State:**
State adalah Memori internal komponen (useState) untuk menyimpan data dinamis dan memicu render ulang.
```tsx
const [favoriteIds, setFavoriteIds] = useState<string[]>(['b1', 'b2']); 
```

**3. Navigasi (Navigation):**
Sistem perpindahan layar menggunakan Expo Router.
```tsx
import { useRouter } from 'expo-router';
const router = useRouter();
<Button onPress={() => router.push('/booking')} label="Booking sekarang" />
```

---

## 🎯 Analisis Kebutuhan & Desain

**Masalah:** 
Biasaya orang langsung datang ke tempat Barber tapi harus mengantri karena rame, lalu saya punya ide untuk bikin aplikasi layanan booking potong rambut supaya orang-orang tidak harus mengantri.

**Target User:** 
Semua pria yang membutuhkan potong rambut.

**Kebutuhan User:**
1. User dapat Login/Register.
2. User dapat melihat dan memfavoritkan daftar barber.
3. User dapat memilih jadwal spesifik dan layanan potong rambut.
4. User mendapatkan ringkasan biaya dan kode pemesanan.
5. User dapat memantau status booking aktif di halaman utama.

**Tabel Pemetaan:**

| Fitur | Screen Terkait | Elemen UI |
| :--- | :--- | :--- |
| Akses Akun | `login.tsx`, `register.tsx` | `TextInput`, `Button`, Context Auth |
| Katalog Barber | `home.tsx` | `BarberCard`, horizontal `ScrollView` |
| Pilih Jadwal | `booking.tsx` | `Calendar`, Custom `Radio` button |
| Bukti Pesanan | `confirmation.tsx` | `Modal` (Kode Booking) |

**Alasan Keputusan Desain:**
Aplikasi menggunakan palet warna minimalis maskulin dengan implementasi Conditional Rendering agar di halaman utama agar UI tetap bersih.

**Rencana Pengembangan:**
Saya berencana untuk mengintegrasikan backend dengan Firebase supaya *authentication* dan ketersediaan slot jam barbernya bisa *real-time* membuat fitur Toko atau marketplace dan juga fitur Profil. Fitur Toko ini nantinya saya akan menggunakan API *payment gateway* sehingga User bisa membeli produk-produknya. Lalu untuk Profil akan saya develop sederhana saja.