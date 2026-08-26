import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { styles } from './style';

interface FloatingActionButtonProps {
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export default function FloatingActionButton({ icon = 'add', onPress }: FloatingActionButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={28} color={colors.white} />
    </TouchableOpacity>
  );
}
