import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function MembrosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Membros</Text>
      <Text style={styles.hint}>Gerencie membros da equipe</Text>
    </View>
  );
}
