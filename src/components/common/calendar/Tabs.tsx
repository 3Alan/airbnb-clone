import { LayoutChangeEvent, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC, useRef } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface TabItem {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  currentTab: string;
  tabContainerStyle?: ViewStyle;
  onChange?: (tab: string) => void;
}

const OFFSET = 4;

const Tabs: FC<TabsProps> = ({ tabs, currentTab, tabContainerStyle, onChange }) => {
  const tabWith = useRef(0);
  const barLeft = useSharedValue(OFFSET);

  const onTabItemPress = (tab: TabItem) => {
    onChange?.(tab.label);
    const tabIndex = tabs.map(item => item.label).indexOf(tab.label);
    const offset = tabIndex === 0 ? OFFSET : 0;
    barLeft.value = (tabWith.current / tabs.length) * tabIndex + offset;
  };

  const barStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(barLeft.value)
    };
  });

  const onLayout = (e: LayoutChangeEvent) => {
    tabWith.current = e.nativeEvent.layout.width;
  };

  return (
    <>
      <View style={styles.tab} onLayout={onLayout}>
        <Animated.View style={[styles.activeBar, barStyle, { width: `${100 / tabs.length}%` }]} />
        {tabs.map(item => (
          <Pressable key={item.label} style={styles.tabItem} onPress={() => onTabItemPress(item)}>
            <Text>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={tabContainerStyle}>
        {tabs.map(item => (
          <View
            key={item.label}
            style={{
              width: '100%',
              display: currentTab === item.label ? 'flex' : 'none'
            }}
          >
            {item.children}
          </View>
        ))}
      </View>
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  activeBar: {
    position: 'absolute',
    height: 32,
    borderRadius: 20,
    top: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 4,
    shadowOffset: {
      width: 4,
      height: 4
    }
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    borderRadius: 20
  },
  tab: {
    borderRadius: 24,
    padding: 4,
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
    backgroundColor: '#ebebeb'
  }
});
