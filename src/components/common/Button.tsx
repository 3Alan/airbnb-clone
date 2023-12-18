import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React, { FC, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  onPress?: () => void;
  children: string;
  theme?: 'primary' | 'standard' | 'secondary';
  icon?: ReactElement;
  iconCenter?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colors?: string[];
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  onPress,
  children,
  theme = 'primary',
  icon,
  style,
  textStyle,
  iconCenter,
  colors,
  disabled
}) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={onPress}>
      {colors ? (
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles[`${theme}Btn`], styles.container, style]}
          colors={colors}
        >
          {iconCenter ? icon : <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles[`${theme}Text`], textStyle]}>{children}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles[`${theme}Btn`], styles.container, disabled && styles.disabled, style]}>
          {iconCenter ? icon : <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles[`${theme}Text`], textStyle]}>{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: '#dddddd'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    position: 'absolute',
    left: 16
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  secondaryBtn: {
    backgroundColor: '#222222',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  standardBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    color: Colors.grey,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Mon'
  },
  standardText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Mon'
  },
  secondaryText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Mon'
  }
});
