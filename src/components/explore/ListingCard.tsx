import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

import { ListingItem } from '../../interface/Listing';

const ListingCard = ({ item, style }: { item: ListingItem; style: StyleProp<ViewStyle> }) => {
  const height = Math.floor(Math.random() * (300 - 100 + 1)) + 180;
  const mockBeautifulImg = `https://source.unsplash.com/random/200x${height}/?room`;

  return (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={[styles.card, style]}>
          <Image resizeMode="cover" source={{ uri: mockBeautifulImg }} height={height} />
          <TouchableOpacity style={{ position: 'absolute', right: 6, top: 6 }}>
            <Ionicons name="heart-outline" size={20} color="#eee" />
          </TouchableOpacity>
          <Text numberOfLines={2} style={styles.desc}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee'
  },
  desc: {
    paddingTop: 4,
    paddingHorizontal: 4,
    paddingBottom: 10,
    fontSize: 12,
    fontWeight: '500',
    position: 'absolute',
    bottom: 0,
    color: '#fff'
  }
});
