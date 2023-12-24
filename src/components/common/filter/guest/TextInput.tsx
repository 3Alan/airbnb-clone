import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '@/constants/Colors';
import { RootState } from '@/store/store';

interface GuestInputProps {
  contentStyle?: ViewStyle;
  dateFormat?: string;
  showDuration?: boolean;
  rangeStyle?: TextStyle;
}

const GuestInput: FC<GuestInputProps> = ({
  contentStyle,
  dateFormat = 'MM月DD日',
  showDuration = true,
  rangeStyle
}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { adultNumber, infantNumber, childrenNumber } = useSelector(
    (state: RootState) => state.filter
  );

  const hasGuest = adultNumber + infantNumber + childrenNumber > 0;

  const handleDatePress = () => {
    setShowModal(true);
  };

  return (
    <>
      <Pressable style={contentStyle} onPress={handleDatePress}>
        {hasGuest ? (
          <View style={styles.row}>
            <Text>1</Text>
          </View>
        ) : (
          <Text style={styles.placeholder} numberOfLines={1}>
            房客人数
          </Text>
        )}
      </Pressable>
    </>
  );
};

export default GuestInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateRange: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textColor
  },
  duration: {
    paddingLeft: 3,
    fontSize: 12,
    color: Colors.textGrey
  },
  placeholder: {
    fontSize: 14,
    color: Colors.textGrey
  }
});
