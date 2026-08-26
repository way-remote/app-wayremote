import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function AcoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Acoes</Text>
      <Text style={styles.hint}>Acoes rapidas e tarefas</Text>
    </View>
  );
}
