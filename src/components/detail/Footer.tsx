import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { isEmpty } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import Button from '../common/Button';

import { Listing } from '@/interface/Listing';
import { useTrip } from '@/store/trip';
import authAction from '@/utils/authAction';

const DetailFooter = ({ item, isLoading }: { item: Listing; isLoading?: boolean }) => {
  const router = useRouter();
  const { dateRange, guestNumber } = useTrip(state => state);

  const handleReservePress = async () => {
    router.push<any>({
      pathname: '/reservation',
      params: {
        listingId: item.id,
        startDate: dateRange[0],
        endDate: dateRange[1],
        guestCount: guestNumber.adultNumber + guestNumber.childrenNumber + guestNumber.infantNumber
      }
    });
  };

  return (
    <View style={styles.footer}>
      <View>
        {!isLoading && (
          <>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>￥{item.price}</Text>
              <Text style={styles.priceUnit}>/晚</Text>
            </View>
            <View style={styles.reviewContainer}>
              <Ionicons color="#fd3b5e" name="star" size={12} />
              <Text style={styles.reviewRate}>{item.rating}</Text>
              <Text style={styles.reviewNumber}>({item.reviewCount}条评论)</Text>
            </View>
          </>
        )}
      </View>

      {isEmpty(dateRange) ? (
        <Button isLoading={isLoading}>查看可定状态</Button>
      ) : (
        <Button
          style={{
            width: 100
          }}
          isLoading={isLoading}
          onPress={authAction(handleReservePress)}
        >
          预定
        </Button>
      )}
    </View>
  );
};

export default DetailFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4'
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
