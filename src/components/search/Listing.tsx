import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';

import ListingCard from './ListingCard';
import Spin from '../common/Spin';

import { useSearchListings } from '@/actions/listings';
import Colors from '@/constants/Colors';
import { useGuestCount, useTrip } from '@/store/trip';

interface ListingProps {
  onScroll?: (y: number) => void;
}

const Listing: FC<ListingProps> = () => {
  const { dateRange } = useTrip(state => state);
  const guestCount = useGuestCount();
  const {
    data: listings,
    fetchNextPage,
    isFetching,
    hasNextPage
  } = useSearchListings({
    startDate: dayjs(dateRange[0]),
    endDate: dayjs(dateRange[1]),
    guestCount
  });

  useEffect(() => {
    onLoadMoreListing();
  }, []);

  const onLoadMoreListing = () => {
    if (isFetching || !hasNextPage) {
      return;
    }
    fetchNextPage();
  };

  const renderItem = ({ item }: any) => {
    return (
      <>
        {item.items.map((listing: any) => (
          <ListingCard key={listing.id} item={listing} />
        ))}
      </>
    );
  };

  return (
    <FlashList
      contentContainerStyle={{
        backgroundColor: '#fff'
      }}
      ListFooterComponent={
        <View style={{ backgroundColor: '#fff', alignItems: 'center', paddingVertical: 15 }}>
          {isFetching ? (
            <Spin />
          ) : (
            !hasNextPage && <Text style={{ color: Colors.neutral08 }}>没有更多了</Text>
          )}
        </View>
      }
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMoreListing}
      estimatedItemSize={300}
      data={listings?.pages}
      renderItem={renderItem}
    />
  );
};

export default Listing;
