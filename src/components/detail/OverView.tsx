import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ListingItem } from '../../interface/Listing';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import Colors from '../../constants/Colors';

function OverviewItem({ name, text }: { name: any; text: string }) {
  return (
    <View style={styles.overviewItem}>
      <Ionicons color={Colors.textColor} name={name} size={26} />
      <Text style={styles.overviewText}>{text}</Text>
    </View>
  );
}

const OverView = ({ item }: { item: ListingItem }) => {
  return (
    <View style={styles.overviewContainer}>
      <Text style={styles.title}>房源概览</Text>
      <View style={styles.overview}>
        <OverviewItem name="home-outline" text={`${item.bedrooms} 间卧室`} />
        <OverviewItem name="bed-outline" text={`${item.beds} 张床`} />
        <OverviewItem name="home-outline" text={`${item.bathrooms} 个卫生间`} />
        <OverviewItem name="people-outline" text={`宜住${item.accommodates} 个人`} />
      </View>

      {item.summary && (
        <>
          <Text style={styles.title}>房源描述</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </>
      )}
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({
  overviewContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    paddingBottom: 10,
    color: Colors.textColor
  },
  overview: {
    flexDirection: 'row',
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#fafafa'
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center'
  },
  overviewText: {
    paddingTop: 6,
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textColor
  },
  summary: {
    fontSize: 14,
    fontFamily: 'Mon',
    lineHeight: 20,
    color: Colors.textColor,
    paddingBottom: 20
  }
});
