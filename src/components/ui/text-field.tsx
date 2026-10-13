import { useState, type ReactNode } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors } from '@/constants/palette';

type Props = TextInputProps & {
    label: string;
    error?: string;
    left?: ReactNode;
    right?: ReactNode;
};

export default function TextField({ label, error, left, right, ...inputProps }: Props) {
    const [focused, setFocused] = useState(false);
    const border = error ? 'border-danger' : focused ? 'border-brass' : 'border-line';

    return (
        <View className="gap-1.5">
            <Text className="font-body-medium text-xs uppercase tracking-wider text-bone-muted">
                {label}
            </Text>
            <View
                className={`h-[52px] flex-row items-center rounded-control border bg-surface-raised px-3 ${border}`}>
                {left}
                <TextInput
                    {...inputProps}
                    onFocus={(e) => {
                        setFocused(true);
                        inputProps.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        inputProps.onBlur?.(e);
                    }}
                    placeholderTextColor={colors.boneMuted}
                    selectionColor={colors.brass}
                    className="flex-1 py-0 font-body text-[15px] text-bone"
                />
                {right}
            </View>
            {error ? <Text className="font-body text-xs text-danger">{error}</Text> : null}
        </View>
    );
}