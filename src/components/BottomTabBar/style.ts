import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  tabImage: {
    width: 40,
    height: 40,
  },
  tabImageActive: {
    tintColor: '#176B43',
  },
  tabImageInactive: {
    opacity: 0.4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
});
