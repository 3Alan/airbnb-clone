import { FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import { useFeatureIsOn } from '@growthbook/growthbook-react';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '@/components/common/Avatar';
import WebLink from '@/components/common/WebLink';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const { isLogin, user, logout } = useAuth();
  const enabledNewUI = useFeatureIsOn('new-home-ui');
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* background: radial-gradient(
          farthest-side at 75% 30%,
          rgba(254, 208, 209, 1) 0%,
          #ffece6 40%,
          rgba(255, 255, 255, 0.1) 100%
        ); */}
      <Image
        style={[
          {
            width: Dimensions.get('window').width,
            height: 320
          },
          StyleSheet.absoluteFill
        ]}
        source={require('../../../assets/images/profile-bg.png')}
      />

      <View style={styles.header}>
        <Pressable>
          <Ionicons size={20} color="#4b4646" name="notifications-outline" />
        </Pressable>
        <Pressable onPress={logout}>
          <Ionicons size={20} color="#4b4646" name="settings-outline" />
        </Pressable>
        <Text>{enabledNewUI ? 'new UI' : 'old UI'}</Text>
      </View>

      <BlurView style={styles.userCard} intensity={100}>
        <View style={{ paddingRight: 20 }}>
          {isLogin ? (
            <>
              <Text style={styles.userName}>Hi {user?.name}</Text>
              <Text
                style={{
                  color: '#979291'
                }}
              >
                今天是我们陪伴你的第{dayjs().diff(dayjs(user?.createdAt), 'day')}天
              </Text>
            </>
          ) : (
            <>
              <Link style={styles.userName} href="/(modals)/login">
                注册/登录
              </Link>
              <Text
                style={{
                  color: '#979291'
                }}
              >
                注册开启不一样的旅行体验
              </Text>
            </>
          )}
        </View>

        {isLogin ? (
          <View style={styles.avatar}>
            <Avatar img={user?.img as string} />
          </View>
        ) : (
          <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['#ee7854', '#bb4bce']}
            style={styles.emptyAvatar}
          >
            <FontAwesome color="#fff" size={36} name="user" />
          </LinearGradient>
        )}
      </BlurView>

      <View style={styles.card}>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="log" />
          <Text style={styles.itemText}>全部订单</Text>
        </Pressable>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="checklist" />
          <Text style={styles.itemText}>有效订单</Text>
        </Pressable>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="credit-card" />
          <Text style={styles.itemText}>待支付订单</Text>
        </Pressable>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="history" />
          <Text style={styles.itemText}>历史足迹</Text>
        </Pressable>
      </View>

      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: Colors.textColor,
          padding: 20
        }}
      >
        工具
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'space-between'
        }}
      >
        <Pressable style={styles.toolItem}>
          <View style={styles.iconItemEllipse}>
            <Octicons color={Colors.textColor} size={20} name="people" />
          </View>
          <Text style={styles.itemText}>邻里支持</Text>
        </Pressable>
        <Pressable style={styles.toolItem}>
          <View style={styles.iconItemEllipse}>
            <Octicons color={Colors.textColor} size={20} name="question" />
          </View>
          <Text style={styles.itemText}>获得帮助</Text>
        </Pressable>
        <Pressable style={styles.toolItem}>
          <View style={styles.iconItemEllipse}>
            <Octicons color={Colors.textColor} size={20} name="briefcase" />
          </View>

          <Text style={styles.itemText}>行程/体验订单</Text>
        </Pressable>

        <View style={styles.toolItem}>
          <WebLink href="https://github.com/3Alan/airbnb-clone">
            <View style={styles.iconItemEllipse}>
              <Octicons color={Colors.textColor} size={20} name="mark-github" />
            </View>
          </WebLink>
          <Text style={styles.itemText}>项目地址</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30,
    paddingTop: 16
  },
  avatar: {
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#d40a64'
  },
  emptyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    overflow: 'hidden'
  },
  toolItem: {
    flex: 1,
    alignItems: 'center'
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.textColor,
    paddingBottom: 10
  },
  iconItem: {
    alignItems: 'center'
  },
  iconItemEllipse: {
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  itemText: {
    paddingTop: 10,
    fontWeight: 'bold',
    color: Colors.textColor,
    fontSize: 12
  },
  userCard: {
    // for borderRadius
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    // TODO: 阴影不生效
    shadowColor: '#888',
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 6
    }
  },
  card: {
    marginBottom: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    shadowColor: '#888',
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 6
    }
  }
});
