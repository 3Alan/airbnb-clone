import { StyleSheet, Text, TouchableOpacity, ScrollView, View, ViewStyle } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface CategoryItem {
  name: string;
  icon: string;
}

interface CategoryTabsProps {
  category: string;
  categoryList: CategoryItem[];
  onChange?: (category: string) => void;
  style?: ViewStyle;
}

const CategoryTabs: FC<CategoryTabsProps> = ({ category, categoryList, style, onChange }) => {
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
    <View style={[styles.wrap, style]}>
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
              size={20}
              style={[styles.tabIcon, category === item.name ? styles.activeIcon : null]}
            />
            <Text style={[styles.tabText, category === item.name ? styles.activeText : null]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.more}>
        <TouchableOpacity activeOpacity={0.9} style={styles.moreIcon}>
          <Ionicons name="chevron-down" size={22} color="#222222" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 14,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 16
  },
  more: {
    paddingLeft: 8,
    paddingRight: 12,
    justifyContent: 'center'
  },
  moreIcon: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#bababa',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 8,
    minWidth: 60,
    paddingBottom: 10
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
    fontSize: 12,
    fontFamily: 'MonSB',
    color: Colors.grey
  }
});
