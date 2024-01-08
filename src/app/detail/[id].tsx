import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useScrollViewOffset
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import Colors from '../../constants/Colors';

import Avatar from '@/components/common/Avatar';
import Features from '@/components/detail/Features';
import DetailFooter from '@/components/detail/Footer';
import HostInfo from '@/components/detail/HostInfo';
import OverView from '@/components/detail/OverView';
import { useListing } from '@/queries/listings';

const CAROUSEL_HEIGHT = 240;

const Detail = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  // 骨架屏优化一下
  const { data } = useListing(id);

  const { width } = useWindowDimensions();
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const scrollHandler = useScrollViewOffset(scrollViewRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollHandler.value, [0, CAROUSEL_HEIGHT], [0, 1])
    };
  }, []);

  const handleShare = async () => {
    await Share.share({
      title: data.name,
      url: data.listing_url
    });
  };

  return (
    <View>
      <Stack.Screen
        options={{
          animation: 'slide_from_right',
          animationDuration: 0.05,
          headerTransparent: true,
          headerTitle: '',
          headerBackground: () => <Animated.View style={[headerAnimatedStyle, styles.header]} />,
          headerLeft: () => (
            <TouchableOpacity style={styles.barIcon} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={18} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.navBar}>
              <TouchableOpacity style={[styles.barIcon, { marginRight: 10 }]}>
                <Ionicons name="share-social-sharp" size={18} onPress={handleShare} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.barIcon}>
                <Ionicons name="heart-outline" size={18} />
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 90, backgroundColor: '#f7f7f7' }}
      >
        <View style={styles.imgContainer}>
          <Carousel
            loop
            autoPlayInterval={4000}
            snapEnabled
            pagingEnabled
            width={width}
            height={CAROUSEL_HEIGHT}
            data={[data.img]}
            renderItem={({ item }) => {
              return (
                <Image
                  style={{
                    height: 240,
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2
                  }}
                  source={{
                    uri: item
                  }}
                />
              );
            }}
          />
          <Avatar style={styles.avatar} img={data?.user?.img} />
        </View>

        <View style={styles.intro}>
          <Text style={styles.roomType}>上海 · 公寓型住宅里的独立房间</Text>
          <Text style={styles.name}>{data.title}</Text>

          <Features item={data} />
        </View>

        <OverView item={data} />
        <HostInfo item={data?.user} />
      </Animated.ScrollView>

      <DetailFooter item={data} />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  imgContainer: {
    paddingBottom: 25,
    backgroundColor: '#fff'
  },
  avatar: {
    position: 'absolute',
    right: 16,
    bottom: 0,
    zIndex: 3
  },
  name: {
    fontFamily: 'Mon',
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.textColor
  },
  intro: {
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  },
  roomType: {
    paddingBottom: 4,
    fontSize: 12,
    color: '#386bbc'
  },
  header: {
    backgroundColor: '#fff',
    height: 100
  },
  navBar: {
    flexDirection: 'row'
  },
  barIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 30
  }
});
