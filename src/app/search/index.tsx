import { StyleSheet, View } from 'react-native';
import React from 'react';
import Map from '../../components/common/Map';
import listingData from '../../../assets/data/airbnb-listings.json';
import { ListingItem } from '../../interface/Listing';

const list = listingData.map(item => ({
  id: item.id,
  thumbnail_url: item.thumbnail_url,
  geolocation: item.geolocation,
  price: item.price,
  weekly_price: item.weekly_price,
  monthly_price: item.monthly_price
}));

const index = () => {
  return (
    <View>
      <Map
        // Hong Kong
        initialRegion={{
          latitude: 22.3193,
          longitude: 114.1694,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        listing={list as ListingItem[]}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
