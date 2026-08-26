import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function CampanhasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Campanhas</Text>
      <Text style={styles.hint}>Organize campanhas de coleta</Text>
    </View>
  );
}
