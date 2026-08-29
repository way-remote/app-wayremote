import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import BottomNavigator from './src/navigation/BottomNavigator';
import AuthScreen from './src/screens/Auth';
import LogoutButton from './src/components/LogoutButton';
import { colors } from './src/theme/colors';

function Root() {
  const { session, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return session ? (
    <View style={{ flex: 1 }}>
      <BottomNavigator />
      <LogoutButton />
    </View>
  ) : (
    <AuthScreen />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Root />
        <StatusBar style="dark" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
