import { FlashList } from '@shopify/flash-list';
import React, { forwardRef, useEffect, useState } from 'react';
import { View } from 'react-native';

import ListingGroup from './ListingGroup';
import Search from './Search';
import Wave from './Wave';
import categoryList from '../../constants/catetoryList';
import { ListingItem } from '../../interface/Listing';
import CategoryTabs from '../common/CategoryTabs';
import Spin from '../common/Spin';

import listingData from '@/data/airbnb-listings.json';

interface ListingProps {
  onScroll?: (y: number) => void;
}

const simpleListingData = listingData.map(item => ({
  id: item.id,
  name: item.name,
  thumbnail_url: item.thumbnail_url
}));

const Listing = forwardRef<unknown, ListingProps>(({ onScroll }, ref) => {
  const [category, setCategory] = useState<string>(categoryList[0].name);
  const [listing, setListing] = useState<ListingItem[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
          <CategoryTabs category={category} categoryList={categoryList} onChange={setCategory} />
        </View>
      }
      ListFooterComponent={<Spin />}
      contentContainerStyle={{
        backgroundColor: 'transparent',
        paddingBottom: 30
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMoreListing}
      data={listing}
      renderItem={renderItem}
    />
  );
});

export default Listing;
