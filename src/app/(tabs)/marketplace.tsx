import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Store } from 'lucide-react-native';
import { colors } from '@/constants/palette';

export default function Marketplace() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-paper px-5">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Store size={40} strokeWidth={1.5} color={colors.inkMuted} />
            </View>
            <Text className="text-center font-display text-headline-md text-ink">
                Toko Segera Hadir
            </Text>
            <Text className="mt-2 text-center font-body text-body text-ink-muted">
                Fitur Toko under development.
            </Text>
        </SafeAreaView>
    );
}