import { useRef, useState, type ReactNode, type ElementRef } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors } from '@/constants/palette';

type TextFieldProps = TextInputProps & {
    label: string;
    error?: string;
    left?: ReactNode;
    right?: ReactNode;
};

export default function TextField({ label, error, left, right, ...inputProps }: TextFieldProps){
    const inputRef = useRef<ElementRef<typeof TextInput>>(null);
    const [focused, setFocused] = useState(false);
    const borderClass = error ? 'border-danger' : focused ? 'border-pole' : 'border-border';

    return (
        <View className="gap-1">
            <Text className="font-body-medium text-caption text-ink-muted">{label}</Text>
            <Pressable
                onPress={() => inputRef.current?.focus()}
                className={`h-[52px] flex-row items-center rounded-control border bg-muted px-3 ${borderClass}`}>
                {left}
                <TextInput
                    {...inputProps}
                    ref={inputRef}
                    onFocus={(e) => {
                        setFocused(true);
                        inputProps.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        inputProps.onBlur?.(e);
                    }}
                    placeholderTextColor={colors.inkFaint}
                    selectionColor={colors.pole}
                    accessibilityLabel={label}
                    className="flex-1 py-0 font-body text-[15px] text-ink"
                />
                {right}
            </Pressable>
            {error ? <Text className="font-body text-caption text-danger">{error}</Text> : null}
        </View>
    );
}