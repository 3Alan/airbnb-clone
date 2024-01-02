import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import ListingCard from './ListingCard';

import { ListingItem } from '@/interface/Listing';

interface ListingGroupProps {
  list: ListingItem[];
}

const ListingGroup: FC<ListingGroupProps> = ({ list }) => {
  return (
    <View style={styles.container}>
      <ListingCard
        height={310}
        item={list[0]}
        style={{
          marginBottom: 10
        }}
      />
      <View style={styles.grid}>
        <View style={{ flex: 1, gap: 10 }}>
          <ListingCard height={230} item={list[1]} />
          <ListingCard height={260} item={list[3]} />
        </View>
        <View style={{ flex: 1, gap: 10 }}>
          <ListingCard height={260} item={list[2]} />
          <ListingCard height={230} item={list[4]} />
        </View>
      </View>
    </View>
  );
};

export default ListingGroup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 20
  },
  grid: {
    flexDirection: 'row',
    gap: 10
  }
});
