import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';
import LoginScreen from '../Login';
import RegisterScreen from '../Register';

export default function AuthScreen() {
  const { initializing } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (mode === 'register') {
    return <RegisterScreen onNavigateLogin={() => setMode('login')} />;
  }

  return <LoginScreen onNavigateRegister={() => setMode('register')} />;
}
