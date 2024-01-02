import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';

export default function Layout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingBottom: bottom || 10,
          height: bottom + 54
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'Mon'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '搜索',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="wishlists"
        options={{
          tabBarLabel: '心愿单',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="heart" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarLabel: '社区',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: '收件箱',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}
