import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../common/Button';
import Colors from '../../constants/Colors';
import { ListingItem } from '../../interface/Listing';
import { Ionicons } from '@expo/vector-icons';

function getPriceInfo(item: ListingItem) {
  if (item.price) {
    return {
      price: item.price,
      unit: '晚'
    };
  }

  if (item.weekly_price) {
    return {
      price: item.weekly_price,
      unit: '周'
    };
  }

  return {
    price: item.monthly_price,
    unit: '月'
  };
}

const DetailFooter = ({ item }: { item: ListingItem }) => {
  const { price, unit } = getPriceInfo(item);

  return (
    <View style={styles.footer}>
      <View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>￥{price}</Text>
          <Text style={styles.priceUnit}>/{unit}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Ionicons color="#fd3b5e" name="star" size={12} />
          <Text style={styles.reviewRate}>
            {item.review_scores_rating ? item.review_scores_rating / 20 : ''}
          </Text>
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
