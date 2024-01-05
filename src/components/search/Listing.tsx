import { FlashList } from '@shopify/flash-list';
import React, { FC, useEffect, useMemo, useState } from 'react';

import ListingCard from './ListingCard';
import categoryList from '../../constants/catetoryList';
import { ListingItem } from '../../interface/Listing';

import listingData from '@/data/airbnb-listings.json';

interface ListingProps {
  onScroll?: (y: number) => void;
}

const Listing: FC<ListingProps> = ({ onScroll }) => {
  const [category, setCategory] = useState<string>(categoryList[0].name);
  const [listing, setListing] = useState<ListingItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const snapPoints = useMemo(() => ['10%', '100%'], []);

  useEffect(() => {
    onLoadMoreListing();
  }, []);

  const onLoadMoreListing = () => {
    const start = (currentPage - 1) * 20;
    const newListing = listingData.slice(start, start + 20) as ListingItem[];
    setListing([...listing, ...newListing]);
    setCurrentPage(currentPage + 1);
  };

  const renderItem = ({ item }: any) => {
    return <ListingCard item={item} />;
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    onScroll?.(scrollPosition);
  };

  return (
    <FlashList
      contentContainerStyle={{
        backgroundColor: '#fff'
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMoreListing}
      estimatedItemSize={300}
      data={listing as ListingItem[]}
      renderItem={renderItem}
    />
  );
};

export default Listing;
