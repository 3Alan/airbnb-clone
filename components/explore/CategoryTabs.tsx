import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface CategoryItem {
  name: string;
  icon: string;
}

interface CategoryTabsProps {
  category: string;
  categoryList: CategoryItem[];
  onChange?: (category: string) => void;
}

const CategoryTabs: FC<CategoryTabsProps> = ({ category, categoryList, onChange }) => {
  const itemsRef = useRef<{ [category: string]: TouchableOpacity | null }>({});
  const scrollRef = useRef<ScrollView>(null);

  const onCategoryPress = (category: string) => {
    const currentTab = itemsRef.current[category];
    onChange?.(category);

    if (scrollRef.current && currentTab) {
      // measure在安卓端获取不到x值
      // @ts-ignore
      currentTab?.measureLayout(scrollRef.current, x => {
        scrollRef.current?.scrollTo({
          x: x - 16,
          y: 0,
          animated: true
        });
      });
    }

    // 点击震动效果
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categoryList.map(item => (
        <TouchableOpacity
          ref={el => (itemsRef.current[item.name] = el)}
          key={item.name}
          style={[styles.tab, category === item.name ? styles.activeTab : null]}
          onPress={() => onCategoryPress(item.name)}
        >
          <MaterialIcons
            name={item.icon as any}
            size={24}
            style={[styles.tabIcon, category === item.name ? styles.activeIcon : null]}
          />
          <Text style={[styles.tabText, category === item.name ? styles.activeText : null]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 16,
    paddingHorizontal: 16
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 8,
    minWidth: 60,
    paddingBottom: 8
  },
  activeTab: {
    borderBottomColor: '#000',
    borderBottomWidth: 2
  },
  activeIcon: {
    color: '#000'
  },
  activeText: {
    color: '#000'
  },
  tabIcon: {
    color: Colors.grey
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'MonSB',
    color: Colors.grey
  }
});
