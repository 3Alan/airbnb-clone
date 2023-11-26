import MasonryList from '@react-native-seoul/masonry-list';
import React, { FC } from 'react';
import { ListingItem } from '../../interface/Listing';
import ListingCard from './ListingCard';

interface ListingProps {
  category: string;
  items: ListingItem[];
  onLoadMore: () => void;
  onRefresh?: () => void;
}

const Listing: FC<ListingProps> = ({ category, items, onLoadMore, onRefresh }) => {
  const renderItem = ({ item, i }: any) => {
    return (
      <ListingCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 6, marginBottom: 10 }} />
    );
  };

  return (
    <MasonryList
      keyExtractor={(item): string => item.id}
      contentContainerStyle={{
        padding: 10,
        backgroundColor: '#e5e5e5'
      }}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      onEndReached={onLoadMore}
      numColumns={2}
      data={items as ListingItem[]}
      renderItem={renderItem}
    />
  );
};

export default Listing;
