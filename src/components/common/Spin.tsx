import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform } from 'react-native';
const Spin = () => {
  if (Platform.OS === 'web') {
    return <img src="../../../assets/images/web-spin.gif" />;
  }

  return (
    <LottieView
      style={{
        width: 50,
        height: 30
      }}
      resizeMode="cover"
      autoPlay
      loop
      source={require('../../../assets/lottie/spin.lottie')}
    />
  );
};

export default Spin;
