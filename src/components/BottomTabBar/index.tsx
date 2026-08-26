import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { styles } from './style';

interface Tab {
  key: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  imageSource?: ImageSourcePropType;
}

interface BottomTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (key: string) => void;
}

export default function BottomTabBar({ tabs, activeTab, onTabPress }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
          >
            {tab.imageSource ? (
              <Image
                source={tab.imageSource}
                style={[
                  styles.tabImage,
                  isActive && styles.tabImageActive,
                  !isActive && styles.tabImageInactive,
                ]}
                resizeMode="contain"
                alt={tab.label}
              />
            ) : tab.icon ? (
              <Ionicons
                name={tab.icon}
                size={24}
                color={isActive ? colors.primary : colors.textSecondary}
              />
            ) : null}
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
