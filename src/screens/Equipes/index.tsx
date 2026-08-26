import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function EquipesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Equipes</Text>
      <Text style={styles.hint}>Gerencie suas equipes de campo</Text>
    </View>
  );
}
