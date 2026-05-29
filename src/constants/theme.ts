export const colors = {
  bg: '#0b0b1f',
  bgCard: 'rgba(255,255,255,0.03)',
  bgCardHover: 'rgba(255,255,255,0.06)',
  accent: '#8042e8',
  accentLight: 'rgba(128,66,232,0.15)',
  accentBorder: 'rgba(128,66,232,0.2)',
  accentMid: '#a855f7',
  white: '#ffffff',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.55)',
  textMuted: 'rgba(255,255,255,0.35)',
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.12)',
  rating: '#c084fc',
  overlay: 'rgba(11,11,31,0.85)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
} as const;

export const typography = {
  xs: 10,
  sm: 11,
  base: 13,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  hero: 26,
} as const;

export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  mono: 'monospace',
};

export const Colors = {
  light: {
    background: '#ffffff',
    backgroundElement: '#8042e8',
    text: '#0b0b1f',
    tint: '#8042e8',
    tabIconDefault: '#999',
    tabIconSelected: '#8042e8',
  },
  dark: {
    background: '#0b0b1f',
    backgroundElement: '#8042e8',
    text: '#ffffff',
    tint: '#8042e8',
    tabIconDefault: '#666',
    tabIconSelected: '#a855f7',
  },
} as const;