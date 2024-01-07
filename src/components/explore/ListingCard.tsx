import { Entypo, Ionicons } from '@expo/vector-icons';
import { Listing } from '@prisma/client';
import { Link } from 'expo-router';
import { isEmpty } from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import Heart from '../common/Heart';

const ListingCard = ({
  item,
  style,
  height
}: {
  item: Listing;
  height: number;
  style?: ViewStyle;
}) => {
  if (isEmpty(item)) {
    return null;
  }

  return (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={[styles.card, style]}>
          <Image resizeMode="cover" source={{ uri: item.img }} height={height} />
          <Heart id={item.id} img={item.img} style={{ position: 'absolute', right: 6, top: 6 }} />
          <Text numberOfLines={2} style={styles.desc}>
            {item.title}
            <Entypo name="dot-single" />
            {item.roomCount}室{item.bedCount}床{item.guestCount}人<Entypo name="dot-single" />
            <Ionicons size={10} name="star" />
            {item.rating}
            <Entypo name="dot-single" />￥{item.price}
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
    fontSize: 13,
    fontWeight: '500',
    position: 'absolute',
    bottom: 0,
    color: '#fff',
    lineHeight: 18
  }
});
