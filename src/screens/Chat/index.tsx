import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Chat</Text>
      <Text style={styles.hint}>Comunicacao com a equipe</Text>
    </View>
  );
}
