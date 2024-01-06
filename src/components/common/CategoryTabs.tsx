import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ViewStyle,
  Pressable
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '../../constants/Colors';

export interface CategoryItem {
  name: string;
  icon: string;
  img: string;
  color: string;
}

interface CategoryTabsProps {
  category: string;
  categoryList: CategoryItem[];
  onChange?: (category: string) => void;
  style?: ViewStyle;
}

const CategoryCard: FC<
  CategoryItem & { style?: ViewStyle; active?: boolean; onPress: () => void }
> = ({ name, icon, img, color, style, active, onPress }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 0.8 }}
      colors={[color, '#fff']}
      style={[style, cardStyles.container, active && cardStyles.active]}
    >
      <Pressable onPress={onPress}>
        <View style={cardStyles.header}>
          <Text>{name}</Text>
          <Ionicons name={icon as any} size={16} />
        </View>
        <Image style={cardStyles.img} source={{ uri: img }} />
      </Pressable>
    </LinearGradient>
  );
};

const cardStyles = StyleSheet.create({
  active: {
    borderColor: '#333'
  },
  container: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.borderColor,
    padding: 6
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    width: '100%',
    height: 80,
    backgroundColor: '#eee',
    marginTop: 20,
    borderRadius: 6
  }
});

const CategoryTabs: FC<CategoryTabsProps> = ({ category, categoryList, style, onChange }) => {
  const itemsRef = useRef<{ [category: string]: TouchableOpacity | null }>({});
  const scrollRef = useRef<ScrollView>(null);
  const sheetRef = useRef<BottomSheetModal>(null);
  const { top } = useSafeAreaInsets();

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

  const handleViewMorePress = () => {
    sheetRef.current?.present();
  };

  const handleCloseSheet = () => {
    sheetRef.current?.dismiss();
  };

  const handleCategoryCardPress = (category: string) => {
    onCategoryPress(category);
    handleCloseSheet();
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
            <Ionicons
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
        <TouchableOpacity activeOpacity={0.9} style={styles.moreIcon} onPress={handleViewMorePress}>
          <Ionicons name="chevron-down" size={22} color="#222222" />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={sheetRef}
        handleComponent={() => (
          <View style={styles.handle}>
            <Ionicons size={22} name="close" onPress={handleCloseSheet} />
            <Text style={{ fontSize: 16, paddingLeft: 10 }}>选择你感兴趣的内容</Text>
          </View>
        )}
        enablePanDownToClose
        topInset={top}
        index={0}
        snapPoints={['100%']}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            padding: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: 20
          }}
        >
          {categoryList.map(item => (
            <CategoryCard
              key={item.name}
              active={category === item.name}
              onPress={() => handleCategoryCardPress(item.name)}
              {...item}
              style={{
                flexBasis: '48%'
              }}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  handle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
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
