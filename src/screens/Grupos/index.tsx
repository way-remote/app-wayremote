import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function GruposScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Grupos</Text>
      <Text style={styles.hint}>Organize grupos de trabalho</Text>
    </View>
  );
}
