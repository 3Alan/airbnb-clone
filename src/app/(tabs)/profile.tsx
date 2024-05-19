import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import Typography from '@ui/Typography';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import Button from '../../components/common/Button';
import { MenuItem, MenuList } from '../../components/common/menu';

import Avatar from '@/components/common/Avatar';
import Colors from '@/constants/Colors';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { isLogin, user, logout } = useAuth();
  const { styles, theme } = useStyles(styleSheet);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scrollContainer, { paddingTop: theme.spacing['2xl'] }]}
        contentContainerStyle={{ paddingBottom: theme.spacing['3xl'] }}
      >
        {isLogin ? (
          <View style={styles.header}>
            <Typography variant="h1">个人资料</Typography>
            <Pressable>
              <Ionicons size={24} color="#4b4646" name="notifications-outline" />
            </Pressable>
          </View>
        ) : (
          <>
            <Typography variant="h1" style={styles.title}>
              您的个人资料
            </Typography>
            <Typography variant="subtitle">马上登录，开始规划下一趟旅程</Typography>
            <Button onPress={() => router.push('/(modals)/login')} style={styles.btn}>
              登录
            </Button>
            <View style={styles.registerWrap}>
              <Text style={styles.registerText}>还没有账号？</Text>
              <Link style={styles.registerLink} href="/(modals)/login">
                注册
              </Link>
            </View>
          </>
        )}

        {isLogin ? (
          <>
            <MenuItem
              href=""
              name={user?.name || ''}
              desc="显示个人资料"
              icon={<Avatar img={user?.img as string} />}
            />
            <MenuList
              title="设置"
              options={[
                {
                  name: '个人信息',
                  icon: <Octicons size={24} name="person" />,
                  href: '/(modals)/profile'
                },
                {
                  name: '登录和安全',
                  icon: <AntDesign size={24} name="Safety" />,
                  href: '/(modals)/profile'
                },
                {
                  name: '付款和收款',
                  icon: <AntDesign size={24} name="creditcard" />,
                  href: '/(modals)/profile'
                },
                {
                  name: '通知',
                  icon: <Ionicons size={24} name="notifications-outline" />,
                  href: '/(modals)/profile'
                }
              ]}
            />

            <MenuList
              title="关于"
              options={[
                {
                  name: '项目地址',
                  icon: <Octicons color={Colors.textColor} size={20} name="mark-github" />,
                  href: 'https://github.com/3Alan/airbnb-clone',
                  isWebLink: true
                }
              ]}
            />
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logout}>退出</Text>
            </TouchableOpacity>
          </>
        ) : (
          <MenuList
            options={[
              {
                name: '设置',
                icon: <Ionicons size={20} color="#4b4646" name="settings-outline" />,
                href: '/(modals)/profile'
              },
              {
                name: '项目地址',
                icon: <Octicons color={Colors.textColor} size={20} name="mark-github" />,
                href: 'https://github.com/3Alan/airbnb-clone',
                isWebLink: true
              }
            ]}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styleSheet = createStyleSheet(theme => ({
  logout: {
    textDecorationLine: 'underline',
    paddingVertical: theme.spacing.md
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: UnistylesRuntime.insets.top
  },
  scrollContainer: {
    paddingHorizontal: 20
  },
  title: {
    paddingBottom: theme.spacing.sm
  },
  btn: {
    marginTop: theme.spacing['3xl']
  },
  registerWrap: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    fontSize: theme.size.xs
  },
  registerText: {
    fontSize: theme.size.xs,
    paddingBottom: theme.spacing['2xl']
  },
  registerLink: {
    fontSize: theme.size.xs,
    textDecorationLine: 'underline',
    fontWeight: '500'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing.sm
  },
  iconItem: {
    alignItems: 'center'
  }
}));
