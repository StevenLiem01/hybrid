import { Eye, EyeOff, Scissors } from 'lucide-react-native';
import { useState } from 'react';
import { useAuth } from './auth';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import TextField from '@/components/ui/text-field';
import { colors } from '@/constants/palette';
import { useRouter } from 'expo-router';
import { formatPhone, phoneDigits } from './formatPhone';

type Errors = { phone?: string; password?: string };

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [formError, SetFormError] = useState('');

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        const next: Errors = {};
        const digits = phoneDigits(phone);

        if (digits.length < 9 || digits.length > 12) next.phone = 'Nomor HP tidak valid';
        if (password.length < 6) next.password = 'Kata sandi minimal 6 karakter';

        setErrors(next);
        if (Object.keys(next).length > 0) return;

        setLoading(true);
        SetFormError('');
        const result = await login(digits, password);
        setLoading(false);

        if (!result.ok) {
            SetFormError(result.error);
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
                    contentContainerClassName="grow justify-center gap-6 px-5 py-6"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View className="mb-6 items-center">
                        <View className="mb-3 h-16 w-16 items-center justify-center rounded-full border border-border bg-muted">
                            <Scissors size={30} strokeWidth={1.5} color={colors.pole} />
                        </View>
                        <Text className="mb-1 text-center font-display text-headline-md text-ink">
                            Selamat Datang
                        </Text>
                        <Text className="max-w-[280px] text-center font-body text-body text-ink-muted">
                            Masuk untuk booking jadwal potong rambut
                        </Text>
                    </View>

                    <View className="mb-4 gap-4 rounded-card border border-border bg-card p-4">
                        <TextField
                            label="Nomor HP"
                            placeholder="812 3456 7890"
                            value={phone}
                            onChangeText={(text) => setPhone(formatPhone(text))}
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
                            label="Kata Sandi"
                            placeholder="Masukkan kata sandi"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoComplete="current-password"
                            error={errors.password}
                            right={
                                <Pressable
                                    onPress={() => setShowPassword((visible) => !visible)}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}>
                                    {showPassword ? (
                                        <EyeOff size={20} strokeWidth={1.5} color={colors.inkMuted} />
                                    ) : (
                                        <Eye size={20} strokeWidth={1.5} color={colors.inkMuted} />
                                    )}
                                </Pressable>
                            }
                        />

                        <Button label="Masuk" onPress={handleLogin} loading={loading} />
                    </View>

                    <View className="flex-row items-center justify-center gap-1">
                        <Text className="font-body text-body text-ink-muted">Belum punya akun?</Text>
                        <Pressable
                            onPress={() => router.push('./register')}
                            hitSlop={12}
                            accessibilityRole="link">
                            <Text className="font-body-semibold text-title text-pole">Daftar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}