import { MaterialIcons } from '@expo/vector-icons';
import { User } from '@prisma/client';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';

function getYearsSince(date: Date) {
  const currentDate = new Date();
  const specifiedDate = new Date(date);
  const timeDifference = currentDate.getTime() - specifiedDate.getTime();
  const yearsDifference = Math.round(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
  return yearsDifference;
}

function HostDetailItem({
  desc,
  value,
  hasBorder
}: {
  desc: string;
  value: string;
  hasBorder?: boolean;
}) {
  return (
    <View style={[styles.hostDetailItem, hasBorder ? styles.hostDetailItemWithBorder : null]}>
      <Text style={styles.hostDetailDesc}>{desc}</Text>
      <Text style={styles.hostDetailValue}>{value || '-'}</Text>
    </View>
  );
}

interface HostInfoProps {
  item: User & {
    listingCount: number;
  };
}

const HostInfo = ({ item }: HostInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>你的房东</Text>

      <View style={styles.hostCard}>
        <View style={styles.hostCardLeft}>
          <View style={styles.hostImgContainer}>
            <View style={styles.hostVerify}>
              <MaterialIcons name="verified-user" size={18} color="#fff" />
            </View>
            <Image style={styles.hostImg} source={{ uri: item.img }} />
          </View>

          <Text style={styles.hostName}>{item.name}</Text>
          <Text>房东</Text>
        </View>
        <View style={styles.hostCardRight}>
          <HostDetailItem
            desc="回复率"
            value={`${item.host_response_rate ? `${item.host_response_rate}%` : ''}`}
            hasBorder
          />
          <HostDetailItem desc="房源数" value={`${item.listingCount}`} hasBorder />
          <HostDetailItem desc="年出租经验" value={`${getYearsSince(item.createdAt)}`} />
        </View>
      </View>

      <Text style={styles.hostAbout}>{item.about}</Text>
    </View>
  );
};

export default HostInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0efea',
    paddingHorizontal: 12,
    paddingVertical: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 10,
    color: Colors.textColor
  },
  hostCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 6,
    shadowOffset: {
      width: 2,
      height: 2
    },
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  hostCardLeft: {
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  hostCardRight: {},
  hostImgContainer: {
    position: 'relative'
  },
  hostVerify: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#de1062',
    position: 'absolute',
    right: 0,
    bottom: 12,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hostImg: {
    backgroundColor: '#f0efea',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  hostName: {
    color: Colors.textColor,
    fontSize: 30,
    fontWeight: 'bold'
  },
  hostDetailItem: {
    paddingRight: 36,
    paddingVertical: 10
  },
  hostDetailItemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4'
  },
  hostDetailDesc: {
    fontSize: 10
  },
  hostDetailValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  hostAbout: {
    paddingTop: 30,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textColor,
    fontFamily: 'Mon'
  }
});
