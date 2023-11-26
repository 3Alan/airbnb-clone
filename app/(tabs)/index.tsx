import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '../../components/explore/Header';
import CategoryTabs from '../../components/explore/CategoryTabs';
import Listing from '../../components/explore/Listing';
import listingData from '../../assets/data/airbnb-listings.json';
import { ListingItem } from '../../interface/Listing';

const categoryList = [
  {
    name: 'Tiny homes',
    icon: 'home'
  },
  {
    name: 'Cabins',
    icon: 'house-siding'
  },
  {
    name: 'Trending',
    icon: 'local-fire-department'
  },
  {
    name: 'Play',
    icon: 'videogame-asset'
  },
  {
    name: 'City',
    icon: 'apartment'
  },
  {
    name: 'Beachfront',
    icon: 'beach-access'
  },
  {
    name: 'Countryside',
    icon: 'nature-people'
  }
];

export default function Page() {
  const [category, setCategory] = useState<string>(categoryList[0].name);
  const [listing, setListing] = useState<ListingItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onLoadMoreListing();
  }, []);

  const onLoadMoreListing = () => {
    const start = (currentPage - 1) * 20;
    const newListing = listingData.slice(start, start + 20) as ListingItem[];
    setListing([...listing, ...newListing]);
    setCurrentPage(currentPage + 1);
  };

  const onRefresh = () => {
    const newListing = listingData.slice(0, 20) as ListingItem[];
    setListing(newListing);
    setCurrentPage(1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />
        }}
      />
      <CategoryTabs category={category} categoryList={categoryList} onChange={setCategory} />
      <Listing
        category={category}
        onRefresh={onRefresh}
        onLoadMore={onLoadMoreListing}
        items={listing}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
