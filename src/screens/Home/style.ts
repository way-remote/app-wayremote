import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';

const mono = {
  fontFamily: 'monospace',
  fontWeight: '700' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: 0.5,
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ─── Header ──────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
 headerLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1,
 },

  logoImage: {
    width: 180,
    height: 70,
   
  },
  menuBtn: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },

  // ─── Tabs ────────────────────────────────────────
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    gap: 2,
  },
  tabIcon: {
    width: 45,
    height: 30,
  },
  tabIconInactive: {
    opacity: 0.65,
  },
  tabDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  tabLabel: {
    fontSize: 10,
    ...mono,
  },
  tabLabelInactive: {
    color: colors.textSecondary,
    opacity: 0.65,
  },
  tabIndicator: {
    width: 24,
    height: 3,
    borderRadius: 1.5,
    marginTop: 2,
  },

  // ─── Map ─────────────────────────────────────────
  mapContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.border,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  // Location overlay — floating on map, centered top
  locationOverlay: {
    position: 'absolute',
    top: spacing.sm + 4,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  locationOverlayInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  locationOverlayText: {
    fontSize: 11,
    color: colors.white,
    fontFamily: 'monospace',
    fontWeight: '600',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  locationSkeleton: {
    width: 80,
    height: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  // Visibility switch — capsule
  mapOverlayTop: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 10,
  },
  visibilityControl: {
    height: 36,
    paddingHorizontal: 4,
    borderRadius: 18,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },

  // Zoom controls
  zoomControls: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
    zIndex: 10,
  },
  zoomControlsHidden: {
    opacity: 0,
    pointerEvents: 'none' as const,
  },
  controlBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlDivider: {
    height: 1,
    backgroundColor: colors.border,
  },

  // FAB (inside map, bottom-right)
  fabContainer: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    zIndex: 20,
  },

  // ─── Filters ─────────────────────────────────────
  fixedControls: {
    backgroundColor: colors.background,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },

  // Category button (icon only, 44x44)
  categoryBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#B8B0A3',
    backgroundColor: '#F8F1E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },

  // Radius slider — right-aligned, 200px
  radiusContainer: {
    marginLeft: 'auto',
    width: 200,
    gap: 2,
  },
  radiusLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiusValue: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.3,
  },
  radiusTrack: {
    height: 36,
    justifyContent: 'center',
  },
  radiusTrackBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 15.5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.border,
  },
  radiusTrackFill: {
    position: 'absolute',
    left: 0,
    top: 15.5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primary,
  },
  radiusDot: {
    position: 'absolute',
    top: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
  },
  radiusDotActive: {
    backgroundColor: colors.primary,
  },
  radiusThumb: {
    position: 'absolute',
    top: 7,
    left: -9,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  // ─── Results ─────────────────────────────────────
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultsTitle: {
    fontSize: 11,
    ...mono,
    color: colors.textSecondary,
  },
  resultsScroll: {
    flex: 1,
  },
  resultsScrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 12,
    ...mono,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },

  // ─── Category Modal ──────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '82%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.lg,
  },
  modalTitle: {
    fontSize: 14,
    ...mono,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  modalItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  modalItemSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modalItemText: {
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  modalItemTextSelected: {
    color: colors.white,
  },
  modalClearBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  modalClearText: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '600',
    color: colors.danger,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});
