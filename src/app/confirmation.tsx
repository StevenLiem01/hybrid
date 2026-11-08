import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Calendar, Check, Clock, Scissors, Star, Store } from "lucide-react-native";
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from '@/components/ui/button';
import { colors } from '@/constants/palette';

type BookingDraft = {
    barber: { id: string; name: string; specialty: string; rating: string };
    date: string;
    time: string;
    services: { name: string; durationMin: number; price: number }[];
};

const note_max = 120;

const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function ParseDraft(raw?: string): BookingDraft | null {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as BookingDraft;
    } catch {
        return null;
    }
}

function FullDate(iso: string): string {
    const [year, month, day] = iso.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return `${hari[date.getDay()]}, ${day} ${bulan[month - 1]} ${year}`;
}

function Rp(value: number): string {
    return `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export default function Confirmation() {
    const router = useRouter();
    const { draft: rawDraft } = useLocalSearchParams<{ draft: string }>();
    const draft = ParseDraft(rawDraft);

    const [note, setNote] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [bookingCode] = useState(() => `BK-${Math.floor(1000 + Math.random() * 9000)}`);

    const goBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace('/home');
    };

    if (!draft) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center gap-4 bg-paper px-5">
                <Text className="text-center font-body text-body text-ink-muted">
                    Data booking tidak ditemukan. Pilih jadwal dulu di halaman Booking.
                </Text>
                <View className="w-full">
                    <Button variant="secondary" label="Kembali" onPress={goBack} />
                </View>
            </SafeAreaView>
        );
    }

    const { barber, date, time, services } = draft;
    const totalPrice = services.reduce((sum, s) => sum + s.price, 0);
    const totalMin = services.reduce((sum, s) => sum + s.durationMin, 0);

    return (
        <SafeAreaView className="flex-1 bg-paper">
            <View className="h-16 flex-row items-center gap-1 border-b border-border px-3">
                <Pressable
                    onPress={goBack}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Kembali"
                    className="h-11 w-11 items-center justify-center rounded-lg active:bg-muted">
                    <ArrowLeft size={22} strokeWidth={1.5} color={colors.ink} />
                </Pressable>
                <View>
                    <Text className="font-body-medium text-caption text-ink-muted">Langkah 2 dari 2</Text>
                    <Text className="font-display text-headline-md text-ink">Konfirmasi booking</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerClassName="gap-4 px-5 pb-8 pt-4"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View className="rounded-card border border-border bg-card p-4">
                        <Text className="mb-3 font-body-medium text-caption text-ink-muted">
                            Ringkasan pesanan
                        </Text>

                        <View className="flex-row items-center gap-3">
                            <View className="h-12 w-12 items-center justify-center rounded-lg bg-muted">
                                <Scissors size={26} strokeWidth={1.5} color={colors.pole} />
                            </View>
                            <View className="flex-1">
                                <View className="flex-row items-center gap-2">
                                    <Text numberOfLines={1} className="shrink font-body-semibold text-title text-ink">
                                        {barber.name}
                                    </Text>
                                    <View className="flex-row items-center gap-0.5">
                                        <Star size={13} strokeWidth={1.5} color={colors.ink} fill={colors.ink} />
                                        <Text className="font-body-semibold text-caption text-ink">{barber.rating}</Text>
                                    </View>
                                </View>
                                <Text className="font-body text-caption text-ink-muted">{barber.specialty}</Text>
                            </View>
                        </View>

                        <View className="mt-4 gap-3 rounded-lg bg-muted p-3">
                            <View className="flex-row items-start gap-2">
                                <Calendar size={18} strokeWidth={1.5} color={colors.inkMuted} />
                                <View className="flex-1">
                                    <Text className="font-body text-caption text-ink-muted">Jadwal kunjungan</Text>
                                    <Text className="font-body-medium text-body text-ink">
                                        {FullDate(date)} · {time} WIB
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-start gap-2">
                                <Clock size={18} strokeWidth={1.5} color={colors.inkMuted} />
                                <View className="flex-1">
                                    <Text className="font-body text-caption text-ink-muted">
                                        Layanan dan estimasi waktu
                                    </Text>
                                    {services.map((s) => (
                                        <Text key={s.name} className="font-body-medium text-body text-ink">
                                            {s.name} ({s.durationMin} menit)
                                        </Text>
                                    ))}
                                    {services.length > 1 ? (
                                        <Text className="mt-0.5 font-body text-caption text-ink-muted">
                                            Total {totalMin} menit
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="rounded-card border border-border bg-card p-4">
                        <View className="mb-1 flex-row items-center justify-between">
                            <Text className="font-body-medium text-caption text-ink-muted">
                                Catatan untuk barber (opsional)
                            </Text>
                            <Text className="font-body text-caption text-ink-muted">
                                {note.length}/{note}
                            </Text>
                        </View>
                        <TextInput
                            value={note}
                            onChangeText={setNote}
                            maxLength={note_max}
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                            placeholder="Contoh: rapikan tipis di samping saja"
                            placeholderTextColor={colors.inkFaint}
                            selectionColor={colors.pole}
                            accessibilityLabel="Catatan untuk capster"
                            className="min-h-[88px] rounded-lg bg-muted p-3 font-body text-body text-ink"
                        />
                    </View>

                    <View className="rounded-card border border-border bg-card p-4">
                        <Text className="mb-3 font-body-medium text-caption text-ink-muted">
                            Metode pembayaran
                        </Text>
                        <View className="flex-row items-center gap-3 rounded-lg bg-muted p-3">
                            <View className="h-9 w-9 items-center justify-center rounded-full bg-card">
                                <Store size={20} strokeWidth={1.5} color={colors.pole} />
                            </View>
                            <View className="flex-1">
                                <Text className="font-body-semibold text-body text-ink">Bayar di tempat</Text>
                                <Text className="font-body text-caption text-ink-muted">
                                    Bayar di kasir setelah selesai potong
                                </Text>
                            </View>
                        </View>

                        <Text className="mb-2 mt-4 font-body-medium text-caption text-ink-muted">
                            Rincian biaya
                        </Text>
                        <View className="gap-1">
                            {services.map((s) => (
                                <View key={s.name} className="flex-row items-center justify-between">
                                    <Text className="flex-1 font-body text-body text-ink-muted">{s.name}</Text>
                                    <Text className="font-body text-body text-ink">{Rp(s.price)}</Text>
                                </View>
                            ))}
                        </View>
                        <View className="mt-3 flex-row items-center justify-between border-t border-border pt-3">
                            <Text className="font-body-semibold text-title text-ink">Total tagihan</Text>
                            <Text className="font-display text-headline-md text-ink">
                                {Rp(totalPrice)}
                            </Text>
                        </View>
                    </View>

                    <Button label="Konfirmasi booking" onPress={() => setConfirmed(true)} />
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                visible={confirmed}
                transparent
                animationType="slide"
                statusBarTranslucent
                onRequestClose={() => router.replace('/home')}>
                <View className="flex-1 justify-end bg-ink/60">
                    <View className="items-center rounded-t-[20px] bg-card px-5 pb-8 pt-3">
                        <View className="mb-3 h-1 w-9 rounded-full bg-border" />
                        <View className="mb-2 h-14 w-14 items-center justify-center rounded-full bg-success-soft">
                            <Check size={28} strokeWidth={2} color={colors.success} />
                        </View>
                        <Text className="text-center font-display text-headline-lg text-ink">Booking masuk</Text>
                        <Text className="mb-4 mt-1 text-center font-body text-caption text-ink-muted">
                            Simpan kode booking ini dan tunjukkan ke kasir saat datang.
                        </Text>

                        <View className="mb-4 w-full items-center rounded-card border border-border bg-paper p-4">
                            <Text className="font-body-medium text-caption text-ink-muted">Kode booking</Text>
                            <Text
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                className="font-display text-headline-queue text-pole">
                                {bookingCode}
                            </Text>
                            <View className="mt-3 w-full items-center gap-1 border-t border-border pt-3">
                                <Text className="text-center font-body-medium text-body text-ink">
                                    {barber.name} · {services.map((s) => s.name).join(', ')}
                                </Text>
                                <Text className="font-body text-caption text-ink-muted">
                                    {FullDate(date)} · {time} WIB
                                </Text>
                                <View className="mt-2 w-full rounded-lg bg-warning-soft p-2">
                                    <Text className="text-center font-body-medium text-caption text-warning">
                                        Silakan datang 10 menit sebelum jam {time}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="w-full">
                            <Button label="Kembali ke beranda" onPress={() => router.replace('/home')} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}