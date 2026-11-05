import { Redirect } from "expo-router";
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Button from '@/components/ui/button';
import { useAuth } from './auth';

export default function Home(){
    const {user, logout} = useAuth();

    if(!user) return <Redirect href="./login"/>;

    return (
        <SafeAreaView className="flex-1 bg-paper">
            <View className="flex-1 justify-between px-5 py-6">
                <View className="gap-1">
                    <Text className="font-display text-headline-lg text-ink">
                        Heluuu, {user.name}
                    </Text>
                    <Text className="font-body text-body text-ink-muted">
                        Home Screen sedang development.
                    </Text>
                </View>
                <Button variant="secondary" label="Keluar" onPress={logout} />
            </View>
        </SafeAreaView>
    );
}