import { Entypo } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useRef } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import FilterHeader from '../../components/common/FilterHeader';
import ExploreBackground from '../../components/explore/Background';
import Listing from '../../components/explore/Listing';

export default function Page() {
  const translationY = useSharedValue(0);
  const listingRef = useRef(null);

  const handleScroll = (y: number) => {
    translationY.value = y;
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundHeight = 280;
    return {
      opacity: interpolate(translationY.value, [backgroundHeight, backgroundHeight + 20], [0, 1])
    };
  }, []);

  const scrollTopAnimatedStyle = useAnimatedStyle(() => {
    const backgroundHeight = 500;
    return {
      opacity: interpolate(translationY.value, [backgroundHeight, backgroundHeight + 10], [0, 1])
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: () => <FilterHeader style={headerAnimatedStyle} />
        }}
      />
      <ExploreBackground />
      <Listing onScroll={handleScroll} ref={listingRef} />

      <Animated.View style={[styles.scrollTop, scrollTopAnimatedStyle]}>
        <Pressable onPress={() => listingRef.current.scrollTo({ x: 0, y: 0, animated: true })}>
          <Entypo name="align-top" size={24} color="black" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollTop: {
    position: 'absolute',
    bottom: 34,
    left: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  }
});
