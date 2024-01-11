import { useAuth } from '@clerk/clerk-expo';
import { FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WebLink from '@/components/common/WebLink';
import Colors from '@/constants/Colors';

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <BlurView />
      <View style={styles.header}>
        <Pressable>
          <Ionicons size={20} color="#4b4646" name="notifications-outline" />
        </Pressable>
        <Pressable>
          <Ionicons size={20} color="#4b4646" name="settings-outline" />
        </Pressable>
      </View>
      {isSignedIn ? (
        <Button title="Log out" onPress={() => signOut()} />
      ) : (
        <View style={styles.userCard}>
          <View style={{ paddingRight: 20 }}>
            <Link style={styles.loginText} href="/(modals)/login">
              注册/登录
            </Link>
            <Text
              style={{
                color: '#979291'
              }}
            >
              注册爱彼迎，开启不一样的旅行体验
            </Text>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['#ee7854', '#bb4bce']}
            style={styles.emptyAvatar}
          >
            <FontAwesome color="#fff" size={36} name="user" />
          </LinearGradient>
        </View>
      )}

      <View style={styles.card}>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="log" />
          <Text style={styles.itemText}>全部订单</Text>
        </Pressable>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="checklist" />
          <Text style={styles.itemText}>全部订单</Text>
        </Pressable>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="credit-card" />
          <Text style={styles.itemText}>全部订单</Text>
        </Pressable>
        <Pressable style={styles.iconItem}>
          <Octicons color={Colors.textColor} size={20} name="history" />
          <Text style={styles.itemText}>全部订单</Text>
        </Pressable>
      </View>

      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: Colors.textColor,
          paddingBottom: 20
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
        <WebLink href="https://github.com/3Alan/airbnb-clone">
          <View style={styles.toolItem}>
            <View style={styles.iconItemEllipse}>
              <Octicons color={Colors.textColor} size={20} name="mark-github" />
            </View>
            <Text style={styles.itemText}>项目地址</Text>
          </View>
        </WebLink>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30
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
  loginText: {
    fontWeight: 'bold',
    fontSize: 24,
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    shadowColor: '#888',
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 6,
    shadowOffset: {
      width: 4,
      height: 4
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
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 6,
    shadowOffset: {
      width: 4,
      height: 4
    }
  }
});
