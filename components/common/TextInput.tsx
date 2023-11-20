import {
  StyleSheet,
  Text,
  TextInput as DefaultTextInput,
  View,
  TextInputProps
} from 'react-native';
import React, { FC } from 'react';

const TextInput: FC<TextInputProps> = props => {
  const { style, ...restProps } = props;

  return <DefaultTextInput {...restProps} style={[styles.input, style]} />;
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10
  }
});
