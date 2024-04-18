import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { useReservationConfirmation } from '@/actions/reservation';
import Button from '@/components/common/Button';
import Spin from '@/components/common/Spin';
import Colors from '@/constants/Colors';
import { useGuestCount, useTrip } from '@/store/trip';
import authAction from '@/utils/authAction';
import request from '@/utils/request';

export default function Reservation() {
  const params = useLocalSearchParams();
  const { data, isPending } = useReservationConfirmation(params as any);
  const toast = useToast();
  const router = useRouter();
  const { dateRange } = useTrip(state => state);
  const guestCount = useGuestCount();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return request.post('/reservations', data);
    }
  });
  const days = useMemo(() => {
    if (isPending) return 0;

    return dayjs(data.endDate).diff(dayjs(data.startDate), 'day');
  }, [data]);

  const handleReservePress = async () => {
    const res = await mutation.mutateAsync({
      listingId: params.listingId,
      startDate: new Date(dateRange[0]),
      endDate: new Date(dateRange[1]),
      guestCount
    });

    if (res.data.isSuccess) {
      toast.show('预定成功');
      router.replace('/trips');
    }
  };

  if (isPending) {
    return (
      <View style={{ flex: 1 }}>
        <Spin />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          animation: 'slide_from_right',
          headerTitle: '确认订单'
        }}
      />
      <ScrollView style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            backgroundColor: '#fff',
            paddingHorizontal: 20
          }}
        >
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 18,
              color: Colors.text
            }}
          >
            {data.title}
          </Text>
          <Image
            style={{
              width: 100,
              height: 65,
              borderRadius: 4
            }}
            source={{ uri: data.imgs[0] }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingBottom: 20
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <Text style={styles.intro}>入住时间</Text>
            <Text style={styles.introValue}>{dayjs(data.startDate).format('M月DD日')}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <Text style={styles.intro}>退房时间</Text>
            <Text style={styles.introValue}>{dayjs(data.endDate).format('M月DD日')}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end'
            }}
          >
            <Text style={styles.intro}>房客人数</Text>
            <Text style={styles.introValue}>{data.guestCount}位</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            marginTop: 10,
            padding: 20,
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Colors.text
            }}
          >
            总价（
            <Text
              style={{
                color: Colors.link
              }}
            >
              CNY
            </Text>
            ）
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Colors.text
            }}
          >
            ￥{data.totalPrice}
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          height: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20
        }}
      >
        <Text
          style={{
            fontSize: 18
          }}
        >
          {days}晚的价格为 <Text>￥{data.totalPrice}</Text>
        </Text>
        <Button onPress={authAction(handleReservePress)}>去支付</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: {
    fontWeight: '400',
    fontSize: 15,
    color: Colors.neutral08,
    paddingBottom: 6
  },
  introValue: {
    fontWeight: '400',
    fontSize: 20,
    color: Colors.link
  },
  content: {
    flex: 1,
    backgroundColor: Colors.neutral03
  }
});
