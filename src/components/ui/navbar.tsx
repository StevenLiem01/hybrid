import { usePathname, useRoute, useRouter } from "expo-router";
import { Armchair, Calendar, Store, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {colors} from '@/constants/palette';

export default function navbar(){
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    const tabs = [
        {name: 'Beranda', path: '../home', icon: Armchair},
        {name: 'Jadwal', path: '../booking', icon: Calendar},
        {name: 'Toko', path: '../toko', icon: Store},
        {name: 'Profil', path: '../profil', icon: User},
    ];

    return(
        <View
            className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-paper/95"
            style={{ paddingBottom: insets.bottom || 16}}>
            <View className="flex-row items-center justify-round px-2 h-16">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.path;
                    const Icon = tab.icon;
                    const color = isActive ? colors.pole : colors.inkMuted;

                    return(
                        <Pressable
                            key={tab.name}
                            onPress={() => router.push(tab.path as any)}
                            hitSlop={8}
                            className="flex-col items-center justify-center gap-1 min-h-[44px] min-w-[56px]">
                            <Icon size={22} color={color} strokeWidth={isActive ? 2 : 1.5} />
                            <Text
                                className={`font-body-medium text-[12px] ${
                                    isActive ? 'font-body-semibold text-pole' : 'text-ink-muted'}
                                }`}>
                                {tab.name}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}