import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 24, color = colors.text }: IconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}
