import '../../global.css';
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from '@/screens/LoginScreen';

export default function App() {
  return (
    <View className="flex-1">
      <LoginScreen />
      <StatusBar style="light" />
    </View>
  );
}
