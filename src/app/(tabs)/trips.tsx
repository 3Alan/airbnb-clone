import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import Typography from '@ui/Typography';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useReservations } from '@/actions/reservation';
import LoginButton from '@/components/common/LoginButton';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

// TODO: 端到端类型安全 trpc?
function Card({ item }: { item: any }) {
  return (
    <Link asChild href={`/detail/${item.listingId}`}>
      <TouchableOpacity activeOpacity={0.8} style={cardStyles.card}>
        <Image style={cardStyles.img} source={{ uri: item.listingImg }} />
        <View style={cardStyles.cardContent}>
          <Text style={cardStyles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={cardStyles.cardDesc}>房东：{item.hostName}</Text>
          <Text style={cardStyles.cardDesc}>
            {dayjs(item.startDate).format('YYYY-MM-DD')} -{' '}
            {dayjs(item.endDate).format('YYYY-MM-DD')}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 20
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16
  },
  cardContent: {
    paddingVertical: 10
  },
  cardTitle: {
    fontWeight: 'bold',
    color: Colors.text,
    paddingBottom: 4,
    fontSize: 16
  },
  cardDesc: {
    color: Colors.neutral08,
    paddingBottom: 4
  }
});

export default function Trips() {
  const { isLogin } = useAuth();
  const { top } = useSafeAreaInsets();
  const { data } = useReservations();
  const { styles } = useStyles(styleSheet);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlashList
        estimatedItemSize={10}
        ListHeaderComponent={
          <Typography variant="h1" style={styles.title}>
            行程
          </Typography>
        }
        ListEmptyComponent={
          isLogin ? (
            <View style={styles.empty}>
              <Ionicons name="chatbox-ellipses-outline" size={36} />
              <Text style={styles.emptyTitle}>没有行程信息</Text>
            </View>
          ) : (
            <View style={styles.emptyWithoutLogin}>
              <Text style={styles.emptyTitleWithoutLogin}>尚无行程</Text>
              <Text style={styles.emptyDescWithoutLogin}>
                当您准备好规划下一行程时，我们会为您提供帮助
              </Text>
              <LoginButton />
            </View>
          )
        }
        data={data}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
}

const styleSheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    paddingTop: theme.spacing['2xl']
  },
  subTitle: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text
  },
  emptyWithoutLogin: {
    marginTop: 30,
    borderTopColor: Colors.borderColor,
    borderTopWidth: 1,
    paddingTop: 40,
    alignItems: 'flex-start'
  },
  empty: {
    paddingTop: 320,
    alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.textColor,
    paddingBottom: 10,
    paddingTop: 16
  },
  emptyDesc: {
    fontSize: 16,
    textAlign: 'center'
  },
  emptyTitleWithoutLogin: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.textColor
  },
  emptyDescWithoutLogin: {
    paddingTop: 10,
    paddingBottom: 20,
    color: Colors.grey
  }
}));
