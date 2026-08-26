import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { styles } from './style';

interface FilterButtonProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  onPress?: () => void;
}

export default function FilterButton({ label, icon = 'filter', active = false, onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.active]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={14} color={active ? colors.white : colors.textSecondary} />
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}
