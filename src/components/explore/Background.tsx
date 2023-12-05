import { StyleSheet, Image, useWindowDimensions } from 'react-native';
import React from 'react';
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
      renderItem={({ item }) => {
        return (
          <Image
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
