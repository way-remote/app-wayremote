import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    bottom: 64,
    right: spacing.sm,
    alignItems: 'flex-end',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    ...shadows.md,
  },
  menuLabelContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 140,
    ...shadows.sm,
  },
  menuLabel: {
    color: colors.text,
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});
