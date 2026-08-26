import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { styles } from './style';

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface FloatingActionMenuProps {
  visible: boolean;
  items: MenuItem[];
  onClose: () => void;
}

export default function FloatingActionMenu({ visible, items, onClose }: FloatingActionMenuProps) {
  const anims = useRef(items.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (visible) {
      Animated.stagger(50,
        anims.map((a) =>
          Animated.spring(a, { toValue: 1, tension: 65, friction: 8, useNativeDriver: true }),
        ),
      ).start();
    } else {
      anims.forEach((a) => a.setValue(0));
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1} />
      <View style={[styles.menu, { gap: 16 }]}>
        {items.map((item, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: anims[index],
              transform: [{
                translateY: anims[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              }],
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View style={styles.menuLabelContainer}>
              <Text style={styles.menuLabel} numberOfLines={1}>{item.label}</Text>
            </View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                item.onPress();
                onClose();
              }}
            >
              <Ionicons name={item.icon} size={20} color={colors.white} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </>
  );
}
