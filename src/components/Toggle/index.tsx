import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from './style';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function Toggle({ value, onValueChange }: ToggleProps) {
  return (
    <TouchableOpacity
      style={[styles.track, value && styles.trackActive]}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.thumb, value && styles.thumbActive]} />
    </TouchableOpacity>
  );
}
