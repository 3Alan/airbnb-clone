import { Entypo, Ionicons } from '@expo/vector-icons';
import { Listing } from '@prisma/client';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { isEmpty } from 'lodash';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

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
    <Link
      href={{
        pathname: '/detail/[id]',
        params: {
          id: item.id,
          img: item.imgs[0]
        }
      }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.8}>
        <View style={[styles.card, style]}>
          <Image
            // blurHash设置占位图
            // placeholder="L9ACMc?^%KHuy@v1EKKu0NK+BqRf"
            contentFit="cover"
            source={{ uri: item.imgs[0] }}
            style={{
              height
            }}
          />
          <Heart
            id={item.id}
            img={item.imgs[0]}
            listName={item.title}
            style={{ position: 'absolute', right: 6, top: 6 }}
          />
          <LinearGradient
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={styles.descContainer}
            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.0)']}
          >
            <Text numberOfLines={2} style={styles.desc}>
              {item.title}
              <Entypo name="dot-single" />
              {item.roomCount}室{item.bedCount}床{item.guestCount}人<Entypo name="dot-single" />
              <Ionicons size={10} name="star" />
              {item.rating}
              <Entypo name="dot-single" />￥{item.price}
            </Text>
          </LinearGradient>
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
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 18
  },
  descContainer: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 4,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0
  }
});
