import { Ionicons } from '@expo/vector-icons';
import { Listing } from '@prisma/client';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import Button from '../common/Button';

const DetailFooter = ({ item }: { item: Listing }) => {
  return (
    <View style={styles.footer}>
      <View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>￥{item.price}</Text>
          <Text style={styles.priceUnit}>/晚</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Ionicons color="#fd3b5e" name="star" size={12} />
          <Text style={styles.reviewRate}>{item.rating}</Text>
          <Text style={styles.reviewNumber}>({item.number_of_reviews}条评论)</Text>
        </View>
      </View>

      <Button style={styles.button} textStyle={styles.buttonText} colors={['#e51e4d', '#d70465']}>
        查看可定状态
      </Button>
    </View>
  );
};

export default DetailFooter;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4'
  },
  button: {
    paddingHorizontal: 14
  },
  buttonText: {
    fontWeight: '100'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textColor
  },
  priceUnit: {
    color: '#b4b4b4',
    fontSize: 12
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  reviewRate: {
    paddingLeft: 2,
    color: Colors.textColor,
    fontSize: 12,
    fontWeight: 'bold'
  },
  reviewNumber: {
    fontSize: 12,
    color: Colors.textGrey,
    fontWeight: '500'
  }
});
