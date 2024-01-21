import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import FilterHeader from '../../components/common/FilterHeader';
import FilterBar from '../../components/search/FilterBar';
import Listing from '../../components/search/Listing';

const Search = () => {
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
