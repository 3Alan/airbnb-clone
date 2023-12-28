import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

interface HeartProps {
  active: boolean;
  onChange: (active: boolean) => void;
  style?: ViewStyle;
}

// TODO: 动画
const Heart: FC<HeartProps> = ({ active, onChange, style }) => {
  const handlePress = () => {
    onChange?.(!active);
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
