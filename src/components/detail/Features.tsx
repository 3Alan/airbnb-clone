import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ListingItem } from '../../interface/Listing';

function Feature({ text }: { text: string }) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const Features = ({ item }: { item: ListingItem }) => {
  return (
    <View style={styles.container}>
      <Feature text={`${item.number_of_reviews}条评论`} />
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    flexDirection: 'row'
  },
  feature: {
    backgroundColor: '#f5eee6',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  featureText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#b25520'
  }
});
