import '../../global.css';
import { useEffect } from 'react';
import { Domine_400Regular } from '@expo-google-fonts/domine';
import {
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
} from '@expo-google-fonts/public-sans';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { DefaultTheme, Stack, ThemeProvider, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/palette';
import { AuthProvider } from '@/auth/auth';

SplashScreen.preventAutoHideAsync();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.paper,
    card: colors.card,
    text: colors.ink,
    border: colors.border,
    primary: colors.pole,
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Domine_400Regular,
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    StatusBar.setStyle('dark');
  }, []);
  if (!loaded && !error) return null;

  return (
    <ThemeProvider value={AppTheme}>
      <AuthProvider>
        <View className="flex-1 bg-muted/30">
          <View className="mx-auto flex-1 w-full max-w-[430px] bg-paper shadow-sm">
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}