# STITCH_PROMPTS.md: Back Room

Pilih mode **Mobile**. Tempel isi `DESIGN.md` ke prompt pertama (atau ke bagian design system jika Stitch menyediakannya). Prompt per layar di bawah tidak mengulang warna dan font, jadi design system harus sudah masuk lebih dulu. Detail isi tiap layar ada di `SCREENS.md`.

## Prompt pertama

```
Design a mobile app called "Back Room", a barbershop booking app for men.
Use this design system exactly:

[tempel isi DESIGN.md di sini]

The look: matte flat dark surfaces, warm brown-black backgrounds, cream text,
one brass accent used for the main button and prices. Cards separated by
1px borders. Warm full-color photography of barbers and haircuts.
```

## Prompt per layar

**Onboarding**
```
Onboarding slide 1 of 3. Large warm photo of a barber chair filling the top half.
Serif headline "Duduk, tinggal tunggu giliran." One sentence below:
"Booking dari rumah, datang sesuai jam." Three small progress dots,
brass button "Lanjut", text link "Lewati".
```

**Pilih Cabang**
```
Branch selection screen. Vertical list of branch cards, each with a storefront
photo, branch name, short address, distance, opening hours and an "Buka" badge.
One card is selected with a brass border. Brass button "Pilih Cabang" at the bottom.
```

**Beranda**
```
Home screen. Top: "Halo, Rizky" and the selected branch name with a change control.
Next-booking card with date, time, barber name and button "Lihat Tiket".
Full-width brass button "Booking Sekarang". Horizontal row of service cards
under "Layanan Populer", one with an oxblood "Populer" badge. Row of barber cards
under "Capster Hari Ini". Thin loyalty progress bar "7 dari 10 poin".
Bottom tabs: Beranda, Booking, Riwayat, Profil.
```

**Pilih Capster**
```
Barber selection screen. Back button and title "Pilih Capster". Filter chips:
Semua, Hari Ini, Fade, Klasik, Jenggot. A row "Siapa saja" above a two-column
grid of barber cards with 4:5 portrait photo, name, specialty and rating.
```

**Layanan dan Jadwal**
```
Service and schedule screen. List of services with checkboxes, duration and
brass price. Seven-day date strip with the selected day filled brass.
Time chips grouped into pagi, siang, sore; full slots are muted and struck through.
Sticky bottom bar with total price, total duration and brass button "Lanjut".
```

**Konfirmasi**
```
Booking confirmation screen. Summary card listing branch, barber, services,
date and time, total price. Optional notes field. A toggle
"Pakai 10 poin untuk potong gratis". Small text "Bayar di tempat."
Brass button "Konfirmasi".
```

**E-ticket Antrean**
```
Queue ticket screen. A raised card shaped like a paper ticket, with a dashed
tear line across the middle. Above the line: very large serif queue number,
branch, barber, time. Below the line: QR code. A "Menunggu" warning badge,
estimated wait time, secondary button "Batalkan Booking".
```

**Riwayat**
```
Booking history screen with tabs Akan Datang, Selesai, Dibatalkan.
List cards with date, service, barber, price and a status badge.
Completed cards show buttons "Beri Ulasan" and "Booking Lagi".
```

**Profil**
```
Profile screen. Avatar, name, phone number, loyalty progress bar with point count,
then a plain list menu: Edit Profil, Notifikasi, Bantuan, Keluar.
```

## Prompt revisi

- `Make all cards flat: remove shadows, use a 1px border instead.`
- `Brass appears only on the main button and prices. Change other brass elements to cream or muted tan.`
- `Give every photo the same warm, slightly muted color treatment.`
- `Set card radius to 12px and button radius to 10px.`
- `Replace decorative icons with Lucide outline icons, 1.5px stroke.`
