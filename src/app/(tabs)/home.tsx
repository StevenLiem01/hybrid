import { Redirect } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { ArrowRight, Check, Clock, Plus, Scissors, Star } from 'lucide-react-native';
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from '@/components/ui/button';
import { colors } from '@/constants/palette';
import { useAuth } from '../auth';

const booking = {
    date: 'Sabtu, 14 Nov 2026',
    time: '14:00 WIB',
    barber: 'Ahmad Ianus',
    service: 'Potong rambut biasa',
    duration: '45 menit',
};

const barbers = [
    { id: 'b1', name: 'Ahmad Ianus', specialty: 'Fade', rating: '4.9', reviews: 142, photo: require('@/components/icon/ahmad-ianus.png') },
    { id: 'b2', name: 'Muhammad Rizal', specialty: 'Mullet', rating: '4.8', reviews: 98, photo: require('@/components/icon/muhammad-rizal.png') },
    { id: 'b3', name: 'Drogba', specialty: 'Mohawk', rating: '4.9', reviews: 100, photo: require('@/components/icon/drogba.png') },
];

const products = [
    { id: 'p1', name: 'Kahf Water-based Pomade', category: 'Pomade', price: 'Rp45.000', photo: require('@/components/icon/kahf-pomade.jpg') },
    { id: 'p2', name: 'Makarizo Advisor', category: 'Perawatan rambut', price: 'Rp50.000', photo: require('@/components/icon/makarizo-advisor.png') },
    { id: 'p3', name: 'Kahf Beard Serum Advancing', category: 'Jenggot', price: 'Rp150.000', photo: require('@/components/icon/kahf-beard-serum.png') },
    { id: 'p4', name: 'Philips OneBlade', category: 'Trimmer', price: 'Rp600.000', photo: require('@/components/icon/trimmer.png') },
];

function SectionHeader({ title, actionLabel }: { title: string; actionLabel: string }) {
    return (
        <View className="mb-3 w-full flex-row items-center justify-betweeen">
            <Text className="font-body-semibold text-title text-ink">{title}</Text>
            <Pressable
                onPress={() => {
                    // pindah ke layar berikutnya
                }}
                hitSlop={12}
                accessibilityRole="link"
                className="flex-row items-center gap-1">
                <Text className="font-body-semibold text-caption text-pole">{actionLabel}</Text>
                <ArrowRight size={14} strokeWidth={1.5} color={colors.pole} />
            </Pressable>
        </View>
    );
}

function BarberCard({
    barber,
    favorite,
    onToggleFavorite,
}: {
    barber: (typeof barbers)[number];
    favorite: boolean;
    onToggleFavorite: () => void;
}) {
    return (
        <View className="w-[210px] gap-2 rounded-card border border-border bg-card p-3">
            <View className="aspect-[4/5] w-full overflow-hidden rounded-control border border-border bg-muted">
                <Image source={barber.photo} className="h-full w-full" resizeMode="cover" />

                {favorite ? (
                    <View className="absolute left-2 top-2 rounded-full bg-pole px-2.5 py-1">
                        <Text className="font-body-semibold text-caption text-paper">Langgananmu</Text>
                    </View>
                ) : null}

                <Pressable
                    onPress={onToggleFavorite}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={
                        favorite ? `Lepas ${barber.name} dari langganan` : `Jadikan ${barber.name} langganan`
                    }
                    className="absolute right-2 top-2 h-7 w-7 items-center justify-center rounded-full border border-border bg-card">
                    <Star
                        size={16}
                        strokeWidth={1.5}
                        color={favorite ? colors.pole : colors.inkFaint}
                        fill={favorite ? colors.pole : 'none'}
                    />
                </Pressable>
            </View>

            <View>
                <Text numberOfLines={1} className="font-body-semibold text-title text-ink">
                    {barber.name}
                </Text>
                <Text className="font-body text-caption text-ink-muted">{barber.specialty}</Text>
                <View className="mt-1 flex-row items-center gap-1">
                    <Star size={14} strokeWidth={1.5} color={colors.pole} fill={colors.pole} />
                    <Text className="font-body-semibold text-caption text-ink">{barber.rating}</Text>
                    <Text className="font-body text-caption text-ink-muted">({barber.reviews} ulasan)</Text>
                </View>
            </View>

            <Pressable
                onPress={() => {
                    // nunggu booking screen dibuat
                }}
                accessibilityRole="button"
                className="items-center rounded-lg border border-border bg-muted py-2 active:bg-border">
                <Text className="font-body-semibold text-caption text-ink">Pilih capster</Text>
            </Pressable>
        </View>
    );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
    return (
        <View className="w-[48.5%] justify-between rounded-card border border-border bg-card p-3">
            <View className="gap-1">
                <View className="mb-1 aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
                    <Image source={product.photo} className="h-full w-full" resizeMode="cover" />
                </View>
                <Text className="font-body text-caption text-ink-muted">{product.category}</Text>
                <Text
                    numberOfLines={2}
                    className="min-h-[36px] font-body-semibold text-[14px] leading-[18px] text-ink">
                    {product.name}
                </Text>
            </View>

            <View className="mt-2 flex-row items-center justify-between border-t border-border pt-2">
                <Text className="font-body-semibold text-title text-ink">{product.price}</Text>
                <Pressable
                    onPress={() => {
                        // nunggu marketplace screen dibuat
                    }}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`Tambah ${product.name} ke keranjang`}
                    className="h-7 w-7 items-center justify-center rounded-md border border-border bg-muted active:bg-border">
                    <Plus size={16} strokeWidth={1.5} color={colors.ink} />
                </Pressable>
            </View>
        </View>
    );
}

export default function Home() {
    const { user, logout } = useAuth();
    const [favoriteIds, setFavoriteIds] = useState<string[]>(['b1', 'b2']);

    const toggleFavorite = (id: string) =>
        setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const firstName = user?.name.split(' ')[0] ?? '';
    const initial = firstName.charAt(0).toUpperCase();

    const sortedBarbers = [...barbers].sort(
        (a, b) => Number(favoriteIds.includes(b.id)) - Number(favoriteIds.includes(a.id)),
    );

    return (
        <SafeAreaView className="flex-1 bg-paper">
            <View className="h-16 flex-row items-center justify-between border-b border-border bg-paper px-5">
                <View className="flex-row items-center gap-3">
                    <View className="h-9 w-9 items-center justify-center rounded-full border border-border bg-muted">
                        <Scissors size={18} strokeWidth={1.5} color={colors.pole} />
                    </View>
                    <View>
                        <Text className="font-display text-headline-md text-ink">Back Room</Text>
                        <Text className="-mt-1 font-body-medium text-caption text-ink-muted">Barbershop</Text>
                    </View>
                </View>
                <View className="h-8 w-8 items-center justify-center rounded-full bg-pole">
                    <Text className="font-body-semibold text-caption text-paper">{initial}</Text>
                </View>
            </View>

            <ScrollView contentContainerClassName="pb-6" showsVerticalScrollIndicator={false}>
                <View className="mb-6 gap-1 px-5 pt-4">
                    <Text className="font-display text-headline-lg text-ink">Halo, {firstName}</Text>
                    <Text className="font-body text-body text-ink-muted">
                        Waktunya merapikan gaya rambutmu agar tetap tajam dan percaya diri.
                    </Text>
                </View>

                <View className="mb-6 px-5">
                    <Text className="mb-2 font-body-semibold text-title text-ink">Booking berikutnya</Text>
                    <View className="gap-3 rounded-card border border-border bg-card p-4">
                        <View className="flex-row items-center gap-1 self-start rounded-full bg-success-soft px-2.5 py-1">
                            <Check size={14} strokeWidth={2} color={colors.success} />
                            <Text className="font-body-semibold text-caption text-success">Terkonfirmasi</Text>
                        </View>

                        <View>
                            <Text className="font-body-medium text-caption text-ink-muted">Hari dan waktu</Text>
                            <Text className="font-body-semibold text-title text-ink">{booking.date}</Text>
                            <View className="mt-0.5 flex-row items-center gap-1">
                                <Clock size={16} strokeWidth={1.5} color={colors.pole} />
                                <Text className="font-body-semibold text-body text-pole">{booking.time}</Text>
                            </View>
                        </View>

                        <View className="flex-row items-center justify-between rounded-lg border border-border bg-muted p-3">
                            <View className="flex-1 flex-row items-center gap-3">
                                <View className="h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
                                    <Image source={barbers[0].photo} className="h-full w-full" resizeMode="cover" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-body-medium text-caption text-ink-muted">Capster</Text>
                                    <Text numberOfLines={1} className="font-body-semibold text-title text-ink">
                                        {booking.barber}
                                    </Text>
                                    <Text className="font-body text-caption text-ink-muted">
                                        {booking.service}
                                    </Text>
                                </View>
                            </View>
                            <View className="items-end pl-3">
                                <Text className="font-body text-caption text-ink-muted">Durasi</Text>
                                <Text className="font-body-semibold text-title text-ink">
                                    {booking.duration}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mb-8 px-5">
                    <Button
                        label="Booking sekarang"
                        onPress={() => {
                            // nunggu layar booking dibuat
                        }}
                        icon={<Plus size={20} strokeWidth={1.5} color={colors.paper} />}
                    />
                </View>

                <View className="mb-8">
                    <View className="px-5">
                        <SectionHeader title="Capster langgananmu" actionLabel="Semua" />
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-3 px-5">
                        {sortedBarbers.map((barber) => (
                            <BarberCard
                                key={barber.id}
                                barber={barber}
                                favorite={favoriteIds.includes(barber.id)}
                                onToggleFavorite={() => toggleFavorite(barber.id)}
                            />
                        ))}
                    </ScrollView>
                </View>

                <View className="px-5">
                    <SectionHeader title="Produk pilihan" actionLabel="Lihat semua" />
                    <View className="flex-row flex-wrap justify-between gap-y-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}