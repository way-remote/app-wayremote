import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigator from './src/navigation/BottomNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <BottomNavigator />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
