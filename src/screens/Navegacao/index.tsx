import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function NavegacaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Navegacao</Text>
      <Text style={styles.hint}>Selecione o modo de navegacao</Text>
    </View>
  );
}
