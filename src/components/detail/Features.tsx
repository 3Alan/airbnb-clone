import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Listing } from '../../interface/Listing';

import Colors from '@/constants/Colors';

function Feature({ text, type = 'standard' }: { text: string; type?: 'primary' | 'standard' }) {
  return (
    <View style={styles[type]}>
      <Text style={styles[`${type}Text`]}>{text}</Text>
    </View>
  );
}

const Features = ({ item }: { item: Listing }) => {
  return (
    <View style={styles.container}>
      <Feature type="primary" text={`${item.rating}分 · ${item.reviewCount}条评论`} />
      <Feature type="primary" text="超赞房东" />
      <Feature type="primary" text="近地铁" />
      <Feature text="免费停车" />
      <Feature text="可以做饭" />
      <Feature text="自助入住" />
      <Feature text="暖气" />
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    paddingVertical: 6,
    flexDirection: 'row',
    gap: 6
  },
  primary: {
    backgroundColor: '#f5eee6',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#b25520'
  },
  standard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  standardText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.textColor
  }
});
