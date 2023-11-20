import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

interface ButtonProps {
  onPress?: () => void;
  children: string;
  theme?: 'primary' | 'standard';
  icon?: ReactElement;
  style?: ViewStyle;
}

const Button: FC<ButtonProps> = ({ onPress, children, theme = 'primary', icon, style }) => {
  return (
    <TouchableOpacity style={[styles[`${theme}Btn`], styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles[`${theme}Text`]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
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
