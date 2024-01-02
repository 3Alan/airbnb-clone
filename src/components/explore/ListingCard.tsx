import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ListingItem } from '../../interface/Listing';
import Heart from '../common/Heart';

const ListingCard = ({
  item,
  style,
  height
}: {
  item: ListingItem;
  height: number;
  style?: ViewStyle;
}) => {
  const mockHeight = useMemo(() => height + Math.random() * 10 || 300, []);
  const mockBeautifulImg = `https://source.unsplash.com/random/200x${mockHeight}/?room`;

  return (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={[styles.card, style]}>
          <Image resizeMode="cover" source={{ uri: mockBeautifulImg }} height={height} />
          <Heart
            id={item.id}
            img={item.thumbnail_url}
            active={item.favorite}
            style={{ position: 'absolute', right: 6, top: 6 }}
          />
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
