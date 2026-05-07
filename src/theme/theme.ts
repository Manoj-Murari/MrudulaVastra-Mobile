export const theme = {
  colors: {
    forest: '#1A3C2E',
    gold: '#B8963E',
    cream: '#FDFBF7',
    white: '#FFFFFF',
    textPrimary: '#2D2D2D',
    textMuted: '#6B7280',
    border: 'rgba(184,150,62,0.2)', // Gold with opacity
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    header: {
      fontFamily: 'PlayfairDisplay_700Bold',
      fontSize: 24,
      color: '#1A3C2E',
    },
    subhead: {
      fontFamily: 'DMSans_500Medium',
      fontSize: 16,
      letterSpacing: 0.5,
      color: '#B8963E',
    },
    body: {
      fontFamily: 'DMSans_400Regular',
      fontSize: 14,
      color: '#2D2D2D',
    },
    caption: {
      fontFamily: 'DMSans_400Regular',
      fontSize: 12,
      color: '#6B7280',
    }
  } as const
};
