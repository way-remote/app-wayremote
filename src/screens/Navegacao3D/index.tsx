import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function Navegacao3DScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Navegacao 3D</Text>
      <Text style={styles.hint}>Modo turn-by-turn com camera inclinada</Text>
    </View>
  );
}
