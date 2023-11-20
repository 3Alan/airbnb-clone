import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '../../components/explore/Header';
import CategoryTabs from '../../components/explore/CategoryTabs';

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

  return (
    <View>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />
        }}
      />
      <CategoryTabs category={category} categoryList={categoryList} onChange={setCategory} />
    </View>
  );
}

const styles = StyleSheet.create({});
