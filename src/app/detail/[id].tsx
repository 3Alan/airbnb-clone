import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDetail } from '../../api/detail';
import { ListingItem } from '../../interface/Listing';
import Carousel from 'react-native-reanimated-carousel';
import OverView from '../../components/detail/OverView';
import HostInfo from '../../components/detail/HostInfo';
import Colors from '../../constants/Colors';
import Features from '../../components/detail/Features';
import DetailFooter from '../../components/detail/Footer';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useScrollViewOffset
} from 'react-native-reanimated';

const CAROUSEL_HEIGHT = 240;

const Detail = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  // 骨架屏优化一下
  // @ts-ignore
  const [detail, setDetail] = useState<ListingItem>({});
  const { width } = useWindowDimensions();
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const scrollHandler = useScrollViewOffset(scrollViewRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollHandler.value, [0, CAROUSEL_HEIGHT], [0, 1])
    };
  }, []);

  useEffect(() => {
    async function getData() {
      const data = await getDetail(id);
      setDetail(data);
    }
    getData();
  }, []);

  const handleShare = async () => {
    await Share.share({
      title: detail.name,
      url: detail.listing_url
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
      <Animated.ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 90 }}>
        <Carousel
          loop
          autoPlayInterval={4000}
          snapEnabled
          pagingEnabled
          width={width}
          height={CAROUSEL_HEIGHT}
          data={[detail?.xl_picture_url]}
          renderItem={({ item }) => {
            return (
              <Image
                style={{
                  height: 240
                }}
                source={{
                  uri: item
                }}
              />
            );
          }}
        />

        <View>
          <View style={styles.intro}>
            <Text style={styles.roomType}>{`${detail.smart_location} 的 ${detail.room_type}`}</Text>
            <Text style={styles.name}>{detail.name}</Text>

            <Features item={detail} />
          </View>

          <OverView item={detail} />
          <HostInfo item={detail} />
        </View>
      </Animated.ScrollView>

      <DetailFooter item={detail} />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Mon',
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.textColor
  },
  intro: {
    paddingVertical: 12,
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
