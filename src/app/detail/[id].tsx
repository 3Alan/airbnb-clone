import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '../../constants/Colors';

import { useListing } from '@/actions/listings';
import Avatar from '@/components/common/Avatar';
import Spin from '@/components/common/Spin';
import Features from '@/components/detail/Features';
import DetailFooter from '@/components/detail/Footer';
import HostInfo from '@/components/detail/HostInfo';
import OverView from '@/components/detail/OverView';

const CAROUSEL_HEIGHT = 240;

type URLParams = {
  id: string;
  img?: string;
};

const Detail = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  // 提升用户体验
  const { id, img } = useLocalSearchParams<URLParams>();
  const { data = {}, isSuccess, isPending } = useListing(id);

  const { width } = useWindowDimensions();
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationY.value, [0, CAROUSEL_HEIGHT], [0, 1])
    };
  }, []);

  const handleShare = async () => {
    await Share.share({
      title: data.name,
      url: `http://localhost:8081/detail/${data.id}`
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          animation: 'slide_from_right',
          animationDuration: 0.05,
          headerTransparent: true,
          headerTitle: '',
          headerBackground: () => (
            <Animated.View
              style={[
                headerAnimatedStyle,
                {
                  backgroundColor: '#fff',
                  height: top + 54
                }
              ]}
            />
          ),
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
        style={{ backgroundColor: '#fff' }}
        onScroll={scrollHandler}
        contentContainerStyle={{ backgroundColor: '#f7f7f7' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imgContainer}>
          <Carousel
            autoPlayInterval={4000}
            snapEnabled
            pagingEnabled
            width={width}
            height={CAROUSEL_HEIGHT}
            data={data?.imgs ? data.imgs : [img]}
            renderItem={({ item }) => {
              return (
                <Image
                  style={{
                    height: 240,
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2
                  }}
                  contentFit="cover"
                  source={{
                    uri: item as string
                  }}
                />
              );
            }}
          />
          {isSuccess && <Avatar style={styles.avatar} img={data?.user?.img} />}
        </View>

        {isPending ? (
          <View
            style={{
              backgroundColor: '#fff',
              alignItems: 'center',
              flex: 1
            }}
          >
            <Spin />
          </View>
        ) : (
          <>
            <View style={styles.intro}>
              <Text style={styles.roomType}>上海 · 公寓型住宅里的独立房间</Text>
              <Text style={styles.name}>{data.title}</Text>

              <Features item={data} />
            </View>
            <OverView item={data} />
            {data.user && <HostInfo item={data?.user} />}
          </>
        )}
      </Animated.ScrollView>

      <DetailFooter item={data} isLoading={isPending} />
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
    borderRadius: 15
  }
});
