import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  onPress?: () => void;
  children: string;
  theme?: 'primary' | 'standard';
  icon?: ReactElement;
  iconCenter?: boolean;
  style?: ViewStyle;
  colors?: string[];
}

const Button: FC<ButtonProps> = ({
  onPress,
  children,
  theme = 'primary',
  icon,
  style,
  iconCenter,
  colors
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {colors ? (
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles[`${theme}Btn`], styles.container, style]}
          colors={colors}
        >
          {iconCenter ? icon : <View style={styles.iconContainer}>{icon}</View>}
          <Text style={styles[`${theme}Text`]}>{children}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles[`${theme}Btn`], styles.container, style]}>
          {iconCenter ? icon : <View style={styles.iconContainer}>{icon}</View>}
          <Text style={styles[`${theme}Text`]}>{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
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
    fontFamily: 'MonB'
  },
  standardText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'MonSB'
  }
});
