import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import React from 'react';
import { ListingItem } from '../../interface/Listing';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ListingCard = ({ item, style }: { item: ListingItem; style: StyleProp<ViewStyle> }) => {
  return (
    <Link href={`/detail/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={[styles.card, style]}>
          <Image
            resizeMode="cover"
            source={{ uri: item.medium_url }}
            height={item.picture_url.height / 2 > 260 ? 260 : item.picture_url.height / 2}
          />
          <TouchableOpacity style={{ position: 'absolute', right: 6, top: 6 }}>
            <Ionicons name="heart-outline" size={20} color="#eee" />
          </TouchableOpacity>
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
    backgroundColor: '#fff'
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
