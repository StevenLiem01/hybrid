import { Moon, Sun, Sunset } from "lucide-react-native";
import { Slots } from '@/constants/helper';

export const booking = {
    date: 'Sabtu, 14 Nov 2026',
    time: '14:00 WIB',
    barber: 'Ahmad Ianus',
    service: 'Potong rambut biasa',
    duration: '45 menit',
};

export const barbers = [
    { id: 'b1', name: 'Ahmad Ianus', specialty: 'Fade', rating: '4.9', reviews: 142, photo: require('@/components/icon/ahmad-ianus.png') },
    { id: 'b2', name: 'Muhammad Rizal', specialty: 'Mullet', rating: '4.8', reviews: 98, photo: require('@/components/icon/muhammad-rizal.png') },
    { id: 'b3', name: 'Drogba', specialty: 'Mohawk', rating: '4.9', reviews: 100, photo: require('@/components/icon/drogba.png') },
];

export const products = [
    { id: 'p1', name: 'Kahf Water-based Pomade', category: 'Pomade', price: 'Rp45.000', photo: require('@/components/icon/kahf-pomade.jpg') },
    { id: 'p2', name: 'Makarizo Advisor', category: 'Perawatan rambut', price: 'Rp50.000', photo: require('@/components/icon/makarizo-advisor.png') },
    { id: 'p3', name: 'Kahf Beard Serum Advancing', category: 'Jenggot', price: 'Rp150.000', photo: require('@/components/icon/kahf-beard-serum.png') },
    { id: 'p4', name: 'Philips OneBlade', category: 'Trimmer', price: 'Rp600.000', photo: require('@/components/icon/trimmer.png') },
];

export const services = [
    { id: 's1', name: 'Potong Mullet', durationMin: 30, price: 50000, note: 'Pendek di bagian depan, atas, dan samping, tapi panjang di bagian belakang' },
    { id: 's2', name: 'Potong Two Block', durationMin: 30, price: 50000, note: 'Samping dan belakang dipotong pendek, bagian atas dibiarkan panjang' },
    { id: 's3', name: 'Potong Low Fade', durationMin: 30, price: 50000, note: 'Samping tipis, atas bertekstur. Simpel, bersih, dan on point' },
    { id: 's4', name: 'Potong French Crop', durationMin: 30, price: 50000, note: 'Samping dan belakang dipotong sangat pendek (fade), bagian atas agak panjang dengan poni pendek rata' },
];

export const booked: Record<string, string[]> = {
    b1: ['09:00', '09:30', '12:00', '12:30', '14:00', '14:30'],
    b2: ['09:00', '09:30', '09:30', '10:00', '11:00', '11:30'],
    b3: ['09:00', '09:30', '11:00', '11:30', '13:30', '14:00'],
};

export const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
export const weekdays = ['Sen', 'Sel', 'Rabu', 'Kam', 'Jum', 'Sab', 'Min'];

export const waktu = [
    { label: 'Pagi', range: '09.00 - 11.30', Icon: Sun, slots: Slots(9 * 60, 11 * 60 + 30) },
    { label: 'Siang', range: '12.00 - 15.30', Icon: Sunset, slots: Slots(12 * 60, 15 * 60 + 30) },
    { label: 'Sore', range: '16.00 - 20.00', Icon: Moon, slots: Slots(16 * 60, 20 * 60) },
];

export const card_selected = 'border-2 border-pole bg-pole/10 p-[11px]';
export const card_idle = 'border border-border bg-card p-3';