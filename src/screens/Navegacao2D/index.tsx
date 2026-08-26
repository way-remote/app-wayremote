import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function Navegacao2DScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Navegacao 2D</Text>
      <Text style={styles.hint}>Visao aerea com rota completa</Text>
    </View>
  );
}
