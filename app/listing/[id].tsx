import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';

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
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
