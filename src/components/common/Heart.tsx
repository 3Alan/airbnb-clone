import { Ionicons } from '@expo/vector-icons';
import React, { FC, useEffect, useRef, useState } from 'react';
import { GestureResponderEvent, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';

import WishSheet, { WishSheetRef } from './wishList/WishSheet';

interface HeartProps {
  id: string;
  img: string;
  listName?: string;
  active?: boolean;
  onChange?: (active: boolean) => void;
  style?: ViewStyle;
}

// TODO: 动画
const Heart: FC<HeartProps> = ({ id, active: activeProps, img, listName, onChange, style }) => {
  const toast = useToast();
  const [active, setActive] = useState(activeProps);
  const sheetRef = useRef<WishSheetRef>(null);

  useEffect(() => {
    setActive(activeProps);
  }, [activeProps]);

  const handlePress = async (e: GestureResponderEvent) => {
    // stopPropagation on web
    e.preventDefault();
    setActive(!active);
    onChange?.(!active);

    if (!active) {
      await sheetRef.current?.open();
    }

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
    <>
      <TouchableOpacity onPress={handlePress} style={[style]}>
        <Animated.View>
          <Ionicons
            name={active ? 'heart' : 'heart-outline'}
            size={28}
            color={active ? '#ff595d' : '#eee'}
          />
        </Animated.View>
      </TouchableOpacity>
      <WishSheet ref={sheetRef} name={listName} listId={id} />
    </>
  );
};

export default Heart;
