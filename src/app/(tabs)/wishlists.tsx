import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { WishList } from '../../components/common/wishList';

import LoginButton from '@/components/common/LoginButton';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

export default function Wishlists() {
  const { isLogin } = useAuth();
  const { top } = useSafeAreaInsets();
  const { styles } = useStyles(styleSheet);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View
        style={{
          alignItems: 'flex-end',
          paddingTop: 20
        }}
      >
        <TouchableOpacity>
          <Text style={styles.edit}>编辑</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>心愿单</Text>

      <WishList
        ListEmptyComponent={
          <View style={styles.empty}>
            {isLogin ? (
              <>
                <Text style={styles.emptyTitle}>创建你的第一个心愿清单</Text>
                <Text style={styles.emptyDesc}>
                  搜索时，点击心形图标即可将你喜欢的房源和体验 保存到心愿单。
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.emptyTitle}>登录并查看心愿清单</Text>
                <Text style={styles.emptyDesc}>登录后，你可以创建、查看或编辑心愿单</Text>
                <LoginButton />
              </>
            )}
          </View>
        }
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
    paddingTop: 14,
    fontSize: 28,
    fontWeight: '500',
    color: Colors.textColor,
    paddingBottom: theme.spacing.lg
  },
  edit: {
    textDecorationLine: 'underline'
  },
  empty: {
    paddingTop: 50,
    alignItems: 'flex-start'
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.textColor
  },
  emptyDesc: {
    paddingTop: 10,
    paddingBottom: 20,
    color: Colors.grey
  }
}));
