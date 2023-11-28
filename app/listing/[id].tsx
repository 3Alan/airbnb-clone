import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';

const Detail = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: id
    });
  }, [navigation]);

  return (
    <View>
      <Stack.Screen
        options={{
          animation: 'slide_from_right'
        }}
      />
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
