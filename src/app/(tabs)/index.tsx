import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import ExploreBackground from '../../components/explore/Background';
import Listing from '../../components/explore/Listing';
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import FilterHeader from '../../components/common/FilterHeader';

export default function Page() {
  const translationY = useSharedValue(0);

  const handleScroll = (y: number) => {
    translationY.value = y;
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundHeight = 280;
    return {
      opacity: interpolate(translationY.value, [backgroundHeight, backgroundHeight + 20], [0, 1])
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: () => <FilterHeader style={headerAnimatedStyle} />
        }}
      />
      <ExploreBackground />
      <Listing onScroll={handleScroll} />
    </View>
  );
}
