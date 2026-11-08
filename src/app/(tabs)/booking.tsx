import { Check, Clock, Moon, Shuffle, Star, Sun, Sunset, User, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useState, type ReactNode } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from '@/components/ui/button';
import { colors } from '@/constants/palette';

const barbers = [
    { id: 'b1', name: 'Ahmad Ianus', specialty: 'Fade', rating: '4.9', reviews: 142, photo: require('@/components/icon/ahmad-ianus.png') },
    { id: 'b2', name: 'Muhammad Rizal', specialty: 'Mullet', rating: '4.8', reviews: 98, photo: require('@/components/icon/muhammad-rizal.png') },
    { id: 'b3', name: 'Drogba', specialty: 'Mohawk', rating: '4.9', reviews: 100, photo: require('@/components/icon/drogba.png') },
];

const services = [
    { id: 's1', name: 'Potong Mullet', durationMin: 30, price: 50000, note: 'Pendek di bagian depan, atas, dan samping, tapi panjang di bagian belakang' },
    { id: 's2', name: 'Potong Two Block', durationMin: 30, price: 50000, note: 'Samping dan belakang dipotong pendek, bagian atas dibiarkan panjang' },
    { id: 's3', name: 'Potong Low Fade', durationMin: 30, price: 50000, note: 'Samping tipis, atas bertekstur. Simpel, bersih, dan on point' },
    { id: 's4', name: 'Potong French Crop', durationMin: 30, price: 50000, note: 'Samping dan belakang dipotong sangat pendek (fade), bagian atas agak panjang dengan poni pendek rata' },
];

const booked: Record<string, string[]> = {
    b1: ['09:00', '09:30', '12:00', '12:30', '14:00', '14:30'],
    b2: ['09:00', '09:30', '09:30', '10:00', '11:00', '11:30'],
    b3: ['09:00', '09:30', '11:00', '11:30', '13:30', '14:00'],
};

const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const h_1 = 1;
const weekdays = ['Sen', 'Sel', 'Rabu', 'Kam', 'Jum', 'Sab', 'Min'];

function addDays(base: Date, n: number): Date {
    return new Date(base.getFullYear(), base.getMonth(), base.getDate() + n);
}

function dayKey(d: Date): number {
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function Slots(fromMinutes: number, toMinutes: number): string[] {
    const slots: string[] = [];
    for (let m = fromMinutes; m <= toMinutes; m += 30) {
        const hh = String(Math.floor(m / 60)).padStart(2, '0');
        const mm = String(m % 60).padStart(2, '0');
        slots.push(`${hh}.${mm}`);
    }
    return slots;
}

function slotToMinutes(slot: string): number {
    const [hh, mm] = slot.split('.').map(Number);
    return hh * 60 + mm;
}

function chunk<T>(items: T[], size: number): T[][] {
    const rows: T[][] = [];
    for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
    return rows;
}

function Rp(value: number): string {
    return `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

const waktu = [
    { label: 'Pagi', range: '09.00 - 11.30', Icon: Sun, slots: Slots(9 * 60, 11 * 60 + 30) },
    { label: 'Siang', range: '12.00 - 15.30', Icon: Sunset, slots: Slots(12 * 60, 15 * 60 + 30) },
    { label: 'Sore', range: '16.00 - 20.00', Icon: Moon, slots: Slots(16 * 60, 20 * 60) },
];

const card_selected = 'border-2 border-pole bg-pole/10 p-[11px]';
const card_idle = 'border border-border bg-card p-3';

function StepHeader({ step, title, right }: { step: number; title: string; right?: ReactNode }) {
    return (
        <View className="mb-2 flex-row items-center justify-between px-5">
            <View className="flex-row items-center gap-2">
                <View className="rounded bg-muted px-1.5 py-0.5">
                    <Text className="font-body-semibold text-caption text-ink">{step}</Text>
                </View>
                <Text className="font-body-semibold text-title text-ink">{title}</Text>
            </View>
            {right}
        </View>
    );
}

function Radio({ selected }: { selected: boolean }) {
    return (
        <View
            className={`h-4 w-4 items-center justify-center rounded-full border ${selected ? 'border-pole bg-pole' : 'border-border bg-card'
                }`}>
            {selected ? <View className="h-1.5 w-1.5 rounded-full bg-paper" /> : null}
        </View>
    );
}

type CalendarProps = {
    year: number;
    month: number;
    selectedDate: Date;
    minDate: Date;
    onSelect: (date: Date) => void;
    onChangeMonth: (delta: -1 | 1) => void;
};

function Calendar({ year, month, selectedDate, minDate, onSelect, onChangeMonth }: CalendarProps) {
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [
        ...Array<null>(offset).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const minKey = dayKey(minDate);
    const selectedKey = dayKey(selectedDate);
    const canGoPrev = year * 12 + month > minDate.getFullYear() * 12 + minDate.getMonth();

    return (
        <View className="rounded-card border border-border bg-card p-3">
            <View className="mb-2 flex-row items-center justify-between">
                <Pressable
                    onPress={() => onChangeMonth(-1)}
                    disabled={!canGoPrev}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Bulan sebelumnya"
                    className="h-9 w-9 items-center justify-center rounded-full active:bg-muted">
                    <ChevronLeft size={20} strokeWidth={1.5} color={canGoPrev ? colors.ink : colors.inkFaint} />
                </Pressable>
                <Text className="font-body-semibold text-title text-ink">
                    {bulan[month]} {year}
                </Text>
                <Pressable
                    onPress={() => onChangeMonth(1)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Bulan berikutnya"
                    className="h-9 w-9 items-center justify-center rounded-full active:bg-muted">
                    <ChevronRight size={20} strokeWidth={1.5} color={colors.ink} />
                </Pressable>
            </View>

            <View className="mb-1 flex-row">
                {weekdays.map((w) => (
                    <Text key={w} className="flex-1 text-center font-body-medium text-caption text-ink-muted">
                        {w}
                    </Text>
                ))}
            </View>

            {chunk(cells, 7).map((week, weekIndex) => (
                <View key={weekIndex} className="flex-row">
                    {week.map((n, cellIndex) => {
                        if (n === null) return <View key={cellIndex} className="h-11 flex-1" />;

                        const date = new Date(year, month, n);
                        const key = dayKey(date);
                        const disabled = key < minKey;
                        const selected = key === selectedKey;

                        return (
                            <Pressable
                                key={cellIndex}
                                onPress={() => onSelect(date)}
                                disabled={disabled}
                                accessibilityRole="button"
                                accessibilityState={{ selected, disabled }}
                                accessibilityLabel={`${n} ${bulan[month]} ${year}`}
                                className="h-11 flex-1 items-center justify-center">
                                <View
                                    className={`h-9 w-9 items-center justify-center rounded-full ${selected ? 'border-2 border-pole bg-pole-soft' : ''
                                        }`}>
                                    <Text
                                        className={`text-body ${disabled
                                            ? 'font-body text-ink-faint'
                                            : selected
                                                ? 'font-body-semibold text-pole'
                                                : 'font-body text-ink'
                                            }`}>
                                        {n}
                                    </Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

export default function Booking() {
    const [minDate] = useState(() => addDays(new Date(), h_1));

    // pindahin ke state bareng sama Beranda biar tanda langganan sinkron
    const [favoriteIds, setFavoriteIds] = useState<string[]>(['b1']);

    const [capsterId, setCapsterId] = useState<string>('b1');
    const [selectedDate, setSelectedDate] = useState<Date>(minDate);
    const [viewMonth, setViewMonth] = useState({
        year: minDate.getFullYear(),
        month: minDate.getMonth(),
    });
    const [time, setTime] = useState<string | null>(null);
    const [serviceIds, setServiceIds] = useState<string[]>([]);

    const changeMonth = (delta: -1 | 1) =>
        setViewMonth(({ year, month }) => {
            const d = new Date(year, month + delta, 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });

    const toggleFavorite = (id: string) =>
        setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const toggleService = (id: string) =>
        setServiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const isUnavailable = (slot: string): boolean => {
        if (dayKey(selectedDate) === dayKey(now) && slotToMinutes(slot) <= nowMinutes) return true;
        if (capsterId === 'any') return barbers.every((b) => (booked[b.id] ?? []).includes(slot));
        return (booked[capsterId] ?? []).includes(slot);
    };

    const activeTime = time && !isUnavailable(time) ? time : null;

    const selectedDay = {
        day: hari[selectedDate.getDay()],
        date: selectedDate.getDate(),
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
    };
    const selectedServices = services.filter((s) => serviceIds.includes(s.id));
    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const totalMinutes = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);

    const capsterLabel =
        capsterId === 'any'
            ? 'Siapa aja'
            : (barbers.find((b) => b.id === capsterId)?.name.split(' ')[0] ?? '');
    const summaryMeta = `${capsterLabel} • ${selectedDay.day}, ${selectedDay.date} ${bulan[selectedDay.month]
        } • ${activeTime ?? 'pilih jam'}`;

    const canContinue = activeTime !== null && selectedServices.length > 0;

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-paper">
            <ScrollView contentContainerClassName="pb-6" showsVerticalScrollIndicator={false}>
                <View className="gap-1 px-5 pb-2 pt-4">
                    <Text className="font-body-medium text-caption text-ink-muted">Langkah 1 dari 2</Text>
                    <Text className="font-display text-headline-lg text-ink">Jadwal booking</Text>
                </View>

                <View className="mt-3">
                    <StepHeader step={1} title="Pilih Barber" />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-3 px-5 pb-2">
                        <Pressable
                            onPress={() => setCapsterId('any')}
                            accessibilityRole="radio"
                            accessibilityState={{ selected: capsterId === 'any' }}
                            className={`w-36 justify-between rounded-card ${capsterId === 'any' ? card_selected : card_idle
                                }`}>
                            <View className="flex-row items-start justify-between">
                                <View className="h-11 w-11 items-center justify-center rounded-lg bg-muted">
                                    <Shuffle size={22} strokeWidth={1.5} color={colors.ink} />
                                </View>
                                <Radio selected={capsterId === 'any'} />
                            </View>
                            <View className="mt-3">
                                <Text className="font-body-semibold text-title text-ink">Siapa aja</Text>
                                <Text className="font-body text-caption text-ink-muted">
                                    Barber mana pun yang kosong
                                </Text>
                            </View>
                        </Pressable>

                        {barbers.map((barber) => {
                            const selected = capsterId === barber.id;
                            const favorite = favoriteIds.includes(barber.id);
                            return (
                                <Pressable
                                    key={barber.id}
                                    onPress={() => setCapsterId(barber.id)}
                                    accessibilityRole="radio"
                                    accessibilityState={{ selected }}
                                    accessibilityLabel={barber.name}
                                    className={`w-44 justify-between rounded-card ${selected ? card_selected : card_idle
                                        }`}>
                                    <View className="flex-row items-start justify-between">
                                        <View>
                                            <View className="h-14 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                                                <Image source={barbers[0].photo} className="h-full w-full" resizeMode="cover" />
                                            </View>
                                            <Pressable
                                                onPress={() => toggleFavorite(barber.id)}
                                                hitSlop={10}
                                                accessibilityRole="button"
                                                accessibilityLabel={
                                                    favorite
                                                        ? `Lepas ${barber.name} dari langganan`
                                                        : `Jadikan ${barber.name} langganan`
                                                }
                                                className={`absolute -bottom-1 -right-1 h-[18px] w-[18px] items-center justify-center rounded-full ${favorite ? 'bg-pole' : 'border border-border bg-card'
                                                    }`}>
                                                <Star
                                                    size={10}
                                                    strokeWidth={1.5}
                                                    color={favorite ? colors.paper : colors.inkMuted}
                                                    fill={favorite ? colors.paper : 'none'}
                                                />
                                            </Pressable>
                                        </View>
                                        {favorite ? (
                                            <View className="rounded bg-pole px-1.5 py-0.5">
                                                <Text className="font-body-semibold text-[11px] text-paper">Langgananmu</Text>
                                            </View>
                                        ) : (
                                            <Radio selected={selected} />
                                        )}
                                    </View>

                                    <View className="mt-3">
                                        <View className="flex-row items-center justify-between">
                                            <Text numberOfLines={1} className="flex-1 font-body-semibold text-title text-ink">
                                                {barber.name.split(' ')[0]}
                                            </Text>
                                            <View className="flex-row items-center gap-0.5">
                                                <Star size={12} strokeWidth={1.5} color={colors.ink} fill={colors.ink} />
                                                <Text className="font-body-semibold text-caption text-ink">
                                                    {barber.rating}
                                                </Text>
                                            </View>
                                        </View>
                                        <Text numberOfLines={1} className="font-body text-caption text-ink-muted">
                                            {barber.specialty}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>

                <View className="mt-6">
                    <StepHeader
                        step={2}
                        title="Pilih tanggal"
                        right={
                            <Text className="font-body text-caption text-ink-muted">
                                {selectedDay.day}, {selectedDay.date}, {bulan[selectedDay.month]}{' '}
                                {selectedDay.year}
                            </Text>
                        }
                    />
                    <View className="px-5">
                        <Calendar
                            year={viewMonth.year}
                            month={viewMonth.month}
                            selectedDate={selectedDate}
                            minDate={minDate}
                            onSelect={setSelectedDate}
                            onChangeMonth={changeMonth}
                        />
                    </View>
                </View>

                <View className="mt-6">
                    <StepHeader
                        step={3}
                        title="Pilih jam"
                        right={
                            <View className="flex-row items-center gap-3">
                                <View className="flex-row items-center gap-1">
                                    <View className="h-2.5 w-2.5 rounded-full border border-border bg-card" />
                                    <Text className="font-body text-caption text-ink-muted">Kosong</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <View className="h-2.5 w-2.5 rounded-full border border-border bg-muted" />
                                    <Text className="font-body text-caption text-ink-muted">Penuh</Text>
                                </View>
                            </View>
                        }
                    />
                    <View className="gap-4 px-5">
                        {waktu.map(({ label, range, Icon, slots }) => (
                            <View key={label}>
                                <View className="mb-1 flex-row items-center gap-1">
                                    <Icon size={16} strokeWidth={1.5} color={colors.inkMuted} />
                                    <Text className="font-body-semibold text-caption text-ink-muted">
                                        {label} ({range})
                                    </Text>
                                </View>
                                <View className="gap-2">
                                    {chunk(slots, 4).map((row, rowIndex) => (
                                        <View key={rowIndex} className="flex-row gap-2">
                                            {row.map((slot) => {
                                                const unavailable = isUnavailable(slot);
                                                const selected = activeTime === slot;
                                                return (
                                                    <Pressable
                                                        key={slot}
                                                        onPress={() => setTime(slot)}
                                                        disabled={unavailable}
                                                        accessibilityRole="radio"
                                                        accessibilityState={{ selected, disabled: unavailable }}
                                                        className={`h-11 flex-1 items-center justify-center rounded-lg ${unavailable
                                                            ? 'bg-muted'
                                                            : selected
                                                                ? 'border-2 border-pole bg-pole-soft'
                                                                : 'border border-border bg-card'
                                                            }`}>
                                                        <Text
                                                            className={`text-caption ${unavailable
                                                                ? 'font-body-medium text-ink-faint line-through'
                                                                : selected
                                                                    ? 'font-body-semibold text-pole'
                                                                    : 'font-body-medium text-ink'
                                                                }`}>
                                                            {slot}
                                                        </Text>
                                                    </Pressable>
                                                );
                                            })}
                                            {Array.from({ length: 4 - row.length }).map((_, i) => (
                                                <View key={`pad-${i}`} className="flex-1" />
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View className="mt-6">
                    <StepHeader
                        step={4}
                        title="Pilih layanan"
                        right={<Text className="font-body text-caption text-ink-muted">Pilih satu atau lebih</Text>}
                    />
                    <View className="gap-2 px-5">
                        {services.map((service) => {
                            const selected = serviceIds.includes(service.id);
                            return (
                                <Pressable
                                    key={service.id}
                                    onPress={() => toggleService(service.id)}
                                    accessibilityRole="checkbox"
                                    accessibilityState={{ checked: selected }}
                                    className={`flex-row items-center justify-between rounded-card ${selected ? card_selected : card_idle
                                        }`}>
                                    <View className="flex-1 flex-row items-start gap-3">
                                        <View
                                            className={`mt-0.5 h-5 w-5 items-center justify-center rounded border ${selected ? 'border-pole bg-pole' : 'border-ink-faint bg-card'
                                                }`}>
                                            {selected ? <Check size={14} strokeWidth={2.5} color={colors.paper} /> : null}
                                        </View>
                                        <View className="flex-1">
                                            <Text className="font-body-semibold text-title text-ink">{service.name}</Text>
                                            <View className="mt-0.5 flex-row items-center gap-1">
                                                <Clock size={14} strokeWidth={1.5} color={colors.inkMuted} />
                                                <Text className="font-body text-caption text-ink-muted">
                                                    {service.durationMin} menit
                                                </Text>
                                            </View>
                                            <Text className="font-body text-caption text-ink-muted">{service.note}</Text>
                                        </View>
                                    </View>
                                    <Text className="pl-3 font-body-semibold text-title text-ink">
                                        {Rp(service.price)}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <View className="gap-2 border-t border-border bg-card px-5 pb-4 pt-3">
                <View>
                    <Text className="font-body text-caption text-ink-muted">{summaryMeta}</Text>
                    <View className="flex-row items-baseline gap-2">
                        <Text className="font-body-semibold text-[18px] text-ink">{Rp(totalPrice)}</Text>
                        <Text className="font-body text-caption text-ink-muted">({totalMinutes} menit)</Text>
                    </View>
                </View>
                <Button
                    label="Lanjut ke konfirmasi"
                    disabled={!canContinue}
                    onPress={() => {
                        // kirim barber, tanggal, jam, dan layanan ke layar konfirmasi
                    }}
                />
            </View>
        </SafeAreaView>
    );
}