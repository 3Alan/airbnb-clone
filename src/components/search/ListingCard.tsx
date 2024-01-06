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
  ViewStyle,
  useWindowDimensions
} from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import Colors from '../../constants/Colors';
import { ListingItem } from '../../interface/Listing';
import getPriceInfo from '../../utils/getPriceInfo';

const FeatureItem = ({ text, type }: { text: string; type: 'primary' | 'standard' }) => {
  return (
    <Text
      style={{
        paddingHorizontal: 4,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: '500',
        color: type === 'primary' ? '#b05f30' : '#a9a9a9',
        borderWidth: 1,
        borderColor: type === 'primary' ? '#c7b39e' : '#f1f1f1'
      }}
    >
      {text}
    </Text>
  );
};

const ListingCard = ({ item }: { item: ListingItem; style?: StyleProp<ViewStyle> }) => {
  const { width } = useWindowDimensions();
  const height = Math.floor(Math.random() * (300 - 100 + 1)) + 180;
  const mockBeautifulImg = `https://source.unsplash.com/random/200x${height}/?room`;
  const { price, unit } = getPriceInfo(item);

  return (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        <View style={[styles.card]}>
          <Carousel
            style={{ borderRadius: 16 }}
            width={width - 40}
            height={200}
            data={[
              'https://source.unsplash.com/random/?forest house',
              'https://source.unsplash.com/random/?Mountain green'
            ]}
            // 解决和scrollView滚动手势冲突
            panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  {index === 0 && (
                    <Animated.View style={styles.review}>
                      <Ionicons name="star" size={14} color="#ff385c" />
                      <Text style={{ fontSize: 13, paddingLeft: 3 }}>5.0</Text>
                      <Text style={{ fontSize: 12, color: '#898986', paddingLeft: 3 }}>
                        (116 条评价)
                      </Text>
                      <Text style={{ fontSize: 11, paddingLeft: 4 }}>"如此平静的地方"</Text>
                    </Animated.View>
                  )}
                  <Image
                    style={{
                      width: '100%',
                      height: 200
                    }}
                    source={{
                      uri: item
                    }}
                  />
                </View>
              );
            }}
          />
          <View style={styles.avatar}>
            <Image style={styles.avatarImg} source={{ uri: item.host_thumbnail_url }} />
          </View>
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
              农家乐·1室1卫2床·可住4人
            </Text>
          </View>

          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>

          <View style={[styles.row, { columnGap: 10, rowGap: 4, flexWrap: 'wrap' }]}>
            {item.features.map((feature, index) => {
              return (
                <FeatureItem key={index} text={feature} type={index > 1 ? 'standard' : 'primary'} />
              );
            })}
          </View>

          <View style={[styles.row, { paddingTop: 10 }]}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 18,
                color: Colors.textColor
              }}
            >
              ￥{price}
            </Text>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 12,
                color: Colors.textColor,
                paddingLeft: 6
              }}
            >
              /￥{unit}
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
    borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#fff',
    backgroundColor: '#eee',
    zIndex: 3
  },
  avatarImg: {
    width: 50,
    height: 50
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
