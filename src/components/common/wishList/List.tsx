import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useNavigation } from 'expo-router';
import React, { FC, useEffect } from 'react';

import WishListItem, { WishListItemProps } from './Item';
import { useWishLists, useWishListsRevalidate } from '../../../actions/wishlist';

export interface WishListProps {
  ListEmptyComponent?: FlashListProps<unknown>['ListEmptyComponent'];
}

const WishList: FC<WishListProps> = ({ ListEmptyComponent }) => {
  const navigation = useNavigation();
  const { data } = useWishLists();
  const revalidate = useWishListsRevalidate();

  useEffect(() => {
    // 由于tab切换时每个tab页面不会卸载，所以这里监听时间来刷新就数据
    const unsubscribe = navigation.addListener('focus', () => {
      revalidate();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <FlashList<WishListItemProps>
      estimatedItemSize={10}
      numColumns={2}
      contentContainerStyle={{
        padding: 2
      }}
      ListEmptyComponent={ListEmptyComponent}
      data={data}
      renderItem={({ item, index }) => (
        <WishListItem
          style={{
            paddingLeft: index % 2 === 0 ? 0 : 10,
            paddingRight: index % 2 === 1 ? 0 : 10,
            paddingBottom: 10
          }}
          {...item}
          count={item.wishItemCount}
          img={item.img}
        />
      )}
    />
  );
};

export default WishList;
