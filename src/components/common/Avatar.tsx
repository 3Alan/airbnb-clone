import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

const Avatar = ({ img, style }: { img: string; style?: ViewStyle }) => {
  return (
    <View style={[styles.avatar, style]}>
      <Image style={styles.avatarImg} source={{ uri: img }} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#fff',
    backgroundColor: '#eee'
  },
  avatarImg: {
    width: 50,
    height: 50
  }
});
