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
    desc: baseColors.gray600,
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
    '4xl': 32,
    '5xl': 36
  },
  spacing: {
    '2xs': 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48
  },
  opacity: {},
  shadows: {
    shadow100: {
      shadowColor: baseColors.gray800,
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
  }
} as const;
