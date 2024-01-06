import { FlashList } from '@shopify/flash-list';
import React, { forwardRef, useEffect, useState } from 'react';
import { View } from 'react-native';

import ListingGroup from './ListingGroup';
import Search from './Search';
import Wave from './Wave';
import { ListingItem } from '../../interface/Listing';
import CategoryTabs from '../common/CategoryTabs';
import Spin from '../common/Spin';

import listingData from '@/data/airbnb-listings.json';
import { useGetCategoriesQuery } from '@/store/services/api';

interface ListingProps {
  onScroll?: (y: number) => void;
}

const simpleListingData = listingData.map(item => ({
  id: item.id,
  name: item.name,
  thumbnail_url: item.thumbnail_url
}));

const Listing = forwardRef<unknown, ListingProps>(({ onScroll }, ref) => {
  const [listing, setListing] = useState<ListingItem[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: categories = [] } = useGetCategoriesQuery();
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0]?.name);
    }
  }, [categories]);

  useEffect(() => {
    onLoadMoreListing();
  }, []);

  const onLoadMoreListing = () => {
    const start = (currentPage - 1) * 5;
    const newListing = simpleListingData.slice(start, start + 5) as ListingItem[];
    setListing([...listing, newListing]);
    setCurrentPage(currentPage + 1);
  };

  const onRefresh = () => {
    const newListing = simpleListingData.slice(0, 5) as ListingItem[];
    setListing([newListing]);
    setCurrentPage(1);
  };

  const renderItem = ({ item }: any) => {
    return <ListingGroup list={item} />;
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    onScroll?.(scrollPosition);
  };

  return (
    <FlashList
      ref={ref as any}
      keyExtractor={(item: any) => item[0].id}
      estimatedItemSize={820}
      scrollEventThrottle={100}
      onScroll={handleScroll}
      ListHeaderComponent={
        <View
          style={{
            marginTop: 170
          }}
        >
          <Search />
          <Wave />
          <CategoryTabs category={category} categoryList={categories} onChange={setCategory} />
        </View>
      }
      ListFooterComponent={
        <View style={{ backgroundColor: '#fff', alignItems: 'center', paddingVertical: 15 }}>
          <Spin />
        </View>
      }
      contentContainerStyle={{
        backgroundColor: 'transparent'
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMoreListing}
      data={listing}
      renderItem={renderItem}
    />
  );
});

export default Listing;
