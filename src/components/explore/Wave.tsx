import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const Wave = () => {
  return (
    <View>
      <View
        style={{
          height: 110,
          backgroundColor: 'transparent'
        }}
      >
        <Svg
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: 'transparent'
          }}
          height={4}
          width={50}
          viewBox="0 0 50 4"
        >
          <Path d="M0 0 0 4 7 4Q1 3 0 0" fill="#fff" />
        </Svg>
        <Svg
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'transparent',
            transform: [{ scaleX: -1 }]
          }}
          height={4}
          width={50}
          viewBox="0 0 50 4"
        >
          <Path d="M0 0 0 4 7 4Q1 3 0 0" fill="#fff" />
        </Svg>
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          height: 90
        }}
      />
    </View>
  );
};

export default Wave;

const styles = StyleSheet.create({});
