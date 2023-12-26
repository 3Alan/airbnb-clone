import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import GuestModal from './Modal';

import Colors from '@/constants/Colors';
import { GuestNumber, changeGuestNumber } from '@/store/slices/filterSlice';
import { RootState } from '@/store/store';

interface GuestInputProps {
  contentStyle?: ViewStyle;
  dateFormat?: string;
  showDuration?: boolean;
  rangeStyle?: TextStyle;
}

const GuestInput: FC<GuestInputProps> = ({ contentStyle }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { guestNumber } = useSelector((state: RootState) => state.filter);

  const hasGuest =
    guestNumber.adultNumber + guestNumber.childrenNumber + guestNumber.infantNumber > 0;

  const handleGuestPress = () => {
    setShowModal(true);
  };

  const handleGuestChange = (value: GuestNumber) => {
    dispatch(changeGuestNumber(value));
  };

  return (
    <>
      <Pressable style={contentStyle} onPress={handleGuestPress}>
        {hasGuest ? (
          <>
            {guestNumber.infantNumber > 0 ? (
              <View>
                <Text
                  style={{
                    fontSize: 10
                  }}
                >
                  {guestNumber.adultNumber + guestNumber.childrenNumber}位房客
                </Text>
                <Text
                  style={{
                    fontSize: 10
                  }}
                >
                  {guestNumber.infantNumber}位婴儿
                </Text>
              </View>
            ) : (
              <Text>{guestNumber.adultNumber + guestNumber.childrenNumber}位房客</Text>
            )}
          </>
        ) : (
          <Text style={styles.placeholder} numberOfLines={1}>
            房客人数
          </Text>
        )}
      </Pressable>
      <GuestModal
        value={guestNumber}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onChange={handleGuestChange}
      />
    </>
  );
};

export default GuestInput;

const styles = StyleSheet.create({
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
