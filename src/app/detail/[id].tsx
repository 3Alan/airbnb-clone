import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { getDetail } from '../../api/detail';
import { ListingItem } from '../../interface/Listing';
import Carousel from 'react-native-reanimated-carousel';
import OverView from '../../components/detail/OverView';
import HostInfo from '../../components/detail/HostInfo';
import Colors from '../../constants/Colors';
import Features from '../../components/detail/Features';

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [detail, setDetail] = useState<ListingItem>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    async function getData() {
      const data = await getDetail(id);
      setDetail(data);
    }
    getData();
  }, []);

  if (!detail) {
    return null;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          animation: 'slide_from_right',
          headerShown: false
          // headerTransparent: true
        }}
      />
      <Animated.ScrollView>
        <Carousel
          loop
          autoPlayInterval={4000}
          snapEnabled
          pagingEnabled
          width={width}
          height={240}
          data={[detail?.xl_picture_url]}
          renderItem={({ item }) => {
            return (
              <Animated.Image
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
  }
});
