import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExploreHeader = () => {
  return (
    // ios需要设置edges
    <SafeAreaView style={{ backgroundColor: '#fff' }} edges={['top']}>
      <View style={styles.header}>
        <Link href="/(modals)/booking" asChild>
          {/* 巨坑：react-native-gesture-handler 的 TouchableOpacity flex 没有效果 */}
          <TouchableOpacity style={styles.searchContainer}>
            <Ionicons name="search" size={20} />
            <View>
              <Text style={{ fontFamily: 'MonSB', fontSize: 12 }}>Where to?</Text>
              <Text style={{ fontFamily: 'Mon', color: Colors.grey, fontSize: 12 }}>
                Anywhere · Any week
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 10
  },
  searchContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    elevation: 10,
    flex: 1,
    marginRight: 20,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
    padding: 6
  }
});
