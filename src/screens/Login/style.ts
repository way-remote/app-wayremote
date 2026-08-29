import { Platform, StyleSheet } from 'react-native';

const COLORS = {
  paper: '#f3ead9',
  paperLight: '#f8f0e2',
  ink: '#151b18',
  green: '#0d6335',
  greenDark: '#084b29',
  red: '#b72c21',
  translucentSurface: 'rgba(248, 240, 226, 0.74)',
  googleSurface: 'rgba(255, 255, 255, 0.42)',
  mapLine: 'rgba(61, 84, 70, 0.07)',
};

const SIZES = {
  cardMaxWidth: 420,
  cardPaddingHorizontal: 20,
  cardPaddingVertical: 22,
  inputHeight: 52,
  buttonHeight: 50,
  borderRadius: 16,
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
};

const SHADOWS = {
  card: {
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 3,
  },
  button: {
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  googleButton: {
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
};

const MONO_FONT = Platform.select({
  ios: 'Courier New',
  android: 'monospace',
  default: 'monospace',
}) as string;

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.paper,
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingBottom: 56,
    paddingHorizontal: 18,
    paddingTop: 28,
  },
  mapTexture: {
    bottom: 0,
    left: 0,
    opacity: 0.9,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  mapLine: {
    backgroundColor: COLORS.mapLine,
    height: 1,
    left: '-28%',
    position: 'absolute',
    width: '150%',
  },
  mapLineOne: {
    top: '10%',
    transform: [{ rotate: '-18deg' }],
  },
  mapLineTwo: {
    top: '40%',
    transform: [{ rotate: '24deg' }],
  },
  mapLineThree: {
    top: '64%',
    transform: [{ rotate: '-9deg' }],
  },
  mapLineFour: {
    top: '82%',
    transform: [{ rotate: '17deg' }],
  },
  logo: {
    height: 96,
    marginBottom: 18,
    maxWidth: 520,
    width: '76%',
  },
  card: {
    backgroundColor: COLORS.translucentSurface,
    borderColor: COLORS.ink,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    maxWidth: SIZES.cardMaxWidth,
    paddingBottom: SIZES.cardPaddingVertical,
    paddingHorizontal: SIZES.cardPaddingHorizontal,
    paddingTop: SIZES.cardPaddingVertical,
    width: '92%',
    ...SHADOWS.card,
  },
  title: {
    color: COLORS.ink,
    fontFamily: MONO_FONT,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    color: '#303633',
    fontFamily: MONO_FONT,
    fontSize: 13,
    letterSpacing: 0.5,
    marginBottom: SPACING.lg,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  recoverySuccess: {
    color: COLORS.green,
    fontFamily: MONO_FONT,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    letterSpacing: 0.4,
    marginVertical: SPACING.md,
    textAlign: 'center',
  },
  label: {
    color: COLORS.green,
    fontFamily: MONO_FONT,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: SPACING.xs,
  },
  passwordLabel: {
    marginTop: SPACING.lg,
  },
  inputShell: {
    alignItems: 'center',
    backgroundColor: 'rgba(248, 240, 226, 0.55)',
    borderColor: COLORS.ink,
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    height: SIZES.inputHeight,
    paddingHorizontal: SPACING.md,
  },
  leadingIcon: {
    color: COLORS.ink,
    marginRight: SPACING.md,
  },
  input: {
    color: COLORS.ink,
    flex: 1,
    fontFamily: MONO_FONT,
    fontSize: 16,
    height: '100%',
    paddingVertical: 0,
  },
  eyeButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: SPACING.md,
  },
  forgotText: {
    color: COLORS.red,
    fontFamily: MONO_FONT,
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: COLORS.red,
    fontFamily: MONO_FONT,
    fontSize: 12,
    lineHeight: 17,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: COLORS.green,
    borderColor: COLORS.greenDark,
    borderRadius: 9,
    borderWidth: 1,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    marginTop: SPACING.lg,
    ...SHADOWS.button,
  },
  primaryButtonText: {
    color: COLORS.paperLight,
    fontFamily: MONO_FONT,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
  },
  separatorRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: SPACING.lg,
  },
  separatorLine: {
    backgroundColor: 'rgba(21, 27, 24, 0.55)',
    flex: 1,
    height: 1,
  },
  separatorText: {
    color: COLORS.ink,
    fontFamily: MONO_FONT,
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: SPACING.md,
  },
  googleButton: {
    alignItems: 'center',
    backgroundColor: COLORS.googleSurface,
    borderColor: 'rgba(21, 27, 24, 0.45)',
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    ...SHADOWS.googleButton,
  },
  googleMark: {
    marginRight: SPACING.sm,
  },
  googleButtonText: {
    color: COLORS.ink,
    fontFamily: MONO_FONT,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  createAccountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    rowGap: SPACING.sm,
  },
  accountQuestion: {
    color: COLORS.ink,
    fontFamily: MONO_FONT,
    fontSize: 12,
    letterSpacing: 0.3,
    marginRight: SPACING.md,
  },
  createAccountText: {
    color: COLORS.green,
    fontFamily: MONO_FONT,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
    textDecorationLine: 'underline',
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ translateY: 1 }],
  },
  buttonDisabled: {
    opacity: 0.62,
  },
});

export const responsive = {
  compactScreenStyles: {
    scrollContent: {
      paddingTop: 12,
    },
    logo: {
      height: 78,
      marginBottom: 10,
    },
    card: {
      paddingBottom: 16,
      paddingTop: 16,
    },
    title: {
      fontSize: 24,
    },
    subtitle: {
      marginBottom: 14,
    },
    recoverySuccess: {
      marginVertical: 10,
    },
  },
};

export { COLORS, SIZES, SPACING };
