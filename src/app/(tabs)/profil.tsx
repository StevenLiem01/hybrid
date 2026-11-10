import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { colors } from '@/constants/palette';
import { useAuth } from '@/auth/auth';
import Button from '@/components/ui/button';
import { useRouter } from 'expo-router';

export default function Profil() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-paper px-5">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full border border-border bg-muted">
                <User size={40} strokeWidth={1.5} color={colors.pole} />
            </View>
            <Text className="text-center font-display text-headline-md text-ink">
                {user?.name ?? 'Pengguna'}
            </Text>
            <Text className="mt-1 text-center font-body text-body text-ink-muted">
                +62 {user?.phone ?? '-'}
            </Text>

            <View className="mt-8 w-full max-w-[280px]">
                <Button variant="secondary" label="Keluar Akun" onPress={handleLogout} />
            </View>
        </SafeAreaView>
    );
}