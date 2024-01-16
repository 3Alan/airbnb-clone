import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoginButton from '@/components/common/LoginButton';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

export default function Inbox() {
  const { isLogin } = useAuth();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlashList
        estimatedItemSize={10}
        ListHeaderComponent={<Text style={styles.title}>收件箱</Text>}
        ListEmptyComponent={
          isLogin ? (
            <View style={styles.empty}>
              <Ionicons name="chatbox-ellipses-outline" size={36} />
              <Text style={styles.emptyTitle}>没有新信息</Text>
              <Text style={styles.emptyDesc}>
                如果你联系了房东/体验大人或者发送了预定申请，你会在这里看到这些信息
              </Text>
            </View>
          ) : (
            <View style={styles.emptyWithoutLogin}>
              <Text style={styles.emptyTitleWithoutLogin}>请登录以查看消息</Text>
              <Text style={styles.emptyDescWithoutLogin}>
                登录后，您将会在这里找到来自房东/体验达人的消息
              </Text>
              <LoginButton />
            </View>
          )
        }
        data={[]}
        renderItem={() => <Text>1</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: Colors.textColor
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
});
