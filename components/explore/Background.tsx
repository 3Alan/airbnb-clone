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
        'https://plus.unsplash.com/premium_photo-1700566982560-31ed8b46991a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1700404803455-348d5dde4597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc0fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D'
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
