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
        ? 'bg-surface-raised'
        : isPrimary
            ? 'bg-brass active:bg-brass-pressed'
            : 'border border-line active:bg-surface-raised';
    const text = disabled ? 'text-bone-muted' : isPrimary ? 'text-ink' : 'text-bone';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            accessibilityRole="button"
            className={`h-[52px] flex-row items-center justify-center gap-2 rounded-control ${container}`}>
            {loading ? (
                <ActivityIndicator color={isPrimary ? colors.ink : colors.bone} />
            ) : (
                <>
                    {icon}
                    <Text className={`font-body-semibold text-[15px] ${text}`}>{label}</Text>
                </>
            )}
        </Pressable>
    );
}