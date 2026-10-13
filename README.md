# Back Room Barbershop Mobile App 💈

Aplikasi mobile reservasi antrean dan booking barbershop (*"Potong rapi, tanpa antre"*). Aplikasi ini membantu pelanggan memilih cabang, memilih capster, menjadwalkan kunjungan, memantau antrean via E-ticket, serta mengumpulkan poin loyalitas.

## 🚀 Fitur Utama

- **Pilih Cabang**: Informasi jarak, alamat, dan status operasional cabang.
- **Pilih Capster**: Filter capster berdasarkan keahlian dan ketersediaan hari ini.
- **Layanan & Penjadwalan**: Pemilihan ragam servis potong rambut dan slot jam (pagi, siang, sore).
- **Konfirmasi & E-Ticket Antrean**: Tiket digital dengan nomor antrean, QR code, dan status antrean real-time.
- **Poin Loyalitas**: Sistem 1 poin per booking selesai (10 poin = 1 potong gratis).
- **Riwayat Booking & Review**: Pantau riwayat kunjungan dan beri ulasan capster.

## 🛠️ Teknologi

- **Framework**: [React Native](https://reactnative.dev/) dengan [Expo](https://expo.dev/) (SDK 52)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS v3)
- **Typography**: `@expo-google-fonts/domine` & `@expo-google-fonts/public-sans`
- **Icons**: `lucide-react-native`
- **Language**: TypeScript

## 📂 Struktur Proyek

```text
src/
├── app/                  # File-based routing (Expo Router)
│   ├── _layout.tsx       # Root layout & font loading
│   └── index.tsx         # Entry screen
├── components/           # Reusable UI components
│   └── ui/               # Button, TextField, dsb.
├── constants/            # Palet warna dan konfigurasi
│   └── palette.ts
├── screens/              # Halaman / Screen views
│   └── LoginScreen.tsx
└── docs/                 # Dokumentasi desain & alur layar
```

## 🏁 Memulai Pengembangan

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan aplikasi**:
   ```bash
   npx expo start
   ```

3. **Buka di perangkat**:
   - Tekan `a` untuk Android Emulator atau scan QR code melalui aplikasi **Expo Go**.
   - Tekan `i` untuk iOS Simulator.
   - Tekan `w` untuk menjalankan di web browser.
