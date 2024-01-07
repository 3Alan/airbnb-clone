import { Listing } from '@prisma/client';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import ListingCard from './ListingCard';

interface ListingGroupProps {
  items: Listing[];
}

const ListingGroup: FC<ListingGroupProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <ListingCard
        height={310}
        item={items[0]}
        style={{
          marginBottom: 10
        }}
      />
      <View style={styles.grid}>
        <View style={{ flex: 1, gap: 10 }}>
          <ListingCard height={230} item={items[1]} />
          <ListingCard height={260} item={items[3]} />
        </View>
        <View style={{ flex: 1, gap: 10 }}>
          <ListingCard height={260} item={items[2]} />
          <ListingCard height={230} item={items[4]} />
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
