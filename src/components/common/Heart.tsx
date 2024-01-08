import { Ionicons } from '@expo/vector-icons';
import React, { FC, useEffect, useState } from 'react';
import { GestureResponderEvent, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';

interface HeartProps {
  id: string;
  img: string;
  listName?: string;
  active?: boolean;
  onChange?: (active: boolean) => void;
  style?: ViewStyle;
}

// TODO: 动画
const Heart: FC<HeartProps> = ({ active: activeProps, img, listName, onChange, style }) => {
  const toast = useToast();
  const [active, setActive] = useState(activeProps);

  useEffect(() => {
    setActive(activeProps);
  }, [activeProps]);

  const handlePress = (e: GestureResponderEvent) => {
    // stopPropagation on web
    e.preventDefault();
    setActive(!active);
    onChange?.(!active);

    toast.hideAll();
    toast.show('香港,2024', {
      type: active ? 'delete' : 'save',
      data: {
        img,
        listName
      }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[style]}>
      <Animated.View>
        <Ionicons
          name={active ? 'heart' : 'heart-outline'}
          size={28}
          color={active ? '#ff595d' : '#eee'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Heart;
