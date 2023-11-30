import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      {isSignedIn ? (
        <Button title="Log out" onPress={() => signOut()}></Button>
      ) : (
        <Link href="/(modals)/login">Login</Link>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
