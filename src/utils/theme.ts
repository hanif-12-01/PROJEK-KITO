export const colors = {
  // Primary colors
  primary: '#6366F1', // Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#A5B4FC',
  
  // Secondary colors
  secondary: '#10B981', // Emerald
  secondaryDark: '#059669',
  secondaryLight: '#6EE7B7',
  
  // Accent colors
  accent: '#F59E0B', // Amber
  accentDark: '#D97706',
  accentLight: '#FCD34D',
  
  // Background colors
  background: '#0F172A', // Slate 900
  backgroundLight: '#1E293B', // Slate 800
  backgroundLighter: '#334155', // Slate 700
  
  // Surface colors
  surface: '#1E293B', // Slate 800
  surfaceLight: '#334155', // Slate 700
  surfaceLighter: '#475569', // Slate 600
  
  // Text colors
  textPrimary: '#F8FAFC', // Slate 50
  textSecondary: '#CBD5E1', // Slate 300
  textTertiary: '#94A3B8', // Slate 400
  textDisabled: '#64748B', // Slate 500
  
  // Status colors
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  info: '#3B82F6', // Blue
  
  // Border colors
  border: '#334155', // Slate 700
  borderLight: '#475569', // Slate 600
  
  // Overlay colors
  overlay: 'rgba(15, 23, 42, 0.8)', // Slate 900 with opacity
  overlayLight: 'rgba(30, 41, 59, 0.6)', // Slate 800 with opacity
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};