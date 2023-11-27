import MasonryList from '@react-native-seoul/masonry-list';
import React, { FC, useEffect, useState } from 'react';
import { ListingItem } from '../../interface/Listing';
import ListingCard from './ListingCard';
import Search from './Search';
import Wave from './Wave';
import CategoryTabs from './CategoryTabs';
import { View } from 'react-native';
import listingData from '../../assets/data/airbnb-listings.json';

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

interface ListingProps {
  onScroll?: (y: number) => void;
}

const Listing: FC<ListingProps> = ({ onScroll }) => {
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

  const renderItem = ({ item, i }: any) => {
    return (
      <ListingCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 6, marginBottom: 10 }} />
    );
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    onScroll?.(scrollPosition);
  };

  return (
    <MasonryList
      style={{ padding: 20, backgroundColor: '#fff' }}
      keyExtractor={(item): string => item.id}
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
      contentContainerStyle={{
        backgroundColor: 'transparent'
      }}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      onEndReached={onLoadMoreListing}
      numColumns={2}
      data={listing as ListingItem[]}
      renderItem={renderItem}
    />
  );
};

export default Listing;
