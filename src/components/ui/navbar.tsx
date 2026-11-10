import { Tabs } from "expo-router";
import { Armchair, Calendar, Store, User } from "lucide-react-native";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

import { colors } from '@/constants/palette';

type navbar = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const Bar = {
    home: { label: 'Beranda', Icon: Armchair },
    booking: { label: 'Jadwal', Icon: Calendar },
    marketplace: { label: 'Toko', Icon: Store },
    profil: { label: 'Profil', Icon: User },
} as const;

export default function TabBar({ state, emitter, navigateToTab, insets }: navbar) {
    return (
        <View style={{ paddingBottom: insets.bottom }} className="border-t border-border bg-card">
            <View className="h-16 flex-row items-center justify-around px-1">
                {state.routes.map((route, index) => {
                    const item = Bar[route.name as keyof typeof Bar];
                    if (!item) return null;

                    const Icon = item.Icon;
                    const focused = state.index === index;

                    const handlePress = () => {
                        const event = emitter.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!focused && !event.defaultPrevented) {
                            navigateToTab(route.key);
                        }
                    };

                    return (
                        <Pressable
                            key={route.key}
                            onPress={handlePress}
                            accessibilityRole="tab"
                            accessibilityState={{ selected: focused }}
                            accessibilityLabel={item.label}
                            className="min-h-[44px] flex-1 items-center justify-center gap-1">
                            <Icon size={22} strokeWidth={1.5} color={focused ? colors.pole : colors.inkMuted} />
                            <Text
                                className={`text-caption ${focused ? 'font-body-semibold text-pole' : 'font-body-medium text-ink-muted'
                                    }`}>
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}