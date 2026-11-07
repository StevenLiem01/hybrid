import { Tabs } from 'expo-router';
import TabBar from '@/components/ui/navbar';

export default function LayoutTab() {
    return (
        <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="booking" />
            <Tabs.Screen name="marketplace" />
            <Tabs.Screen name="profil" />
        </Tabs>
    );
}