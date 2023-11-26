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
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={[styles.card, style]}>
          <View>
            <Image resizeMode="cover" source={{ uri: item.medium_url }} style={styles.image} />
            <TouchableOpacity style={{ position: 'absolute', right: 6, top: 6 }}>
              <Ionicons name="heart-outline" size={20} color="#eee" />
            </TouchableOpacity>
          </View>

          <Text style={styles.desc}>{item.name}</Text>
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
    fontSize: 13,
    fontWeight: '500'
  },
  image: {
    height: 200
  }
});
