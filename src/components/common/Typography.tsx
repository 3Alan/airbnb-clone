import { Text, TextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const VariantName = {
  h1: 'h1',
  h2: 'h2',
  subtitle: 'subtitle'
};

export interface TypographyProps extends TextProps {
  variant: keyof typeof VariantName;
}

const VariantProps = {
  [VariantName.h1]: {
    'aria-level': 1
  },
  [VariantName.h2]: {
    'aria-level': 2
  },
  [VariantName.subtitle]: {}
};

const Typography = (props: TypographyProps) => {
  const { variant, style } = props;
  const { styles } = useStyles(styleSheet, {
    variant
  });
  return (
    <Text role="heading" {...VariantProps[variant]} {...props} style={[styles.container, style]} />
  );
};

const styleSheet = createStyleSheet(theme => ({
  container: {
    variants: {
      variant: {
        h1: {
          fontSize: theme.size['4xl'],
          fontWeight: '500',
          color: theme.colors.gray800
        },
        h2: {
          fontSize: 22,
          fontWeight: '500',
          color: theme.colors.gray800
        },
        subtitle: {
          fontSize: theme.size.sm,
          color: theme.colors.gray600
        }
      }
    }
  }
}));

export default Typography;
