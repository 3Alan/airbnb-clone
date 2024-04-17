const baseColors = {
  primary: '#FF385C',

  gray900: '#1A1A1A',
  gray800: '#222',
  gray700: '#333',
  gray600: '#5E5D5E',
  gray500: '#b0b0b0',
  gray400: '#c2c2c2',
  gray300: '#d3d3d3',
  gray200: '#dddddd',
  gray100: '#ebebeb',
  gray50: '#f7f7f7'
} as const;

export const defaultTheme = {
  colors: {
    ...baseColors,
    typography: baseColors.gray700,
    border: baseColors.gray400
  },
  size: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36
  },
  opacity: {},
  shadows: {}
} as const;
