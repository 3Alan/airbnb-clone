import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { ListingItem } from '../../interface/Listing';
import Heart from '../common/Heart';

const ListingCard = ({ item, style }: { item: ListingItem; style: StyleProp<ViewStyle> }) => {
  const [active, setActive] = useState(false);
  const toast = useToast();
  const height = useMemo(() => Math.floor(Math.random() * (300 - 100 + 1)) + 180, []);
  const mockBeautifulImg = `https://source.unsplash.com/random/200x${height}/?room`;

  const handleFavorite = (active: boolean) => {
    toast.show(item.name);
    setActive(active);
  };

  return (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={[styles.card, style]}>
          <Image resizeMode="cover" source={{ uri: mockBeautifulImg }} height={height} />
          <Heart
            active={active}
            onChange={handleFavorite}
            style={{ position: 'absolute', right: 6, top: 6 }}
          />
          <Text numberOfLines={2} style={styles.desc}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee'
  },
  desc: {
    paddingTop: 4,
    paddingHorizontal: 4,
    paddingBottom: 10,
    fontSize: 12,
    fontWeight: '500',
    position: 'absolute',
    bottom: 0,
    color: '#fff'
  }
});
