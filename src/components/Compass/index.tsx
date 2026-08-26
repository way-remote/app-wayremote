import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { styles } from './style';

export default function Compass() {
  return (
    <View style={styles.container}>
      <Ionicons name="compass" size={28} color={colors.primary} />
    </View>
  );
}
