import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { StyleSheet } from 'react-native';

export type PointCardStatus = 'enter' | 'request' | 'pending' | 'member';

interface PointCardProps {
  name: string;
  address: string;
  category: string;
  members: number;
  rating: number;
  reviews: number;
  distance: string;
  visibility: 'PÚBLICO' | 'PRIVADO';
  icon: string;
  color: string;
  status?: PointCardStatus;
}

const STATUS_CONFIG: Record<PointCardStatus, { label: string; icon: keyof typeof Ionicons.glyphMap; bg: string; fg: string }> = {
  enter: { label: 'Entrar', icon: 'log-in-outline', bg: colors.primaryLight, fg: colors.primary },
  request: { label: 'Solicitar', icon: 'hand-left-outline', bg: colors.warningLight, fg: colors.warning },
  pending: { label: 'Enviado', icon: 'time-outline', bg: '#e0e0e0', fg: '#666' },
  member: { label: 'Membro', icon: 'checkmark-circle-outline', bg: colors.successLight, fg: colors.success },
};

export default function PointCard({
  name,
  address,
  category,
  members,
  rating,
  reviews,
  distance,
  visibility,
  icon,
  color,
  status,
}: PointCardProps) {
  const isPublic = visibility === 'PÚBLICO';
  const visibilityColor = isPublic ? colors.success : colors.warning;
  const visibilityBg = isPublic ? colors.successLight : colors.warningLight;
  const effectiveStatus: PointCardStatus = status ?? (isPublic ? 'enter' : 'request');
  const st = STATUS_CONFIG[effectiveStatus];

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <MaterialCommunityIcons name={icon as any} size={22} color={color} />
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.meta} numberOfLines={1}>
            {address} • {category} • {members} membros • {distance} • {rating} ({reviews})
          </Text>
        </View>

        <View style={styles.right}>
          <View style={[styles.badge, { backgroundColor: visibilityBg }]}>
            <Text style={[styles.badgeText, { color: visibilityColor }]}>
              {visibility}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: st.bg }]}
            activeOpacity={0.7}
            disabled={effectiveStatus === 'pending' || effectiveStatus === 'member'}
          >
            <Ionicons name={st.icon} size={16} color={st.fg} />
            <Text style={[styles.actionLabel, { color: st.fg }]} numberOfLines={1}>
              {st.label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  meta: {
    fontSize: 10,
    color: colors.textSecondary,
    fontFamily: 'monospace',
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '700',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },
});
