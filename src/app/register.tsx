import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import {useAuth } from './auth';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import TextField from '@/components/ui/text-field';
import { colors } from '@/constants/palette';
import { useRouter } from 'expo-router';
import { formatPhone, phoneDigits } from './formatPhone';

type Errors = { name?: string; phone?: string; password?: string; confirm?: string };

function PasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
    return (
        <Pressable
            onPress={onToggle}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={visible ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}>
            {visible ? (
                <EyeOff size={20} strokeWidth={1.5} color={colors.inkMuted} />
            ) : (
                <Eye size={20} strokeWidth={1.5} color={colors.inkMuted} />
            )}
        </Pressable>
    );
}

export default function RegisterScreen() {
    const router = useRouter();
    const {register} = useAuth();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);

    const mismatch = confirm.length > 0 && password !== confirm;
    const confirmError = mismatch ? 'Kata sandi tidak cocok' : errors.confirm;

    const clearError = (key: keyof Errors) =>
        setErrors((prev) => ({ ...prev, [key]: undefined }));

    const goToLogin = () => {
        if (router.canGoBack()) router.back();
        else router.replace('./login');
    };

    const handleRegister = async () => {
        const next: Errors = {};
        const digits = phoneDigits(phone);

        if (name.trim().length < 2) next.name = 'Nama minimal 2 karakter';
        if (digits.length < 9 || digits.length > 12) next.phone = 'Nomor HP tidak valid';
        if (password.length < 6) next.password = 'Kata sandi minimal 6 karakter';
        if (!confirm) next.confirm = 'Ulangi kata sandi';
        else if (confirm !== password) next.confirm = 'Kata sandi tidak cocok';

        setErrors(next);
        if (Object.keys(next).length > 0) return;

        setLoading(true);
        const result = await register(name, digits, password);
        setLoading(false);
        if(!result.ok) {
            setErrors({phone: result.error});
            return;
        }
        router.replace('./home');
    };

    return (
        <SafeAreaView className="flex-1 bg-paper">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerClassName="grow px-5 pb-6"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <Pressable
                        onPress={goToLogin}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Kembali ke halaman masuk"
                        className="mb-2 flex-row items-center gap-1 self-start py-3">
                        <ArrowLeft size={20} strokeWidth={1.5} color={colors.ink} />
                        <Text className="font-body-medium text-caption text-ink-muted">Kembali ke masuk</Text>
                    </Pressable>

                    <View className="mb-4 gap-1">
                        <Text className="font-display text-headline-lg text-ink">Buat akun baru</Text>
                        <Text className="font-body text-body text-ink-muted">
                            Daftar untuk memilih barber langganan dan booking cepat
                        </Text>
                    </View>

                    <View className="gap-4 rounded-card border border-border bg-card p-4">
                        <TextField
                            label="Nama lengkap"
                            placeholder="Luther King"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                clearError('name');
                            }}
                            autoCapitalize="words"
                            autoComplete="name"
                            error={errors.name}
                        />

                        <TextField
                            label="Nomor HP"
                            placeholder="812 3456 7890"
                            value={phone}
                            onChangeText={(text) => {
                                setPhone(formatPhone(text));
                                setErrors((prev) => ({ ...prev, phone: undefined }));
                            }}
                            keyboardType="phone-pad"
                            autoComplete="tel-national"
                            error={errors.phone}
                            left={
                                <View className="mr-3 border-r border-border pr-3">
                                    <Text className="font-body-medium text-body text-ink">+62</Text>
                                </View>
                            }
                        />

                        <TextField
                            label="Kata sandi"
                            placeholder="Minimal 6 karakter"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrors((prev) => ({ ...prev, password: undefined }));
                            }}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoComplete="new-password"
                            error={errors.password}
                            right={
                                <PasswordToggle
                                    visible={showPassword}
                                    onToggle={() => setShowPassword((visible) => !visible)}
                                />
                            }
                        />

                        <TextField
                            label="Konfirmasi kata sandi"
                            placeholder="Ulangi kata sandi"
                            value={confirm}
                            onChangeText={(text) => {
                                setConfirm(text);
                                clearError('confirm');
                            }}
                            secureTextEntry={!showConfirm}
                            autoCapitalize="none"
                            autoComplete="new-password"
                            returnKeyType="done"
                            onSubmitEditing={handleRegister}
                            error={confirmError}
                            right={
                                <PasswordToggle
                                    visible={showConfirm}
                                    onToggle={() => setShowConfirm((visible) => !visible)}
                                />
                            }
                        />

                        <Button label="Daftar sekarang" onPress={handleRegister} loading={loading} />
                    </View>

                    <View className="mt-4 flex-row items-center justify-center gap-1">
                        <Text className="font-body text-body text-ink-muted">Sudah punya akun?</Text>
                        <Pressable onPress={goToLogin} hitSlop={12} accessibilityRole="link">
                            <Text className="font-body-semibold text-title text-pole">Masuk</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}