import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import FilterHeader from '../../components/common/FilterHeader';
import FilterBar from '../../components/search/FilterBar';
import Listing from '../../components/search/Listing';
import categoryList from '../../constants/catetoryList';

import listingData from '@/data/airbnb-listings.json';

const list = listingData.map(item => ({
  id: item.id,
  thumbnail_url: item.thumbnail_url,
  geolocation: item.geolocation,
  price: item.price,
  weekly_price: item.weekly_price,
  monthly_price: item.monthly_price
}));

const Search = () => {
  const [category, setCategory] = useState<string>(categoryList[0].name);

  return (
    <View style={{ flex: 1 }}>
      {/* <Map
        // Hong Kong
        initialRegion={{
          latitude: 22.3193,
          longitude: 114.1694,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        listing={list as ListingItem[]}
      /> */}
      <Stack.Screen
        options={{
          header: () => (
            <View>
              <FilterHeader showBack />
              <FilterBar />
            </View>
          )
        }}
      />
      <Listing />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
