import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { FC } from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export interface WishListItemProps {
  id: string;
  img: string;
  name: string;
  count: number;
  style?: ViewStyle;
}

const WishListItem: FC<WishListItemProps> = ({ id, img, name, count = 0, style }) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={[styles.container, style]}>
      <Link asChild href="/">
        <TouchableOpacity activeOpacity={0.8} style={styles.imgWrap}>
          <Image style={styles.img} source={{ uri: img }} />
        </TouchableOpacity>
      </Link>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.desc}>{count}个心愿单项目</Text>
    </View>
  );
};

export default WishListItem;

const styleSheet = createStyleSheet(theme => ({
  container: {
    width: '100%'
  },
  imgWrap: {
    width: '100%',
    borderRadius: theme.size['2xl'],
    aspectRatio: 1,
    padding: theme.spacing['2xs'],
    backgroundColor: '#fff',
    ...theme.shadows.shadow100
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: theme.size['2xl'],
    backgroundColor: theme.colors.gray300
  },
  name: {
    fontSize: theme.size.md,
    fontWeight: 'bold',
    paddingTop: theme.spacing.xs
  },
  desc: {
    color: theme.colors.desc
  }
}));
