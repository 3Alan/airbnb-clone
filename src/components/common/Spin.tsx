import LottieView from 'lottie-react-native';
import React from 'react';
const Spin = () => {
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
