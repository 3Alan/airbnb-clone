import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Map from '../../components/common/Map';
import listingData from '../../../assets/data/airbnb-listings.json';
import FilterHeader from '../../components/common/FilterHeader';
import { Stack } from 'expo-router';
import FilterBar from '../../components/search/FilterBar';
import categoryList from '../../constants/catetoryList';
import Listing from '../../components/search/Listing';

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
