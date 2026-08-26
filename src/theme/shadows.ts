import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const shadows = {
  sm: isAndroid
    ? { elevation: 2 }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
  md: isAndroid
    ? { elevation: 4 }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
  lg: isAndroid
    ? { elevation: 6 }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
} as const;
