import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { colors } from '@/constants/palette';

type Props = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    icon?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
};

export default function Button({
    label,
    onPress,
    variant = 'primary',
    icon,
    loading = false,
    disabled = false,
}: Props) {
    const isPrimary = variant === 'primary';
    const container = disabled
        ? 'bg-muted'
        : isPrimary
            ? 'bg-pole active:bg-pole-pressed'
            : 'bg-card border border-border active:bg-muted';
    const text = disabled ? 'text-ink-faint' : isPrimary ? 'text-paper' : 'text-ink';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            accessibilityRole="button"
            accessibilityState={{ disabled: disabled || loading, busy: loading }}
            className={`h-[52px] flex-row items-center justify-center gap-2 rounded-control ${container}`}>
            {loading ? (
                <ActivityIndicator color={isPrimary ? colors.paper : colors.ink} />
            ) : (
                <>
                    {icon}
                    <Text className={`font-body-semibold text-body ${text}`}>{label}</Text>
                </>
            )}
        </Pressable>
    );
}