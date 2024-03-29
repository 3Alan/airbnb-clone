import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const ExploreBackground = () => {
  const { width } = useWindowDimensions();

  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={4000}
      snapEnabled
      width={width}
      height={280}
      style={styles.header}
      data={[
        'https://source.unsplash.com/random/?forest house',
        'https://source.unsplash.com/random/?Mountain green'
      ]}
      renderItem={({ item, index }) => {
        return (
          <Image
            priority={index === 0 ? 'high' : 'normal'}
            contentFit="cover"
            style={{
              width: '100%',
              height: 280
            }}
            source={{
              uri: item
            }}
          />
        );
      }}
    />
  );
};

export default ExploreBackground;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});
