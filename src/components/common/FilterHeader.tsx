import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

interface FilterHeaderProps {
  showBack?: boolean;
  style?: ViewStyle;
  hasShadow?: boolean;
}

const FilterHeader: FC<FilterHeaderProps> = ({ style, showBack, hasShadow }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { paddingTop: insets.top + 10 },
        hasShadow ? styles.shadow : null
      ]}
    >
      {showBack && (
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
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
        <TouchableOpacity style={{ flex: 1, paddingVertical: 3 }}>
          <Ionicons name="search" size={18} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default FilterHeader;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    alignContent: 'center',
    flex: 1
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: '#fff'
  },
  shadow: {
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.12,
    elevation: 6,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  back: {
    paddingRight: 10
  },
  filterItem: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 3
  }
});
