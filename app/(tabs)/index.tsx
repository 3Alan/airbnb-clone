import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import ExploreBackground from '../../components/explore/Background';
import Listing from '../../components/explore/Listing';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function Page() {
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const handleListingScroll = (y: number) => {
    setShowHeader(y > 280);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          // 不显示header
          headerShown: false
        }}
      />
      <ExploreBackground />
      {showHeader && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            paddingHorizontal: 20,
            paddingTop: insets.top + 10,
            paddingBottom: 18,
            shadowColor: '#000',
            shadowRadius: 4,
            shadowOpacity: 0.12,
            elevation: 6,
            shadowOffset: {
              width: 2,
              height: 2
            },
            backgroundColor: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2
          }}
        >
          <View
            style={{
              backgroundColor: '#f7f7f7',
              flexDirection: 'row',
              padding: 12,
              borderRadius: 10,
              alignContent: 'center'
            }}
          >
            <View style={{ flex: 2, paddingVertical: 3 }}>
              <Text style={{ color: '#333', fontWeight: '700' }}>全球</Text>
            </View>
            <View style={[styles.filterItem, { flex: 3 }]}>
              <Text style={{ color: '#707070', fontWeight: '700' }} numberOfLines={1}>
                入住退房日期
              </Text>
            </View>
            <View style={[styles.filterItem, { flex: 3 }]}>
              <Text style={{ color: '#707070', fontWeight: '700' }} numberOfLines={1}>
                景点/地址/关键词
              </Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 3 }}>
              <Ionicons name="search" size={18} />
            </View>
          </View>
        </Animated.View>
      )}
      <Listing onScroll={handleListingScroll} />
    </View>
  );
}

const styles = StyleSheet.create({
  filterItem: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 3
  }
});
