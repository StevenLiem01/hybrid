import { Eye, EyeOff, MessageCircle, Scissors } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/ui/button';
import TextField from '@/components/ui/text-field';
import { colors } from '@/constants/palette';

type Errors = { phone?: string; password?: string };

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const handleLogin = () => {
        const next: Errors = {};
        const number = phone.replace(/\D/g, '').replace(/^0+/, '');

        if (number.length < 9 || number.length > 12) next.phone = 'Nomor HP tidak valid';
        if (password.length < 6) next.password = 'Kata sandi minimal 6 karakter';

        setErrors(next);
        if (Object.keys(next).length > 0) return;

        // TODO: panggil API login
    };

    return (
        <SafeAreaView className="flex-1 bg-ink">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerClassName="grow justify-center gap-6 px-5 py-6"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View className="items-center">
                        <View className="mb-3 h-14 w-14 items-center justify-center rounded-full bg-surface">
                            <Scissors size={26} strokeWidth={1.5} color={colors.brass} />
                        </View>
                        <Text className="mb-1 font-display text-xl uppercase tracking-widest text-bone">
                            Back Room
                        </Text>
                        <Text className="font-body-medium text-xs uppercase tracking-widest text-bone-muted">
                            Potong rapi, tanpa antre
                        </Text>
                    </View>

                    <View className="items-center gap-1.5">
                        <Text className="text-center font-display text-[28px] leading-[34px] text-bone">
                            Selamat Datang Kembali
                        </Text>
                        <Text className="max-w-xs text-center font-body text-[15px] leading-[22px] text-bone-muted">
                            Masuk untuk atur jadwal potong dan cek antreanmu.
                        </Text>
                    </View>

                    <View className="gap-4 rounded-card border border-line bg-surface p-5">
                        <TextField
                            label="Nomor HP"
                            placeholder="812 3456 7890"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            autoComplete="tel"
                            error={errors.phone}
                            left={
                                <>
                                    <Text className="font-body-semibold text-[15px] text-bone">+62</Text>
                                    <View className="mx-3 h-5 w-px bg-line" />
                                </>
                            }
                        />

                        <TextField
                            label="Kata Sandi"
                            placeholder="Masukkan kata sandi"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoComplete="password"
                            error={errors.password}
                            right={
                                <Pressable
                                    onPress={() => setShowPassword((v) => !v)}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}>
                                    {showPassword ? (
                                        <EyeOff size={20} strokeWidth={1.5} color={colors.boneMuted} />
                                    ) : (
                                        <Eye size={20} strokeWidth={1.5} color={colors.boneMuted} />
                                    )}
                                </Pressable>
                            }
                        />

                        <Pressable className="self-end" hitSlop={12}>
                            <Text className="font-body-medium text-xs text-bone-muted underline">
                                Lupa kata sandi?
                            </Text>
                        </Pressable>

                        <Button label="Masuk" onPress={handleLogin} />

                        <View className="flex-row items-center gap-3">
                            <View className="h-px flex-1 bg-line" />
                            <Text className="font-body-medium text-xs text-bone-muted">atau</Text>
                            <View className="h-px flex-1 bg-line" />
                        </View>

                        <Button
                            variant="secondary"
                            label="Kirim Kode OTP via WhatsApp"
                            onPress={() => { }}
                            icon={<MessageCircle size={20} strokeWidth={1.5} color={colors.bone} />}
                        />
                    </View>

                    <Text className="text-center font-body text-[15px] text-bone-muted">
                        Belum punya akun?{' '}
                        <Text className="font-body-semibold text-brass" onPress={() => { }}>
                            Daftar
                        </Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}