import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, ReactElement } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle, TouchableOpacity } from 'react-native';

import Spin from './Spin';
import Colors from '../../constants/Colors';

interface ButtonProps {
  onPress?: () => void;
  children: string;
  theme?: 'primary' | 'secondary' | 'tertiary';
  icon?: ReactElement;
  iconCenter?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  onPress,
  children,
  theme = 'primary',
  icon,
  style,
  textStyle,
  iconCenter,
  disabled,
  isLoading
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <Spin />;
    }

    return (
      <>
        {iconCenter ? icon : <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.text, theme === 'tertiary' && styles.tertiaryText, textStyle]}>
          {children}
        </Text>
      </>
    );
  };

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={onPress}>
      {theme === 'primary' ? (
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.btn, (disabled || isLoading) && styles.disabled, styles.container, style]}
          colors={disabled ? [Colors.neutral03, Colors.neutral03] : Colors.gradient}
        >
          {renderContent()}
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.btn,
            styles[`${theme}Btn`],
            styles.container,
            (disabled || isLoading) && styles.disabled,
            style
          ]}
        >
          {renderContent()}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: Colors.neutral03,
    borderColor: Colors.neutral03
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22
  },
  iconContainer: {
    position: 'absolute',
    left: 16
  },
  btn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 24
  },
  secondaryBtn: {
    backgroundColor: '#222222'
  },
  tertiaryBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.shade02,
    color: Colors.shade02
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Mon'
  },
  tertiaryText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Mon'
  }
});
