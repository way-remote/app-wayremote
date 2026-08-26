import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { styles } from './style';

interface AppHeaderProps {
  title?: string;
  showDevMode?: boolean;
  onMenuPress?: () => void;
}

export default function AppHeader({ title = 'WayRemote', showDevMode = false, onMenuPress }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.logo}>{title}</Text>
        {showDevMode && <Text style={styles.devBadge}>DEV</Text>}
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
