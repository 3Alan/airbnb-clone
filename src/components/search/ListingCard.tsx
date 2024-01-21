import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions
} from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import Colors from '../../constants/Colors';
import { Listing } from '../../interface/Listing';
import Avatar from '../common/Avatar';
import Features from '../detail/Features';

const ListingCard = ({ item }: { item: Listing; style?: StyleProp<ViewStyle> }) => {
  const { width } = useWindowDimensions();

  return (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        <View style={[styles.card]}>
          <Carousel
            style={{ borderRadius: 16 }}
            width={width - 40}
            height={200}
            data={item.imgs}
            // 解决和scrollView滚动手势冲突
            panGestureHandlerProps={{ activeOffsetX: [-30, 30] }}
            renderItem={({ item: img, index }) => {
              return (
                <View>
                  {index === 0 && (
                    <Animated.View style={styles.review}>
                      <Ionicons name="star" size={14} color="#ff385c" />
                      <Text style={{ fontSize: 13, paddingLeft: 3 }}>{item.rating}</Text>
                      {item.reviewCount && (
                        <Text style={{ fontSize: 12, color: '#898986', paddingLeft: 3 }}>
                          ({item.reviewCount} 条评价)
                        </Text>
                      )}

                      <Text style={{ fontSize: 11, paddingLeft: 4 }}>"如此平静的地方"</Text>
                    </Animated.View>
                  )}
                  <Image
                    style={{
                      width: '100%',
                      height: 200
                    }}
                    source={{
                      uri: img
                    }}
                  />
                </View>
              );
            }}
          />
          <Avatar img={item.user?.img || ''} style={styles.avatar} />
          <View style={styles.tag}>
            <Text>房客推荐</Text>
          </View>

          <TouchableOpacity style={{ position: 'absolute', right: 16, top: 16 }}>
            <Ionicons name="heart-outline" size={24} color="#eee" />
          </TouchableOpacity>

          <View
            style={[
              styles.row,
              {
                paddingTop: 8,
                width: width - 100
              }
            ]}
          >
            <View style={styles.location}>
              <Text style={styles.locationText}>意大利</Text>
            </View>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 12
              }}
              numberOfLines={1}
            >
              农家乐·{item.roomCount}室{item.bathRoomCount}卫{item.bedCount}床·可住{item.guestCount}
              人
            </Text>
          </View>

          <Text numberOfLines={1} style={styles.name}>
            {item.title}
          </Text>

          <Features item={item} />

          <View style={[styles.row, { paddingTop: 10 }]}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 18,
                color: Colors.textColor
              }}
            >
              ￥{item.price}
            </Text>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 12,
                color: Colors.textColor,
                paddingLeft: 6
              }}
            >
              /晚
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  tag: {
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    top: 14,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 20
  },
  avatar: {
    position: 'absolute',
    right: 10,
    top: 175,
    zIndex: 3
  },
  name: {
    fontFamily: 'Mon',
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  location: {
    backgroundColor: '#ebebeb',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    color: Colors.textColor,
    marginRight: 10
  },
  locationText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  card: {
    overflow: 'hidden',
    backgroundColor: '#fff'
  }
});
