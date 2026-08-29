import React from 'react';
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';

export default function LogoutButton() {
  const { signOut } = useAuth();

  const confirmLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => signOut() },
      ],
      { cancelable: true },
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={confirmLogout} accessibilityLabel="Sair da conta">
      <Text style={styles.text}>SAIR</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 64,
    right: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.danger,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
