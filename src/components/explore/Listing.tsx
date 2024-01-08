import { FlashList } from '@shopify/flash-list';
import React, { forwardRef, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import ListingGroup from './ListingGroup';
import Search from './Search';
import Wave from './Wave';
import CategoryTabs from '../common/CategoryTabs';
import Spin from '../common/Spin';

import Colors from '@/constants/Colors';
import useCategories from '@/queries/categories';
import { useListings } from '@/queries/listings';

interface ListingProps {
  onScroll?: (y: number) => void;
}

const Listing = forwardRef<unknown, ListingProps>(({ onScroll }, ref) => {
  const { data: categories = [], isFetching: isLoadingCategories } = useCategories();
  const [category, setCategory] = useState<string>('全部');
  const { data: listings, fetchNextPage, isFetching, hasNextPage } = useListings(category);

  useEffect(() => {
    if (categories?.length > 0) {
      setCategory(categories[0]?.name);
    }
  }, [categories]);

  const onLoadMoreListing = () => {
    if (isFetching || !hasNextPage) {
      return;
    }
    fetchNextPage();
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    onScroll?.(scrollPosition);
  };

  const renderItem = ({ item }: any) => {
    return <ListingGroup items={item.items} />;
  };

  return (
    <FlashList
      ref={ref as any}
      keyExtractor={(item: any) => item?.id}
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
          <CategoryTabs
            isLoading={isLoadingCategories}
            category={category}
            categoryList={categories}
            onChange={setCategory}
          />
        </View>
      }
      ListFooterComponent={
        <View style={{ backgroundColor: '#fff', alignItems: 'center', paddingVertical: 15 }}>
          {isFetching ? (
            <Spin />
          ) : (
            !hasNextPage && <Text style={{ color: Colors.grey }}>没有更多了</Text>
          )}
        </View>
      }
      contentContainerStyle={{
        backgroundColor: 'transparent'
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMoreListing}
      data={listings?.pages}
      renderItem={renderItem}
    />
  );
});

export default Listing;
