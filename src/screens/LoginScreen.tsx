import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Peringatan', 'Harap isi username dan password!');
            return;
        }
        Alert.alert('Sukses', `Login berhasil dengan username: ${username}`);
    };

    return (
        <LinearGradient
            colors={['#2d0c57', '#0d0614', '#000000']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="flex-1 justify-center px-6"
        >
            <Image
                source={require('../../assets/images/logo.png')}
                className="w-[120px] h-[90px] self-center mb-6"
                resizeMode="contain"
            />
            <Text className="text-[28px] font-bold text-white mb-2 text-center">
                Selamat Datang
            </Text>
            <Text className="text-base text-white mb-8 text-center">
                Silakan masuk ke akun Anda
            </Text>

            <TextInput
                className="bg-white/[0.08] border border-black rounded-[34px] px-4 py-3 text-base mb-4 text-white"
                placeholder="Username"
                placeholderTextColor="#808080"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                className="bg-white/[0.08] border border-black rounded-[34px] px-4 py-3 text-base mb-4 text-white"
                placeholder="Password"
                placeholderTextColor="#808080"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                className="bg-[#2d086c] py-3.5 rounded-[34px] items-center mt-2"
                onPress={handleLogin}
                activeOpacity={0.8}
            >
                <Text className="text-white text-base font-semibold">
                    Masuk
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}
