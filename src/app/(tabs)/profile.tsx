import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      {isSignedIn ? (
        <Button title="Log out" onPress={() => signOut()} />
      ) : (
        <Link href="/(modals)/login">Login</Link>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
